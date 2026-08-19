import { useState } from 'react';

export interface QuizChoice {
  text: string;
  right?: boolean;
  why: string;
}

interface QuizProps {
  question: string;
  choices: QuizChoice[];
}

const LABELS = ['A', 'B', 'C', 'D', 'E'];

export default function Quiz({ question, choices }: QuizProps) {
  const [picked, setPicked] = useState<number | null>(null);
  const chosen = picked === null ? null : choices[picked];

  return (
    <section className="quiz">
      <div className="quiz__kicker">스스로 확인하기</div>
      <p className="quiz__q">{question}</p>

      <div className="quiz__list">
        {choices.map((choice, i) => {
          const state = picked === null ? undefined : i === picked ? (choice.right ? 'right' : 'wrong') : undefined;
          return (
            <button
              key={i}
              type="button"
              className="quiz__opt"
              data-state={state}
              disabled={picked !== null}
              onClick={() => setPicked(i)}
            >
              <span className="quiz__mark">{LABELS[i]}</span>
              <span>{choice.text}</span>
            </button>
          );
        })}
      </div>

      {chosen && (
        <>
          <div className="quiz__why">
            <strong>{chosen.right ? '맞았어요' : '아쉬워요'}</strong>
            {chosen.why}
          </div>
          <button type="button" className="quiz__again" onClick={() => setPicked(null)}>
            다시 골라보기
          </button>
        </>
      )}
    </section>
  );
}
