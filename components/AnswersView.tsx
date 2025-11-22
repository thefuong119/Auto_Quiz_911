import React from 'react';
import { QAItem } from '../types';
import { Button } from './Button';

interface AnswersViewProps {
  qaItems: QAItem[];
  onCreateQuiz: () => void;
  fileName: string;
}

export const AnswersView: React.FC<AnswersViewProps> = ({ qaItems, onCreateQuiz, fileName }) => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="glass-card rounded-2xl p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 animate-slide-up">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-indigo-600">Giải Đáp & Phân Tích</span>
          </h2>
          <p className="text-gray-500 mt-1 flex items-center gap-2">
            Tài liệu nguồn: 
            <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700 font-medium border border-gray-200 text-sm flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                {fileName}
            </span>
          </p>
        </div>
        <Button onClick={onCreateQuiz} variant="primary" className="shadow-indigo-500/30 shadow-lg hover:shadow-indigo-500/40 transform hover:scale-105 transition-all">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
            Tạo Đề Trắc Nghiệm Ngay
        </Button>
      </div>

      <div className="space-y-6">
        {qaItems.length === 0 ? (
            <div className="bg-amber-50 border border-amber-200 p-8 rounded-2xl text-center">
                <div className="text-amber-500 text-4xl mb-3">🤔</div>
                <h3 className="text-amber-900 font-bold text-lg">Chưa tìm thấy câu hỏi</h3>
                <p className="text-amber-700">Không tìm thấy câu hỏi cụ thể nào trong tài liệu. Hãy thử nhấn "Tạo trắc nghiệm" để AI tự sinh câu hỏi mới.</p>
            </div>
        ) : (
            qaItems.map((item, index) => (
            <div 
                key={index} 
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 animate-slide-up group"
                style={{ animationDelay: `${index * 0.05}s` }}
            >
                <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex gap-4 items-start group-hover:bg-indigo-50/30 transition-colors">
                    <span className="flex-shrink-0 w-8 h-8 bg-white border border-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center font-bold text-sm shadow-sm mt-0.5">
                        {index + 1}
                    </span>
                    <div className="font-medium text-gray-800 text-lg leading-relaxed">{item.question}</div>
                </div>
                
                <div className="px-6 py-5 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 pt-1">
                            <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                        </div>
                        <div className="text-gray-600 leading-relaxed whitespace-pre-line group-hover:text-gray-900 transition-colors">
                            {item.answer}
                        </div>
                    </div>
                </div>
            </div>
            ))
        )}
      </div>
      
      <div className="mt-12 flex justify-center pb-12">
         <Button onClick={onCreateQuiz} variant="primary" className="px-12 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all">
            Tiếp tục: Cấu hình bài kiểm tra
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
         </Button>
      </div>
    </div>
  );
};