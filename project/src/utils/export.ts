import { HistoryItem } from '../types';

// Export history to CSV
export const exportToCSV = (items: HistoryItem[]): void => {
  if (items.length === 0) return;
  
  // Create CSV header row
  const headers = ['ID', 'Timestamp', 'Prediction', 'Confidence', 'Email Snippet'];
  
  // Convert items to CSV rows
  const rows = items.map(item => [
    item.id,
    new Date(item.timestamp).toLocaleString(),
    item.prediction,
    `${(item.confidence * 100).toFixed(1)}%`,
    `"${item.snippet.replace(/"/g, '""')}"`
  ]);
  
  // Combine header and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  // Create download link
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.setAttribute('href', url);
  link.setAttribute('download', `phishing-analysis-${new Date().toISOString().slice(0, 10)}.csv`);
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Export history to JSON
export const exportToJSON = (items: HistoryItem[]): void => {
  if (items.length === 0) return;
  
  // Create a sanitized version without full email content for safety
  const sanitizedItems = items.map(({ emailContent, ...rest }) => ({
    ...rest,
    contentLength: emailContent.length
  }));
  
  // Create download link
  const blob = new Blob([JSON.stringify(sanitizedItems, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.setAttribute('href', url);
  link.setAttribute('download', `phishing-analysis-${new Date().toISOString().slice(0, 10)}.json`);
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};