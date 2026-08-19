import CodeViewer from '../../components/ui/CodeViewer';
import Callout from '../../components/ui/Callout';
import MathBadge from '../../components/ui/MathBadge';
import QuizPanel from '../../components/ui/QuizPanel';

interface GreedyProps {
  isDarkMode: boolean;
}

export default function Greedy({ isDarkMode }: GreedyProps) {
  const codeExample1 = `
# 거스름돈 문제 예제: 가장 큰 화폐 단위부터 돈을 거슬러 주기
n = 1260
count = 0

# 가지고 있는 동전 종류 (큰 단위부터 정렬)
coin_types = [500, 100, 50, 10]

for coin in coin_types:
    count += n // coin  # 해당 동전으로 거슬러 줄 수 있는 개수 더하기
    n %= coin           # 남은 돈 계산하기

print(count)  # 출력: 6 (500원 2개, 100원 2개, 50원 1개, 10원 1개)
`;

  const codeExample2 = `
# 1이 될 때까지: N을 K로 나누거나 1을 빼며 최단 경로로 1 만들기
n, k = 25, 4
result = 0

while True:
    # N이 K로 나누어 떨어지는 수가 될 때까지 1씩 빼기
    target = (n // k) * k
    result += (n - target)  # 1을 빼는 연산 횟수 더하기
    n = target
    
    # N이 K보다 작을 때 (더 이상 나눌 수 없을 때) 반복문 탈출
    if n < k:
        break
        
    # K로 나누기
    result += 1
    n //= k

# 마지막으로 남은 수에 대해 1씩 빼기
result += (n - 1)
print(result)  # 출력: 6
`;

  const quizOptions = [
    {
      text: "가지고 있는 동전들의 단위가 서로 배수/약수 관계가 아닐 때",
      isCorrect: false,
      explanation: "배수 관계가 아닐 때는 그리디로 풀 수 없으며, 다이나믹 프로그래밍(DP)을 사용해야 최적의 해를 보장받을 수 있습니다."
    },
    {
      text: "항상 최적의 해를 구할 수 있음을 논리적으로 '정당성 증명'했을 때",
      isCorrect: true,
      explanation: "정답입니다! 그리디 알고리즘은 탐욕적인 방식의 선택이 언제나 최적의 해를 보장하는지 '정당성(Justification)'을 이론적으로 증명하는 단계가 가장 중요합니다."
    },
    {
      text: "시간 복잡도가 무조건 O(N^2)을 유지할 때",
      isCorrect: false,
      explanation: "그리디 알고리즘은 일반적으로 빠른 속도(O(N) 또는 O(log N))로 동작하는 편이며, O(N^2) 복잡도와는 정당성 확보가 무관합니다."
    },
    {
      text: "동적 계획법(DP) 테이블을 미리 채워두었을 때",
      isCorrect: false,
      explanation: "DP와 그리디는 서로 상반되는 설계 패러다임입니다."
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
          Lesson 1. 그리디 (탐욕법) 🪙
        </h1>
        <p className="text-[15px] text-slate-500 dark:text-zinc-400 font-semibold leading-relaxed">
          '현재 상황에서 지금 당장 가장 좋은 것만 고르는' 탐욕적인 기법의 원리와 실전 적용 한계를 파헤칩니다.
        </p>
      </div>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 mb-12" />

      {/* Section 1 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          1. 그리디 알고리즘 개요
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            그리디(Greedy) 알고리즘은 단어 그대로 <strong>'탐욕법'</strong>이라 불립니다. 기준에 따라 현재 당장 가장 이득이 되는 선택을 이어 나갑니다.
          </p>
          <p>
            일반적인 알고리즘은 전체의 상황을 고려하지만, 그리디는 오직 <strong>현재의 순간</strong>만을 바라봅니다. 따라서 그리디 문제 해결의 핵심은 <strong>"이렇게 탐욕적으로 골랐을 때 최적의 해가 나오는가?"</strong>에 대한 정당성을 증명하는 것입니다.
          </p>
        </div>

        <Callout type="info" title="대표 기출 유형">
          <ul className="list-disc list-inside pl-2 space-y-1">
            <li>거스름돈 계산 (가장 큰 동전부터 거슬러 주기)</li>
            <li>최대/최소 합 만들기 (정렬 기준 설계)</li>
            <li>간선 최소 비용 연결 (크루스칼, 프림 알고리즘)</li>
          </ul>
        </Callout>
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 2 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          2. 대표 예제: 거스름돈 문제
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            당신은 점원입니다. 거슬러 줘야 할 돈이 <MathBadge>N</MathBadge>원일 때, 500원, 100원, 50원, 10원짜리 동전을 무제한 사용하여 거슬러 주는 동전의 최소 개수를 구하세요.
          </p>
          <p>
            이 문제의 아이디어는 <strong>'가장 큰 화폐 단위부터'</strong> 돈을 주는 것입니다. 화폐 단위가 큰 순서대로 동전을 채워나가면 최소 동전 개수를 확실히 달성할 수 있습니다.
          </p>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeExample1} />

        <Callout type="danger" title="거스름돈 그리디의 정당성 성립 조건! ⚠️">
          이 해결책이 유효한 이유는 <strong>동전의 큰 단위들이 항상 작은 단위들의 배수이기 때문</strong>입니다. 예를 들어 500원은 100원의 배수이며, 100원은 50원의 배수입니다.  
          만약 동전 단위가 500원, 400원, 100원이고 거슬러 줘야 할 돈이 800원이라면, 그리디 방식은 500원 + 100원 + 100원 + 100원(4개)을 주지만, 실제 최적의 해는 400원 + 400원(2개)입니다. 이처럼 배수 관계가 성립하지 않을 때는 <strong>DP</strong>로 해결해야 합니다!
        </Callout>
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 3 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          3. 대표 예제: 1이 될 때까지
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            어떠한 수 <MathBadge>N</MathBadge>이 1이 될 때까지 다음 두 과정 중 하나를 반복해서 선택하여 수행하려고 합니다. 단, 두 번째 연산은 <MathBadge>N</MathBadge>이 <MathBadge>K</MathBadge>로 나누어떨어질 때만 선택할 수 있습니다.
          </p>
          <ol className="list-decimal list-inside pl-4 space-y-1">
            <li>N에서 1을 뺍니다.</li>
            <li>N을 K로 나눕니다.</li>
          </ol>
          <p>
            나눗셈은 1을 빼는 연산보다 값을 급격하게 감소시키므로, 가능하면 <strong>최대한 많이 나누는 것</strong>이 최적의 선택입니다.
          </p>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeExample2} />
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Quiz */}
      <section>
        <QuizPanel 
          question="Q1. 그리디 알고리즘을 설계하여 실제 해결책을 도출했을 때, 코딩테스트 채점 서버에서 '오답(WA)' 판정을 받지 않기 위해 사전에 무조건 점검해야 하는 포인트는 무엇입니까?"
          options={quizOptions}
        />
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Tip Callout */}
      <Callout type="success" title="실전 코테 그리디 팁 💡">
        <p>
          코딩 테스트 문제를 만났을 때 바로 DP나 완전탐색이 떠오르지 않는다면, <strong>"정렬(Sort)"</strong>을 먼저 수행한 후 무언가 탐욕적인 기준을 세워 해결할 수 있는지 탐색해 보세요. 상당수의 그리디 문제는 내림차순/오름차순 정렬 후에 첫 번째 원소부터 그리디하게 선택해 나가면서 풀리도록 설계되어 있습니다.
        </p>
      </Callout>
    </div>
  );
}
