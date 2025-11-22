import React, { useState } from 'react';
import { Button } from './Button';
import { QuizConfig } from '../types';

interface QuizConfigFormProps {
  onSubmit: (config: QuizConfig) => void;
  isLoading: boolean;
}

export const QuizConfigForm: React.FC<QuizConfigFormProps> = ({ onSubmit, isLoading }) => {
  const [questions, setQuestions] = useState(10);
  const [minutes, setMinutes] = useState(15);

  return (
    <div className="max-w-2xl mx-auto mt-12 px-4 animate-fade-in-scale">
      <div className="glass-card rounded-3xl overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-10 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
          <h2 className="text-3xl font-bold mb-2 relative z-10">Thiết Lập Đề Thi</h2>
          <p className="text-indigo-100 relative z-10 text-lg">Tùy chỉnh thông số để AI tạo bài phù hợp nhất</p>
        </div>
        
        <div className="p-10 space-y-10 bg-white/80">
          
          {/* Question Count Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="font-bold text-gray-700 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                   🔢
                </span>
                Số lượng câu hỏi
              </label>
              <div className="px-4 py-1 bg-indigo-600 text-white rounded-full font-bold shadow-md min-w-[80px] text-center">
                {questions} câu
              </div>
            </div>
            <input 
              type="range" 
              min="5" 
              max="50" 
              step="1" 
              value={questions}
              onChange={(e) => setQuestions(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500"
            />
            <div className="flex justify-between text-xs font-medium text-gray-400 px-1">
              <span>5</span>
              <span>15</span>
              <span>25</span>
              <span>40</span>
              <span>50</span>
            </div>
          </div>

          {/* Time Limit Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="font-bold text-gray-700 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center">
                   ⏰
                </span>
                Thời gian làm bài
              </label>
              <div className="px-4 py-1 bg-pink-600 text-white rounded-full font-bold shadow-md min-w-[80px] text-center">
                {minutes} phút
              </div>
            </div>
            <input 
              type="range" 
              min="5" 
              max="90" 
              step="5" 
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-600 hover:accent-pink-500"
            />
             <div className="flex justify-between text-xs font-medium text-gray-400 px-1">
              <span>5p</span>
              <span>30p</span>
              <span>60p</span>
              <span>90p</span>
            </div>
          </div>

          <div className="pt-6">
            <Button 
              onClick={() => onSubmit({ numberOfQuestions: questions, durationMinutes: minutes })}
              className="w-full text-lg py-4 rounded-xl shadow-indigo-500/30 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-0"
              isLoading={isLoading}
            >
              {isLoading ? 'Đang khởi tạo...' : 'Bắt đầu tạo đề thi'}
            </Button>
            <p className="text-center text-xs text-gray-400 mt-5 flex items-center justify-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
              AI sẽ phân tích sâu nội dung để tạo câu hỏi phù hợp
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};