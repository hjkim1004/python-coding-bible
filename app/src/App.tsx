import { useEffect, useMemo, useRef, useState } from 'react';
import { ALL_LESSONS, PARTS, partOf } from './content/curriculum';
import Intro from './content/Intro';
import { CheckIcon, CloseIcon, MenuIcon, MoonIcon, SunIcon } from './components/Icons';
import { hrefFor, useHashRoute } from './lib/useHashRoute';
import { useProgress } from './lib/useProgress';
import { useTheme } from './lib/useTheme';

export default function App() {
  const route = useHashRoute();
  const { theme, toggle: toggleTheme } = useTheme();
  const { done, toggle: toggleDone, isDone } = useProgress();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const lesson = useMemo(() => ALL_LESSONS.find((l) => l.id === route) ?? null, [route]);
  const index = lesson ? ALL_LESSONS.indexOf(lesson) : -1;
  const prev = index > 0 ? ALL_LESSONS[index - 1] : null;
  const next = index >= 0 && index < ALL_LESSONS.length - 1 ? ALL_LESSONS[index + 1] : null;

  const rate = Math.round((done.length / ALL_LESSONS.length) * 100);

  // 레슨을 옮기면 글의 처음부터 읽어야 한다
  useEffect(() => {
    topRef.current?.scrollIntoView({ block: 'start' });
    window.scrollTo({ top: 0 });
    setDrawerOpen(false);
  }, [route]);

  // 좁은 화면에서 서랍이 열려 있는 동안에는 뒤쪽 글이 따라 움직이지 않는다
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

  return (
    <div className="shell">
      <a className="skip" href="#content">본문으로 건너뛰기</a>

      <nav className="nav" data-open={drawerOpen} aria-label="목차">
        <div className="nav__head">
          <a className="nav__brand" href={hrefFor('')}>
            <span className="nav__mark" aria-hidden>🐍</span>
            <span>
              <span className="nav__title">파이썬 코딩테스트</span>
              <br />
              <span className="nav__sub">Twinkle Labs</span>
            </span>
          </a>

          <div className="progress">
            <div className="progress__row">
              <span className="progress__label">읽은 만큼</span>
              <span className="progress__value">{rate}%</span>
            </div>
            <div
              className="progress__track"
              role="progressbar"
              aria-valuenow={rate}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="학습 진도"
            >
              <div className="progress__fill" style={{ width: `${rate}%` }} />
            </div>
            <p className="progress__note">
              전체 {ALL_LESSONS.length}강 가운데 {done.length}강
            </p>
          </div>
        </div>

        <div className="nav__scroll">
          {PARTS.map((part) => (
            <div key={part.id}>
              <p className="nav__part">{part.title}</p>
              {part.lessons.map((item) => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
                  <a
                    className="nav__item"
                    href={hrefFor(item.id)}
                    aria-current={item.id === route}
                  >
                    <span className="nav__num">{item.no}</span>
                    <span className="nav__label">{item.title}</span>
                  </a>
                  <button
                    type="button"
                    className="nav__done"
                    aria-pressed={isDone(item.id)}
                    aria-label={`${item.title} 완독 표시`}
                    onClick={() => toggleDone(item.id)}
                  >
                    <CheckIcon />
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </nav>

      {drawerOpen && (
        <button className="scrim" aria-label="목차 닫기" onClick={() => setDrawerOpen(false)} />
      )}

      <div className="shell__main">
        <header className="topbar">
          <button
            type="button"
            className="icon-btn only-narrow"
            aria-label={drawerOpen ? '목차 닫기' : '목차 열기'}
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen((v) => !v)}
          >
            {drawerOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          <p className="topbar__crumb">
            {lesson ? (
              <>
                {partOf(lesson.id)?.title} · <strong>{lesson.title}</strong>
              </>
            ) : (
              '코딩테스트를 통과하는 데 필요한 파이썬만'
            )}
          </p>

          <button
            type="button"
            className="icon-btn"
            aria-label={theme === 'dark' ? '밝은 화면으로' : '어두운 화면으로'}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </header>

        <main className="reading" id="content">
          <div ref={topRef} />

          {Body ? <Body /> : <Intro />}

          {lesson && (
            <>
              <div className="done-bar">
                <button
                  type="button"
                  className="done-btn"
                  aria-pressed={isDone(lesson.id)}
                  onClick={() => toggleDone(lesson.id)}
                >
                  <CheckIcon />
                  {isDone(lesson.id) ? '읽었어요' : '이 강을 읽었어요'}
                </button>
              </div>

              <nav className="pager" aria-label="레슨 이동">
                {prev && (
                  <a className="pager__link" href={hrefFor(prev.id)}>
                    <span className="pager__dir">← 앞 강</span>
                    <span className="pager__name">{prev.title}</span>
                  </a>
                )}
                {next && (
                  <a
                    className={`pager__link pager__link--next${prev ? '' : ' pager__link--last'}`}
                    href={hrefFor(next.id)}
                  >
                    <span className="pager__dir">다음 강 →</span>
                    <span className="pager__name">{next.title}</span>
                  </a>
                )}
              </nav>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
