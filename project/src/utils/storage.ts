import { HistoryItem } from '../types';

// Local storage key
const HISTORY_STORAGE_KEY = 'phishing-detector-history';

// Get all history items
export const getHistory = (): HistoryItem[] => {
  try {
    const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
    return storedHistory ? JSON.parse(storedHistory) : [];
  } catch (error) {
    console.error('Failed to retrieve history:', error);
    return [];
  }
};

// Add an item to history
export const addToHistory = (item: HistoryItem): void => {
  try {
    const history = getHistory();
    
    // Limit history to most recent 20 items
    const updatedHistory = [item, ...history].slice(0, 20);
    
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Failed to save to history:', error);
  }
};

// Clear all history
export const clearHistory = (): void => {
  try {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
};

// Delete a specific history item by ID
export const deleteHistoryItem = (id: string): void => {
  try {
    const history = getHistory();
    const updatedHistory = history.filter(item => item.id !== id);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Failed to delete history item:', error);
  }
};

// Generate a short snippet from email content
export const generateSnippet = (emailContent: string, maxLength = 60): string => {
  if (!emailContent) return '';
  
  const trimmed = emailContent.trim();
  if (trimmed.length <= maxLength) return trimmed;
  
  return trimmed.substring(0, maxLength) + '...';
};