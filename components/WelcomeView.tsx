import React from 'react';
import { Button } from './Button';

interface WelcomeViewProps {
  onStart: () => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({ onStart }) => {
  return (
    <div className="max-w-6xl mx-auto mt-8 px-4 pb-20">
      {/* Hero Section */}
      <div className="text-center mb-16 animate-fade-in-scale">
        <div className="inline-block mb-4 p-2 px-4 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-medium text-sm">
          ✨ Trợ lý giáo dục thông minh
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
          Biến tài liệu thành <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Bài Kiểm Tra Online</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-3xl mx-auto mb-8 leading-relaxed">
          Chỉ cần tải lên file Word hoặc PDF. Hệ thống sử dụng AI để tự động giải bài tập và tạo đề thi trắc nghiệm chuyên nghiệp trong vài giây.
        </p>
        <div className="flex justify-center">
            <Button 
                onClick={onStart} 
                className="px-10 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all bg-gradient-to-r from-indigo-600 to-purple-600 border-0"
            >
                Bắt Đầu Ngay
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
            </Button>
        </div>
      </div>

      {/* Steps Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-200 -translate-y-1/2 z-0"></div>

        {/* Step 1 */}
        <div className="glass-card p-8 rounded-3xl relative z-10 hover:-translate-y-2 transition-transform duration-300 group animate-slide-up" style={{animationDelay: '0.1s'}}>
            <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-6 mx-auto text-3xl border border-indigo-50 group-hover:scale-110 transition-transform">
                📂
            </div>
            <div className="absolute -top-4 -right-4 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg border-4 border-white">
                1
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-3">Tải lên tài liệu</h3>
            <p className="text-gray-500 text-center leading-relaxed">
                Hỗ trợ định dạng <strong>.docx</strong> và <strong>.pdf</strong>. Bạn có thể dùng đề thi cũ, giáo trình hoặc tài liệu ôn tập.
            </p>
        </div>

        {/* Step 2 */}
        <div className="glass-card p-8 rounded-3xl relative z-10 hover:-translate-y-2 transition-transform duration-300 group animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-6 mx-auto text-3xl border border-indigo-50 group-hover:scale-110 transition-transform">
                🤖
            </div>
            <div className="absolute -top-4 -right-4 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg border-4 border-white">
                2
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-3">AI Phân Tích</h3>
            <p className="text-gray-500 text-center leading-relaxed">
                Gemini AI sẽ đọc hiểu nội dung, tự động tìm câu hỏi bài tập và đưa ra <strong>lời giải chi tiết</strong>.
            </p>
        </div>

        {/* Step 3 */}
        <div className="glass-card p-8 rounded-3xl relative z-10 hover:-translate-y-2 transition-transform duration-300 group animate-slide-up" style={{animationDelay: '0.3s'}}>
            <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-6 mx-auto text-3xl border border-indigo-50 group-hover:scale-110 transition-transform">
                📝
            </div>
             <div className="absolute -top-4 -right-4 w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg border-4 border-white">
                3
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-3">Tạo & Làm Bài</h3>
            <p className="text-gray-500 text-center leading-relaxed">
                Tùy chỉnh số lượng câu hỏi, thời gian và tạo bài trắc nghiệm online để học sinh <strong>thử sức ngay</strong>.
            </p>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="mt-20 bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 animate-slide-up" style={{animationDelay: '0.4s'}}>
         <h2 className="text-3xl font-bold text-center mb-12">Tại sao giáo viên tin dùng?</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 text-xl">
                    ⚡
                </div>
                <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Tiết kiệm 90% thời gian</h4>
                    <p className="text-gray-500">Thay vì mất hàng giờ soạn đề và đáp án, AI xử lý mọi thứ trong tích tắc.</p>
                </div>
            </div>
             <div className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-xl">
                    🎯
                </div>
                <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Chính xác & Khách quan</h4>
                    <p className="text-gray-500">Hệ thống chấm điểm tự động, loại bỏ sai sót của con người.</p>
                </div>
            </div>
             <div className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 text-xl">
                    📊
                </div>
                <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Báo cáo kết quả</h4>
                    <p className="text-gray-500">Gửi kết quả chi tiết qua Email giúp học sinh nắm bắt kiến thức còn hổng.</p>
                </div>
            </div>
             <div className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 text-xl">
                    ♾️
                </div>
                <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Không giới hạn</h4>
                    <p className="text-gray-500">Tạo vô số đề thi từ cùng một tài liệu với các biến thể câu hỏi khác nhau.</p>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};