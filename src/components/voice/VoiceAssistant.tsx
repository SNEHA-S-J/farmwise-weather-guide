
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import VoiceReader from "@/utils/VoiceReader";

// Define the speech recognition interface directly in the file
// This eliminates the need for a separate file import
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
        confidence: number;
      };
      isFinal: boolean;
      length: number;
    };
    length: number;
  };
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  start(): void;
  stop(): void;
}

// Extend Window interface to include the speech recognition property
declare global {
  interface Window {
    SpeechRecognition: {
      new(): SpeechRecognition;
    };
    webkitSpeechRecognition: {
      new(): SpeechRecognition;
    };
  }
}

const VoiceAssistant = () => {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const voiceReader = VoiceReader.getInstance();
  
  useEffect(() => {
    // Initialize speech recognition if supported
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const result = event.results[current];
        const transcriptText = result[0].transcript;
        setTranscript(transcriptText);
        
        if (result.isFinal) {
          handleVoiceCommand(transcriptText);
        }
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        toast({
          title: "Error",
          description: "There was a problem with speech recognition",
          variant: "destructive",
        });
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current?.start();
        }
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [toast, isListening]);
  
  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in your browser",
        variant: "destructive",
      });
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      toast({
        title: "Voice Assistant Stopped",
        description: "No longer listening for commands",
      });
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        toast({
          title: "Voice Assistant Active",
          description: "Listening for commands. Say 'help' for assistance.",
        });
      } catch (error) {
        console.error('Speech recognition error', error);
        toast({
          title: "Error",
          description: "There was a problem starting speech recognition",
          variant: "destructive",
        });
      }
    }
  };
  
  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    let responseText = "";
    
    if (lowerCommand.includes("weather") || lowerCommand.includes("forecast")) {
      responseText = "Today's forecast shows partly cloudy conditions with temperatures around 22°C. There's a 10% chance of light rain in the evening.";
    } else if (lowerCommand.includes("crop") && lowerCommand.includes("price")) {
      responseText = "Current market prices: Corn at ₹1,850 per quintal, Wheat at ₹2,100 per quintal, and Rice at ₹3,200 per quintal.";
    } else if (lowerCommand.includes("help")) {
      responseText = "You can ask me about weather forecasts, crop prices, farming tips, or alerts. For example, try saying 'What's today's weather?' or 'Tell me about corn prices'.";
    } else if (lowerCommand.includes("tip") || lowerCommand.includes("advice")) {
      responseText = "Today's farming tip: The current soil moisture levels are ideal for planting wheat and barley. Consider applying nitrogen-rich fertilizer to corn fields this week.";
    } else if (lowerCommand.includes("alert") || lowerCommand.includes("notification")) {
      responseText = "You currently have 2 active alerts: High temperature alert above 35°C and rainfall alert above 50mm.";
    } else {
      responseText = "I didn't quite understand that request. Try asking about weather, crop prices, farming tips, or alerts.";
    }
    
    setResponse(responseText);
    speakResponse(responseText);
  };
  
  const speakResponse = async (text: string) => {
    setIsSpeaking(true);
    try {
      await voiceReader.speak(text, language);
    } catch (error) {
      console.error('Error speaking response', error);
    } finally {
      setIsSpeaking(false);
    }
  };
  
  return (
    <Card className="p-5 bg-white shadow-md rounded-xl">
      <div className="flex items-center mb-4">
        <div className={`p-2 rounded-full mr-3 ${isListening ? 'bg-farm-alert animate-pulse' : 'bg-farm-green'}`}>
          {isListening ? <Mic className="text-white" size={20} /> : <Volume className="text-white" size={20} />}
        </div>
        <h2 className="font-bold text-lg">Voice Assistant</h2>
      </div>
      
      <div className="space-y-4">
        <div className="h-24 bg-gray-50 rounded-lg p-3 overflow-y-auto">
          <div className={`text-sm ${response ? 'text-gray-800' : 'text-gray-400 italic'}`}>
            {response || "Voice assistant responses will appear here"}
          </div>
        </div>
        
        <div className="flex items-center justify-between bg-gray-100 rounded-lg p-3">
          <div className="flex-1 px-3">
            <p className="text-sm text-gray-500">
              {isListening ? (
                transcript ? transcript : "Listening..."
              ) : (
                "Press the microphone button and speak"
              )}
            </p>
          </div>
          
          <Button
            onClick={toggleListening}
            className={`rounded-full h-12 w-12 ${isListening ? 'bg-farm-alert hover:bg-farm-alert/80' : 'bg-farm-green hover:bg-farm-green/80'}`}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </Button>
        </div>
        
        <div className="text-xs text-gray-500 text-center">
          Try saying "What's today's weather?" or "Tell me about crop prices"
        </div>
      </div>
    </Card>
  );
};

export default VoiceAssistant;
