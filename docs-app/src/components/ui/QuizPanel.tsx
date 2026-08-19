import { useState } from 'react';
import { CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

interface QuizOption {
  text: string;
  isCorrect: boolean;
  explanation: string;
}

interface QuizPanelProps {
  question: string;
  options: QuizOption[];
}

export default function QuizPanel({ question, options }: QuizPanelProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isSubmitted, setIsDarkMode] = useState<boolean>(false);

  const handleOptionClick = (idx: number) => {
    setSelectedIdx(idx);
    setIsDarkMode(true);
  };

  const activeOption = selectedIdx !== null ? options[selectedIdx] : null;

  return (
    <div className="my-8 p-6 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-md transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-500 rounded-lg">
          <Sparkles size={16} />
        </div>
        <span className="text-[12px] font-extrabold tracking-widest text-indigo-500 uppercase">Self Checkup Quiz</span>
      </div>

      <h3 className="text-[16px] font-bold text-slate-900 dark:text-white leading-snug mb-5">
        {question}
      </h3>

      <div className="space-y-2.5">
        {options.map((opt, idx) => {
          const isSelected = selectedIdx === idx;
          let btnClass = "border-slate-200 dark:border-zinc-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-zinc-800/30 text-slate-700 dark:text-zinc-300";

          if (isSubmitted && isSelected) {
            btnClass = opt.isCorrect 
              ? "border-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold" 
              : "border-red-500 bg-red-500/10 dark:bg-red-500/10 text-red-600 dark:text-red-400 font-bold animate-shake";
          }

          return (
            <button
              key={idx}
              disabled={isSubmitted}
              onClick={() => handleOptionClick(idx)}
              className={`
                w-full flex items-center justify-between p-4 border rounded-xl text-[14px] text-left transition-all duration-200 active:scale-[0.99]
                ${btnClass}
              `}
            >
              <span>{opt.text}</span>
              {isSubmitted && isSelected && (
                opt.isCorrect 
                  ? <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                  : <AlertCircle size={16} className="text-red-500 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {isSubmitted && activeOption && (
        <div className={`
          mt-5 p-4 rounded-xl border transition-all duration-300 animate-fadeIn text-[13.5px] leading-relaxed
          ${activeOption.isCorrect 
            ? 'bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-200/50 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-300' 
            : 'bg-red-50/50 dark:bg-red-950/10 border-red-200/50 dark:border-red-900/30 text-red-800 dark:text-red-300'}
        `}>
          <div className="font-extrabold flex items-center gap-1.5 mb-1">
            {activeOption.isCorrect ? "🎉 정답입니다!" : "😢 아쉬워요! 다시 도전해 보세요."}
          </div>
          <p className="font-medium">{activeOption.explanation}</p>
        </div>
      )}
    </div>
  );
}
