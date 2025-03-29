
class VoiceReader {
  private static instance: VoiceReader;
  private isSpeaking: boolean = false;
  
  private constructor() {}
  
  public static getInstance(): VoiceReader {
    if (!VoiceReader.instance) {
      VoiceReader.instance = new VoiceReader();
    }
    return VoiceReader.instance;
  }
  
  public speak(text: string, language: string = 'en-US'): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!window.speechSynthesis) {
        console.error('Speech synthesis not supported');
        reject('Speech synthesis not supported');
        return;
      }
      
      // Cancel any ongoing speech
      this.stop();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Map our language codes to BCP 47 language tags for speech synthesis
      const langMap: { [key: string]: string } = {
        en: 'en-US',
        hi: 'hi-IN',
        ta: 'ta-IN',
        ml: 'ml-IN',
        te: 'te-IN',
        gu: 'gu-IN'
      };
      
      utterance.lang = langMap[language] || 'en-US';
      utterance.volume = 1;
      utterance.rate = 1;
      utterance.pitch = 1;
      
      utterance.onstart = () => {
        this.isSpeaking = true;
      };
      
      utterance.onend = () => {
        this.isSpeaking = false;
        resolve();
      };
      
      utterance.onerror = (event) => {
        this.isSpeaking = false;
        reject(event.error);
      };
      
      window.speechSynthesis.speak(utterance);
    });
  }
  
  public stop(): void {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
    }
  }
  
  public get speaking(): boolean {
    return this.isSpeaking;
  }
}

export default VoiceReader;
