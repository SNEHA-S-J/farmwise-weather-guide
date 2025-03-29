
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { AlertTriangle, ThermometerSnowflake, CloudRain, Wind } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Alerts = () => {
  // Mock alerts data
  const alertsData = [
    {
      id: 1,
      type: "storm",
      title: "Storm Alert",
      message: "Storm expected tomorrow. Secure equipment and livestock.",
      date: "Oct 16, 2023",
      severity: "high",
      color: "bg-farm-alert"
    },
    {
      id: 2,
      type: "frost",
      title: "Frost Warning",
      message: "Frost expected tonight. Cover sensitive crops.",
      date: "Oct 15, 2023",
      severity: "medium",
      color: "bg-blue-500"
    }
  ];
  
  // Alert notification settings
  const [alertSettings, setAlertSettings] = useState({
    rainAlerts: true,
    frostAlerts: true,
    windAlerts: false,
  });
  
  const handleSettingChange = (setting: keyof typeof alertSettings) => {
    setAlertSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "storm":
        return <AlertTriangle className="text-white" size={24} />;
      case "frost":
        return <ThermometerSnowflake className="text-white" size={24} />;
      case "rain":
        return <CloudRain className="text-white" size={24} />;
      case "wind":
        return <Wind className="text-white" size={24} />;
      default:
        return <AlertTriangle className="text-white" size={24} />;
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Weather Alerts</h1>

        <div className="space-y-4 mb-8">
          {alertsData.length > 0 ? (
            alertsData.map((alert) => (
              <Card key={alert.id} className="overflow-hidden border-l-4 border-l-red-600">
                <div className="p-4">
                  <div className="flex items-center">
                    <div className={`${alert.color} p-2 rounded-full mr-3`}>
                      {getAlertIcon(alert.type)}
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">{alert.title}</h2>
                      <p className="text-sm text-gray-500">{alert.date}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-700">{alert.message}</p>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-6 text-center">
              <p className="text-gray-500">No active weather alerts</p>
            </Card>
          )}
        </div>

        <h2 className="text-xl font-bold mt-8 mb-4">Alert Settings</h2>
        <Card className="p-4">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-farm-sky p-2 rounded-full">
                  <CloudRain className="text-white" size={20} />
                </div>
                <Label htmlFor="rain-alerts">Rain alerts</Label>
              </div>
              <Switch 
                id="rain-alerts" 
                checked={alertSettings.rainAlerts}
                onCheckedChange={() => handleSettingChange('rainAlerts')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500 p-2 rounded-full">
                  <ThermometerSnowflake className="text-white" size={20} />
                </div>
                <Label htmlFor="frost-alerts">Frost warnings</Label>
              </div>
              <Switch 
                id="frost-alerts" 
                checked={alertSettings.frostAlerts}
                onCheckedChange={() => handleSettingChange('frostAlerts')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-gray-500 p-2 rounded-full">
                  <Wind className="text-white" size={20} />
                </div>
                <Label htmlFor="wind-alerts">Strong wind alerts</Label>
              </div>
              <Switch 
                id="wind-alerts" 
                checked={alertSettings.windAlerts}
                onCheckedChange={() => handleSettingChange('windAlerts')}
              />
            </div>
          </div>
          
          <Button className="w-full mt-6">Save Settings</Button>
        </Card>
      </div>
    </Layout>
  );
};

export default Alerts;
