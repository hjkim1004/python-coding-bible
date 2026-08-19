import CodeViewer from '../../../components/ui/CodeViewer';
import Callout from '../../../components/ui/Callout';
import MathBadge from '../../../components/ui/MathBadge';
import QuizPanel from '../../../components/ui/QuizPanel';

interface MathLibProps {
  isDarkMode: boolean;
}

export default function MathLib({ isDarkMode }: MathLibProps) {
  const codeGcd = `
import math

# 1. 최대공약수(gcd) 및 최소공배수(lcm)
print(math.gcd(24, 18)) # 6 (24와 18의 최대공약수)

# ⚠️ math.lcm은 Python 3.9 버전부터 공식 탑재되었습니다!
print(math.lcm(24, 18)) # 72 (24와 18의 최소공배수)
`;

  const codeSqrt = `
import math

# 2. 제곱근(루트) 탐색 및 정수형 수렴 (isqrt)
print(math.sqrt(25))  # 5.0 (실수형 반환)

# isqrt는 소수점 아래를 버리고 정수 부분만 빠르게 추출합니다 (소수 판별 구현 시 최적!)
print(math.isqrt(27)) # 5 (루트 27 = 5.196... -> 정수 5로 반환)
`;

  const codeCeil = `
import math

# 3. 소수점 제어 삼총사
print(math.ceil(3.14))  # 4 (무조건 올림)
print(math.floor(3.89)) # 3 (무조건 내림)
print(math.trunc(-3.14)) # -3 (0에 가까운 방향으로 소수점 강제 소멸/버림)
`;

  const codeFactorial = `
import math

# 4. 팩토리얼(Factorial)
print(math.factorial(5)) # 120 (5! = 5 * 4 * 3 * 2 * 1)
`;

  const quizOptions = [
    {
      text: "math.ceil()",
      isCorrect: false,
      explanation: "math.ceil은 소수점 아래 숫자가 조금이라도 존재하면 무조건 올리는 함수입니다."
    },
    {
      text: "math.floor()",
      isCorrect: false,
      explanation: "math.floor는 소수점 이하를 무조건 내려 정수로 만드는 함수입니다."
    },
    {
      text: "math.isqrt()",
      isCorrect: true,
      explanation: "정답입니다! 소수 판별 시 전체 숫자 N을 다 돌면 O(N)으로 무조건 시간초과가 발생합니다. N의 제곱근까지만 순회하면 완벽하게 소수를 판별할 수 있는데, math.isqrt(N)은 소수점을 탈탈 털어버린 깔끔한 정수형 제곱근을 내어주어 O(√N) 최적 루프 설계에 무조건 활용되는 치트키입니다."
    },
    {
      text: "math.trunc()",
      isCorrect: false,
      explanation: "math.trunc는 단순 소수점 이하 버림 함수입니다."
    }
  ];

  return (
    <div className="animate-fadeIn">
      {/* 👑 OPEN PREMIUM TYPOGRAPHY HEADER */}
      <div className="mb-8">
        <div className="text-[12px] font-extrabold tracking-widest text-indigo-500 uppercase mb-2">
          PART 1. 파이썬 필수 문법
        </div>
        <h1 className="text-3xl font-black text-slate-950 dark:text-white leading-tight tracking-tight mt-1">
          Lesson 5-6. math 라이브러리 (초고속 수학 연산) 📐
        </h1>
        <p className="text-[15px] text-slate-500 dark:text-zinc-400 font-semibold leading-relaxed mt-3">
          격자판 계산, 기하학, 그리고 소수 판별의 최적화를 보장하는 SNU형 순수 모듈의 핵심 연산 법칙을 완벽 해부합니다.
        </p>
      </div>

      {/* 균일한 높이의 얇은 분리 장막 선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 mb-12" />

      {/* Section 1 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          1. GCD (최대공약수) 와 LCM (최소공배수)
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            두 수의 공약수/공배수를 유클리드 호제법을 손으로 구현하지 않고 단숨에 연산합니다.  
            분수 통분이나 주기 순환 체크 문제에서 요긴합니다.
          </p>
        </div>
        <CodeViewer isDarkMode={isDarkMode} code={codeGcd} />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 2 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          2. sqrt() 와 isqrt() — 최적의 소수 판별을 위한 보검
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            정밀 소수 계산 루트 판별을 수행합니다.  
            특히 <MathBadge>isqrt()</MathBadge>는 정밀 소수 계산 판별 루프 설계 시 핵심 도구입니다.
          </p>
        </div>
        <CodeViewer isDarkMode={isDarkMode} code={codeSqrt} />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 3 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          3. 소수점 이하 제어 3대장 (ceil / floor / trunc)
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            - <MathBadge>ceil</MathBadge> : 무조건 올림. 아파트 배정, 박스 수량 산출 등 소수점 아래 한자리라도 있으면 다음 숫자로 올려야 하는 계산에 필수.  
            - <MathBadge>floor</MathBadge> : 무조건 내림.  
            - <MathBadge>trunc</MathBadge> : 무조건 소수점 이하 버림.
          </p>
        </div>
        <CodeViewer isDarkMode={isDarkMode} code={codeCeil} />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 4 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          4. 팩토리얼 (factorial)
        </h2>
        <CodeViewer isDarkMode={isDarkMode} code={codeFactorial} />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Quiz */}
      <section>
        <QuizPanel 
          question="Q5-6. 어떤 소수가 주어졌을 때, 소수 여부를 완전 탐색(O(N)) 대신 O(√N) 복잡도로 극초속 검증하려고 합니다. 탐색 루프의 최대 범위를 정수형으로 산출하기 위해 사용하는 최적의 math 라이브러리 함수는 무엇일까요?"
          options={quizOptions}
        />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Bottom Tip Callout */}
      <Callout type="success" title="실전 코딩테스트 응용 팁 & 추천 문제">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>lcm 수동 보정 꿀팁</strong>: 만약 시험장의 파이썬 버전이 옛날 버전이라 <MathBadge>math.lcm()</MathBadge>이 오류를 뱉는다면 당황하지 말고 최대공약수를 이용한 <MathBadge>lcm = (a * b) // math.gcd(a, b)</MathBadge> 공식을 적어 수동 복구하세요!
          </li>
          <li>
            <strong>추천 기출문제</strong>: 프로그래머스 -{' '}
            <a
              href="https://school.programmers.co.kr/learn/courses/30/lessons/12940"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 underline underline-offset-2 transition-colors font-semibold"
            >
              [최대공약수와 최소공배수]
            </a>{' '}
            (수학 공식 활용의 정석 입문)
          </li>
        </ul>
      </Callout>
    </div>
  );
}
