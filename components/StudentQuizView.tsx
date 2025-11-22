import React, { useState, useEffect, useCallback } from 'react';
import { QuizQuestion } from '../types';
import { Button } from './Button';

interface StudentQuizViewProps {
  questions: QuizQuestion[];
  durationMinutes: number;
  onFinish: () => void;
}

export const StudentQuizView: React.FC<StudentQuizViewProps> = ({ questions, durationMinutes, onFinish }) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  
  // Email Sending State
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Handle Timer
  useEffect(() => {
    if (isSubmitted) return;
    
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, isSubmitted]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const getProgress = () => {
    const answeredCount = Object.keys(answers).length;
    return (answeredCount / questions.length) * 100;
  };

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = useCallback(() => {
    let correctCount = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswerIndex) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [answers, questions]);

  const handleRetake = () => {
    setAnswers({});
    setScore(0);
    setIsSubmitted(false);
    setTimeLeft(durationMinutes * 60);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSendEmail = () => {
      if (!email || !email.includes('@')) {
          alert('Vui lòng nhập địa chỉ email hợp lệ');
          return;
      }
      setIsSendingEmail(true);
      
      // Simulation of sending email
      setTimeout(() => {
          setIsSendingEmail(false);
          setShowEmailModal(false);
          alert(`Đã gửi kết quả chi tiết bài kiểm tra đến ${email} thành công!`);
          setEmail('');
      }, 2000);
  };

  if (isSubmitted) {
    const percentage = Math.round((score / questions.length) * 100);
    const isHighSearch = percentage >= 80;
    
    return (
      <div className="max-w-4xl mx-auto mt-8 p-4 animate-fade-in-scale relative">
        <div className="glass-card rounded-3xl shadow-2xl overflow-hidden mb-10 text-center relative">
            {/* Result Header Background */}
            <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${isHighSearch ? 'from-yellow-400 to-orange-500' : 'from-indigo-500 to-purple-600'}`}></div>
            
            <div className="p-12">
                <div className={`mb-6 inline-flex items-center justify-center w-32 h-32 rounded-full ${isHighSearch ? 'bg-yellow-50 text-yellow-500' : 'bg-indigo-50 text-indigo-600'} shadow-inner mx-auto relative`}>
                     {isHighSearch && <div className="absolute -top-2 -right-2 text-4xl animate-bounce">✨</div>}
                    <span className="text-6xl">{isHighSearch ? '🏆' : percentage >= 50 ? '👍' : '📚'}</span>
                </div>
                
                <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
                    {isHighSearch ? 'Xuất Sắc!' : percentage >= 50 ? 'Làm Tốt Lắm!' : 'Cần Cố Gắng Thêm'}
                </h2>
                <p className="text-gray-500 mb-10 text-lg">Bạn đã hoàn thành bài kiểm tra</p>
                
                <div className="grid grid-cols-2 gap-6 max-w-md mx-auto mb-10">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Điểm số</div>
                        <div className="text-4xl font-black text-gray-800">{score}<span className="text-xl text-gray-400 font-medium">/{questions.length}</span></div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Chính xác</div>
                        <div className={`text-4xl font-black ${isHighSearch ? 'text-green-500' : 'text-indigo-600'}`}>{percentage}%</div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
                     <Button onClick={() => setShowEmailModal(true)} variant="secondary" className="px-6">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        Gửi kết quả
                     </Button>
                     
                     <Button onClick={handleRetake} variant="outline" className="px-6 border-gray-300 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                        Làm lại
                     </Button>

                     <Button onClick={onFinish} variant="danger" className="px-8 shadow-lg bg-red-500 hover:bg-red-600 focus:ring-red-500 border-transparent text-white">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        Thoát
                     </Button>
                </div>
            </div>
        </div>

        <div className="space-y-8">
            <div className="flex items-center gap-4 mb-6">
                <div className="h-px bg-gray-200 flex-grow"></div>
                <h3 className="text-xl font-bold text-gray-500 uppercase tracking-widest">Chi tiết đáp án</h3>
                <div className="h-px bg-gray-200 flex-grow"></div>
            </div>

            {questions.map((q, idx) => {
                const userAnswer = answers[q.id];
                const isCorrect = userAnswer === q.correctAnswerIndex;
                
                return (
                    <div key={q.id} className={`bg-white p-8 rounded-2xl shadow-sm border-l-4 transition-all hover:shadow-md ${isCorrect ? 'border-green-500' : 'border-red-500'}`}>
                        <p className="font-bold text-gray-900 mb-6 text-lg flex gap-3">
                            <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {idx + 1}
                            </span> 
                            {q.question}
                        </p>
                        <div className="grid gap-3">
                            {q.options.map((opt, optIdx) => {
                                const isSelected = userAnswer === optIdx;
                                const isTheCorrectOne = q.correctAnswerIndex === optIdx;
                                
                                let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all flex justify-between items-center ";
                                if (isTheCorrectOne) {
                                    btnClass += "bg-green-50 border-green-400 text-green-900 font-medium shadow-sm";
                                } else if (isSelected && !isCorrect) {
                                    btnClass += "bg-red-50 border-red-300 text-red-900 opacity-90";
                                } else {
                                    btnClass += "bg-white border-gray-100 text-gray-400 opacity-60";
                                }

                                return (
                                    <div key={optIdx} className={btnClass}>
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-sm w-6">{String.fromCharCode(65 + optIdx)}.</span>
                                            {opt}
                                        </div>
                                        {isTheCorrectOne && <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>}
                                        {isSelected && !isCorrect && <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>

        {/* Email Modal */}
        {showEmailModal && (
            <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-20 animate-in fade-in duration-200">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-slide-up">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white text-center">
                        <h3 className="text-xl font-bold">Gửi Kết Quả</h3>
                        <p className="text-indigo-100 text-sm opacity-90">Nhập email để nhận báo cáo chi tiết bài làm</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ Email</label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="vidu@gmail.com"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            />
                        </div>
                        <div className="flex gap-3 mt-4">
                            <Button onClick={() => setShowEmailModal(false)} variant="outline" className="flex-1 border-gray-300">
                                Hủy
                            </Button>
                            <Button 
                                onClick={handleSendEmail} 
                                variant="primary" 
                                className="flex-1"
                                isLoading={isSendingEmail}
                            >
                                Gửi Ngay
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 pb-32 px-4">
      <div className="space-y-8 mb-20">
        {questions.map((q, idx) => (
          <div key={q.id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 leading-relaxed flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white text-sm font-bold rounded-lg flex items-center justify-center shadow-md shadow-indigo-200">
                {idx + 1}
              </span>
              {q.question}
            </h3>
            <div className="grid grid-cols-1 gap-3 pl-0 md:pl-12">
              {q.options.map((opt, optIdx) => {
                 const isSelected = answers[q.id] === optIdx;
                 return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`
                        group relative text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center overflow-hidden
                        ${isSelected 
                          ? 'bg-indigo-50 border-indigo-500 shadow-md scale-[1.01]' 
                          : 'bg-white border-gray-100 hover:border-indigo-200 hover:bg-gray-50'}
                      `}
                    >
                      <div className={`
                        w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 text-sm font-bold transition-colors
                        ${isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-200 text-gray-400 group-hover:border-indigo-300 group-hover:text-indigo-500'}
                      `}>
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span className={`font-medium ${isSelected ? 'text-indigo-900' : 'text-gray-600'}`}>
                        {opt}
                      </span>
                      
                      {isSelected && (
                          <span className="absolute right-4 text-indigo-600 animate-fade-in-scale">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          </span>
                      )}
                    </button>
                 );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Progress Bar & Submit */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-indigo-100 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] z-50 animate-slide-up">
         <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-6">
             {/* Timer */}
            <div className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-xl border transition-colors ${timeLeft < 60 ? 'bg-red-50 border-red-200 text-red-600 animate-pulse' : 'bg-gray-50 border-gray-200 text-gray-700'}`}>
                 <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {formatTime(timeLeft)}
            </div>

            {/* Progress */}
            <div className="flex-grow flex flex-col justify-center">
                <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    <span>Tiến độ</span>
                    <span>{Object.keys(answers).length} / {questions.length} câu</span>
                </div>
                <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                    <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out rounded-full shadow-sm"
                        style={{ width: `${getProgress()}%` }}
                    ></div>
                </div>
            </div>

            {/* Submit Button */}
            <Button 
                onClick={handleSubmit} 
                variant="primary"
                className="px-6 sm:px-8 py-3 text-sm sm:text-base font-bold shadow-indigo-500/40 whitespace-nowrap"
            >
                Nộp Bài
            </Button>
         </div>
      </div>
    </div>
  );
};