// This file simulates a training dataset for the model
// In a real application, you would use a comprehensive dataset

export const phishingExamples = [
  "URGENT: Your account has been compromised. Click here to reset your password immediately: http://bit.ly/2mTF4",
  "Dear valued customer, we've noticed suspicious activity on your account. Verify your identity now: secure-verify.com/login",
  "Congratulations! You've won a free iPhone. Claim now: claim-your-prize2023.net/iphone14",
  "Your package delivery failed. Update your information: amaz0n-delivery.net/tracking",
  "Your bank account will be suspended. Please verify your information: bankofamerica-secure.tk/verify",
  "IMPORTANT: Your PayPal account has been limited. Update your information: paypal-secure-center.com/verify",
  "Netflix: Your subscription payment failed. Update billing: netflix-billing.co/account",
  "Apple ID: Your Apple account has been locked. Confirm your details: apple-id-confirm.com/verify",
  "IRS Tax Refund: You have unclaimed tax refund. Claim now: irs-gov-refund.com/claim",
  "Microsoft Security Alert: Unusual sign-in activity detected. Verify now: microsoft-secure-alert.com/verify",
  "URGENT Invoice Payment Required - Your account will be suspended",
  "Important: Download attached invoice for immediate payment required",
  "Final Warning: Legal action pending for unpaid invoice",
  "Your payment is overdue - Click to avoid penalties",
  "Bank transfer failed - Update payment details immediately",
  "Outstanding invoice requires immediate attention - Download statement",
  "Payment Processing Error - Update billing information",
  "Urgent: Invoice #INV-2023-456 requires immediate action",
  "Account Suspension Notice - Overdue Payment",
  "Important Tax Refund Document - Download Attachment"
];

export const legitimateExamples = [
  "Hi John, just following up on our meeting yesterday. Let me know if you have any questions about the proposal.",
  "Your Amazon order #302-9284710-4183143 has been shipped. Tracking number: TBA87394830274",
  "Meeting reminder: Team standup tomorrow at 10:00 AM in Conference Room B or join via Zoom.",
  "Thank you for your payment. Your invoice #INV-4832 has been paid and a receipt has been emailed to you.",
  "Your flight itinerary for Boston (BOS) on July 15th has been confirmed. Check-in opens 24 hours before departure.",
  "Netflix: New login to your account from Windows device in Chicago, IL. If this was you, no action is needed.",
  "Your monthly account statement is now available. Log in to your account to view it.",
  "Reminder: Your appointment with Dr. Smith is scheduled for tomorrow at 2:30 PM.",
  "Your password was reset successfully. If you didn't request this change, please contact support.",
  "Thank you for shopping with us! Your order #4851 has been confirmed and will be processed shortly.",
  "Your invoice for Project X is attached for your records",
  "Monthly statement: Your account summary is ready to view",
  "Payment received - Thank you for your business",
  "Your tax documents are ready for download from your secure account portal",
  "Confirmation: Payment processed for order #12345",
  "Invoice paid successfully - Receipt attached",
  "Your subscription has been renewed - Payment confirmed",
  "Account statement for period ending March 2024",
  "Payment confirmation: Transaction ID #PAY-2024-789",
  "Direct deposit confirmation for payroll"
];

// Features that typically indicate phishing
export const phishingIndicators = [
  "Urgent language",
  "Suspicious links",
  "Requests for personal information",
  "Poor grammar or spelling",
  "Mismatched URLs",
  "Generic greetings",
  "Threats or warnings",
  "Too good to be true offers",
  "Unexpected attachments",
  "Unusual sender address",
  "Financial urgency",
  "Penalty threats",
  "Suspicious attachments",
  "Payment demands",
  "Legal threats"
];