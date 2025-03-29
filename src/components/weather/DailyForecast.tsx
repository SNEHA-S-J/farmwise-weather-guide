
import WeatherIcon from "./WeatherIcon";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

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
  
  return (
    <Card className="p-4 bg-white shadow-md rounded-xl mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">7-Day Forecast</h3>
        <Link 
          to="/forecast" 
          className="flex items-center text-farm-green text-sm font-medium"
        >
          View All
          <ChevronRight size={16} className="ml-1" />
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {previewForecast.map((day, index) => (
          <div key={index} className="flex flex-col items-center">
            <p className="text-sm font-medium mb-1">{day.day}</p>
            <WeatherIcon type={day.condition} size={32} />
            <div className="flex flex-col items-center mt-2">
              <p className="text-sm font-bold">{day.temperature.high}°</p>
              <p className="text-xs text-gray-500">{day.temperature.low}°</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DailyForecast;
