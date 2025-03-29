
import { Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";

interface TodayTipProps {
  tip: string;
}

const TodayTip = ({ tip }: TodayTipProps) => {
  return (
    <Card className="p-5 bg-gradient-to-r from-farm-green/10 to-farm-green/5 shadow-sm rounded-xl mt-6 border-l-4 border-farm-green transform transition-all duration-300 hover:shadow-md">
      <div className="flex items-start">
        <div className="bg-farm-green rounded-full p-2 mr-3 shadow-sm animate-pulse-slow">
          <Lightbulb size={24} className="text-white" />
        </div>
        <div>
          <h3 className="font-medium text-gray-800 mb-2">Today's Tip</h3>
          <p className="text-gray-700 leading-relaxed">{tip}</p>
        </div>
      </div>
    </Card>
  );
};

export default TodayTip;
