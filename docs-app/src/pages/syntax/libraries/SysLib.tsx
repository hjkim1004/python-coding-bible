import CodeViewer from '../../../components/ui/CodeViewer';
import Callout from '../../../components/ui/Callout';
import MathBadge from '../../../components/ui/MathBadge';
import QuizPanel from '../../../components/ui/QuizPanel';

interface SysLibProps {
  isDarkMode: boolean;
}

export default function SysLib({ isDarkMode }: SysLibProps) {
  const codeExample1 = `
import sys

# 1. sys.stdin.readline() 사용 시 반드시 rstrip()을 붙여야 하는 이유!
raw_input = sys.stdin.readline()
print(repr(raw_input)) # "hello\\n" 처럼 끝에 줄바꿈 문자(\\n)가 강제로 동반됩니다!

# 2. rstrip()을 결합한 올바른 정수 입력
n = int(sys.stdin.readline().rstrip())
`;

  const codeExample2 = `
import sys

# 1. 한 줄에 공백으로 구분된 여러 정수 리스트로 단 한 줄 만에 받아내기 (최다 빈출!)
numbers = list(map(int, sys.stdin.readline().split()))
# 입력: "10 20 30 40 50" -> numbers = [10, 20, 30, 40, 50]

# 2. n행 m열의 2차원 지도(격자 데이터) 실시간 입력 받기
n, m = map(int, sys.stdin.readline().split())
board = [list(map(int, sys.stdin.readline().split())) for _ in range(n)]
`;

  const codeExample3 = `
import sys

# 파이썬 기본 재귀 한계는 1,000회입니다.
# DFS나 트리 탐색의 깊이가 깊어질 때 아래 선언문으로 강제 해제해 두지 않으면 크래시(RecursionError)가 납니다.
sys.setrecursionlimit(10 ** 6) # 한계치를 100만으로 크게 상향!
`;

  const quizOptions = [
    {
      text: "strip() 또는 rstrip()을 생략했기 때문에 줄바꿈 문자(\\n)가 꼬리에 붙어서 오작동한다.",
      isCorrect: true,
      explanation: "정답입니다! sys.stdin.readline()은 한 줄 전체를 읽으면서 엔터키 수신에 의한 줄바꿈(\\n) 문자까지 버퍼에 채우므로, rstrip()을 안 해주면 문자열 비교 연산이나 숫자 형변환 시 오작동을 유발하게 됩니다."
    },
    {
      text: "sys.stdin.readline()은 숫자 전용이므로 문자열 입력 시에는 사용이 불가능하다.",
      isCorrect: false,
      explanation: "아닙니다. sys.stdin.readline()은 텍스트 줄 자체를 읽는 메서드로, 모든 형식의 문자열과 숫자를 완벽하게 수신합니다."
    },
    {
      text: "split() 함수가 줄바꿈 문자를 자동으로 다 날려주므로 rstrip()은 전혀 상관없다.",
      isCorrect: false,
      explanation: "split()은 공백 기준으로 문자열을 잘라 리스트화하므로 어느 정도 보정되지만, 단일 문장이나 하나의 독립된 문자열 입력 시에는 rstrip()이 미수행될 때 치명적인 개행 문자가 수록됩니다."
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
          Lesson 5-1. sys 라이브러리 (빠른 입출력) ⚡
        </h1>
        <p className="text-[15px] text-slate-500 dark:text-zinc-400 font-semibold leading-relaxed mt-3">
          대용량 입력 데이터의 고속 처리법과 파이썬 재귀 호출 붕괴 방지를 위한 재귀 깊이 제어 기법을 완전 분석합니다.
        </p>
      </div>

      {/* 균일한 높이의 얇은 분리 장막 선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 mb-12" />

      {/* Section 1 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          1. sys.stdin.readline() 의 정석과 개행 문자(\n)
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            기본 <MathBadge>input()</MathBadge> 함수는 입력 프롬프트 출력과 유효성 검사 절차를 거치므로 내부 버퍼 처리가 대단히 느립니다.  
            데이터의 개수가 10만 개 이상인 문제에서 일반 input()을 수천 번 가동하면 무조건 <strong>시간 초과 탈락</strong>합니다.
          </p>
          <p>
            대신 <MathBadge>sys.stdin.readline()</MathBadge>을 써야 하는데, 이 친구는 문자열 끝에 줄바꿈 문자(<MathBadge>\n</MathBadge>)를 강제로 수반하므로 반드시 우측을 다듬는 <MathBadge>rstrip()</MathBadge>과 세트로 다녀야 합니다.
          </p>
        </div>
        <CodeViewer isDarkMode={isDarkMode} code={codeExample1} />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 2 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          2. 실전 고속 입력 수집 템플릿
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            공백으로 구분된 여러 개의 정수를 한 번에 입력 받아 리스트화하는 공식과 지도 데이터를 입력 받는 모범 격자 수집기입니다:
          </p>
        </div>
        <CodeViewer isDarkMode={isDarkMode} code={codeExample2} />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 3 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          3. sys.setrecursionlimit() — 재귀 봉인 한계 해제
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            파이썬의 최대 호출 스택 제한은 기본 1,000회입니다. DFS나 트리 순회 시 노드가 5,000개만 되어도 아무리 알고리즘을 잘 짰어도 스택 오버플로우 에러를 뿜으며 뻗어 버립니다.
          </p>
          <p>
            이에 대처하기 위해 코드 최상단에 재귀 깊이를 강제 상향하는 아래의 명령어를 기계적으로 이식하세요.
          </p>
        </div>
        <CodeViewer isDarkMode={isDarkMode} code={codeExample3} />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Quiz */}
      <section>
        <QuizPanel 
          question="Q5-1. sys.stdin.readline()을 사용해 단일 문자열 'python'을 연속으로 입력받아 처리하는 도중, 문자열 비교 구문 if line == 'python': 이 계속 작동하지 않고 False로 어긋나는 치명적인 이유는 무엇일까요?"
          options={quizOptions}
        />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Bottom Tip Callout */}
      <Callout type="success" title="실전 코딩테스트 응용 팁 & 추천 문제">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>입력 줄 정의 트릭</strong>: 소스 코드 맨 처음에 <MathBadge>input = sys.stdin.readline</MathBadge> 이라고 재정의해 두면, 소스 코드 아래에 작성되어 있는 기존 `input()` 함수들을 일일이 다 뜯어고치지 않고도 전부 빠른 고속 버전으로 동작하게 만드는 스마트한 꼼수 기법을 애용하세요!
          </li>
          <li>
            <strong>추천 기출문제</strong>: 백준 -{' '}
            <a
              href="https://www.acmicpc.net/problem/15552"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 underline underline-offset-2 transition-colors font-semibold"
            >
              [빠른 A+B]
            </a>{' '}
            (빠른 입출력 성능을 테스트하는 기본서)
          </li>
        </ul>
      </Callout>
    </div>
  );
}
