import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeViewerProps {
  code: string;
  language?: string;
  isDarkMode: boolean;
}

export default function CodeViewer({ code, language = 'python', isDarkMode }: CodeViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`
      relative my-8 rounded-2xl overflow-hidden border shadow-xl transition-all duration-300 group
      ${isDarkMode 
        ? 'border-zinc-800/60 shadow-indigo-950/5 hover:border-indigo-500/40 bg-[#0d0d12]' 
        : 'border-slate-200 shadow-slate-100 hover:border-indigo-500/40 bg-[#f8f9fa]'}
    `}>
      {/* macOS Title Bar Header */}
      <div className={`
        flex items-center justify-between px-4 py-3 border-b transition-colors
        ${isDarkMode 
          ? 'bg-[#111116] border-zinc-900/60' 
          : 'bg-slate-100 border-slate-200'}
      `}>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56] block" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e] block" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f] block" />
          <span className={`
            text-[11.5px] font-bold ml-2 font-mono uppercase tracking-wider
            ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}
          `}>
            🐍 {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className={`
            p-1.5 rounded-lg active:scale-90 transition-all flex items-center gap-1
            ${isDarkMode 
              ? 'text-zinc-500 hover:text-white hover:bg-zinc-800' 
              : 'text-slate-500 hover:text-slate-950 hover:bg-slate-200'}
          `}
          title="코드 복사"
        >
          {copied ? (
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-500">
              <Check size={12} /> 복사 완료
            </span>
          ) : (
            <span className={`
              flex items-center gap-1 text-[11px] font-bold
              ${isDarkMode ? 'text-zinc-500 hover:text-zinc-300' : 'text-slate-500 hover:text-slate-700'}
            `}>
              <Copy size={12} /> 코드 복사
            </span>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        style={isDarkMode ? oneDark : oneLight}
        language={language}
        PreTag="pre"
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          background: isDarkMode ? '#0d0d12' : '#f8f9fa',
          fontSize: '13.5px',
          lineHeight: '1.65',
        }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
