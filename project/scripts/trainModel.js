import { parse } from 'csv-parse';
import * as tf from '@tensorflow/tfjs';
import natural from 'natural';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

// Load and preprocess the Kaggle dataset
async function loadDataset() {
  const datasetPath = path.join(__dirname, '../data/phishing_email_dataset.csv');
  
  return new Promise((resolve, reject) => {
    const emails = [];
    fs.createReadStream(datasetPath)
      .pipe(parse({ columns: true, skip_empty_lines: true }))
      .on('data', (row) => {
        emails.push({
          text: row.email_text,
          isPhishing: row.label === 'phishing' ? 1 : 0
        });
      })
      .on('end', () => resolve(emails))
      .on('error', reject);
  });
}

// Preprocess text
function preprocessText(text) {
  const tokens = tokenizer.tokenize(text.toLowerCase());
  return tokens.map(token => stemmer.stem(token));
}

// Create vocabulary from dataset
function createVocabulary(emails) {
  const vocabulary = new Set();
  emails.forEach(email => {
    const tokens = preprocessText(email.text);
    tokens.forEach(token => vocabulary.add(token));
  });
  return Array.from(vocabulary);
}

// Convert text to feature vector
function textToFeatures(text, vocabulary) {
  const tokens = preprocessText(text);
  return vocabulary.map(word => tokens.includes(word) ? 1 : 0);
}

// Train model
async function trainModel(X, y) {
  const model = tf.sequential();
  
  model.add(tf.layers.dense({
    units: 64,
    activation: 'relu',
    inputShape: [X.shape[1]]
  }));
  
  model.add(tf.layers.dropout({ rate: 0.5 }));
  
  model.add(tf.layers.dense({
    units: 32,
    activation: 'relu'
  }));
  
  model.add(tf.layers.dense({
    units: 1,
    activation: 'sigmoid'
  }));
  
  model.compile({
    optimizer: tf.train.adam(0.001),
    loss: 'binaryCrossentropy',
    metrics: ['accuracy']
  });
  
  await model.fit(X, y, {
    epochs: 10,
    validationSplit: 0.2,
    shuffle: true,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(`Epoch ${epoch + 1}: loss = ${logs.loss.toFixed(4)}, accuracy = ${logs.acc.toFixed(4)}`);
      }
    }
  });
  
  return model;
}

async function main() {
  try {
    console.log('Loading dataset...');
    const emails = await loadDataset();
    
    console.log('Creating vocabulary...');
    const vocabulary = createVocabulary(emails);
    
    console.log('Preparing training data...');
    const X = tf.tensor2d(
      emails.map(email => textToFeatures(email.text, vocabulary))
    );
    const y = tf.tensor2d(
      emails.map(email => [email.isPhishing])
    );
    
    console.log('Training model...');
    const model = await trainModel(X, y);
    
    console.log('Saving model...');
    await model.save('file://./models/phishing-detector');
    
    console.log('Training complete!');
  } catch (error) {
    console.error('Error during training:', error);
  }
}

main();