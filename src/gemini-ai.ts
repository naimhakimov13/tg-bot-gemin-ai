import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const googleAI = new GoogleGenerativeAI(process.env.API_KEY);

// (Optional) Configure generation parameters (temperature, topP, etc.)
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
  candidateCount: 3,

};

const geminiModel = googleAI.getGenerativeModel({ model: 'gemini-pro', ...geminiConfig });

export async function generateText(prompt: string): Promise<void> {
  try {
    const response = await geminiModel.generateContent(prompt);
    console.log('Generated Text:', JSON.stringify(response.response.candidates[0].content.parts[0].text));
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


