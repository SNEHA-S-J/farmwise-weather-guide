
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { TrendingUp, ChevronUp, ChevronDown, Calendar, AlertTriangle, BarChart2, Grain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StockAIAdvisor from "@/components/stock/StockAIAdvisor";

// Mock data for stock prices
const mockStockData = {
  rice: [
    { date: "2023-01", price: 42 },
    { date: "2023-02", price: 45 },
    { date: "2023-03", price: 50 },
    { date: "2023-04", price: 48 },
    { date: "2023-05", price: 52 },
    { date: "2023-06", price: 55 },
  ],
  wheat: [
    { date: "2023-01", price: 35 },
    { date: "2023-02", price: 38 },
    { date: "2023-03", price: 36 },
    { date: "2023-04", price: 40 },
    { date: "2023-05", price: 42 },
    { date: "2023-06", price: 44 },
  ],
  corn: [
    { date: "2023-01", price: 28 },
    { date: "2023-02", price: 30 },
    { date: "2023-03", price: 33 },
    { date: "2023-04", price: 34 },
    { date: "2023-05", price: 32 },
    { date: "2023-06", price: 35 },
  ],
  sugarcane: [
    { date: "2023-01", price: 22 },
    { date: "2023-02", price: 23 },
    { date: "2023-03", price: 25 },
    { date: "2023-04", price: 26 },
    { date: "2023-05", price: 24 },
    { date: "2023-06", price: 27 },
  ],
};

const Dashboard = () => {
  const [userName, setUserName] = useState("Farmer");
  const [userCrop, setUserCrop] = useState("rice");
  const [stockData, setStockData] = useState<{ date: string; price: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }

    // Load user data
    const storedName = localStorage.getItem("userName");
    const storedCrop = localStorage.getItem("userCrop");
    
    if (storedName) setUserName(storedName);
    if (storedCrop) setUserCrop(storedCrop);
    
    // Load stock data based on crop type
    const cropType = storedCrop || "rice";
    setStockData(mockStockData[cropType as keyof typeof mockStockData] || mockStockData.rice);
    
    setLoading(false);
  }, [navigate]);

  const currentPrice = stockData.length > 0 ? stockData[stockData.length - 1].price : 0;
  const previousPrice = stockData.length > 1 ? stockData[stockData.length - 2].price : 0;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = previousPrice > 0 ? (priceChange / previousPrice) * 100 : 0;
  const isPriceUp = priceChange >= 0;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {t("welcome")}, {userName}!
            </h1>
            <p className="text-muted-foreground">
              {t("cropStockDashboard")}
            </p>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <Button variant="outline" size="sm" className="mr-2">
              <Calendar className="mr-2 h-4 w-4" />
              {new Date().toLocaleDateString()}
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("currentPrice")}
              </CardTitle>
              <Grain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{currentPrice}</div>
              <p className="text-xs text-muted-foreground">
                {t("perQuintal")}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("priceChange")}
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold flex items-center ${isPriceUp ? 'text-green-600' : 'text-red-600'}`}>
                {isPriceUp ? <ChevronUp className="mr-1" /> : <ChevronDown className="mr-1" />}
                ₹{Math.abs(priceChange).toFixed(2)}
              </div>
              <p className={`text-xs ${isPriceUp ? 'text-green-600' : 'text-red-600'}`}>
                {isPriceUp ? '+' : '-'}{Math.abs(priceChangePercent).toFixed(2)}% {t("fromLast")}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("marketTrend")}
              </CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isPriceUp ? t("rising") : t("falling")}
              </div>
              <p className="text-xs text-muted-foreground">
                {isPriceUp ? t("goodTimeToSell") : t("considerHolding")}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("marketAlerts")}
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">
                {t("newPriceAlert")}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
            <TabsTrigger value="aiAdvisor">{t("aiAdvisor")}</TabsTrigger>
            <TabsTrigger value="marketNews">{t("marketNews")}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t("cropPriceHistory")}</CardTitle>
                <CardDescription>
                  {t("priceHistoryFor")} {t(userCrop)}
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                {/* Placeholder for chart - in real app would use Recharts */}
                <div className="h-[200px] w-full flex items-center justify-center border-2 border-dashed rounded-lg">
                  <div className="flex flex-col items-center justify-center space-y-2 text-center">
                    <BarChart2 className="h-8 w-8 text-muted-foreground" />
                    <p>{t("stockPriceChart")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="aiAdvisor">
            <StockAIAdvisor crop={userCrop} currentPrice={currentPrice} priceChange={priceChangePercent} />
          </TabsContent>
          
          <TabsContent value="marketNews">
            <Card>
              <CardHeader>
                <CardTitle>{t("latestMarketNews")}</CardTitle>
                <CardDescription>
                  {t("stayUpdated")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-medium">{t("governmentAnnouncesMSP")}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t("governmentAnnouncesDesc")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">2 {t("hoursAgo")}</p>
                </div>
                
                <div className="border-b pb-4">
                  <h3 className="font-medium">{t("weatherImpactsCrops")}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t("weatherImpactsDesc")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">5 {t("hoursAgo")}</p>
                </div>
                
                <div>
                  <h3 className="font-medium">{t("exportOpportunities")}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t("exportOpportunitiesDesc")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">1 {t("dayAgo")}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">{t("viewMore")}</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
