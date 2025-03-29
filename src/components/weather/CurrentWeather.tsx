
import { Volume2 } from "lucide-react";
import WeatherIcon from "./WeatherIcon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface CurrentWeatherProps {
  temperature: number;
  condition: string;
  message: string;
}

const CurrentWeather = ({ temperature, condition, message }: CurrentWeatherProps) => {
  const { toast } = useToast();

  const handleReadAloud = () => {
    // To be implemented: Text-to-speech functionality
    console.log("Reading aloud:", `${temperature}°C, ${condition}. ${message}`);
    toast({
      title: "Reading Aloud",
      description: "Reading weather information aloud...",
      duration: 2000,
    });
  };

  return (
    <Card className="p-6 bg-white shadow-md rounded-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-farm-green via-farm-sky to-farm-yellow"></div>
      
      <div className="flex flex-col items-center">
        <div className="flex justify-end w-full">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center text-gray-600 hover:text-farm-green transition-all duration-300"
            onClick={handleReadAloud}
            aria-label="Read aloud"
          >
            <Volume2 size={20} className="mr-1 animate-pulse-slow" />
            <span className="text-sm">Read Aloud</span>
          </Button>
        </div>

        <div className="flex flex-col items-center mt-2 transform transition-all duration-300 hover:scale-105">
          <WeatherIcon type={condition} size={96} />
          <h2 className="text-6xl font-bold mt-4 text-gray-800">{temperature}°C</h2>
          <p className="text-gray-600 mt-2 text-center font-medium capitalize">{condition}</p>
          <p className="text-farm-green text-lg mt-6 text-center px-4 border-t pt-4 border-gray-100">{message}</p>
        </div>
      </div>
    </Card>
  );
};

export default CurrentWeather;
