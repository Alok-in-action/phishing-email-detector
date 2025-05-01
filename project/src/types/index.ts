export interface EmailAnalysisResult {
  prediction: 'PHISHING' | 'LEGITIMATE';
  confidence: number;
  keyIndicators: {
    factor: string;
    impact: number;
  }[];
  timestamp: string;
}

export interface HistoryItem extends EmailAnalysisResult {
  id: string;
  emailContent: string;
  snippet: string;
}