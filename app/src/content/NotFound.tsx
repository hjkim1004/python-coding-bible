import { ALL_LESSONS, PARTS } from './curriculum';
import { hrefFor } from '../lib/useHashRoute';
import { MOVED_LESSONS } from '../lib/movedLessons';

export default function NotFound({ route }: { route: string }) {
  const movedTo = MOVED_LESSONS[route];
  const target = movedTo ? ALL_LESSONS.find((l) => l.id === movedTo) : undefined;

  return (
    <div className="enter">
      <p className="lesson__eyebrow">찾지 못했습니다</p>
      <h1 className="lesson__title">
        {target ? '이 강은 자리를 옮겼습니다' : '그런 강이 없습니다'}
      </h1>

      <p className="lesson__lede">
        {target ? (
          <>
            백준이 문을 닫아 그 문제의 해설을 걷어 냈습니다. 같은 내용을
            <strong> {target.no} {target.title}</strong>이 이어받았습니다.
          </>
        ) : (
          <>
            주소 <code className="term">#/{route}</code>에 해당하는 강을 찾지 못했습니다.
            주소가 잘못되었거나, 그 사이 이름이 바뀌었을 수 있습니다.
          </>
        )}
      </p>

      {target && (
        <a className="cta" href={hrefFor(target.id)}>
          {target.title} 읽으러 가기 →
        </a>
      )}

      <hr className="rule" />

      <h2 className="section__title">전체 목차</h2>
      <div className="cards">
        {PARTS.map((part) => (
          <a key={part.id} className="card" href={hrefFor(part.lessons[0].id)}>
            <span className="card__no">{part.title.split(' · ')[0]}</span>
            <h3 className="card__name">{part.title.split(' · ')[1] ?? part.title}</h3>
            <p className="card__desc">{part.blurb}</p>
            <p className="card__count">{part.lessons.length}강</p>
          </a>
        ))}
      </div>
    </div>
  );
}
