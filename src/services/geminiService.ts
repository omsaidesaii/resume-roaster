import { GoogleGenAI } from "@google/genai";
import { GEMINI_MODEL, SYSTEM_INSTRUCTION } from "../constants.ts";
import type { ProcessedFile } from "./fileService";

// Initialize the API client
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  console.error("API_KEY is missing from environment variables");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-for-types' });

export const generateRoast = async (fileData: ProcessedFile): Promise<string> => {
  const runtimeApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!runtimeApiKey) throw new Error("API Key not found. Please set VITE_GEMINI_API_KEY in your .env file");

  try {
    let contentsPayload;

    if (fileData.isText) {
      // It's extracted text (e.g. from DOCX)
      contentsPayload = {
        role: 'user',
        parts: [
          { text: "Here is the resume text to roast:" },
          { text: fileData.data }
        ]
      };
    } else {
      // It's a binary file (Image or PDF)
      contentsPayload = {
        role: 'user',
        parts: [
          { text: "Here is the resume file (image or PDF). Roast it based on its visual layout and content. Make sure to read all details." },
          { 
            inlineData: {
              mimeType: fileData.mimeType,
              data: fileData.data
            }
          }
        ]
      };
    }

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 1.2,
        topP: 0.95,
      },
      contents: [contentsPayload]
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("AI returned empty response.");
    }
    return resultText;

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Nice error handling for quota issues or key issues
    if (error.message?.includes("429")) {
      throw new Error("Too many roasts! The AI needs a chai break. Try again in a minute.");
    }
    
    // Handle XHR / Network errors (often due to file size)
    if (error.message?.includes("Rpc failed") || error.message?.includes("xhr error") || error.message?.includes("500")) {
      throw new Error("Network error or file too large. Try uploading a compressed file (under 4MB).");
    }

    throw new Error("AI dimag kharab ho gaya. " + (error.message || "Try again later!"));
  }
};