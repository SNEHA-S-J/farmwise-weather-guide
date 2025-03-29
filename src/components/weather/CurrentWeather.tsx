
import { Volume2 } from "lucide-react";
import WeatherIcon from "./WeatherIcon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import VoiceReader from "@/utils/VoiceReader";

interface CurrentWeatherProps {
  temperature: number;
  condition: string;
  message: string;
}

const CurrentWeather = ({ temperature, condition, message }: CurrentWeatherProps) => {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [isReading, setIsReading] = useState(false);
  
  const voiceReader = VoiceReader.getInstance();

  const handleReadAloud = async () => {
    setIsReading(true);
    
    const textToRead = `${temperature}°C, ${condition}. ${message}`;
    
    try {
      await voiceReader.speak(textToRead, language);
      toast({
        title: t("readAloud"),
        description: t("readAloudSuccess"),
        duration: 2000,
      });
    } catch (error) {
      console.error("Error reading aloud:", error);
      toast({
        title: "Error",
        description: "Failed to read aloud",
        variant: "destructive",
        duration: 2000,
      });
    } finally {
      setIsReading(false);
    }
  };

  return (
    <Card className="p-6 bg-white shadow-md rounded-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-farm-green via-farm-sky to-farm-yellow"></div>
      
      <div className="flex flex-col items-center">
        <div className="flex justify-end w-full">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center transition-all duration-300 ${isReading ? "text-farm-green" : "text-gray-600 hover:text-farm-green"}`}
            onClick={handleReadAloud}
            aria-label={t("readAloud")}
            disabled={isReading}
          >
            <Volume2 size={20} className={isReading ? "mr-1 animate-pulse" : "mr-1 animate-pulse-slow"} />
            <span className="text-sm">{t("readAloud")}</span>
          </Button>
        </div>

        <div className="flex flex-col items-center mt-2 transform transition-all duration-300 hover:scale-105">
          <WeatherIcon type={condition} size={96} aria-label={condition} />
          <h2 className="text-6xl font-bold mt-4 text-gray-800">{temperature}°C</h2>
          <p className="text-gray-600 mt-2 text-center font-medium capitalize">{condition}</p>
          <p className="text-farm-green text-lg mt-6 text-center px-4 border-t pt-4 border-gray-100">{message}</p>
        </div>
      </div>
    </Card>
  );
};

export default CurrentWeather;
