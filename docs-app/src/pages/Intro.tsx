import { Flame, Award } from 'lucide-react';
import Callout from '../components/ui/Callout';

interface IntroProps {
  isDarkMode: boolean;
}

export default function Intro({ isDarkMode: _isDarkMode }: IntroProps) {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Welcome Unit */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[12px] font-bold rounded-full uppercase tracking-wider">
          🐍 Python Coding Bible
        </div>
        <h1 className="text-3.5xl font-black text-slate-950 dark:text-white leading-tight tracking-tight mt-2">
          👑 Python 코딩 바이블
        </h1>
        <p className="text-[17px] font-semibold text-indigo-500 dark:text-indigo-400 leading-relaxed max-w-2xl">
          "실리콘밸리 감성으로 빚어낸, 오직 당신의 코딩테스트 합격만을 위한 가장 직관적이고 아름다운 파이썬 바이블"
        </p>
      </div>

      <hr className="border-slate-200/60 dark:border-zinc-800/40" />

      {/* Hero Admonition */}
      <Callout type="info" title="WELCOME HERO GREETINGS ✨">
        이곳은 흔한 템플릿 문서나 딱딱하고 지루한 이론서가 아닙니다. 
        코딩 테스트에 통과하기 위해 필요한 핵심만을 선별하고, 가독성을 극대화한 독학용 비밀 노트입니다. 
        실제 시험장에서 바로 복사해 쓸 수 있는 최적의 모범 답안과 풀이 기법들이 수록되어 있습니다.
      </Callout>

      {/* 3-Step Journey Grid Card */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
          <Award size={20} className="text-indigo-500" />
          <span>⚡ 3대 핵심 학습 로드맵 (Interactive Journey)</span>
        </h2>
        <p className="text-[14.5px] text-slate-500 dark:text-zinc-400 font-medium">
          사이드바 메뉴와 연동되어 있는 아카데미의 핵심 3단계 커리큘럼입니다. 각 레슨 우측의 원형 체크 단추를 활용하여 완독 여부를 체크해 보세요!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Card 1 */}
          <div className="p-6 bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/40 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 space-y-3">
            <div className="w-10 h-10 bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-500 rounded-xl flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h3 className="font-extrabold text-[15px] text-slate-950 dark:text-white">
              [1부] 파이썬 필수 문법 🐍
            </h3>
            <p className="text-[13px] text-slate-500 dark:text-zinc-400 leading-relaxed font-medium">
              쓸데없는 기초 이론은 완전히 생략하고, 오직 <strong>시간 초과 방지</strong>와 <strong>정교한 다중 정렬</strong> 구현에 집중합니다.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/40 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 space-y-3">
            <div className="w-10 h-10 bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-500 rounded-xl flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h3 className="font-extrabold text-[15px] text-slate-950 dark:text-white">
              [2부] 핵심 알고리즘 이론 🏆
            </h3>
            <p className="text-[13px] text-slate-500 dark:text-zinc-400 leading-relaxed font-medium">
              단골 유형 8가지를 선정하여 복잡한 수학 공식 없이 <strong>직관적 흐름과 시각화 도식</strong>으로 탐색 원리를 이해합니다.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/40 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 space-y-3">
            <div className="w-10 h-10 bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-500 rounded-xl flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h3 className="font-extrabold text-[15px] text-slate-950 dark:text-white">
              [3부] 기출문제 상세 해설집 ✨
            </h3>
            <p className="text-[13px] text-slate-500 dark:text-zinc-400 leading-relaxed font-medium">
              프로그래머스 고득점 키트 기출을 기반으로, <strong>"어떻게 문제를 읽고 이 탐욕 법칙을 선별하는지"</strong> 머릿속 판단 과정을 다각도로 조명합니다.
            </p>
          </div>
        </div>
      </div>

      {/* Premium Features Checklist */}
      <div className="space-y-4 pt-4">
        <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
          <Flame size={20} className="text-amber-500 animate-pulse" />
          <span>🎨 아카데미 200% 활용하는 프리미엄 기능</span>
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13.5px] font-medium text-slate-600 dark:text-zinc-400">
          <li className="flex items-start gap-2.5 p-3.5 bg-slate-100/40 dark:bg-zinc-900/30 border border-slate-200/30 dark:border-zinc-800/30 rounded-xl">
            <span className="text-indigo-500 font-bold">🌗</span>
            <span><strong>자동 테마 적응형 코드보드</strong>: 라이트/다크에 따라 맥북 실버와 카본 제트블랙 에디터가 실시간 스위칭됩니다.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3.5 bg-slate-100/40 dark:bg-zinc-900/30 border border-slate-200/30 dark:border-zinc-800/30 rounded-xl">
            <span className="text-indigo-500 font-bold">📋</span>
            <span><strong>애니메이션 원격 복사</strong>: 코드 우측 복사 단추를 클릭하면 부드러운 체크마크 피드백과 함께 복사됩니다.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3.5 bg-slate-100/40 dark:bg-zinc-900/30 border border-slate-200/30 dark:border-zinc-800/30 rounded-xl">
            <span className="text-indigo-500 font-bold">📈</span>
            <span><strong>실시간 자가 진도 보드</strong>: 완독 체크 단추를 누르면 상단 진도율 게이지가 실시간 연동되어 퍼센트로 집계됩니다.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3.5 bg-slate-100/40 dark:bg-zinc-900/30 border border-slate-200/30 dark:border-zinc-800/30 rounded-xl">
            <span className="text-indigo-500 font-bold">❓</span>
            <span><strong>실시간 지능형 퀴즈</strong>: 매 레슨 하단에서 즉시 선택지를 눌러 정오답 피드백과 상세 해설을 볼 수 있습니다.</span>
          </li>
        </ul>
      </div>

      {/* Bottom Danger Admonition */}
      <Callout type="danger" title="마지막 합격 약속 🛑">
        "코딩 테스트는 머리가 좋은 사람만 붙는 시험이 결코 아닙니다. 
        유형을 정확히 파악하고, 파이썬이라는 강력한 보검을 쥐고 반복 숙달하면 누구나 합격선을 정복할 수 있습니다. 
        준비가 완료되었다면 왼쪽 사이드바의 첫 레슨부터 이 찬란한 여정을 시작해 보세요! 🚀"
      </Callout>
    </div>
  );
}
