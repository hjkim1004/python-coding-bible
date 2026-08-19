import CodeViewer from '../../components/ui/CodeViewer';
import Callout from '../../components/ui/Callout';
import MathBadge from '../../components/ui/MathBadge';
import QuizPanel from '../../components/ui/QuizPanel';

interface FunctionsProps {
  isDarkMode: boolean;
}

export default function Functions({ isDarkMode }: FunctionsProps) {
  const codeExample1 = `
# 덧셈과 곱셈 결과를 동시에 반환하는 함수
def add_and_mul(a, b):
    return a + b, a * b # 내부적으로 (a + b, a * b) 튜플 형태로 자동 패킹 반환됨!

# 결과 수령 시 한 번에 언패킹 수령
sum_res, mul_res = add_and_mul(3, 5)
print(sum_res, mul_res) # 8, 15
`;

  const codeExample2 = `
counter = 0

def increment():
    global counter  # 이 키워드가 없으면 counter 변수를 새로운 지역변수로 판단하여 에러 발생!
    counter += 1
`;

  const codeExample3 = `
my_list = []

def add_element():
    my_list.append(1) # global 선언 없이도 원본 전역 리스트가 성공적으로 수정됨!
`;

  const codeExample4 = `
# 다차원 점 정렬 예제
points = [(3, 4), (1, 10), (3, 1), (2, 5)]

# x 오름차순 정렬하되, x가 같으면 y는 큰 수부터 나오게(내림차순) 정렬하기
points.sort(key=lambda p: (p[0], -p[1]))
print(points) # [(1, 10), (2, 5), (3, 4), (3, 1)]  <-- 3에서 y가 4, 1 순서로 정렬됨!
`;

  const quizOptions = [
    {
      text: "key=lambda p: (p[0], p[1])",
      isCorrect: false,
      explanation: "첫 번째 원소를 기준으로 오름차순 정렬하고, 첫 번째 원소가 같으면 두 번째 원소를 기준으로 오름차순 정렬하는 공식입니다."
    },
    {
      text: "key=lambda p: (-p[0], p[1])",
      isCorrect: false,
      explanation: "첫 번째 원소를 기준으로 내림차순 정렬하고, 같으면 두 번째를 오름차순 정렬하는 공식입니다."
    },
    {
      text: "key=lambda p: (p[0], -p[1])",
      isCorrect: true,
      explanation: "정답입니다! 튜플로 정렬 기준을 엮을 때, 내림차순(큰 값 우선)을 적용하고 싶은 인자 앞에 마이너스 부호(-)를 붙여주면 한 줄 만에 다중 조건 정렬을 완벽 구현할 수 있습니다."
    },
    {
      text: "key=lambda p: -(p[0], p[1])",
      isCorrect: false,
      explanation: "튜플 자체에 마이너스 부호를 직접 곱하는 구문은 지원되지 않으며 TypeError 에러가 발생합니다."
    }
  ];

  return (
    <div className="animate-fadeIn">
      {/* 👑 OPEN PREMIUM TYPOGRAPHY HEADER (밤티 상자 전면 철거!) */}
      <div className="mb-8">
        <div className="text-[12px] font-extrabold tracking-widest text-indigo-500 uppercase mb-2">
          PART 1. 파이썬 필수 문법
        </div>
        <h1 className="text-3.5xl font-black tracking-tight text-slate-950 dark:text-white leading-none mb-4">
          Lesson 4. 함수와 람다 🛠️
        </h1>
        <p className="text-[15px] text-slate-500 dark:text-zinc-400 font-semibold leading-relaxed">
          실행 블록 분리와 다중 리턴, 전역 상태 변경 규칙, 그리고 다중 정렬 기준 설정을 위한 람다(Lambda) 익명 함수 구현 기법을 마스터합니다.
        </p>
      </div>

      {/* 균일한 높이의 얇은 분리 장막 선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 mb-12" />

      {/* Section 1 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          1. 기본 함수 선언 및 다중 리턴
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            파이썬은 한 번에 여러 개의 변수를 동시에 반환하는 다중 리턴 구조가 완벽 지원됩니다.
          </p>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeExample1} />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 2 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          2. 전역 변수와 스코프(Scope)의 가변성 함정
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            함수 외부의 전역 변수를 함수 내부에서 수정하려 할 때, 자료형의 성질(Mutable 대 Immutable)에 따라 <MathBadge>global</MathBadge> 키워드의 필수 여부가 나뉩니다.
          </p>
        </div>

        <Callout type="warning" title="가변 자료형(Mutable)은 global 키워드가 불필요!">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>불변 객체 (정수, 문자열, 튜플 등)</strong>: 함수 내부에서 전역 변수를 재할당하려 할 때 <strong>반드시 `global` 키워드가 필요</strong>합니다.
            </li>
            <li>
              <strong>가변 객체 (리스트, 사전, 집합 등)</strong>: 전역 리스트의 요소를 수정할 때는(append, pop 등) <strong>`global` 선언 없이도 직접 수정이 가능</strong>합니다!
            </li>
          </ul>
        </Callout>

        <CodeViewer isDarkMode={isDarkMode} code={codeExample2} />
        <div className="text-[14.5px] text-slate-600 dark:text-zinc-300 font-medium leading-relaxed">
          <p>아래와 같이 가변 리스트의 요소를 직접 집어넣을 때는 `global` 선언이 필요 없습니다:</p>
        </div>
        <CodeViewer isDarkMode={isDarkMode} code={codeExample3} />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 3 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          3. 람다(Lambda) 다중 정렬 공식
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            익명 람다식은 <MathBadge>sort(key=lambda x: ...)</MathBadge>의 인자로 넘겨 임의의 다차원 좌표나 딕셔너리 정렬 기준을 우아하게 조율할 때 빛을 발합니다.
          </p>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeExample4} />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Quiz */}
      <section>
        <QuizPanel 
          question="Q4. 학생들의 수학 좌표 쌍 (x, y)가 담겨 있는 리스트를 정렬하려고 합니다. 'x 좌표 기준으로는 작은 수부터(오름차순) 정렬하되, 만약 x가 서로 같다면 y 좌표 기준으로는 큰 수부터(내림차순)' 정렬되도록 지정하는 올바른 lambda 식은 무엇일까요?"
          options={quizOptions}
        />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Bottom Tip Callout */}
      <Callout type="success" title="실전 코딩테스트 응용 팁 & 추천 문제">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>복잡한 다중 정렬 압축하기</strong>: "국어 점수는 높은 순으로, 수학 점수는 낮은 순으로, 이름 사전 순으로..." 와 같은 3개 이상의 기믹도 <MathBadge>key=lambda s: (-s.kor, s.math, s.name)</MathBadge> 처럼 튜플로 엮어 마술 한 줄 만에 완벽 정렬할 수 있습니다!
          </li>
          <li>
            <strong>추천 문제</strong>: 프로그래머스 -{' '}
            <a
              href="https://school.programmers.co.kr/learn/courses/30/lessons/42578"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 underline underline-offset-2 transition-colors font-semibold"
            >
              [가장 큰 수]
            </a>
            ,{' '}
            <a
              href="https://school.programmers.co.kr/learn/courses/30/lessons/12939"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 underline underline-offset-2 transition-colors font-semibold"
            >
              [최댓값과 최솟값]
            </a>
          </li>
        </ul>
      </Callout>
    </div>
  );
}
