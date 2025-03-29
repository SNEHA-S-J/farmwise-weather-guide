
import { Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import VoiceReader from "@/utils/VoiceReader";

interface TodayTipProps {
  tip: string;
}

const TodayTip = ({ tip }: TodayTipProps) => {
  const { t, language } = useLanguage();
  const voiceReader = VoiceReader.getInstance();
  
  const readTip = () => {
    voiceReader.speak(tip, language);
  };
  
  return (
    <Card className="p-5 bg-gradient-to-r from-farm-green/10 to-farm-green/5 shadow-sm rounded-xl mt-6 border-l-4 border-farm-green transform transition-all duration-300 hover:shadow-md">
      <Button 
        variant="ghost" 
        className="w-full p-0 h-auto flex items-start justify-start hover:bg-transparent"
        onClick={readTip}
      >
        <div className="flex items-start w-full">
          <div className="bg-farm-green rounded-full p-2 mr-3 shadow-sm animate-pulse-slow">
            <Lightbulb size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-2">{t("todayTip")}</h3>
            <p className="text-gray-700 leading-relaxed">{tip}</p>
          </div>
        </div>
      </Button>
    </Card>
  );
};

export default TodayTip;
