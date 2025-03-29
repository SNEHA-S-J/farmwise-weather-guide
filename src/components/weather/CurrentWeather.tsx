
import { Volume2 } from "lucide-react";
import WeatherIcon from "./WeatherIcon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CurrentWeatherProps {
  temperature: number;
  condition: string;
  message: string;
}

const CurrentWeather = ({ temperature, condition, message }: CurrentWeatherProps) => {
  const handleReadAloud = () => {
    // To be implemented: Text-to-speech functionality
    console.log("Reading aloud:", `${temperature}°C, ${condition}. ${message}`);
  };

  return (
    <Card className="p-6 bg-white shadow-md rounded-xl">
      <div className="flex flex-col items-center">
        <div className="flex justify-end w-full">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center text-gray-600 hover:text-farm-green"
            onClick={handleReadAloud}
            aria-label="Read aloud"
          >
            <Volume2 size={20} className="mr-1" />
            <span className="text-sm">Read Aloud</span>
          </Button>
        </div>

        <div className="flex flex-col items-center mt-2">
          <WeatherIcon type={condition} size={80} />
          <h2 className="text-5xl font-bold mt-4">{temperature}°C</h2>
          <p className="text-gray-600 mt-2 text-center font-medium">{condition}</p>
          <p className="text-farm-green text-lg mt-4 text-center">{message}</p>
        </div>
      </div>
    </Card>
  );
};

export default CurrentWeather;
