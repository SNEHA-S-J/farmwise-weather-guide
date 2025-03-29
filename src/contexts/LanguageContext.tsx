
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

// Define the translations type
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Define the context type
interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

// Translations object
const translations: Translations = {
  currentWeather: {
    en: "Current Weather",
    hi: "मौजूदा मौसम",
    ta: "தற்போதைய வானிலை",
    ml: "നിലവിലെ കാലാവസ്ഥ",
    te: "ప్రస్తుత వాతావరణం",
    gu: "હાલનું હવામાન"
  },
  readAloud: {
    en: "Read Aloud",
    hi: "जोर से पढ़ें",
    ta: "சத்தமாக வாசிக்கவும்",
    ml: "ഉറക്കെ വായിക്കുക",
    te: "బిగ్గరగా చదవండి",
    gu: "મોટેથી વાંચો"
  },
  dayForecast: {
    en: "7-Day Forecast",
    hi: "7 दिन का पूर्वानुमान",
    ta: "7 நாள் முன்னறிவிப்பு",
    ml: "7 ദിവസത്തെ പ്രവചനം",
    te: "7 రోజుల ముందస్తు అంచనా",
    gu: "7-દિવસનું પૂર્વાનુમાન"
  },
  viewAll: {
    en: "View All",
    hi: "सभी देखें",
    ta: "அனைத்தையும் காட்டு",
    ml: "എല്ലാം കാണുക",
    te: "అన్నీ చూడండి",
    gu: "બધું જુઓ"
  },
  todayTip: {
    en: "Today's Tip",
    hi: "आज का टिप",
    ta: "இன்றைய குறிப்பு",
    ml: "ഇന്നത്തെ നുറുങ്ങ്",
    te: "నేటి చిట్కా",
    gu: "આજની ટિપ"
  },
  alerts: {
    en: "Weather Alerts",
    hi: "मौसम चेतावनी",
    ta: "வானிலை எச்சரிக்கைகள்",
    ml: "കാലാവസ്ഥാ അലേർട്ടുകൾ",
    te: "వాతావరణ హెచ్చరికలు",
    gu: "હવામાન ચેતવણીઓ"
  },
  idealPlanting: {
    en: "Ideal for planting",
    hi: "रोपण के लिए आदर्श",
    ta: "நடவு செய்ய ஏற்றது",
    ml: "നടീലിന് ഉത്തമം",
    te: "నాటడానికి అనుకూలం",
    gu: "રોપણ માટે આદર્શ"
  },
  goodIrrigation: {
    en: "Good for irrigation",
    hi: "सिंचाई के लिए अच्छा",
    ta: "நீர்ப்பாசனத்திற்கு நல்லது",
    ml: "ജലസേചനത്തിന് നല്ലത്",
    te: "నీటిపారుదలకు మంచిది",
    gu: "સિંચાઈ માટે સારું"
  },
  possibleRain: {
    en: "Possible light rain",
    hi: "हल्की बारिश की संभावना",
    ta: "இலேசான மழை வாய்ப்பு",
    ml: "ചെറിയ മഴയ്ക്ക് സാധ്യത",
    te: "తేలికపాటి వర్షం సాధ్యం",
    gu: "હળવા વરસાદની શક્યતા"
  },
  notSuitable: {
    en: "Not suitable for harvesting",
    hi: "फसल कटाई के लिए उपयुक्त नहीं",
    ta: "அறுவடைக்கு ஏற்றதல்ல",
    ml: "കൊയ്ത്തിന് അനുയോജ്യമല്ല",
    te: "పంట కోతకు అనుకూలం కాదు",
    gu: "લણણી માટે યોગ્ય નથી"
  },
  avoidWork: {
    en: "Avoid outdoor work",
    hi: "बाहरी काम से बचें",
    ta: "வெளிப்புற வேலையைத் தவிர்க்கவும்",
    ml: "പുറംജോലി ഒഴിവാക്കുക",
    te: "బయట పని చేయడం మానుకోండి",
    gu: "બહારના કામને ટાળો"
  },
  lightRain: {
    en: "Light rain expected",
    hi: "हल्की बारिश की उम्मीद",
    ta: "இலகு மழை எதிர்பார்க்கப்படுகிறது",
    ml: "നേരിയ മഴ പ്രതീക്ഷിക്കുന്നു",
    te: "తేలికపాటి వర్షం అవకాశం",
    gu: "હળવા વરસાદની અપેક્ષા"
  },
  fieldWork: {
    en: "Good for field work",
    hi: "खेत के काम के लिए अच्छा",
    ta: "வயல் வேலைக்கு நல்லது",
    ml: "വയൽ ജോലിക്ക് നല്ലത്",
    te: "పొలం పనికి మంచిది",
    gu: "ખેતરના કામ માટે સારું"
  },
  corn: {
    en: "Corn",
    hi: "मक्का",
    ta: "சோளம்",
    ml: "ചോളം",
    te: "మొక్కజొన్న",
    gu: "મકાઈ"
  },
  wheat: {
    en: "Wheat",
    hi: "गेहूं",
    ta: "கோதுமை",
    ml: "ഗോതമ്പ്",
    te: "గోధుమ",
    gu: "ઘઉં"
  },
  rice: {
    en: "Rice",
    hi: "चावल",
    ta: "அரிசி",
    ml: "അരി",
    te: "బియ్యం",
    gu: "ચોખા"
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: () => "",
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState("en");

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Translation function
  const t = (key: string) => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    // Fallback to English if translation not found
    if (translations[key] && translations[key]["en"]) {
      return translations[key]["en"];
    }
    // Return the key if no translation found
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
