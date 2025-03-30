
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Upload, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import VoiceReader from "@/utils/VoiceReader";

const CropHealthDiagnosis = () => {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [treatment, setTreatment] = useState<string | null>(null);
  const voiceReader = VoiceReader.getInstance();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.includes('image')) {
        toast({
          title: "Error",
          description: "Please upload an image file",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
          analyzeCropHealth(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const takePicture = () => {
    toast({
      title: "Camera Access",
      description: "Please allow camera access to take a picture",
    });
    // In a real implementation, this would use the WebRTC API to access the camera
  };

  const analyzeCropHealth = (imageData: string) => {
    setAnalyzing(true);
    setDiagnosis(null);
    setTreatment(null);
    
    // Simulate AI analysis with a timeout
    setTimeout(() => {
      const mockDiagnoses = [
        "Your corn crop appears to have early signs of Northern Corn Leaf Blight, visible as long, elliptical tan lesions on the leaves.",
        "The wheat plants show symptoms of powdery mildew, characterized by the white powdery patches on the leaves.",
        "Your rice crop appears healthy with no visible signs of disease or pest damage.",
        "The crop shows signs of nutrient deficiency, likely potassium deficiency based on the yellowing leaf edges."
      ];
      
      const mockTreatments = [
        "Apply a copper-based fungicide treatment at a rate of 2.5ml per liter of water. Ensure even coverage across affected areas. Consider crop rotation for next season.",
        "Increase spacing between plants to improve air circulation. Apply neem oil solution (5ml per liter) early morning or late evening. Monitor humidity levels in your field.",
        "Continue your current management practices. Consider soil testing to optimize fertilization for the next growing season.",
        "Apply potassium-rich fertilizer at a rate of 50kg per hectare. Foliar application of 2% potassium sulfate solution can provide faster relief for affected plants."
      ];
      
      const randomIndex = Math.floor(Math.random() * mockDiagnoses.length);
      setDiagnosis(mockDiagnoses[randomIndex]);
      setTreatment(mockTreatments[randomIndex]);
      setAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: "Crop health diagnosis is ready",
      });
    }, 3000);
  };

  const readAnalysisAloud = () => {
    if (diagnosis && treatment) {
      const textToRead = `${diagnosis} ${treatment}`;
      voiceReader.speak(textToRead, language);
    }
  };

  const resetAnalysis = () => {
    setImage(null);
    setDiagnosis(null);
    setTreatment(null);
  };

  return (
    <Card className="p-5 bg-white shadow-md rounded-xl">
      <div className="flex items-center mb-4">
        <div className="bg-farm-green p-2 rounded-full mr-3">
          <Camera className="text-white" size={20} />
        </div>
        <h2 className="font-bold text-lg">AI Crop Health Diagnosis</h2>
      </div>

      {!image ? (
        <div className="flex flex-col space-y-4 items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg">
          <p className="text-gray-500 text-center">Upload a photo of your crop to analyze for diseases, pests, and nutrient deficiencies</p>
          
          <div className="flex space-x-4">
            <Button onClick={takePicture} className="bg-farm-green hover:bg-farm-green/80" size="sm">
              <Camera size={18} className="mr-2" />
              Take Photo
            </Button>
            
            <Button variant="outline" size="sm" className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload size={18} className="mr-2" />
              Upload Image
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <img 
              src={image}
              alt="Crop image"
              className="w-full h-48 object-cover rounded-lg"
            />
            <Button 
              variant="outline" 
              size="sm" 
              className="absolute top-2 right-2 bg-white" 
              onClick={resetAnalysis}
            >
              Reset
            </Button>
          </div>
          
          {analyzing ? (
            <div className="flex flex-col items-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-farm-green"></div>
              <p className="mt-2 text-sm text-gray-500">Analyzing crop health...</p>
            </div>
          ) : diagnosis && treatment ? (
            <div className="space-y-3">
              <div className="bg-amber-50 p-3 rounded-lg">
                <h3 className="font-medium text-amber-800 flex items-center">
                  <AlertTriangle size={16} className="mr-2" />
                  Diagnosis
                </h3>
                <p className="text-gray-700 mt-1">{diagnosis}</p>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg">
                <h3 className="font-medium text-blue-800">Recommended Treatment</h3>
                <p className="text-gray-700 mt-1">{treatment}</p>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full flex items-center justify-center" 
                onClick={readAnalysisAloud}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                Read Analysis Aloud
              </Button>
            </div>
          ) : null}
        </div>
      )}
    </Card>
  );
};

export default CropHealthDiagnosis;
