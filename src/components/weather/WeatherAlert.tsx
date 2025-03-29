
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface WeatherAlertProps {
  count: number;
}

const WeatherAlert = ({ count }: WeatherAlertProps) => {
  return (
    <Card className={`p-4 mt-6 rounded-xl ${count > 0 ? 'bg-farm-alert/10' : 'bg-gray-100'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`rounded-full p-2 mr-3 ${count > 0 ? 'bg-farm-alert' : 'bg-gray-400'}`}>
            <AlertTriangle size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Weather Alerts</h3>
            <p className={`text-sm ${count > 0 ? 'text-farm-alert' : 'text-gray-500'}`}>
              {count > 0 ? `${count} active alert${count > 1 ? 's' : ''}` : 'No active alerts'}
            </p>
          </div>
        </div>
        <Button
          asChild
          variant={count > 0 ? "destructive" : "outline"}
          size="sm"
        >
          <Link to="/alerts">View</Link>
        </Button>
      </div>
    </Card>
  );
};

export default WeatherAlert;
