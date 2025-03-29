
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Mail, KeyRound, User, MapPin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [region, setRegion] = useState("");
  const [cropType, setCropType] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: t("passwordMismatch"),
        description: t("passwordsMustMatch"),
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);

    try {
      // Mock registration - will be replaced with real auth
      setTimeout(() => {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userName", name);
        localStorage.setItem("userRegion", region);
        localStorage.setItem("userCrop", cropType);
        
        toast({
          title: t("signupSuccess"),
          description: t("accountCreated"),
        });
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      toast({
        title: t("signupFailed"),
        description: t("pleaseRetry"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center py-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
              <UserPlus className="h-6 w-6" />
              {t("signUp")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  {t("fullName")}
                </label>
                <div className="relative">
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("enterFullName")}
                    required
                    className="w-full"
                  />
                  <User className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  {t("email")}
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="farmers@example.com"
                    required
                    className="w-full"
                  />
                  <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="region" className="text-sm font-medium">
                    {t("region")}
                  </label>
                  <div className="relative">
                    <Select value={region} onValueChange={setRegion}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("selectRegion")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="north">North</SelectItem>
                        <SelectItem value="south">South</SelectItem>
                        <SelectItem value="east">East</SelectItem>
                        <SelectItem value="west">West</SelectItem>
                        <SelectItem value="central">Central</SelectItem>
                      </SelectContent>
                    </Select>
                    <MapPin className="absolute right-10 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="cropType" className="text-sm font-medium">
                    {t("primaryCrop")}
                  </label>
                  <Select value={cropType} onValueChange={setCropType}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("selectCrop")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="corn">Corn</SelectItem>
                      <SelectItem value="sugarcane">Sugarcane</SelectItem>
                      <SelectItem value="cotton">Cotton</SelectItem>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  {t("password")}
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full"
                    minLength={8}
                  />
                  <KeyRound className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  {t("confirmPassword")}
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full"
                    minLength={8}
                  />
                  <KeyRound className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t("creatingAccount") : t("createAccount")}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center text-sm">
            {t("alreadyHaveAccount")}{" "}
            <Link to="/signin" className="text-blue-600 hover:underline">
              {t("signIn")}
            </Link>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default SignUp;
