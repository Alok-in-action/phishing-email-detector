import React, { useState } from 'react';
import { X, FileText, FileJson } from 'lucide-react';
import { HistoryItem } from '../types';
import { exportToCSV, exportToJSON } from '../utils/export';

interface ExportModalProps {
  historyItems: HistoryItem[];
  onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ historyItems, onClose }) => {
  const [format, setFormat] = useState<'csv' | 'json'>('csv');
  
  const handleExport = () => {
    if (format === 'csv') {
      exportToCSV(historyItems);
    } else {
      exportToJSON(historyItems);
    }
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 relative transition-all duration-300 animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Export Analysis History</h2>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Choose a format to export your {historyItems.length} analysis records.
        </p>
        
        <div className="space-y-3 mb-6">
          <label className="flex items-center p-3 border rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700">
            <input
              type="radio"
              name="exportFormat"
              checked={format === 'csv'}
              onChange={() => setFormat('csv')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <FileText className="w-5 h-5 text-gray-500 dark:text-gray-400 ml-3 mr-2" />
            <div className="ml-2">
              <span className="block text-sm font-medium text-gray-700 dark:text-gray-200">CSV Format</span>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Best for spreadsheet applications</span>
            </div>
          </label>
          
          <label className="flex items-center p-3 border rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700">
            <input
              type="radio"
              name="exportFormat"
              checked={format === 'json'}
              onChange={() => setFormat('json')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <FileJson className="w-5 h-5 text-gray-500 dark:text-gray-400 ml-3 mr-2" />
            <div className="ml-2">
              <span className="block text-sm font-medium text-gray-700 dark:text-gray-200">JSON Format</span>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Better for data processing</span>
            </div>
          </label>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;