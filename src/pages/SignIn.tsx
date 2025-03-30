
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { LogIn, KeyRound, BarChart2, Wheat, TrendingUp } from "lucide-react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock authentication - will be replaced with real auth
      setTimeout(() => {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userName", email.split('@')[0]); // Simple user name from email
        localStorage.setItem("userCrop", "rice"); // Default crop
        toast({
          title: t("loginSuccess"),
          description: t("welcomeBack"),
        });
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      toast({
        title: t("loginFailed"),
        description: t("invalidCredentials"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-8 py-10">
        <Card className="w-full md:w-1/2 max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
              <LogIn className="h-6 w-6" />
              {t("signIn")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  {t("email")}
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="farmers@example.com"
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">
                    {t("password")}
                  </label>
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    {t("forgotPassword")}
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full"
                  />
                  <KeyRound className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t("signingIn") : t("signIn")}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              {t("noAccount")}{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                {t("signUp")}
              </Link>
            </div>
          </CardFooter>
        </Card>
        
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5" />
              {t("stocksDashboardPreview")}
            </CardTitle>
            <CardDescription>
              {t("accessAfterSignin")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 grid-cols-2">
              <div className="border rounded-lg p-4 flex flex-col items-center">
                <TrendingUp className="h-10 w-10 text-green-500 mb-2" />
                <h3 className="font-medium text-center">{t("liveMarketPrices")}</h3>
                <p className="text-sm text-gray-500 text-center">{t("trackLivePrices")}</p>
              </div>
              <div className="border rounded-lg p-4 flex flex-col items-center">
                <Wheat className="h-10 w-10 text-amber-500 mb-2" />
                <h3 className="font-medium text-center">{t("cropTracking")}</h3>
                <p className="text-sm text-gray-500 text-center">{t("trackMultipleCrops")}</p>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">{t("recentMarketInsights")}</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>{t("ricePricesUp")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span>{t("wheatPricesDown")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>{t("newMSPAnnounced")}</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SignIn;
