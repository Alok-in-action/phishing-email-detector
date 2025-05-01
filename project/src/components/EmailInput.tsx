import React, { useState } from 'react';
import { Send, Trash2 } from 'lucide-react';

interface EmailInputProps {
  onAnalyze: (content: string) => void;
  isAnalyzing: boolean;
}

const EmailInput: React.FC<EmailInputProps> = ({ onAnalyze, isAnalyzing }) => {
  const [emailContent, setEmailContent] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailContent.trim()) {
      onAnalyze(emailContent);
    }
  };
  
  const handleClear = () => {
    setEmailContent('');
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6 transition-all duration-300">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label 
            htmlFor="emailContent" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Paste Email Content
          </label>
          <textarea
            id="emailContent"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            placeholder="Paste the suspicious email content here..."
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 min-h-[150px] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            required
          />
        </div>
        
        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={isAnalyzing || !emailContent.trim()}
            className={`px-4 py-2 flex items-center justify-center rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 ${
              (isAnalyzing || !emailContent.trim()) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Send className="w-4 h-4 mr-2" />
            {isAnalyzing ? 'Analyzing...' : 'Analyze Email'}
          </button>
          
          <button
            type="button"
            onClick={handleClear}
            disabled={!emailContent.trim()}
            className={`px-4 py-2 flex items-center justify-center rounded-md text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 ${
              !emailContent.trim() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailInput;