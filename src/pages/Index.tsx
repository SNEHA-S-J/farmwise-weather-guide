
import Layout from "@/components/layout/Layout";
import CurrentWeather from "@/components/weather/CurrentWeather";
import DailyForecast from "@/components/weather/DailyForecast";
import TodayTip from "@/components/weather/TodayTip";
import WeatherAlert from "@/components/weather/WeatherAlert";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  // Mock data - would come from API in a real app
  const currentWeather = {
    temperature: 22,
    condition: "sunny",
    message: "Good weather for planting today. Soil temperature ideal for corn seeds."
  };

  const forecastData = [
    { 
      day: "Today", 
      temperature: { high: 22, low: 15 }, 
      condition: "sunny", 
      message: "Ideal for planting corn" 
    },
    { 
      day: "Tue", 
      temperature: { high: 20, low: 13 }, 
      condition: "partly cloudy", 
      message: "Good for irrigation" 
    },
    { 
      day: "Wed", 
      temperature: { high: 18, low: 12 }, 
      condition: "cloudy", 
      message: "Possible light rain" 
    },
    { 
      day: "Thu", 
      temperature: { high: 17, low: 10 }, 
      condition: "rain", 
      message: "Not suitable for harvesting" 
    },
    { 
      day: "Fri", 
      temperature: { high: 16, low: 9 }, 
      condition: "rainy", 
      message: "Avoid outdoor work" 
    },
    { 
      day: "Sat", 
      temperature: { high: 15, low: 8 }, 
      condition: "drizzle", 
      message: "Light rain expected" 
    },
    { 
      day: "Sun", 
      temperature: { high: 19, low: 11 }, 
      condition: "partly cloudy", 
      message: "Good for field work" 
    }
  ];

  const todayTip = "Seeds planted today will benefit from upcoming warm temperatures. Make sure to water newly planted areas in the evening.";

  const alertCount = 0; // No active alerts

  return (
    <Layout>
      <div className="max-w-md mx-auto space-y-6">
        <CurrentWeather 
          temperature={currentWeather.temperature}
          condition={currentWeather.condition}
          message={currentWeather.message}
        />
        
        <DailyForecast forecast={forecastData} />
        
        <TodayTip tip={todayTip} />
        
        <WeatherAlert count={alertCount} />
      </div>
      <Toaster />
    </Layout>
  );
};

export default Index;
