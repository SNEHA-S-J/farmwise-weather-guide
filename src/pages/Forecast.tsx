
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import WeatherIcon from "@/components/weather/WeatherIcon";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";

const Forecast = () => {
  // Mock forecast data
  const forecastData = [
    { 
      day: "Today", 
      date: "Oct 15",
      temperature: { high: 22, low: 15 }, 
      condition: "sunny", 
      message: "Ideal for planting corn",
      details: {
        humidity: "45%",
        wind: "5 km/h",
        rain: "0 mm",
        sunrise: "6:30",
        sunset: "18:15"
      }
    },
    { 
      day: "Tue", 
      date: "Oct 16",
      temperature: { high: 20, low: 13 }, 
      condition: "partly cloudy", 
      message: "Good for irrigation",
      details: {
        humidity: "50%",
        wind: "10 km/h",
        rain: "0 mm",
        sunrise: "6:31",
        sunset: "18:13"
      }
    },
    { 
      day: "Wed", 
      date: "Oct 17",
      temperature: { high: 18, low: 12 }, 
      condition: "cloudy", 
      message: "Possible light rain",
      details: {
        humidity: "60%",
        wind: "12 km/h",
        rain: "2 mm",
        sunrise: "6:32",
        sunset: "18:12"
      }
    },
    { 
      day: "Thu", 
      date: "Oct 18",
      temperature: { high: 17, low: 10 }, 
      condition: "rain", 
      message: "Not suitable for harvesting",
      details: {
        humidity: "75%",
        wind: "15 km/h",
        rain: "8 mm",
        sunrise: "6:33",
        sunset: "18:10"
      }
    },
    { 
      day: "Fri", 
      date: "Oct 19",
      temperature: { high: 16, low: 9 }, 
      condition: "rainy", 
      message: "Avoid outdoor work",
      details: {
        humidity: "80%",
        wind: "20 km/h",
        rain: "15 mm",
        sunrise: "6:34",
        sunset: "18:09"
      }
    },
    { 
      day: "Sat", 
      date: "Oct 20",
      temperature: { high: 15, low: 8 }, 
      condition: "drizzle", 
      message: "Light rain expected",
      details: {
        humidity: "70%",
        wind: "8 km/h",
        rain: "5 mm",
        sunrise: "6:35",
        sunset: "18:08"
      }
    },
    { 
      day: "Sun", 
      date: "Oct 21",
      temperature: { high: 19, low: 11 }, 
      condition: "partly cloudy", 
      message: "Good for field work",
      details: {
        humidity: "55%",
        wind: "7 km/h",
        rain: "0 mm",
        sunrise: "6:36",
        sunset: "18:06"
      }
    }
  ];

  const [selectedDay, setSelectedDay] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const handlePrevDay = () => {
    setSelectedDay((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextDay = () => {
    setSelectedDay((prev) => (prev < forecastData.length - 1 ? prev + 1 : prev));
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const selected = forecastData[selectedDay];

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">7-Day Forecast</h1>
        
        <div className="flex overflow-x-auto pb-2 mb-6 hide-scrollbar">
          {forecastData.map((day, index) => (
            <button 
              key={index}
              className={`flex-shrink-0 w-20 flex flex-col items-center p-3 rounded-lg mx-1 ${
                index === selectedDay ? 'bg-farm-green text-white' : 'bg-white text-gray-700'
              }`}
              onClick={() => setSelectedDay(index)}
            >
              <span className="text-sm font-medium">{day.day}</span>
              <WeatherIcon type={day.condition} size={28} className="my-2" />
              <span className="text-sm font-bold">{day.temperature.high}°</span>
            </button>
          ))}
        </div>

        <Card className="bg-white p-6 shadow-md rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handlePrevDay} 
              disabled={selectedDay === 0}
            >
              <ChevronLeft size={24} />
            </Button>
            <div className="text-center">
              <h2 className="text-xl font-bold">{selected.day}</h2>
              <p className="text-sm text-gray-500">{selected.date}</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleNextDay}
              disabled={selectedDay === forecastData.length - 1}
            >
              <ChevronRight size={24} />
            </Button>
          </div>

          <div className="flex flex-col items-center mt-4">
            <WeatherIcon type={selected.condition} size={72} />
            <h3 className="text-4xl font-bold mt-4">{selected.temperature.high}°C</h3>
            <p className="text-gray-500 text-sm">Low: {selected.temperature.low}°C</p>
            <p className="text-farm-green text-lg mt-3 text-center">{selected.message}</p>
            
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={toggleDetails}
            >
              {showDetails ? "Hide Details" : "Show Details"}
            </Button>
            
            {showDetails && (
              <div className="w-full mt-4 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Humidity</p>
                  <p className="font-medium">{selected.details.humidity}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Wind</p>
                  <p className="font-medium">{selected.details.wind}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Rain</p>
                  <p className="font-medium">{selected.details.rain}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Sunrise / Sunset</p>
                  <p className="font-medium">{selected.details.sunrise} / {selected.details.sunset}</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Forecast;
