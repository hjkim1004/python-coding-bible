import { ALL_LESSONS, PARTS } from './curriculum';
import { hrefFor } from '../lib/useHashRoute';
import Term from '../components/Term';

export default function Intro() {
  const first = ALL_LESSONS[0];
  const syntax = ALL_LESSONS.find((l) => l.id === 'p1-io');

  return (
    <div className="enter">
      <section className="hero">
        <h1 className="hero__title">
          코딩테스트를 통과하는 데 필요한 <em>파이썬만</em>.
        </h1>
        <p className="hero__lede">
          문법서는 이미 많습니다. 이 책은 시험장에서 쓰는 것만 골라 담되, 외우라고 하지 않습니다.
          왜 그 코드가 시간 초과를 피하는지, 왜 그 선택이 손해가 아닌지까지 함께 적었습니다.
        </p>
        <p className="hero__lede">
          <strong>파이썬이 처음이어도 괜찮습니다.</strong> 0부가 <Term>print</Term>부터
          시작해 1부를 읽을 만큼만 데려다 놓습니다.
        </p>

        <div className="hero__actions">
          {first && (
            <a className="cta" href={hrefFor(first.id)}>
              파이썬이 처음이에요 →
            </a>
          )}
          {syntax && (
            <a className="cta cta--quiet" href={hrefFor(syntax.id)}>
              문법은 알아요, 1부부터 →
            </a>
          )}
        </div>
      </section>

      <hr className="rule" />

      <div className="cards">
        {PARTS.map((part) => (
          <a key={part.id} className="card" href={hrefFor(part.lessons[0].id)}>
            <span className="card__no">{part.title.split(' · ')[0]}</span>
            <h2 className="card__name">{part.title.split(' · ')[1] ?? part.title}</h2>
            <p className="card__desc">{part.blurb}</p>
            <p className="card__count">{part.lessons.length}강</p>
          </a>
        ))}
      </div>

      <hr className="rule" />

      <section className="section">
        <h2 className="section__title">이 책을 읽는 법</h2>
        <div className="prose">
          <ul>
            <li>
              <strong>순서대로 읽으세요.</strong> 뒤 강은 앞 강의 코드를 그대로 씁니다.
              문법을 이미 아신다면 0부는 건너뛰어도 됩니다.
            </li>
            <li>
              <strong><Term>{'# =>'}</Term> 뒤는 그 줄이 실제로 내놓는 값입니다.</strong>{' '}
              책을 고칠 때마다 기계가 코드를 돌려 대조하므로, 믿고 따라 치셔도 됩니다.
            </li>
            <li>
              <strong>코드는 손으로 옮겨 치세요.</strong> 복사 단추는 시험장에 없습니다.
            </li>
            <li>
              <strong>강마다 있는 확인 문제를 먼저 풀고 해설을 보세요.</strong> 틀린 답에도
              왜 틀렸는지가 적혀 있습니다.
            </li>
            <li>
              <strong>읽은 강은 체크하세요.</strong> 진도는 이 브라우저에 남습니다.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
