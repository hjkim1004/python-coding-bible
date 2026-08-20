import type { ReactNode } from 'react';

interface FigureProps {
  /** 화면을 못 보는 사람에게 이 그림이 무엇인지 한 문장으로 */
  label: string;
  viewBox: string;
  caption?: string;
  children: ReactNode;
}

/**
 * 그림 한 장.
 *
 * 색은 토큰만 부른다 — 다크와 라이트가 저절로 따라오고, 브랜드가 바뀌면 그림도 따라온다.
 * 너비는 통에 맞추고 높이는 viewBox 가 정하므로 좁은 화면에서도 잘리지 않는다.
 */
export default function Figure({ label, viewBox, caption, children }: FigureProps) {
  return (
    <figure className="figure">
      <svg className="figure__svg" viewBox={viewBox} role="img" aria-label={label}>
        {children}
      </svg>
      {caption && <figcaption className="figure__caption">{caption}</figcaption>}
    </figure>
  );
}
