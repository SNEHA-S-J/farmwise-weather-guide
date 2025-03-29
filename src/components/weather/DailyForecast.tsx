
import WeatherIcon from "./WeatherIcon";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import VoiceReader from "@/utils/VoiceReader";

interface ForecastDay {
  day: string;
  temperature: {
    high: number;
    low: number;
  };
  condition: string;
  message: string;
}

interface DailyForecastProps {
  forecast: ForecastDay[];
}

const DailyForecast = ({ forecast }: DailyForecastProps) => {
  // Only show first 5 days in the preview
  const previewForecast = forecast.slice(0, 5);
  const { t, language } = useLanguage();
  const voiceReader = VoiceReader.getInstance();
  
  const readDayForecast = (day: ForecastDay) => {
    const text = `${day.day}: ${day.temperature.high} degrees, ${day.condition}. ${day.message}`;
    voiceReader.speak(text, language);
  };
  
  return (
    <Card className="p-5 bg-white shadow-md rounded-xl mt-6">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold text-gray-800">{t("dayForecast")}</h3>
        <Link 
          to="/forecast" 
          className="flex items-center text-farm-green hover:text-farm-green/80 text-sm font-medium transition-colors group"
        >
          {t("viewAll")}
          <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {previewForecast.map((day, index) => (
          <Button 
            key={index} 
            variant="ghost"
            className="flex flex-col items-center p-3 rounded-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-sm h-auto"
            onClick={() => readDayForecast(day)}
          >
            <p className="text-sm font-medium mb-1">{day.day}</p>
            <WeatherIcon type={day.condition} size={36} className="my-2" aria-label={day.condition} />
            <div className="flex flex-col items-center mt-2">
              <p className="text-sm font-bold text-gray-800">{day.temperature.high}°</p>
              <p className="text-xs text-gray-500">{day.temperature.low}°</p>
            </div>
            <p className="text-xs text-gray-600 mt-2 text-center">{t(day.message.toLowerCase().replace(/\s/g, ""))}</p>
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default DailyForecast;
