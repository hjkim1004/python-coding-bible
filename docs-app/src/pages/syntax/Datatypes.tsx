import CodeViewer from '../../components/ui/CodeViewer';
import Callout from '../../components/ui/Callout';
import MathBadge from '../../components/ui/MathBadge';
import QuizPanel from '../../components/ui/QuizPanel';

interface DatatypesProps {
  isDarkMode: boolean;
}

export default function Datatypes({ isDarkMode }: DatatypesProps) {
  const codeExample1 = `
a = 1000
b = -7.5
c = 1e9  # 지수 표현법 (10억, 실수형으로 처리됨)
`;

  const codeExample2 = `
# 소수점 오차 확인
print(0.3 + 0.6)  # 0.9가 아닌 0.9000000000000001 이 출력됨!

# 해결 방법: round()
print(round(0.3 + 0.6, 1) == 0.9)  # True
`;

  const codeExample3 = `
a = 7
b = 3

print(a / b)   # 2.3333333333333335 (실수 반환)
print(a // b)  # 2 (정수 몫 반환, 이진 탐색 mid 계산 시 필수!)
print(a % b)   # 1 (나머지 반환)
print(2 ** 5)  # 32 (2의 5제곱)
`;

  const codeExample4 = `
x = True
y = False

print(x and y)  # False (둘 다 참이어야 참)
print(x or y)   # True (둘 중 하나만 참이어도 참)
print(not x)    # False (반전)
`;

  const quizOptions = [
    {
      text: "a / b",
      isCorrect: false,
      explanation: "/ 연산자는 나눗셈 결과를 항상 '실수형(Float)'으로 반환하므로 인덱스로 사용할 수 없어 IndexError가 납니다."
    },
    {
      text: "a % b",
      isCorrect: false,
      explanation: "% 연산자는 나머지를 구하는 연산자입니다. 중간 인덱스를 탐색하는 이진 탐색에는 적합하지 않습니다."
    },
    {
      text: "a // b",
      isCorrect: true,
      explanation: "정답입니다! // 연산자는 소수점 아래를 버리는 '몫' 연산자(정수형 반환)이므로, 배열의 중간점 인덱스를 안전하게 계산할 때 필수 치트키입니다."
    },
    {
      text: "a ** b",
      isCorrect: false,
      explanation: "** 연산자는 거듭제곱을 구하는 연산자입니다."
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
          Lesson 1. 기본 자료형 및 연산자 🔢
        </h1>
        <p className="text-[15px] text-slate-500 dark:text-zinc-400 font-semibold leading-relaxed max-w-3xl">
          코딩 테스트의 가장 밑바닥이자 기반이 되는 기본 수 자료형과 불(Bool) 자료형, 그리고 실전 연산 기믹들을 정교하게 분석합니다.
        </p>
      </div>

      {/* 균일한 높이의 얇은 분리 장막 선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 mb-12" />

      {/* Section 1 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          1. 수 자료형 (Numeric Types)
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            파이썬의 수 자료형은 크기에 제한이 없어 무한대에 가까운 큰 정수 연산도 메모리가 허용하는 한 오버플로우 없이 안전하게 수행됩니다.
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2">
            <li><strong>정수형 (Integer)</strong>: 양의 정수, 음의 정수, 그리고 0을 포함하며 코테 문제의 90% 이상의 변수를 차지합니다.</li>
            <li><strong>실수형 (Float)</strong>: 소수점이 포함된 실수형 데이터입니다. 지수 표현 방식(<MathBadge>1e9</MathBadge> - 10억)도 자주 쓰입니다.</li>
          </ul>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeExample1} />

        <Callout type="danger" title="컴퓨터의 실수 연산 오차 (대표적인 함정!)">
          컴퓨터는 소수를 연산할 때 내부적으로 이진수 소수로 바꾸어 계산하므로, 무한소수 변환 오차에 의해 미세한 소수점 오차가 상시 생깁니다.  
          소수의 정밀한 일치 여부를 검증하는 기하학이나 물리 시뮬레이션 문제를 만났을 때는 무조건 <MathBadge>round()</MathBadge>를 사용해 오차를 걸러내야 오답 폭탄을 차단할 수 있습니다!
        </Callout>

        <CodeViewer isDarkMode={isDarkMode} code={codeExample2} />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 2 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          2. 산술 연산자 (Arithmetic Operators)
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            실전 시험에서 연산 오차를 피하고 속도 최적화를 구현하기 위해 기계적으로 암기하고 있어야 할 4대 나눗셈 계열 연산 법칙입니다:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2">
            <li><MathBadge>/</MathBadge> : 일반 나눗셈. 정수끼리 나누어떨어지는 경우라도 <strong>항상 실수형(Float)을 반환</strong>하므로 주의하세요!</li>
            <li><MathBadge>//</MathBadge> : <strong>몫 연산자</strong>. 나누기 결과를 정수형 몫으로만 온전히 반환합니다.</li>
            <li><MathBadge>%</MathBadge> : <strong>나머지 연산자</strong>. 나누고 남은 나머지를 반환하며, 홀짝 판별 및 링 버퍼 순환 처리에 최고 무기입니다.</li>
            <li><MathBadge>**</MathBadge> : 거듭제곱 연산자.</li>
          </ul>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeExample3} />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 3 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          3. 불 자료형 및 논리 연산자 (Boolean)
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            참과 거짓을 판별하는 자료형입니다. 파이썬은 첫 문자가 대문자인 <MathBadge>True</MathBadge>와 <MathBadge>False</MathBadge>를 키워드로 사용합니다.
          </p>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeExample4} />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Interactive Quiz Panel */}
      <section>
        <QuizPanel 
          question="Q1. 이진 탐색(Binary Search) 알고리즘을 구현할 때, 정렬된 배열의 중간 지점 인덱스(mid)를 안전하게 정수형으로 구하기 위해 반드시 사용해야 하는 파이썬 연산자는 무엇일까요?"
          options={quizOptions}
        />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Bottom Tip Callout */}
      <Callout type="success" title="실전 코딩테스트 응용 팁 & 추천 문제">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>나머지 % 로 원형 순환하기</strong>: 원형 구조를 띠는 지도를 탐색하거나, 링 모양 버퍼를 순회할 때는 다음 인덱스를 계산할 때 <MathBadge>(current_idx + 1) % N</MathBadge> 공식을 기계적으로 입력하세요! 인덱스가 범위 초과 에러 없이 부드럽게 0으로 휘감겨 들어옵니다.
          </li>
          <li>
            <strong>추천 문제</strong>: 프로그래머스 -{' '}
            <a
              href="https://school.programmers.co.kr/learn/courses/30/lessons/12937"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 underline underline-offset-2 transition-colors font-semibold"
            >
              [짝수와 홀수]
            </a>
            ,{' '}
            <a
              href="https://school.programmers.co.kr/learn/courses/30/lessons/87389"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 underline underline-offset-2 transition-colors font-semibold"
            >
              [나머지가 1이 되는 수 찾기]
            </a>
          </li>
        </ul>
      </Callout>
    </div>
  );
}
