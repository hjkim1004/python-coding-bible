import { PARTS, ALL_LESSONS } from '../content/curriculum';
import { hrefFor } from '../lib/useHashRoute';
import { CheckIcon } from './Icons';
import Progress from './Progress';

interface SidebarProps {
  route: string;
  open: boolean;
  doneCount: number;
  isDone: (id: string) => boolean;
  onToggleDone: (id: string) => void;
}

export default function Sidebar({ route, open, doneCount, isDone, onToggleDone }: SidebarProps) {
  return (
    <nav className="nav" data-open={open} aria-label="목차">
      <div className="nav__head">
        <a className="nav__brand" href={hrefFor('')}>
          <span className="nav__mark" aria-hidden>🐍</span>
          <span>
            <span className="nav__title">파이썬 코딩테스트</span>
            <br />
            <span className="nav__sub">Twinkle Labs</span>
          </span>
        </a>

        <Progress done={doneCount} total={ALL_LESSONS.length} />
      </div>

      <div className="nav__scroll">
        {PARTS.map((part) => (
          <section key={part.id} aria-labelledby={`part-${part.id}`}>
            <h2 className="nav__part" id={`part-${part.id}`}>
              {part.title}
            </h2>
            {/* 목록이라고 말해 두면 «30개 중 세 번째»를 읽어 준다 */}
            <ul className="nav__list">
              {part.lessons.map((item) => (
                <li key={item.id} className="nav__row">
                  <a className="nav__item" href={hrefFor(item.id)} aria-current={item.id === route}>
                    <span className="nav__num">{item.no}</span>
                    <span className="nav__label">{item.title}</span>
                  </a>
                  <button
                    type="button"
                    className="nav__done"
                    aria-pressed={isDone(item.id)}
                    aria-label={`${item.title} 완독 표시`}
                    onClick={() => onToggleDone(item.id)}
                  >
                    <CheckIcon />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </nav>
  );
}
