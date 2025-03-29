
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

interface LanguageSelectorProps {
  onChange: (language: string) => void;
  currentLanguage: string;
}

const LanguageSelector = ({ onChange, currentLanguage }: LanguageSelectorProps) => {
  const languages: Language[] = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
    { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
    { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
    { code: "te", name: "Telugu", nativeName: "తెలుగు" },
    { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" }
  ];

  return (
    <div className="flex items-center">
      <Globe size={18} className="mr-2 text-gray-600" />
      <Select value={currentLanguage} onValueChange={onChange}>
        <SelectTrigger className="w-[120px] h-8 text-xs bg-white/80 hover:bg-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {languages.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              <span className="flex items-center">
                {language.nativeName} ({language.name})
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
