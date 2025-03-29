
import { Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";

interface TodayTipProps {
  tip: string;
}

const TodayTip = ({ tip }: TodayTipProps) => {
  return (
    <Card className="p-4 bg-farm-green/10 shadow-sm rounded-xl mt-6">
      <div className="flex items-start">
        <div className="bg-farm-green rounded-full p-2 mr-3">
          <Lightbulb size={20} className="text-white" />
        </div>
        <div>
          <h3 className="font-medium text-gray-800 mb-1">Today's Tip</h3>
          <p className="text-gray-700">{tip}</p>
        </div>
      </div>
    </Card>
  );
};

export default TodayTip;
