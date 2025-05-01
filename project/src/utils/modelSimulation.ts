import { EmailAnalysisResult } from '../types';

// Simulated email analysis function
export const analyzeEmail = (content: string): EmailAnalysisResult => {
  // Simple simulation of email analysis
  const contentLower = content.toLowerCase();
  
  // Example indicators that might suggest spam
  const spamIndicators = [
    'urgent', 'winner', 'lottery', 'prize', 'million dollars',
    'bank transfer', 'inheritance', 'prince', 'cryptocurrency deal',
    'investment opportunity', 'act now', 'limited time'
  ];
  
  // Count how many spam indicators are present
  const foundIndicators = spamIndicators.filter(indicator => 
    contentLower.includes(indicator)
  );
  
  // Calculate a simple confidence score based on indicators found
  const indicatorWeight = 0.15;
  const baseConfidence = 0.7;
  const confidence = Math.min(
    Math.max(
      baseConfidence - (foundIndicators.length * indicatorWeight),
      0.1
    ),
    0.99
  );
  
  // Determine prediction based on confidence threshold
  const prediction = confidence > 0.5 ? 'LEGITIMATE' : 'SUSPICIOUS';
  
  return {
    prediction,
    confidence,
    keyIndicators: foundIndicators,
    timestamp: new Date().toISOString()
  };
};