import React from 'react';
import { AppStep } from '../types';

interface HeaderProps {
  currentStep: AppStep;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentStep, onReset }) => {
  const isQuizMode = currentStep === AppStep.TAKE_QUIZ || currentStep === AppStep.QUIZ_RESULT;
  const isWelcome = currentStep === AppStep.WELCOME;

  // Helper to check active state
  const isActive = (step: AppStep) => currentStep === step;
  const isPassed = (steps: AppStep[]) => steps.includes(currentStep);

  return (
    <header className="glass sticky top-0 z-50 border-b border-white/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={onReset}
        >
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300 opacity-80 blur-sm"></div>
            <div className="relative w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            </div>
          </div>
          <div className="flex flex-col">
             <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700 hidden sm:block">
                Tạo bài trắc nghiệm tự động
             </h1>
             <span className="text-xs text-gray-500 font-medium tracking-wide hidden sm:block">bằng Gemini AI</span>
          </div>
        </div>
        
        {!isQuizMode && !isWelcome && (
          <nav className="flex items-center gap-2 bg-gray-100/50 p-1.5 rounded-full border border-gray-200/60 hidden md:flex">
            <div className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
              isActive(AppStep.UPLOAD) ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}>
              1. Tải lên
            </div>
            <div className="text-gray-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </div>
            <div className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
              isActive(AppStep.VIEW_ANSWERS) ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}>
              2. Đáp án
            </div>
            <div className="text-gray-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </div>
            <div className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
              isPassed([AppStep.CONFIG_QUIZ, AppStep.GENERATING_QUIZ]) ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}>
              3. Tạo đề
            </div>
          </nav>
        )}
        
        {isQuizMode && (
             <div className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold flex items-center gap-2 border border-indigo-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Đang diễn ra
             </div>
        )}

        {isWelcome && (
            <div className="hidden sm:block px-4 py-1.5 bg-indigo-600 text-white rounded-full text-sm font-bold shadow-lg shadow-indigo-500/30">
                Phiên bản 1.0
            </div>
        )}
      </div>
    </header>
  );
};