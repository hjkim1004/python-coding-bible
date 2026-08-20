import type { LessonMeta } from '../content/curriculum';
import { hrefFor } from '../lib/useHashRoute';
import { CheckIcon } from './Icons';

interface PagerProps {
  prev: LessonMeta | null;
  next: LessonMeta | null;
  done: boolean;
  onToggleDone: () => void;
}

export default function Pager({ prev, next, done, onToggleDone }: PagerProps) {
  return (
    <>
      <div className="done-bar">
        <button type="button" className="done-btn" aria-pressed={done} onClick={onToggleDone}>
          <CheckIcon />
          {done ? '읽었어요' : '이 강을 읽었어요'}
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
  );
}
