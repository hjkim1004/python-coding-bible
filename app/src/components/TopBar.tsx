import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from './Icons';

interface TopBarProps {
  crumb: { part: string; lesson: string } | null;
  drawerOpen: boolean;
  onToggleDrawer: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function TopBar({ crumb, drawerOpen, onToggleDrawer, theme, onToggleTheme }: TopBarProps) {
  return (
    <header className="topbar">
      <button
        type="button"
        className="icon-btn only-narrow"
        aria-label={drawerOpen ? '목차 닫기' : '목차 열기'}
        aria-expanded={drawerOpen}
        onClick={onToggleDrawer}
      >
        {drawerOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      <p className="topbar__crumb">
        {crumb ? (
          <>
            {crumb.part} · <strong>{crumb.lesson}</strong>
          </>
        ) : (
          '코딩테스트를 통과하는 데 필요한 파이썬만'
        )}
      </p>

      <button
        type="button"
        className="icon-btn"
        aria-label={theme === 'dark' ? '밝은 화면으로' : '어두운 화면으로'}
        onClick={onToggleTheme}
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>
    </header>
  );
}
