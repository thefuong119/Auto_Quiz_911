import React, { useRef, useState } from 'react';
import { Button } from './Button';
import { getMimeType } from '../services/geminiService';
import { FileData } from '../types';

interface FileUploadProps {
  onFileSelect: (fileData: FileData) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFile = (file: File) => {
    if (!file) return;
    
    const validTypes = ['.pdf', '.docx'];
    const isFileTypeValid = validTypes.some(type => file.name.toLowerCase().endsWith(type));
    
    if (!isFileTypeValid) {
      alert('Vui lòng chỉ chọn file PDF hoặc DOCX');
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Content = base64String.split(',')[1];
      
      onFileSelect({
        base64: base64Content,
        mimeType: getMimeType(file.name.toLowerCase()),
        name: file.name
      });
      setIsProcessing(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 px-4 animate-fade-in-scale">
      <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Tạo bài kiểm tra từ <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">tài liệu của bạn</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Upload file PDF hoặc Word. AI sẽ tự động phân tích, đưa ra đáp án và tạo đề thi trắc nghiệm chỉ trong vài giây.
          </p>
      </div>

      <div 
        className={`
          relative flex flex-col items-center justify-center w-full h-80 
          border-2 border-dashed rounded-3xl transition-all duration-300 ease-in-out group cursor-pointer
          ${dragActive 
            ? 'border-indigo-500 bg-indigo-50/50 scale-[1.01] shadow-xl' 
            : 'border-gray-300 bg-white hover:border-indigo-400 hover:bg-gray-50 hover:shadow-lg'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center p-8 pointer-events-none">
          <div className={`
            w-24 h-24 mb-6 rounded-full flex items-center justify-center transition-all duration-500
            ${dragActive ? 'bg-indigo-200 scale-110' : 'bg-indigo-50 group-hover:bg-indigo-100 group-hover:scale-110'}
          `}>
            <svg className={`w-12 h-12 text-indigo-600 transition-transform duration-500 ${dragActive ? 'animate-bounce' : 'group-hover:-translate-y-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
          </div>
          <p className="mb-2 text-xl font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors">
            Kéo thả tài liệu vào đây
          </p>
          <p className="mb-6 text-sm text-gray-500">
            hoặc click để chọn file từ máy tính
          </p>
          <div className="flex gap-3 items-center text-xs text-gray-400 bg-gray-100 px-4 py-2 rounded-full">
             <span className="flex items-center"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg> DOCX</span>
             <span className="w-1 h-1 rounded-full bg-gray-300"></span>
             <span className="flex items-center"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v.5zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5v1.5H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"/></svg> PDF</span>
          </div>
        </div>
        <input 
          ref={inputRef}
          type="file" 
          className="hidden" 
          accept=".pdf,.docx"
          onChange={(e) => e.target.files && handleFile(e.target.files[0])}
        />
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { emoji: "⚡", title: "Tốc độ ánh sáng", desc: "AI phân tích và đưa ra kết quả chỉ trong tích tắc." },
          { emoji: "🎯", title: "Độ chính xác cao", desc: "Sử dụng Gemini 1.5 Pro để hiểu sâu ngữ cảnh tài liệu." },
          { emoji: "🎓", title: "Trải nghiệm thi thật", desc: "Giao diện làm bài trực quan, tính giờ và chấm điểm tự động." }
        ].map((item, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="text-4xl mb-4 animate-float" style={{animationDelay: `${idx * 1}s`}}>{item.emoji}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
        ))}
      </div>
    </div>
  );
};