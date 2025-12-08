import Mammoth from 'mammoth';

export interface ProcessedFile {
  mimeType: string;
  data: string; // Text string (for DOCX) or Base64 string (for PDF/Images)
  isText: boolean;
}

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB Limit

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove Data-URL declaration (e.g., "data:image/png;base64,") to get raw base64
      const base64 = result.split(',')[1]; 
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

export const processFile = async (file: File): Promise<ProcessedFile> => {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File too large (Max 4MB). AI faint ho jayega. Please compress it.");
  }

  const fileType = file.type;

  // 1. Handle Images (PNG, JPG, WEBP, HEIC, etc.)
  if (fileType.startsWith('image/')) {
    const base64 = await fileToBase64(file);
    return { 
      mimeType: fileType, 
      data: base64, 
      isText: false 
    };
  }

  // 2. Handle PDF
  // We send the PDF as Base64 to Gemini. Gemini has native PDF support (multimodal),
  // so it can "read" scanned PDFs or text-based PDFs equally well.
  if (fileType === 'application/pdf') {
     const base64 = await fileToBase64(file);
     return { 
       mimeType: 'application/pdf', 
       data: base64, 
       isText: false 
     };
  }

  // 3. Handle DOCX
  // For DOCX, Mammoth is very reliable for text extraction. 
  // Gemini doesn't support DOCX natively via API as well as PDF.
  if (
    fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || 
    file.name.endsWith('.docx')
  ) {
    const text = await extractTextFromDOCX(file);
    return { 
      mimeType: 'text/plain', 
      data: text, 
      isText: true 
    };
  }

  throw new Error("Unsupported file type. Please upload PDF, DOCX, or an Image.");
};

const extractTextFromDOCX = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  try {
    const result = await Mammoth.extractRawText({ arrayBuffer });
    return result.value;
  } catch (error) {
    console.error("DOCX Parsing Error", error);
    throw new Error("Failed to read DOCX file. Is it corrupted?");
  }
};