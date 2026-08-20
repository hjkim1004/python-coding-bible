import { Suspense, useEffect, useMemo, useState } from 'react';
import { ALL_LESSONS, partOf } from './content/curriculum';
import Intro from './content/Intro';
import NotFound from './content/NotFound';
import Pager from './components/Pager';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import { useDocumentTitle } from './lib/useDocumentTitle';
import { useHashRoute } from './lib/useHashRoute';
import { useProgress } from './lib/useProgress';
import { useTheme } from './lib/useTheme';

export default function App() {
  const route = useHashRoute();
  const { theme, toggle: toggleTheme } = useTheme();
  const { done, toggle: toggleDone, isDone } = useProgress();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const lesson = useMemo(() => ALL_LESSONS.find((l) => l.id === route) ?? null, [route]);
  const index = lesson ? ALL_LESSONS.indexOf(lesson) : -1;
  const prev = index > 0 ? ALL_LESSONS[index - 1] : null;
  const next = index >= 0 && index < ALL_LESSONS.length - 1 ? ALL_LESSONS[index + 1] : null;

  const notFound = !lesson && route !== '';
  useDocumentTitle(lesson?.title ?? (notFound ? '찾지 못했습니다' : undefined));

  // 강을 옮기면 글의 처음부터 읽어야 한다
  useEffect(() => {
    window.scrollTo({ top: 0 });
    setDrawerOpen(false);
  }, [route]);

  // 다음 강은 미리 받아 둔다 — 지금 화면을 다 그린 뒤, 한가할 때만
  useEffect(() => {
    if (!next) return;
    const idle = window.requestIdleCallback ?? ((fn: () => void) => window.setTimeout(fn, 300));
    const handle = idle(() => void next.page.preload());
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(handle as number);
      else window.clearTimeout(handle as number);
    };
  }, [next]);

  // 서랍이 열려 있는 동안에는 뒤쪽 글이 따라 움직이지 않는다
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawerOpen]);

  const Body = lesson?.page;
  const part = lesson ? partOf(lesson.id) : undefined;

  return (
    <div className="shell">
      <a className="skip" href="#content">본문으로 건너뛰기</a>

      <Sidebar
        route={route}
        open={drawerOpen}
        doneCount={done.length}
        isDone={isDone}
        onToggleDone={toggleDone}
      />

      {drawerOpen && (
        <button className="scrim" aria-label="목차 닫기" onClick={() => setDrawerOpen(false)} />
      )}

      <div className="shell__main">
        <TopBar
          crumb={
            lesson && part
              ? { part: part.title, lesson: lesson.title }
              : notFound
                ? { part: '주소', lesson: '찾지 못했습니다' }
                : null
          }
          drawerOpen={drawerOpen}
          onToggleDrawer={() => setDrawerOpen((v) => !v)}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <main className="reading" id="content">
          {Body ? (
            /* 강을 받아 오는 동안 — 금방 오면 이 자리는 눈에 띄지 않는다 */
            <Suspense fallback={<p className="loading">강을 펼치는 중…</p>}>
              <Body />
            </Suspense>
          ) : notFound ? (
            <NotFound route={route} />
          ) : (
            <Intro />
          )}

          {lesson && (
            <Pager
              prev={prev}
              next={next}
              done={isDone(lesson.id)}
              onToggleDone={() => toggleDone(lesson.id)}
            />
          )}
        </main>
      </div>
    </div>
  );
}
