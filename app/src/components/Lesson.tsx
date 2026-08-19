import type { ReactNode } from 'react';

interface LessonProps {
  part: string;
  title: string;
  lede: string;
  tags?: string[];
  /** 기출 해설이라면 원문 문제로 나가는 문 */
  source?: { label: string; href: string };
  children: ReactNode;
}

/** 모든 레슨이 같은 머리를 쓴다 — 제목·한 줄 요약·꼬리표. */
export default function Lesson({ part, title, lede, tags = [], source, children }: LessonProps) {
  return (
    <article className="enter">
      <header>
        <p className="lesson__eyebrow">{part}</p>
        <h1 className="lesson__title">{title}</h1>
        <p className="lesson__lede">{lede}</p>
        {source && (
          <p className="lesson__source">
            <a href={source.href} target="_blank" rel="noopener noreferrer">
              {source.label} 원문 문제 보기 ↗
            </a>
          </p>
        )}
        {tags.length > 0 && (
          <div className="tags">
            {tags.map((tag, i) => (
              <span key={tag} className={i === 0 ? 'tag tag--accent' : 'tag'}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <hr className="rule" />
      {children}
    </article>
  );
}

interface SectionProps {
  no: number;
  title: string;
  children: ReactNode;
}

export function Section({ no, title, children }: SectionProps) {
  return (
    <section className="section">
      <h2 className="section__title">
        <span>{no}</span>
        {title}
      </h2>
      <div className="prose">{children}</div>
    </section>
  );
}
