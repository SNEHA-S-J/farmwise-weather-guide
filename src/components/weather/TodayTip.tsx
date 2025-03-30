
import { Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
    <Card className="overflow-hidden bg-gradient-to-r from-farm-green/5 to-farm-green/10 shadow-md border-l-4 border-farm-green rounded-xl transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center space-x-2">
          <div className="bg-farm-green rounded-full p-2 shadow-sm flex-shrink-0">
            <Lightbulb size={20} className="text-white" />
          </div>
          <h3 className="font-medium text-gray-800">{t("todayTip")}</h3>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex flex-col space-y-2">
          <p className="text-gray-700 leading-relaxed break-words text-sm md:text-base">
            {tip}
          </p>
          <Button 
            variant="ghost" 
            size="sm"
            className="self-start text-farm-green hover:text-farm-green/80 hover:bg-farm-green/10 -ml-2 mt-1"
            onClick={readTip}
          >
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-4 h-4 mr-1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
              Listen
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodayTip;
