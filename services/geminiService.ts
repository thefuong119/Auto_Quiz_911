import { GoogleGenAI, Type, Schema } from "@google/genai";
import { QAItem, QuizQuestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to get mime type based on extension just in case
export const getMimeType = (fileName: string): string => {
  if (fileName.endsWith('.pdf')) return 'application/pdf';
  if (fileName.endsWith('.docx')) return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  return 'text/plain';
};

export const analyzeDocumentForAnswers = async (
  fileBase64: string,
  mimeType: string
): Promise<QAItem[]> => {
  const model = 'gemini-2.5-flash';

  const responseSchema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        question: { type: Type.STRING, description: "Nội dung câu hỏi tìm thấy trong tài liệu" },
        answer: { type: Type.STRING, description: "Đáp án chi tiết cho câu hỏi" },
      },
      required: ["question", "answer"],
    },
  };

  const prompt = `
    Bạn là một trợ lý giáo viên thông minh.
    Nhiệm vụ của bạn là đọc tài liệu được cung cấp.
    1. Tìm tất cả các câu hỏi bài tập có trong tài liệu.
    2. Nếu tài liệu là lý thuyết, hãy tự đặt câu hỏi dựa trên nội dung quan trọng.
    3. Cung cấp đáp án chính xác và giải thích ngắn gọn cho từng câu hỏi.
    Hãy trả về kết quả dưới dạng JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          { inlineData: { mimeType, data: fileBase64 } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as QAItem[];
    }
    return [];
  } catch (error) {
    console.error("Error analyzing document:", error);
    throw new Error("Không thể phân tích tài liệu. Vui lòng thử lại.");
  }
};

export const generateQuizFromDocument = async (
  fileBase64: string,
  mimeType: string,
  numberOfQuestions: number
): Promise<QuizQuestion[]> => {
  const model = 'gemini-2.5-flash';

  const responseSchema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.INTEGER },
        question: { type: Type.STRING },
        options: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING },
          description: "Danh sách 4 lựa chọn (A, B, C, D)"
        },
        correctAnswerIndex: { 
          type: Type.INTEGER, 
          description: "Chỉ số của đáp án đúng trong mảng options (0-3)" 
        },
      },
      required: ["id", "question", "options", "correctAnswerIndex"],
    },
  };

  const prompt = `
    Dựa trên tài liệu được cung cấp, hãy tạo ra một bài kiểm tra trắc nghiệm.
    Số lượng câu hỏi cần tạo: ${numberOfQuestions} câu.
    
    Yêu cầu:
    1. Câu hỏi phải bao quát nội dung tài liệu.
    2. Mỗi câu hỏi có 4 lựa chọn.
    3. Chỉ có 1 đáp án đúng duy nhất.
    4. Độ khó phân bổ từ Nhận biết đến Vận dụng.
    5. Trả về định dạng JSON chính xác.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          { inlineData: { mimeType, data: fileBase64 } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as QuizQuestion[];
    }
    return [];
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw new Error("Không thể tạo bài kiểm tra. Vui lòng thử lại.");
  }
};