import CodeViewer from '../../components/ui/CodeViewer';
import Callout from '../../components/ui/Callout';
import MathBadge from '../../components/ui/MathBadge';
import QuizPanel from '../../components/ui/QuizPanel';

interface ControlFlowProps {
  isDarkMode: boolean;
}

export default function ControlFlow({ isDarkMode }: ControlFlowProps) {
  const codeExample1 = `
score = 85

if score >= 90:
    print("A 학점")
elif score >= 80:
    print("B 학점")
else:
    print("C 학점")
`;

  const codeExample2 = `
score = 85
# "참일 때의 값" if 조건 else "거짓일 때의 값"
result = "Success" if score >= 80 else "Fail"
print(result) # "Success"
`;

  const codeExample3 = `
# 홀수만 건너뛰고 짝수만 합산하는 예제
even_sum = 0
for i in range(1, 11):
    if i % 2 == 1:
        continue  # 홀수면 아래 코드를 무시하고 루프의 다음 회차로 건너뜀!
    even_sum += i
print("짝수 합:", even_sum) # 30
`;

  const codeExample4 = `
# enumerate()로 인덱스와 값을 세트로 순회하기
names = ["Kim", "Lee", "Park"]
for idx, name in enumerate(names):
    print(f"회원번호 {idx}: {name}")
    # 회원번호 0: Kim, 회원번호 1: Lee ...
`;

  const quizOptions = [
    {
      text: "break",
      isCorrect: false,
      explanation: "break는 조건을 불문하고 즉시 루프 자체를 완전히 파괴하고 루프 블록을 빠져나옵니다."
    },
    {
      text: "continue",
      isCorrect: true,
      explanation: "정답입니다! continue 키워드는 하위의 나머지 코드를 즉시 건너뛰고, 루프의 '다음 반복 회차(Iteration)'로 머리를 돌려 계속 수행을 보장합니다."
    },
    {
      text: "pass",
      isCorrect: false,
      explanation: "pass는 구문상 블록을 비워두기 위해 단순히 지나가는 아무 역할도 하지 않는 키워드입니다. 흐름을 건너뛰지 않습니다."
    },
    {
      text: "return",
      isCorrect: false,
      explanation: "return은 반복문이 아닌 '함수' 자체를 종료하고 값을 반환하며 나갑니다."
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
          Lesson 3. 제어문과 반복문 🔄
        </h1>
        <p className="text-[15px] text-slate-500 dark:text-zinc-400 font-semibold leading-relaxed">
          프로그램의 비즈니스 로직 조건 분기와 효율적인 반복, 그리고 인덱스 동시 트래킹 기법을 마스터합니다.
        </p>
      </div>

      {/* 균일한 높이의 얇은 분리 장막 선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 mb-12" />

      {/* Section 1 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          1. 조건문 (if-elif-else) & 축약식
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            파이썬의 조건문은 직관적이며 멤버십 연산자(<MathBadge>in</MathBadge> / <MathBadge>not in</MathBadge>)가 다른 언어에 비해 대단히 강력합니다.
          </p>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeExample1} />

        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            또한 한 줄로 직관적이게 조건 대입을 할 수 있는 <strong>조건문 축약식(Conditional Expression)</strong>은 변수 선언 시 코드 라인 수를 획기적으로 줄여줍니다.
          </p>
        </div>
        <CodeViewer isDarkMode={isDarkMode} code={codeExample2} />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 2 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          2. 반복문 제어 (break & continue)
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            - <MathBadge>break</MathBadge> : 무조건 루프 블록을 완전히 파괴하고 즉각 탈출합니다.  
            - <MathBadge>continue</MathBadge> : 아래쪽 줄을 읽지 않고, 루프의 <strong>다음 회차(Iteration)</strong>로 무조건 건너뜁니다.
          </p>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeExample3} />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 3 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          3. 루프 최적화 함수 (enumerate)
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            코딩 테스트에서 탐색 중 <strong>"현재가 몇 번째 인덱스인지"</strong>를 추적하는 일은 매우 흔합니다. 이 역할을 완벽하게 대행하는 메서드가 바로 <MathBadge>enumerate()</MathBadge> 입니다.
          </p>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeExample4} />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Quiz */}
      <section>
        <QuizPanel 
          question="Q3. 반복문 내부에서 특정 예외 대상을 만났을 때, 루프 자체를 아예 끝내지 않고 단지 해당 회차의 잔여 연산만 생략한 뒤 다음 루프 순번으로 즉시 도약하기 위해 사용하는 키워드는 무엇일까요?"
          options={quizOptions}
        />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Bottom Tip Callout */}
      <Callout type="danger" title="이중 반복문과 시간 복잡도 경보! 🛑">
        <p className="mb-2">
          데이터의 개수가 <MathBadge>N = 10,000</MathBadge>인 조건에서 이중 반복문(<MathBadge>O(N²)</MathBadge>)을 구성하면 루프 연산 횟수가 순식간에 <MathBadge>10,000 × 10,000 = 10⁸</MathBadge> (1억 번)에 달하여 <strong>제한시간 초과 오답 판정 🛑</strong>을 받게 됩니다.
        </p>
        <p>
          <MathBadge>N</MathBadge>의 범위가 큰 탐색 문제는 반드시 해시 테이블(Set/Dict)이나 이진 탐색을 통해 이중 루프 구조를 단일 루프(<MathBadge>O(N)</MathBadge>) 구조로 붕괴시켜 극복해야 함을 상시 기억하세요!
        </p>
      </Callout>
    </div>
  );
}
