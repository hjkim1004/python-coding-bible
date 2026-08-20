import type { CSSProperties } from 'react';

interface ProgressProps {
  done: number;
  total: number;
}

export default function Progress({ done, total }: ProgressProps) {
  const rate = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="progress">
      <div className="progress__row">
        <span className="progress__label">읽은 만큼</span>
        <span className="progress__value">{rate}%</span>
      </div>
      {/* 값만 넘기고 그리는 일은 CSS 가 한다 */}
      <div
        className="progress__track"
        role="progressbar"
        aria-valuenow={rate}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="학습 진도"
        style={{ '--fill': `${rate}%` } as CSSProperties}
      >
        <div className="progress__fill" />
      </div>
      <p className="progress__note">
        전체 {total}강 가운데 {done}강
      </p>
    </div>
  );
}
