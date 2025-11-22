
import React, { useState } from 'react';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { AnswersView } from './components/AnswersView';
import { QuizConfigForm } from './components/QuizConfigForm';
import { StudentQuizView } from './components/StudentQuizView';
import { Button } from './components/Button';
import { AppStep, FileData, QAItem, QuizConfig, QuizQuestion } from './types';
import { analyzeDocumentForAnswers, generateQuizFromDocument } from './services/geminiService';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.UPLOAD);
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [qaItems, setQaItems] = useState<QAItem[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (data: FileData) => {
    setFileData(data);
    // Stay on UPLOAD step but show file confirmation UI
    setError(null);
  };

  const handleClearFile = () => {
    setFileData(null);
    setStep(AppStep.UPLOAD);
    setError(null);
  };

  const handleGetAnswers = async () => {
    if (!fileData) return;
    setLoading(true);
    setError(null);
    try {
      const items = await analyzeDocumentForAnswers(fileData.base64, fileData.mimeType);
      setQaItems(items);
      setStep(AppStep.VIEW_ANSWERS);
    } catch (err) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setError((err as any).message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateQuizSetup = () => {
    setStep(AppStep.CONFIG_QUIZ);
  };

  const handleGenerateQuiz = async (config: QuizConfig) => {
    if (!fileData) return;
    setLoading(true);
    setError(null);
    setQuizConfig(config);
    
    try {
      setStep(AppStep.GENERATING_QUIZ);
      const questions = await generateQuizFromDocument(fileData.base64, fileData.mimeType, config.numberOfQuestions);
      setQuizQuestions(questions);
      setStep(AppStep.TAKE_QUIZ);
    } catch (err) {
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setError((err as any).message || "Có lỗi xảy ra khi tạo đề");
      setStep(AppStep.CONFIG_QUIZ);
    } finally {
      setLoading(false);
    }
  };

  const resetApp = () => {
    setStep(AppStep.UPLOAD);
    setFileData(null);
    setQaItems([]);
    setQuizQuestions([]);
    setError(null);
  };

  const renderContent = () => {
    // Step 1: Upload
    if (step === AppStep.UPLOAD && !fileData) {
      return <FileUpload onFileSelect={handleFileSelect} />;
    }

    // Step 1.5: File Selected, Choose Action
    if (step === AppStep.UPLOAD && fileData) {
      const isPdf = fileData.name.toLowerCase().endsWith('.pdf');
      
      return (
        <div className="max-w-lg mx-auto mt-16 text-center px-6 animate-fade-in-scale">
           <div className="glass-card p-10 rounded-3xl shadow-2xl relative overflow-hidden border border-white/50">
              
              {/* Background Blur Elements */}
              <div className="absolute top-[-20%] left-[-20%] w-40 h-40 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
              <div className="absolute bottom-[-20%] right-[-20%] w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

              <div className="mb-8 relative z-10">
                {/* Specific File Icon with Glow */}
                <div className={`w-24 h-24 rounded-3xl flex items-center justify-center shadow-lg mx-auto relative ${isPdf ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                   <div className={`absolute inset-0 rounded-3xl opacity-50 blur-lg ${isPdf ? 'bg-red-200' : 'bg-blue-200'}`}></div>
                   <div className="relative z-10">
                      {isPdf ? (
                        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v.5zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5v1.5H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"/></svg>
                      ) : (
                        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/><text x="7" y="17" fontSize="5" fontWeight="bold" fill="currentColor">DOC</text></svg>
                      )}
                   </div>
                </div>
              </div>

              <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 truncate mb-1" title={fileData.name}>
                      {fileData.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-8">Đã tải lên thành công</p>
                  
                  <div className="flex flex-col gap-4">
                    <Button 
                        onClick={handleGetAnswers} 
                        isLoading={loading} 
                        disabled={loading}
                        className="w-full py-4 text-lg rounded-xl shadow-indigo-500/30 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                    >
                      <span className="mr-2">💡</span> Phân Tích & Xem Đáp Án
                    </Button>
                    
                    {!loading && (
                        <button 
                          onClick={handleClearFile}
                          className="py-3 text-sm font-medium text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                          Chọn tài liệu khác
                        </button>
                    )}
                  </div>
              </div>
              
              {loading && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-20 animate-in fade-in duration-300">
                  <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                  <p className="text-indigo-600 font-bold text-lg animate-pulse">Đang xử lý...</p>
                  <p className="text-xs text-gray-400 mt-2">AI đang đọc tài liệu của bạn</p>
                </div>
              )}
           </div>
        </div>
      );
    }

    // Step 2: View Answers
    if (step === AppStep.VIEW_ANSWERS) {
      return (
        <AnswersView 
          qaItems={qaItems} 
          onCreateQuiz={handleCreateQuizSetup} 
          fileName={fileData?.name || ''} 
        />
      );
    }

    // Step 3: Config Quiz
    if (step === AppStep.CONFIG_QUIZ || step === AppStep.GENERATING_QUIZ) {
      return (
        <QuizConfigForm 
          onSubmit={handleGenerateQuiz} 
          isLoading={step === AppStep.GENERATING_QUIZ} 
        />
      );
    }

    // Step 4: Student View
    if (step === AppStep.TAKE_QUIZ) {
      return (
        <StudentQuizView 
          questions={quizQuestions} 
          durationMinutes={quizConfig?.durationMinutes || 15} 
          onFinish={resetApp}
        />
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-gray-900">
      <Header currentStep={step} onReset={resetApp} />
      
      <main className="flex-grow container mx-auto">
        {error && (
          <div className="max-w-2xl mx-auto mt-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center shadow-lg animate-slide-up">
            <svg className="w-6 h-6 mr-3 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
            <span className="font-medium">{error}</span>
            <button onClick={() => setError(null)} className="ml-auto p-1 hover:bg-red-100 rounded-full transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
          </div>
        )}
        {renderContent()}
      </main>

      <footer className="border-t border-gray-200 py-8 mt-auto bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <p className="text-gray-500 text-sm font-medium">Copyright © 2025 Nguyễn Thế Phương</p>
           <p className="text-gray-400 text-xs mt-1">thefuong119@gmail.com</p>
        </div>
      </footer>
    </div>
  );
};

export default App;