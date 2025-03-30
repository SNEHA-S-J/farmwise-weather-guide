
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Book, PlayCircle, FileText, ExternalLink } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface EducationItem {
  id: string;
  title: string;
  type: "article" | "video" | "guide";
  duration: string;
  description: string;
  thumbnail?: string;
}

const FarmerEducationHub = () => {
  const [educationType, setEducationType] = useState<string>("articles");
  
  const educationItems: Record<string, EducationItem[]> = {
    articles: [
      {
        id: "a1",
        title: "Understanding Soil Health for Better Crop Yields",
        type: "article",
        duration: "5 min read",
        description: "Learn how soil health directly impacts your crop yields and simple techniques to improve your soil quality.",
      },
      {
        id: "a2",
        title: "Climate-Smart Farming Practices",
        type: "article",
        duration: "8 min read",
        description: "Adapt your farming techniques to changing climate conditions and reduce risks to your crops.",
        thumbnail: "https://source.unsplash.com/featured/?farming,climate"
      },
      {
        id: "a3",
        title: "Maximizing Profits with Strategic Crop Selection",
        type: "article",
        duration: "6 min read",
        description: "How to choose the right crops based on market demand, climate conditions, and your farm's capabilities.",
      }
    ],
    videos: [
      {
        id: "v1",
        title: "Modern Irrigation Techniques",
        type: "video",
        duration: "12 min",
        description: "A comprehensive guide to water-efficient irrigation systems for small and medium farms.",
        thumbnail: "https://source.unsplash.com/featured/?irrigation,farming"
      },
      {
        id: "v2",
        title: "Pest Management Without Chemicals",
        type: "video",
        duration: "15 min",
        description: "Learn organic methods to control common pests that affect corn, wheat, and rice crops.",
        thumbnail: "https://source.unsplash.com/featured/?organic,farm"
      }
    ],
    guides: [
      {
        id: "g1",
        title: "Seasonal Planting Calendar",
        type: "guide",
        duration: "Reference",
        description: "Month-by-month guide for when to plant and harvest different crops in your region.",
      },
      {
        id: "g2",
        title: "Farm Equipment Maintenance",
        type: "guide",
        duration: "Reference",
        description: "Preventive maintenance schedules and troubleshooting tips for common farm equipment.",
      },
      {
        id: "g3",
        title: "Government Subsidy Programs for Farmers",
        type: "guide",
        duration: "Reference",
        description: "Comprehensive list of available subsidies, eligibility criteria, and application processes.",
      }
    ]
  };
  
  const getIcon = (type: string) => {
    switch (type) {
      case "article":
        return <FileText size={16} className="mr-2" />;
      case "video":
        return <PlayCircle size={16} className="mr-2" />;
      case "guide":
        return <Book size={16} className="mr-2" />;
      default:
        return <FileText size={16} className="mr-2" />;
    }
  };
  
  return (
    <Card className="p-5 bg-white shadow-md rounded-xl">
      <div className="flex items-center mb-4">
        <div className="bg-farm-green p-2 rounded-full mr-3">
          <Book className="text-white" size={20} />
        </div>
        <h2 className="font-bold text-lg">Farmer Education Hub</h2>
      </div>
      
      <Tabs value={educationType} onValueChange={setEducationType} className="space-y-4">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
        </TabsList>
        
        {Object.entries(educationItems).map(([type, items]) => (
          <TabsContent key={type} value={type} className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                {item.thumbnail && (
                  <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className="w-full h-32 object-cover"
                  />
                )}
                <div className="p-4">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    {getIcon(item.type)}
                    <span>{item.duration}</span>
                  </div>
                  <h3 className="font-medium mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  <Button variant="outline" size="sm" className="w-full flex justify-center items-center">
                    {item.type === 'video' ? 'Watch Video' : 'Read More'}
                    <ExternalLink size={14} className="ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
};

export default FarmerEducationHub;
