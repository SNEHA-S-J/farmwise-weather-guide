
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, RefreshCw, Send, Mic, VolumeUp } from "lucide-react";
import VoiceReader from "@/utils/VoiceReader";

interface StockAIAdvisorProps {
  crop: string;
  currentPrice: number;
  priceChange: number;
}

// Mock AI responses based on crop and market conditions
const getAIResponse = (crop: string, currentPrice: number, priceChange: number): string => {
  if (priceChange > 5) {
    return `The market for ${crop} is showing a strong upward trend (${priceChange.toFixed(1)}%). This is a favorable time to consider selling a portion of your stock. Current price of ₹${currentPrice} per quintal is above the seasonal average. Consider selling in batches over the next week to maximize profits.`;
  } else if (priceChange > 0) {
    return `The ${crop} prices are gradually rising (${priceChange.toFixed(1)}%). The current price of ₹${currentPrice} per quintal is showing stability. You might want to hold your stock for a few more days to see if the price continues to increase. Keep an eye on weather reports as they might affect harvest quality.`;
  } else if (priceChange > -5) {
    return `${crop} prices are slightly declining (${Math.abs(priceChange).toFixed(1)}%). Current market rate of ₹${currentPrice} per quintal is near the seasonal average. Consider holding your stock unless you have immediate cash needs. Market analysts predict a potential recovery in the next 2-3 weeks.`;
  } else {
    return `There's a significant drop in ${crop} prices (${Math.abs(priceChange).toFixed(1)}%). At ₹${currentPrice} per quintal, prices are below the seasonal average. If possible, avoid selling right now unless necessary. Consider strategic storage options and wait for market recovery indicators.`;
  }
};

// Predefined questions for farmers to ask the AI
const suggestedQuestions = [
  "When is the best time to sell my crop?",
  "Should I store my harvest or sell now?",
  "What factors are affecting current prices?",
  "How much could prices change in the next month?",
  "What crop rotation could improve my profits?"
];

const StockAIAdvisor = ({ crop, currentPrice, priceChange }: StockAIAdvisorProps) => {
  const [isThinking, setIsThinking] = useState(false);
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState<{type: "ai" | "user", message: string}[]>([
    { type: "ai", message: getAIResponse(crop, currentPrice, priceChange) }
  ]);
  const { t, language } = useLanguage();
  const voiceReader = VoiceReader.getInstance();

  const handleSendQuestion = () => {
    if (!question.trim()) return;
    
    // Add user question to conversation
    setConversation(prev => [...prev, { type: "user", message: question }]);
    
    // Simulate AI thinking
    setIsThinking(true);
    
    // Mock AI response after a delay
    setTimeout(() => {
      let response = "";
      
      // Generate contextual response based on question keywords
      if (question.toLowerCase().includes("sell") || question.toLowerCase().includes("price")) {
        response = getAIResponse(crop, currentPrice, priceChange + Math.random() * 2 - 1);
      } else if (question.toLowerCase().includes("store") || question.toLowerCase().includes("keep")) {
        response = `Based on current trends and seasonal patterns, storing your ${crop} for 3-4 weeks might be beneficial. Storage costs should be factored in, but prices are projected to increase by approximately 8-10% by next month.`;
      } else if (question.toLowerCase().includes("factor") || question.toLowerCase().includes("affect")) {
        response = `Several factors are currently affecting ${crop} prices: 1) Seasonal harvest volumes, 2) Export demand from neighboring countries, 3) Government MSP policies, and 4) Recent weather conditions affecting quality. The most significant impact currently comes from point #2.`;
      } else if (question.toLowerCase().includes("change") || question.toLowerCase().includes("next month")) {
        response = `Our analysis suggests ${crop} prices could see a ${priceChange > 0 ? 'continued increase' : 'recovery'} of 5-8% over the next month, contingent on stable weather conditions and no unexpected policy changes.`;
      } else if (question.toLowerCase().includes("rotation") || question.toLowerCase().includes("profit")) {
        response = `For maximizing profits after your ${crop} harvest, consider rotating with ${crop === 'rice' ? 'pulses or oilseeds' : crop === 'wheat' ? 'legumes or vegetables' : 'short-duration cereals'}. This rotation can improve soil health and potentially increase your annual profit margin by 15-20%.`;
      } else {
        response = `Thank you for your question about ${crop}. Based on the current market price of ₹${currentPrice} and recent trends (${priceChange > 0 ? '+' : ''}${priceChange.toFixed(1)}%), I'd recommend watching the market for another week before making major decisions.`;
      }
      
      // Add AI response to conversation
      setConversation(prev => [...prev, { type: "ai", message: response }]);
      setIsThinking(false);
      setQuestion("");
    }, 1500);
  };

  const handleSuggestedQuestion = (q: string) => {
    setQuestion(q);
    setTimeout(() => handleSendQuestion(), 100);
  };

  const readMessage = (message: string) => {
    voiceReader.speak(message, language);
  };

  const handleVoiceInput = () => {
    // Mock voice input functionality
    setQuestion("When should I sell my crop?");
    setTimeout(() => handleSendQuestion(), 500);
  };

  return (
    <Card className="h-[500px] flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center">
          <Bot className="mr-2 h-5 w-5 text-farm-green" />
          <CardTitle>{t("cropAdvisor")}</CardTitle>
        </div>
        <CardDescription>
          {t("askQuestionsAboutCrop")} {t(crop)}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="flex-grow overflow-y-auto space-y-4 pr-1 mb-4">
            {conversation.map((entry, index) => (
              <div 
                key={index} 
                className={`flex ${entry.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    entry.type === "user" 
                      ? "bg-farm-green text-white rounded-tr-none" 
                      : "bg-gray-100 rounded-tl-none"
                  }`}
                >
                  <p>{entry.message}</p>
                  {entry.type === "ai" && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-1 h-6 p-0 text-gray-500 hover:text-gray-700"
                      onClick={() => readMessage(entry.message)}
                    >
                      <VolumeUp size={16} />
                    </Button>
                  )}
                </div>
              </div>
            ))}
            
            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none">
                  <div className="flex items-center space-x-2">
                    <RefreshCw size={16} className="animate-spin" />
                    <span>{t("thinking")}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestedQuestions.map((q, i) => (
              <Button
                key={i}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleSuggestedQuestion(q)}
              >
                {q}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleVoiceInput}
              title={t("voiceInput")}
            >
              <Mic size={18} />
            </Button>
            <div className="relative flex-grow">
              <Input
                placeholder={t("typeYourQuestion")}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendQuestion();
                }}
                className="pr-10"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 h-full"
                onClick={handleSendQuestion}
                disabled={!question.trim()}
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockAIAdvisor;
