import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  ChevronRight, 
  ChevronDown, 
  Menu, 
  X, 
  Moon, 
  Sun, 
  ExternalLink, 
  ArrowRight, 
  ArrowLeft, 
  Flame,
  CheckCircle2,
  Compass
} from 'lucide-react';
import { CURRICULUM, CurriculumItem, INTRO_ITEM } from './curriculum';

export default function App() {
  const [activeItem, setActiveItem] = useState<CurriculumItem>(INTRO_ITEM);
  // 모바일에서는 접힌 채로 시작한다 — 첫 화면이 목차에 가려지면 안 된다
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(
    typeof window === 'undefined' || window.innerWidth >= 1024
  );
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    localStorage.getItem('theme') === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  // 학습 완료 체크박스 상태 (localStorage로 영구 보관)
  const [completedItems, setCompletedItems] = useState<string[]>(() => {
    const saved = localStorage.getItem('completed_lessons');
    return saved ? JSON.parse(saved) : [];
  });

  // 본문 스크롤 컨테이너 (단원을 옮기면 맨 위에서 다시 시작해야 한다)
  const mainRef = useRef<HTMLElement>(null);

  // 표준 라이브러리 하위 아코디언 폴더 접기/펼치기 상태
  const [isLibraryExpanded, setIsLibraryExpanded] = useState<boolean>(false);

  // 활성화된 단원이 표준 라이브러리 계열이면 아코디언 자동으로 열기
  useEffect(() => {
    if (activeItem.id.startsWith("syntax-05")) {
      setIsLibraryExpanded(true);
    }
  }, [activeItem]);

  // 단원이 바뀌면 본문을 맨 위로 되돌린다
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'auto' });
  }, [activeItem]);

  // Dark Mode 제어
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // 체크박스 클릭 핸들러
  const toggleComplete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 클릭 이벤트 버블링 방지
    const updated = completedItems.includes(id)
      ? completedItems.filter(item => item !== id)
      : [...completedItems, id];
    setCompletedItems(updated);
    localStorage.setItem('completed_lessons', JSON.stringify(updated));
  };

  // 전체 학습 대상 아이템 수 및 완료율 계산
  const totalLessons = CURRICULUM.reduce((acc, sec) => acc + sec.items.length, 0);
  const completionRate = Math.round((completedItems.length / totalLessons) * 100) || 0;

  // 다음 단원 / 이전 단원 찾기 (0초 딜레이 넘어가기 지원)
  const allItemsList = [
    { ...INTRO_ITEM, sectionTitle: "바이블 소개" },
    ...CURRICULUM.flatMap(section => 
      section.items.map(item => ({ ...item, sectionTitle: section.title }))
    )
  ];
  const currentIndex = allItemsList.findIndex(item => item.id === activeItem.id);
  const prevItem = currentIndex > 0 ? allItemsList[currentIndex - 1] : null;
  const nextItem = currentIndex < allItemsList.length - 1 ? allItemsList[currentIndex + 1] : null;

  // 활성화된 리액트 페이지 컴포넌트 획득
  const ActivePageComponent = activeItem.component;

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 font-sans transition-colors duration-200">
      
      {/* 🌌 SILICON VALLEY Glow Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] bg-indigo-500/10 dark:bg-indigo-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] bg-purple-500/10 dark:bg-purple-900/5 rounded-full blur-[140px]" />
      </div>

      {/* MOBILE TRIGGER */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-2xl lg:hidden transition-all transform hover:scale-105 active:scale-95"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* 💎 GLASSMORPHISM PREMIUM SIDEBAR (구조적 고정-스크롤 분리 아키텍처) */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-80 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-r border-slate-200/60 dark:border-zinc-800/40 p-6 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 lg:static lg:h-screen lg:shrink-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* 1. 고정 브랜드 헤더 (절대 수축되지 않음) */}
        <div className="shrink-0 mb-6">
          {/* Logo Brand Card */}
          <div className="flex items-center gap-3 p-1 rounded-2xl">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow-xl shadow-indigo-500/20">
              <BookOpen size={22} />
            </div>
            <div>
              <h1 className="font-extrabold text-[15px] tracking-tight text-slate-950 dark:text-white leading-tight">
                Python 코딩 바이블
              </h1>
              <p className="text-[11px] text-indigo-500 dark:text-indigo-400 font-bold tracking-wider uppercase mt-0.5">Interactive Edition</p>
            </div>
          </div>
        </div>

        {/* 2. 고정 진도율 카드 (수축 방지 shrink-0 적용 완료! 절대 잘리지 않음 🌟) */}
        <div className="shrink-0 bg-slate-100/50 dark:bg-zinc-800/30 border border-slate-200/40 dark:border-zinc-800/30 rounded-2xl p-4 mb-5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Flame size={15} className="text-amber-500 animate-pulse" />
              <span className="text-[12.5px] font-bold text-slate-700 dark:text-zinc-300">나의 코딩 바이블 진도</span>
            </div>
            <span className="text-[12px] font-extrabold text-indigo-500">{completionRate}%</span>
          </div>
          {/* Smooth Progress Bar */}
          <div className="w-full bg-slate-200 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 dark:text-zinc-500 mt-2 font-medium">
            총 {totalLessons}개 레슨 중 {completedItems.length}개 완료!
          </p>
        </div>

        {/* 3. 고정 바이블 소개 단추 (0초 딜레이) */}
        <button
          onClick={() => {
            setActiveItem(INTRO_ITEM);
            if (window.innerWidth < 1024) setIsSidebarOpen(false);
          }}
          className={`
            shrink-0 w-full flex items-center justify-between px-4 py-3.5 mb-5 rounded-2xl text-[14px] font-bold transition-all duration-200
            ${activeItem.id === INTRO_ITEM.id 
              ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-500/20" 
              : "text-slate-700 dark:text-zinc-400 hover:bg-slate-100/60 dark:hover:bg-zinc-800/40"}
          `}
        >
          <div className="flex items-center gap-3">
            <Compass size={17} />
            <span>바이블 소개</span>
          </div>
          <ChevronRight size={14} className={activeItem.id === INTRO_ITEM.id ? "text-white" : "text-slate-400"} />
        </button>

        {/* 4. 오직 목차만 스크롤되는 세련된 독립 네비게이션 트리 (flex-1 overflow-y-auto 적용 ⚡) */}
        <nav className="flex-1 overflow-y-auto pr-1 space-y-6 scrollbar-thin">
          {CURRICULUM.map((section, sIdx) => (
            <div key={sIdx} className="space-y-2.5">
              <h2 className="text-[11px] uppercase font-bold tracking-widest text-slate-400 dark:text-zinc-500 px-3">
                {section.title}
              </h2>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isCompleted = completedItems.includes(item.id);
                  const isSubItem = item.id.startsWith("syntax-05-");

                  // 6대 표준 라이브러리 하위 단원 아코디언 폴딩 필터링
                  if (isSubItem && !isLibraryExpanded) {
                    return null;
                  }

                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        // 대대적인 대주제 항목 클릭 시 아코디언 폴더 토글 처리
                        if (item.id === "syntax-05") {
                          setIsLibraryExpanded(!isLibraryExpanded);
                        }
                        setActiveItem(item);
                        if (window.innerWidth < 1024) setIsSidebarOpen(false);
                      }}
                      className={`
                        w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-[13.5px] font-medium transition-all duration-200 text-left cursor-pointer group
                        ${activeItem.id === item.id 
                          ? "bg-indigo-500/5 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-500/20 shadow-sm" 
                          : "text-slate-700 dark:text-zinc-400 hover:bg-slate-100/40 dark:hover:bg-zinc-800/20 border border-transparent"}
                      `}
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        {/* 05번 부모 항목일 때만 노출되는 전용 화살표 접기/펼치기 토글 단추 */}
                        {item.id === "syntax-05" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // 부모 항목 선택 이동 이벤트 전이 차단!
                              setIsLibraryExpanded(!isLibraryExpanded);
                            }}
                            className={`
                              p-1 rounded-md transition-all active:scale-90 shrink-0
                              ${isDarkMode 
                                ? 'hover:bg-zinc-800 text-zinc-500 hover:text-white' 
                                : 'hover:bg-slate-100 text-slate-400 hover:text-slate-900'}
                            `}
                            title={isLibraryExpanded ? "목차 접기" : "목차 펼치기"}
                          >
                            {isLibraryExpanded ? (
                              <ChevronDown size={14} className="text-indigo-500 animate-fadeIn" />
                            ) : (
                              <ChevronRight size={14} />
                            )}
                          </button>
                        )}

                        {/* 하위 단원일 때 리액트 전용 전술 선(Tree Line) 수제 렌더링 */}
                        {isSubItem && (
                          <span className="text-slate-300 dark:text-zinc-700 font-mono text-[12px] select-none shrink-0 pl-2 pr-0.5">
                            {item.id === "syntax-05-6" ? "└─" : "├─"}
                          </span>
                        )}
                        <span className={`truncate ${isCompleted ? 'text-slate-400 dark:text-zinc-500 line-through' : ''}`}>
                          {/* 타이틀 내부의 투박한 '  ├─' 문자열을 자동으로 발라내어 순수 텍스트만 출력 */}
                          {isSubItem ? item.title.replace(/[\s├─└─]/g, '') : item.title}
                        </span>
                      </div>
                      
                      {/* 완독 체크박스를 가장 우측(Chevron 자리)으로 완벽하게 이동 배치 */}
                      <div className="flex items-center gap-2 shrink-0 pl-1">
                        <button
                          onClick={(e) => toggleComplete(item.id, e)}
                          className="text-slate-300 dark:text-zinc-700 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                        >
                          {isCompleted ? (
                            <CheckCircle2 size={16} className="text-emerald-500 fill-emerald-500/10" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-slate-300 dark:border-zinc-700 hover:border-indigo-500" />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* 5. 고정 하단 푸터 (절대 수축되지 않으며 mt-auto로 밀착) */}
        <div className="shrink-0 border-t border-slate-200/60 dark:border-zinc-800/40 pt-4 flex items-center justify-between mt-4">
          {/* Copyright 인장 (left side) */}
          <div className="text-[10px] text-slate-400 dark:text-zinc-500 font-bold tracking-tight pr-2">
            © 2026 twinklekhj. All rights reserved.
          </div>
          {/* Theme switcher button (right side) */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 bg-slate-100 dark:bg-zinc-800/60 rounded-xl hover:bg-slate-200 dark:hover:bg-zinc-700 transition-all active:scale-90 border border-slate-200/50 dark:border-zinc-800/50 shrink-0"
            title="테마 변경"
          >
            {isDarkMode ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-slate-600" />}
          </button>
        </div>
      </aside>

      {/* MAIN DOCUMENT AREA (Silicon Valley Premium layout) */}
      <main ref={mainRef} className="flex-1 overflow-y-auto max-h-screen p-8 lg:p-14 animate-fadeIn">
        <div className="max-w-4xl mx-auto">
          
          {/* TOP FLOATING BREADCRUMBS HEADER */}
          <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-zinc-800/40 pb-5 mb-10">
            <div className="text-[12.5px] text-slate-400 dark:text-zinc-500 font-bold tracking-tight flex items-center gap-2">
              <span className="hover:text-indigo-500 transition-colors cursor-pointer" onClick={() => setActiveItem(INTRO_ITEM)}>Python Coding Bible</span>
              {/* 동적으로 부모 Part 타이틀을 추적하여 중간 마디에 수혈 🌟 */}
              {(() => {
                const currentActive = allItemsList.find(item => item.id === activeItem.id) || activeItem;
                const hasSection = (currentActive as any).sectionTitle && (currentActive as any).sectionTitle !== "바이블 소개";
                return hasSection ? (
                  <>
                    <ChevronRight size={12} className="text-slate-300 dark:text-zinc-700" />
                    <span className="text-slate-400 dark:text-zinc-500 font-medium">{(currentActive as any).sectionTitle.replace(/[\s🐍🏆✨]/g, '')}</span>
                  </>
                ) : null;
              })()}
              <ChevronRight size={12} className="text-slate-300 dark:text-zinc-700" />
              <span className="text-indigo-500 dark:text-indigo-400">{activeItem.title}</span>
            </div>
            {activeItem.id.startsWith("solve-") && (
              <a 
                href={activeItem.id === "solve-01" ? "https://school.programmers.co.kr/learn/courses/30/lessons/42862" : "https://www.acmicpc.net/problem/1260"}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white hover:bg-indigo-600 dark:bg-indigo-500/20 dark:hover:bg-indigo-500/30 dark:text-indigo-400 text-[12px] font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/10"
              >
                <span>실전 문제 풀러 가기</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>

          {/* ACTIVE CURRICULUM REACT COMPONENT PAGE (0초 로딩 연출!) */}
          <div className="min-h-[50vh] prose-custom">
            <ActivePageComponent isDarkMode={isDarkMode} />
          </div>

          {/* 📖 PREVIOUS & NEXT LESSON NAVIGATION CARDS (Double Card Design) */}
          <div className="border-t border-slate-200 dark:border-zinc-800/60 pt-8 mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
            {prevItem ? (
              <div 
                onClick={() => setActiveItem(prevItem)}
                className="p-5 bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/40 rounded-2xl hover:border-indigo-500/40 hover:shadow-lg dark:hover:shadow-indigo-500/5 cursor-pointer transition-all duration-300 flex flex-col items-start gap-1 group animate-fadeIn"
              >
                <span className="text-[11px] uppercase font-bold text-slate-400 dark:text-zinc-500 tracking-wider flex items-center gap-1 group-hover:-translate-x-0.5 transition-transform">
                  <ArrowLeft size={12} /> {(prevItem as any).sectionTitle}
                </span>
                <span className="text-[14.5px] font-extrabold text-slate-800 dark:text-zinc-200">
                  {prevItem.title}
                </span>
              </div>
            ) : <div />}

            {nextItem ? (
              <div 
                onClick={() => setActiveItem(nextItem)}
                className="p-5 bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/40 rounded-2xl hover:border-indigo-500/40 hover:shadow-lg dark:hover:shadow-indigo-500/5 cursor-pointer transition-all duration-300 flex flex-col items-end text-right gap-1 group animate-fadeIn"
              >
                <span className="text-[11px] uppercase font-bold text-indigo-500 dark:text-indigo-400 tracking-wider flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  {(nextItem as any).sectionTitle} <ArrowRight size={12} />
                </span>
                <span className="text-[14.5px] font-extrabold text-slate-800 dark:text-zinc-200">
                  {nextItem.title}
                </span>
              </div>
            ) : <div />}
          </div>

        </div>
      </main>
    </div>
  );
}
