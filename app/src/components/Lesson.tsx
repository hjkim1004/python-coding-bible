import { Children, isValidElement, type ReactElement, type ReactNode } from 'react';
import { hrefFor, readRoute } from '../lib/useHashRoute';

interface SectionProps {
  no: number;
  title: string;
  children: ReactNode;
}

/** 절 하나. 번호로 제 앵커를 갖는다 — 개요에서 눌러 바로 올 수 있다. */
export function Section({ no, title, children }: SectionProps) {
  return (
    <section className="section" id={anchorOf(no)}>
      <h2 className="section__title">
        <span>{no}</span>
        {title}
      </h2>
      <div className="prose">{children}</div>
    </section>
  );
}

function anchorOf(no: number) {
  return `s${no}`;
}

interface LessonProps {
  part: string;
  title: string;
  lede: string;
  tags?: string[];
  /** 기출 해설이라면 원문 문제로 나가는 문 */
  source?: { label: string; href: string };
  children: ReactNode;
}

/**
 * 모든 레슨이 같은 머리를 쓴다 — 제목·한 줄 요약·꼬리표, 그리고 개요.
 *
 * 개요는 손으로 적지 않는다. 절 제목에서 그대로 뽑으므로 본문을 고치면 함께 따라오고,
 * 둘이 어긋날 일이 없다.
 */
export default function Lesson({ part, title, lede, tags = [], source, children }: LessonProps) {
  const sections = Children.toArray(children).filter(
    (child): child is ReactElement<SectionProps> => isValidElement(child) && child.type === Section,
  );
  // 절 주소는 «이 강 + 그 절» 이어야 한다. #s4 만 적으면 라우터가 강을 잃는다.
  const here = readRoute().lesson;

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

      {sections.length > 0 && (
        <nav className="outline" aria-label="이 강에서 배우는 것">
          <p className="outline__kicker">이 강에서 배우는 것</p>
          <ol className="outline__list">
            {sections.map((section) => (
              <li key={section.props.no}>
                <a href={hrefFor(here, anchorOf(section.props.no))}>
                  <span className="outline__no">{section.props.no}</span>
                  {section.props.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <hr className="rule" />
      {children}
    </article>
  );
}
