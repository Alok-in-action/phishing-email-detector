# Phishing Email Detector

A sophisticated machine learning-powered tool that helps protect users from phishing attempts by analyzing email content in real-time.

## 🚀 Features

- **Real-time Analysis**: Instant phishing detection using machine learning
- **Smart Detection**: Identifies common phishing patterns and suspicious content
- **History Tracking**: Keep track of previously analyzed emails
- **Export Capabilities**: Export analysis history in CSV or JSON formats
- **Dark Mode**: Comfortable viewing in any lighting condition
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS for modern, responsive design
- **Build Tool**: Vite for lightning-fast development
- **ML Framework**: TensorFlow.js for in-browser machine learning
- **Natural Language**: Natural.js for text processing
- **Data Handling**: CSV-Parse for dataset management

## 📋 Prerequisites

Before you begin, ensure you have installed:
- Node.js (v18 or higher)
- npm (v9 or higher)

## 🚦 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/phishing-email-detector.git
```

2. Navigate to the project directory:
```bash
cd phishing-email-detector
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Train the model (optional):
```bash
npm run train
```

## 🔧 Configuration

The application supports various configuration options through environment variables:

```env
VITE_APP_NAME=Phishing Detector
VITE_MODEL_PATH=/models/phishing-detector
```

## 🧪 Key Features Explained

### Machine Learning Model

The application uses a sophisticated neural network trained on a dataset of known phishing and legitimate emails. Key indicators include:

- Suspicious language patterns
- Urgency indicators
- Malicious link patterns
- Grammar and spelling anomalies
- Request patterns for sensitive information

### Security Features

- Local processing: All analysis happens in the browser
- No data storage: Email content is never sent to external servers
- Secure exports: Data exports are handled securely

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- TensorFlow.js team for the machine learning capabilities
- React team for the excellent frontend framework
- All contributors who have helped shape this project