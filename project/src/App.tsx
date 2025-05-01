import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AlertCircle } from 'lucide-react';
import Header from './components/Header';
import EmailInput from './components/EmailInput';
import ResultDisplay from './components/ResultDisplay';
import HistoryList from './components/HistoryList';
import ExportModal from './components/ExportModal';
import { analyzeEmail } from './utils/modelSimulation';
import { getHistory, addToHistory, clearHistory, deleteHistoryItem, generateSnippet } from './utils/storage';
import { EmailAnalysisResult, HistoryItem } from './types';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode !== null) {
        return JSON.parse(savedMode);
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  
  const [emailContent, setEmailContent] = useState('');
  const [analysisResult, setAnalysisResult] = useState<EmailAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showExportModal, setShowExportModal] = useState(false);
  
  // Load history from local storage on mount
  useEffect(() => {
    setHistory(getHistory());
  }, []);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };
  
  // Apply dark mode class to document
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Listen for system color scheme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode === null) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Analyze the email
  const handleAnalyze = async (content: string) => {
    setEmailContent(content);
    setError(null);
    setIsAnalyzing(true);
    
    try {
      // Simulate a brief analysis delay for realism
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Analyze the email
      const result = analyzeEmail(content);
      setAnalysisResult(result);
      
      // Create history item
      const historyItem: HistoryItem = {
        id: uuidv4(),
        emailContent: content,
        snippet: generateSnippet(content),
        ...result
      };
      
      // Add to history
      addToHistory(historyItem);
      setHistory(getHistory());
      
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      setAnalysisResult(null);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  // Handle selecting a history item
  const handleSelectHistoryItem = (item: HistoryItem) => {
    setEmailContent(item.emailContent);
    setAnalysisResult({
      prediction: item.prediction,
      confidence: item.confidence,
      keyIndicators: item.keyIndicators,
      timestamp: item.timestamp
    });
    setError(null);
  };
  
  // Handle deleting a history item
  const handleDeleteHistoryItem = (id: string) => {
    deleteHistoryItem(id);
    setHistory(getHistory());
  };
  
  // Handle clearing all history
  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear all history?")) {
      clearHistory();
      setHistory([]);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <EmailInput 
              onAnalyze={handleAnalyze} 
              isAnalyzing={isAnalyzing} 
            />
            
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 flex items-start">
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}
            
            {(!error && !isAnalyzing) && (
              <ResultDisplay 
                result={analysisResult} 
                emailContent={emailContent} 
              />
            )}
            
            {isAnalyzing && (
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col items-center justify-center space-y-4 animate-pulse">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600 dark:text-gray-300">Analyzing email content...</p>
              </div>
            )}
          </div>
          
          <div>
            <HistoryList 
              historyItems={history}
              onSelectItem={handleSelectHistoryItem}
              onDeleteItem={handleDeleteHistoryItem}
              onClearHistory={handleClearHistory}
              onExport={() => setShowExportModal(true)}
            />
          </div>
        </div>
      </main>
      
      {showExportModal && (
        <ExportModal 
          historyItems={history} 
          onClose={() => setShowExportModal(false)} 
        />
      )}
    </div>
  );
}

export default App;