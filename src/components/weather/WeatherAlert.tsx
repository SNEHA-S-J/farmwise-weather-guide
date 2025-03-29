
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface WeatherAlertProps {
  count: number;
}

const WeatherAlert = ({ count }: WeatherAlertProps) => {
  return (
    <Card className={`p-5 mt-6 rounded-xl border transition-all duration-300 ${count > 0 
      ? 'bg-gradient-to-r from-farm-alert/15 to-farm-alert/5 border-farm-alert shadow-md' 
      : 'bg-gray-100 hover:bg-gray-50'}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`rounded-full p-2 mr-3 shadow-sm ${count > 0 
            ? 'bg-farm-alert animate-pulse' 
            : 'bg-gray-400'}`}
          >
            <AlertTriangle size={22} className="text-white" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Weather Alerts</h3>
            <p className={`text-sm mt-1 ${count > 0 
              ? 'text-farm-alert font-medium' 
              : 'text-gray-500'}`}
            >
              {count > 0 
                ? `${count} active alert${count > 1 ? 's' : ''}` 
                : 'No active alerts'}
            </p>
          </div>
        </div>
        <Button
          asChild
          variant={count > 0 ? "destructive" : "outline"}
          size="sm"
          className={count > 0 ? "hover:bg-farm-alert/90" : ""}
        >
          <Link to="/alerts" className="flex items-center">
            {count > 0 ? "View Alerts" : "Check Alerts"}
          </Link>
        </Button>
      </div>
    </Card>
  );
};

export default WeatherAlert;
