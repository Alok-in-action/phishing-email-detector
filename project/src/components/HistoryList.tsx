import React from 'react';
import { HistoryItem } from '../types';
import { Trash2, FileText, AlertTriangle, CheckCircle } from 'lucide-react';

interface HistoryListProps {
  historyItems: HistoryItem[];
  onSelectItem: (item: HistoryItem) => void;
  onDeleteItem: (id: string) => void;
  onClearHistory: () => void;
  onExport: () => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ 
  historyItems, 
  onSelectItem, 
  onDeleteItem,
  onClearHistory,
  onExport
}) => {
  if (historyItems.length === 0) {
    return (
      <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <p className="text-gray-500 dark:text-gray-400">No history yet. Analyze some emails to see them here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-colors duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">Analysis History</h2>
        <div className="flex space-x-2">
          <button
            onClick={onExport}
            className="px-3 py-1 text-xs rounded-md bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-200"
          >
            <span className="flex items-center">
              <FileText className="w-3 h-3 mr-1" />
              Export
            </span>
          </button>
          <button
            onClick={onClearHistory}
            className="px-3 py-1 text-xs rounded-md bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-200"
          >
            <span className="flex items-center">
              <Trash2 className="w-3 h-3 mr-1" />
              Clear All
            </span>
          </button>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {historyItems.map((item) => (
          <div key={item.id} className="py-3 flex justify-between items-center">
            <button
              onClick={() => onSelectItem(item)}
              className="flex-1 flex items-center text-left hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-md transition-colors duration-200"
            >
              {item.prediction === 'PHISHING' ? (
                <AlertTriangle className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
              ) : (
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              )}
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-gray-800 dark:text-white truncate">{item.snippet}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(item.timestamp).toLocaleString()} • {(item.confidence * 100).toFixed(0)}% confidence
                </p>
              </div>
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteItem(item.id);
              }}
              className="ml-2 p-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Delete item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;