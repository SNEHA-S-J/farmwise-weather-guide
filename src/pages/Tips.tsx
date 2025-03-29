
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WeatherIcon from "@/components/weather/WeatherIcon";
import { Lightbulb, Sprout } from "lucide-react";

const Tips = () => {
  const [selectedCrop, setSelectedCrop] = useState("corn");
  
  // Mock data for crop tips
  const cropTips = {
    corn: {
      planting: [
        "Plant when soil temperature reaches 60°F (16°C)",
        "Space seeds 6-8 inches apart in rows 30-36 inches apart",
        "Plant 1-2 inches deep in moist soil"
      ],
      care: [
        "Water regularly, especially during tasseling",
        "Apply nitrogen fertilizer when plants are knee-high",
        "Control weeds early in the season to prevent competition"
      ],
      harvest: [
        "Sweet corn is ready when kernels are plump and milky",
        "Field corn should be left to dry on the stalk if possible",
        "Ideal moisture content for harvesting is 23-25%"
      ]
    },
    wheat: {
      planting: [
        "Plant winter wheat in fall, 6-8 weeks before first frost",
        "Spring wheat should be planted as early as soil can be worked",
        "Plant 1-1.5 inches deep in heavier soils, 2 inches in lighter soils"
      ],
      care: [
        "Apply nitrogen fertilizer in early spring for winter wheat",
        "Control weeds before they compete with young plants",
        "Scout regularly for pests and diseases"
      ],
      harvest: [
        "Harvest when grain moisture is 13-14%",
        "The heads should be fully golden and dry",
        "Kernels should be firm and not dent easily with thumbnail pressure"
      ]
    },
    rice: {
      planting: [
        "Start when soil temperature is at least 65°F (18°C)",
        "Pre-germinate seeds in water for 24-36 hours before planting",
        "Plant in flooded fields with 2-4 inches of water"
      ],
      care: [
        "Maintain consistent water levels throughout growing season",
        "Apply nitrogen fertilizer before flooding and at tillering stage",
        "Check water quality regularly and maintain proper pH"
      ],
      harvest: [
        "Harvest when 80-85% of grains are straw-colored",
        "Drain fields 2-3 weeks before anticipated harvest",
        "Moisture content should be around 20-25% at harvest"
      ]
    }
  };
  
  // Mock data for weather-based tips
  const weatherTips = {
    sunny: [
      "Great day for harvesting dry crops",
      "Good time for soil preparation and tilling",
      "Remember to check soil moisture and water if needed",
      "Avoid spraying pesticides in high heat to prevent leaf burn"
    ],
    cloudy: [
      "Good conditions for transplanting seedlings",
      "Ideal for applying fertilizers",
      "Check for pest activity which may increase in cloudy weather",
      "Good time for light pruning work"
    ],
    rainy: [
      "Delay harvesting to avoid crop damage",
      "Avoid working wet soil to prevent compaction",
      "Check fields for proper drainage",
      "Good time to plan indoor farming activities"
    ]
  };
  
  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Farming Tips</h1>
        
        <Card className="p-4 mb-6">
          <div className="flex items-center mb-4">
            <div className="bg-farm-green p-2 rounded-full mr-3">
              <Sprout className="text-white" size={20} />
            </div>
            <h2 className="font-bold text-lg">Crop-Specific Tips</h2>
          </div>
          
          <div className="mb-4">
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a crop" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="corn">Corn</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="rice">Rice</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <Tabs defaultValue="planting">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="planting">Planting</TabsTrigger>
              <TabsTrigger value="care">Care</TabsTrigger>
              <TabsTrigger value="harvest">Harvest</TabsTrigger>
            </TabsList>
            {["planting", "care", "harvest"].map((phase) => (
              <TabsContent key={phase} value={phase}>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  {cropTips[selectedCrop as keyof typeof cropTips][phase as keyof typeof cropTips.corn].map((tip, index) => (
                    <li key={index} className="text-gray-700">{tip}</li>
                  ))}
                </ul>
              </TabsContent>
            ))}
          </Tabs>
        </Card>

        <Card className="p-4">
          <div className="flex items-center mb-4">
            <div className="bg-farm-yellow p-2 rounded-full mr-3">
              <Lightbulb className="text-white" size={20} />
            </div>
            <h2 className="font-bold text-lg">Weather-Based Tips</h2>
          </div>
          
          <div className="space-y-4">
            {Object.entries(weatherTips).map(([weather, tips]) => (
              <div key={weather} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <WeatherIcon type={weather} size={24} className="mr-2" />
                  <h3 className="font-medium capitalize">{weather} Weather</h3>
                </div>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  {tips.map((tip, index) => (
                    <li key={index} className="text-sm text-gray-700">{tip}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Tips;
