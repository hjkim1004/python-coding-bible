import type { ReactNode } from 'react';
import { ALL_LESSONS } from '../content/curriculum';
import { hrefFor } from '../lib/useHashRoute';

interface RecallProps {
  /** 되짚을 강의 id */
  from: string;
  children: ReactNode;
}

/**
 * 앞 강에서 배운 것을 다시 꺼내 놓는 자리.
 *
 * 사람은 잊는다. 0부에서 한 번 말했다고 1부의 독자가 그것을 들고 있지는 않다.
 * 그래서 이어지는 강의 첫머리에서 한 번 더 꺼내고, 돌아갈 문도 함께 둔다.
 */
export default function Recall({ from, children }: RecallProps) {
  const source = ALL_LESSONS.find((l) => l.id === from);

  return (
    <aside className="recall">
      <p className="recall__kicker">
        다시 떠올리기
        {source && (
          <>
            {' · '}
            <a href={hrefFor(source.id)}>
              {source.no} {source.title}
            </a>
          </>
        )}
      </p>
      <div className="recall__body">{children}</div>
    </aside>
  );
}
