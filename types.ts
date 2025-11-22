export enum AppStep {
  UPLOAD = 'UPLOAD',
  ANALYZING = 'ANALYZING',
  VIEW_ANSWERS = 'VIEW_ANSWERS',
  CONFIG_QUIZ = 'CONFIG_QUIZ',
  GENERATING_QUIZ = 'GENERATING_QUIZ',
  TAKE_QUIZ = 'TAKE_QUIZ',
  QUIZ_RESULT = 'QUIZ_RESULT'
}

export interface QAItem {
  question: string;
  answer: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface QuizConfig {
  numberOfQuestions: number;
  durationMinutes: number;
}

export interface FileData {
  base64: string;
  mimeType: string;
  name: string;
}

export interface StudentResult {
  score: number;
  total: number;
  details: {
    questionId: number;
    selectedOption: number;
    isCorrect: boolean;
  }[];
}