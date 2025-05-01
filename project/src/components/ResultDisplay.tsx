import React from 'react';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { EmailAnalysisResult } from '../types';

interface ResultDisplayProps {
  result: EmailAnalysisResult | null;
  emailContent: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, emailContent }) => {
  if (!result) return null;

  const { prediction, confidence, keyIndicators } = result;
  const isPhishing = prediction === 'PHISHING';
  const confidencePercentage = Math.round(confidence * 100);
  
  // Color scheme based on prediction
  const colorScheme = isPhishing 
    ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700' 
    : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700';
  
  const titleColor = isPhishing 
    ? 'text-red-600 dark:text-red-400' 
    : 'text-green-600 dark:text-green-400';
  
  // Animation for the shield icon
  const iconAnimation = "animate-pulse";

  return (
    <div className={`w-full rounded-lg border ${colorScheme} p-4 md:p-6 transition-all duration-300 shadow-md`}>
      <div className="flex items-center mb-4">
        <div className={`mr-3 ${iconAnimation}`}>
          {isPhishing ? (
            <AlertTriangle className="w-8 h-8 text-red-500" />
          ) : (
            <CheckCircle className="w-8 h-8 text-green-500" />
          )}
        </div>
        <div>
          <h2 className={`text-xl font-bold ${titleColor}`}>
            {isPhishing ? 'PHISHING DETECTED' : 'EMAIL LOOKS LEGITIMATE'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Confidence: {confidencePercentage}%
          </p>
        </div>
      </div>
      
      {/* Confidence meter */}
      <div className="mb-6">
        <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full ${isPhishing ? 'bg-red-500' : 'bg-green-500'} transition-all duration-500 ease-out`}
            style={{ width: `${confidencePercentage}%` }}
          />
        </div>
      </div>
      
      {/* Key indicators */}
      <div className="mb-4">
        <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
          Key Indicators:
        </h3>
        <ul className="space-y-2">
          {keyIndicators.map((indicator, index) => (
            <li 
              key={index}
              className="flex items-center text-sm text-gray-700 dark:text-gray-300"
            >
              <Shield className={`w-4 h-4 mr-2 ${isPhishing ? 'text-red-500' : 'text-green-500'}`} />
              <span>{indicator.factor}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Advice section */}
      {isPhishing && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded border border-red-200 dark:border-red-800 text-sm text-red-800 dark:text-red-300">
          <p className="font-medium">Recommended action:</p>
          <p>Do not respond to this email or click any links. If you've already shared information, contact the relevant service provider immediately.</p>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;