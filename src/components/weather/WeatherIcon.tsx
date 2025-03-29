
import { Cloud, CloudDrizzle, CloudLightning, CloudRain, CloudSnow, Sun, Wind } from "lucide-react";

interface WeatherIconProps {
  type: string;
  size?: number;
  className?: string;
}

const WeatherIcon = ({ type, size = 48, className = "" }: WeatherIconProps) => {
  const getIcon = () => {
    switch (type.toLowerCase()) {
      case "sunny":
      case "clear":
        return <Sun size={size} className="text-farm-yellow" />;
      case "cloudy":
      case "partly cloudy":
        return <Cloud size={size} className="text-gray-400" />;
      case "rain":
      case "rainy":
        return <CloudRain size={size} className="text-farm-sky" />;
      case "drizzle":
        return <CloudDrizzle size={size} className="text-farm-sky" />;
      case "thunderstorm":
      case "storm":
        return <CloudLightning size={size} className="text-farm-alert" />;
      case "snow":
      case "snowy":
        return <CloudSnow size={size} className="text-blue-200" />;
      case "windy":
        return <Wind size={size} className="text-gray-500" />;
      default:
        return <Sun size={size} className="text-farm-yellow" />;
    }
  };

  return <div className={className}>{getIcon()}</div>;
};

export default WeatherIcon;
