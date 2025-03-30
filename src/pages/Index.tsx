import Layout from "@/components/layout/Layout";
import CurrentWeather from "@/components/weather/CurrentWeather";
import DailyForecast from "@/components/weather/DailyForecast";
import TodayTip from "@/components/weather/TodayTip";
import WeatherAlert from "@/components/weather/WeatherAlert";
import { Toaster } from "@/components/ui/toaster";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sprout } from "lucide-react";
import { useState } from "react";
import CropHealthDiagnosis from "@/components/crop/CropHealthDiagnosis";
import CustomAlerts from "@/components/weather/CustomAlerts";
import VoiceAssistant from "@/components/voice/VoiceAssistant";
import FarmerEducationHub from "@/components/education/FarmerEducationHub";

const Index = () => {
  const { t } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState("corn");
  
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
      message: "idealPlanting" 
    },
    { 
      day: "Tue", 
      temperature: { high: 20, low: 13 }, 
      condition: "partly cloudy", 
      message: "goodIrrigation" 
    },
    { 
      day: "Wed", 
      temperature: { high: 18, low: 12 }, 
      condition: "cloudy", 
      message: "possibleRain" 
    },
    { 
      day: "Thu", 
      temperature: { high: 17, low: 10 }, 
      condition: "rain", 
      message: "notSuitable" 
    },
    { 
      day: "Fri", 
      temperature: { high: 16, low: 9 }, 
      condition: "rainy", 
      message: "avoidWork" 
    },
    { 
      day: "Sat", 
      temperature: { high: 15, low: 8 }, 
      condition: "drizzle", 
      message: "lightRain" 
    },
    { 
      day: "Sun", 
      temperature: { high: 19, low: 11 }, 
      condition: "partly cloudy", 
      message: "fieldWork" 
    }
  ];

  const todayTip = "Seeds planted today will benefit from upcoming warm temperatures. Make sure to water newly planted areas in the evening.";

  const alertCount = 0; // No active alerts
  
  // Crop specific information
  const cropInfo = {
    corn: {
      image: "https://source.unsplash.com/featured/?corn,maize",
      currentStatus: "Perfect planting conditions for corn today with soil temperature at 20°C",
      wateringNeeds: "Medium watering needed",
      idealTemp: "18-24°C"
    },
    wheat: {
      image: "https://source.unsplash.com/featured/?wheat,farm",
      currentStatus: "Good growing conditions for wheat with current temperature",
      wateringNeeds: "Light watering needed",
      idealTemp: "15-21°C"
    },
    rice: {
      image: "https://source.unsplash.com/featured/?rice,paddy",
      currentStatus: "Maintain water levels in paddy fields, temperature is suitable",
      wateringNeeds: "High water levels needed",
      idealTemp: "20-30°C"
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <CurrentWeather 
              temperature={currentWeather.temperature}
              condition={currentWeather.condition}
              message={currentWeather.message}
            />
            
            <Card className="p-5 bg-white shadow-md rounded-xl">
              <div className="flex items-center mb-4">
                <div className="bg-farm-green p-2 rounded-full mr-3">
                  <Sprout className="text-white" size={20} />
                </div>
                <h2 className="font-bold text-lg">Current Crop Conditions</h2>
              </div>
              
              <Tabs defaultValue="corn" onValueChange={setSelectedCrop} value={selectedCrop}>
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="corn">{t("corn")}</TabsTrigger>
                  <TabsTrigger value="wheat">{t("wheat")}</TabsTrigger>
                  <TabsTrigger value="rice">{t("rice")}</TabsTrigger>
                </TabsList>
                
                {Object.entries(cropInfo).map(([crop, info]) => (
                  <TabsContent key={crop} value={crop} className="space-y-4">
                    <div className="overflow-hidden rounded-md">
                      <img 
                        src={info.image} 
                        alt={crop} 
                        className="w-full h-40 object-cover transition-transform hover:scale-105 duration-500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-gray-700">{info.currentStatus}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-blue-50 p-2 rounded">
                          <span className="font-semibold">Water: </span>
                          {info.wateringNeeds}
                        </div>
                        <div className="bg-yellow-50 p-2 rounded">
                          <span className="font-semibold">Ideal temp: </span>
                          {info.idealTemp}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </Card>
            
            <DailyForecast forecast={forecastData} />
          </div>
          
          <div className="space-y-6">
            <VoiceAssistant />
            
            <TodayTip tip={todayTip} />
            
            <CropHealthDiagnosis />
            
            <CustomAlerts />
            
            <WeatherAlert count={alertCount} />
          </div>
        </div>
        
        <FarmerEducationHub />
      </div>
      <Toaster />
    </Layout>
  );
};

export default Index;
