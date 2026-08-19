import CodeViewer from '../../components/ui/CodeViewer';
import Callout from '../../components/ui/Callout';
import QuizPanel from '../../components/ui/QuizPanel';

interface DynamicProgrammingProps {
  isDarkMode: boolean;
}

export default function DynamicProgramming({ isDarkMode }: DynamicProgrammingProps) {
  const codeExample1 = `
# 탑다운(Top-Down, 하향식) DP: 재귀 + 메모이제이션(Memoization)
# 한 번 계산된 결과를 기록할 메모이제이션 테이블 초기화
memo = [0] * 100

def fibo_top_down(x):
    # 피보나치 수열의 종료 조건 (1 혹은 2일 때 1을 반환)
    if x == 1 or x == 2:
        return 1
    # 이미 계산한 적 있는 문제라면 테이블의 값 그대로 리턴
    if memo[x] != 0:
        return memo[x]
    # 아직 계산하지 않은 문제라면 하위 식을 호출 후 기록
    memo[x] = fibo_top_down(x - 1) + fibo_top_down(x - 2)
    return memo[x]

print(fibo_top_down(99)) # 출력: 218922995834555169026 (순식간에 O(N)으로 해결!)
`;

  const codeExample2 = `
# 바텀업(Bottom-Up, 상향식) DP: 반복문 + DP 테이블 (실전 코테 적극 권장!)
# 앞서 계산된 결과를 저장하기 위한 DP 테이블 선언
dp = [0] * 100

# 첫 번째 피보나치 수와 두 번째 피보나치 수 설정
dp[1] = 1
dp[2] = 1
n = 99

# 피보나치 함수 반복문(바텀업)으로 구현
for i in range(3, n + 1):
    dp[i] = dp[i - 1] + dp[i - 2]

print(dp[n]) # 출력: 218922995834555169026
`;

  const quizOptions = [
    {
      text: "백트래킹 (Backtracking)",
      isCorrect: false,
      explanation: "백트래킹은 유망하지 않은 분기를 가지치며 탐색하는 가지치기 기법입니다."
    },
    {
      text: "메모이제이션 (Memoization)",
      isCorrect: true,
      explanation: "정답입니다! 메모이제이션(Memoization)은 탑다운(하향식) DP의 핵심 원리로, 이미 계산된 정답 결과를 기록(Caching)해 두었다가 다음 호출 시 그대로 꺼내쓰는 기법입니다."
    },
    {
      text: "분할 정복 (Divide & Conquer)",
      isCorrect: false,
      explanation: "분할 정복은 하위 문제들이 중복되지 않고 서로 완전 독립적일 때(예: 병합정렬) 사용하는 대칭 구조입니다."
    },
    {
      text: "다중 정렬 (Multi-sorting)",
      isCorrect: false,
      explanation: "다중 정렬은 정렬 기법의 일종입니다."
    }
  ];

  return (
    <div className="animate-fadeIn">
      {/* 👑 OPEN PREMIUM TYPOGRAPHY HEADER */}
      <div className="mb-8">
        <div className="text-[12px] font-extrabold tracking-widest text-indigo-500 uppercase mb-2">
          PART 2. 핵심 알고리즘 이론
        </div>
        <h1 className="text-3.5xl font-black tracking-tight text-slate-950 dark:text-white leading-none mb-4">
          Lesson 6. 다이나믹 프로그래밍 📈
        </h1>
        <p className="text-[15px] text-slate-500 dark:text-zinc-400 font-semibold leading-relaxed">
          연산 결과를 테이블에 '기록'하여 동일한 중복 연산을 단 1회로 봉쇄하는 동적 계획법의 극적 성능 향상을 마스터합니다.
        </p>
      </div>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 mb-12" />

      {/* Section 1 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          1. DP(다이나믹 프로그래밍)의 전제 조건
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            동적 계획법(Dynamic Programming, DP)은 하나의 큰 문제를 여러 개의 작은 하위 문제로 쪼개어 풀 때, <strong>작은 문제들의 결과가 완전히 동일하게 반복되는 점</strong>을 포착해 테이블에 담아두고 정답을 도출하는 사기적인 기법입니다.
          </p>
          <p>
            DP가 동작하기 위해서는 반드시 다음의 두 가지 조건이 엄격하게 충족되어야 합니다.
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2">
            <li><strong>최적 부분 구조 (Optimal Substructure)</strong>: 큰 문제의 최적의 해가 작은 문제의 최적의 해들로 분해되어 조합될 수 있을 때.</li>
            <li><strong>중복되는 부분 문제 (Overlapping Subproblem)</strong>: 동일한 소형 하위 문제가 탐색 트리 상에서 끝없이 반복 호출될 때.</li>
          </ul>
        </div>
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 2 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          2. 탑다운(Top-Down) 방식과 메모이제이션
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            탑다운 방식은 큰 문제를 해결하기 위해 <strong>재귀(Recursion) 함수</strong>를 가동하고, 하위로 쪼개 가며 풀이하는 <strong>하향식 기법</strong>입니다.  
            이때 이전에 계산한 정답 리턴값을 기록하는 공간을 <strong>메모이제이션(Memoization) 테이블</strong>이라고 칭합니다.
          </p>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeExample1} />
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 3 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          3. 바텀업(Bottom-Up) 방식과 DP 테이블 (추천!)
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            바텀업 방식은 가장 아래의 밑바닥 하위 문제부터 <strong>반복문(Iteration)</strong>을 돌며 결과 테이블을 한 칸씩 확실히 채워나가는 <strong>상향식 기법</strong>입니다.  
            이 방식에서 결과값을 박제해 보관하는 배열을 <strong>DP 테이블(DP Table)</strong>이라고 부릅니다.
          </p>
          <p>
            재귀 깊이 제한(Recursion Limit)이나 함수 스택 할당 오버헤드로부터 완전히 자유롭기 때문에, <strong>실전 코딩 테스트에서는 무조건 바텀업 방식을 최우선</strong>으로 기획하여 푸는 것이 압도적으로 유리합니다!
          </p>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeExample2} />
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Quiz */}
      <section>
        <QuizPanel 
          question="Q6. 이미 한 번 구해 놓은 하위 문제의 계산 결과를 메모리 공간이나 캐시 테이블에 백업해 두어 동일한 중복 연산의 재진입을 원천 차단하는 탑다운 DP의 핵심 기법을 무엇이라고 칭합니까?"
          options={quizOptions}
        />
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Warning Callout */}
      <Callout type="danger" title="분할 정복(Divide and Conquer)과의 근원적 차이점! 🛑">
        <p className="mb-2">
          DP와 분할 정복은 큰 문제를 쪼개어 정복한다는 점이 비슷하지만, <strong>"부분 문제의 중복성"</strong>에서 완전히 다른 길을 걷습니다.
        </p>
        <p>
          분할 정복(예: 퀵 정렬, 병합 정렬)은 한 번 쪼개진 하위 부분 문제들이 서로 독립되어 다신 중복으로 호출되지 않습니다. 반면, 다이나믹 프로그래밍(예: 피보나치)은 동일한 하위 문제가 여러 갈래에서 <strong>중복되어 중첩 재호출</strong>됩니다.  
          중복 호출이 발생하지 않는 문제에 억지로 DP 기록 리스트를 세팅하면 오히려 불필요한 메모리 낭비와 코드 성능 저하만 유발하게 됨을 상기하십시오!
        </p>
      </Callout>
    </div>
  );
}
