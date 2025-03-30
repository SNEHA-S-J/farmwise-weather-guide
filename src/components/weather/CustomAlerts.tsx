
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BellRing, Plus, X, Check, Bell } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface AlertItem {
  id: string;
  type: string;
  condition: string;
  value: number;
  active: boolean;
}

const CustomAlerts = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: "1",
      type: "temperature",
      condition: "above",
      value: 35,
      active: true
    },
    {
      id: "2",
      type: "rainfall",
      condition: "above",
      value: 50,
      active: true
    }
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAlert, setNewAlert] = useState<Omit<AlertItem, "id">>({
    type: "temperature",
    condition: "above",
    value: 30,
    active: true
  });

  const handleAddAlert = () => {
    const id = Date.now().toString();
    setAlerts([...alerts, { ...newAlert, id }]);
    setIsDialogOpen(false);
    
    toast({
      title: "Alert Added",
      description: `You will be notified when ${newAlert.type} is ${newAlert.condition} ${newAlert.value}${getUnitByType(newAlert.type)}`,
    });
  };

  const handleRemoveAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    
    toast({
      title: "Alert Removed",
      description: "The alert has been removed from your notifications",
    });
  };

  const handleToggleAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, active: !alert.active } : alert
    ));
  };

  const getUnitByType = (type: string): string => {
    switch (type) {
      case "temperature":
        return "°C";
      case "rainfall":
        return "mm";
      case "humidity":
        return "%";
      case "windSpeed":
        return "km/h";
      case "price":
        return "₹";
      default:
        return "";
    }
  };

  const getAlertLabel = (alert: AlertItem): string => {
    return `${alert.type.charAt(0).toUpperCase() + alert.type.slice(1)} ${alert.condition} ${alert.value}${getUnitByType(alert.type)}`;
  };

  return (
    <Card className="p-5 bg-white shadow-md rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-farm-green p-2 rounded-full mr-3">
            <BellRing className="text-white" size={20} />
          </div>
          <h2 className="font-bold text-lg">Customized Alerts</h2>
        </div>
        
        <Button 
          onClick={() => setIsDialogOpen(true)}
          className="bg-farm-green hover:bg-farm-green/80"
          size="sm"
        >
          <Plus size={16} className="mr-1" />
          New Alert
        </Button>
      </div>
      
      {alerts.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          <Bell size={40} className="mx-auto text-gray-300 mb-2" />
          <p>No alerts set up yet</p>
          <p className="text-sm">Add an alert to get notified about important changes</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {alerts.map((alert) => (
            <li key={alert.id} className="flex items-center justify-between border rounded-lg p-3 bg-gray-50">
              <div className="flex items-center">
                <Switch 
                  checked={alert.active}
                  onCheckedChange={() => handleToggleAlert(alert.id)}
                  className="mr-2"
                />
                <span className={alert.active ? "text-gray-800" : "text-gray-400"}>
                  {getAlertLabel(alert)}
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleRemoveAlert(alert.id)}
                className="h-8 w-8 p-0"
              >
                <X size={16} />
              </Button>
            </li>
          ))}
        </ul>
      )}
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Alert</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 items-center">
              <span className="text-sm font-medium">Alert Type</span>
              <Select 
                value={newAlert.type}
                onValueChange={(value) => setNewAlert({...newAlert, type: value})}
                className="col-span-2"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="temperature">Temperature</SelectItem>
                  <SelectItem value="rainfall">Rainfall</SelectItem>
                  <SelectItem value="humidity">Humidity</SelectItem>
                  <SelectItem value="windSpeed">Wind Speed</SelectItem>
                  <SelectItem value="price">Crop Price</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-3 items-center">
              <span className="text-sm font-medium">Condition</span>
              <Select 
                value={newAlert.condition}
                onValueChange={(value) => setNewAlert({...newAlert, condition: value})}
                className="col-span-2"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="above">Above</SelectItem>
                  <SelectItem value="below">Below</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-3 items-center">
              <span className="text-sm font-medium">Value</span>
              <div className="col-span-2 relative">
                <Input 
                  type="number"
                  value={newAlert.value}
                  onChange={(e) => setNewAlert({...newAlert, value: parseFloat(e.target.value)})}
                />
                <span className="absolute right-3 top-2 text-gray-400">
                  {getUnitByType(newAlert.type)}
                </span>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddAlert} className="bg-farm-green hover:bg-farm-green/80">
              <Check size={16} className="mr-1" />
              Add Alert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default CustomAlerts;
