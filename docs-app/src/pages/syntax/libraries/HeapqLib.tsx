import CodeViewer from '../../../components/ui/CodeViewer';
import Callout from '../../../components/ui/Callout';
import MathBadge from '../../../components/ui/MathBadge';
import QuizPanel from '../../../components/ui/QuizPanel';

interface HeapqLibProps {
  isDarkMode: boolean;
}

export default function HeapqLib({ isDarkMode }: HeapqLibProps) {
  const codeMinHeap = `
import heapq

# 1. 빈 리스트를 힙으로 선언하여 사용하기 (Push / Pop)
heap = []

heapq.heappush(heap, 4)
heapq.heappush(heap, 1)
heapq.heappush(heap, 7)
heapq.heappush(heap, 3)

# 가장 작은 최솟값은 삭제하지 않고 단 O(1) 만에 단순 인덱스 0번으로 확인 가능!
print(heap[0]) # 1 

# 최솟값을 힙에서 완전히 꺼내며 삭제 (추출연산 O(log N) 소요)
print(heapq.heappop(heap)) # 1 (가장 작은 값 추출됨)
print(heapq.heappop(heap)) # 3 (그다음 작은 값 추출됨)
`;

  const codeHeapify = `
import heapq

# 2. 이미 무작위 원소들이 들어 있는 리스트를 단 O(N) 만에 힙으로 전환하기 (heapify)
raw_list = [5, 3, 9, 1, 10, 2]
heapq.heapify(raw_list) # 원본 리스트가 최소 힙 구조로 재정렬됨!

print(raw_list[0]) # 1 (최솟값 보장)
print(heapq.heappop(raw_list)) # 1
`;

  const codeMaxHeap = `
import heapq

# 3. 최대 힙(Max Heap) 구현하기 (부호 반전 치트키 트릭!)
# 파이썬 heapq는 최소 힙만 제공하므로, 원소에 마이너스 부호(-)를 붙여 넣고 꺼낼 때 부호를 환원합니다.
data = [1, 5, 3, 9, 2]
max_heap = []

for val in data:
    heapq.heappush(max_heap, -val) # -1, -5, -3, -9, -2 로 들어감

# 꺼낼 때 마이너스를 한 번 더 붙여 양수로 환원
print(-heapq.heappop(max_heap)) # 9 (원본 데이터 기준 최댓값 추출 완료!)
print(-heapq.heappop(max_heap)) # 5
`;

  const quizOptions = [
    {
      text: "heappush()와 heappop() 연산의 시간 복잡도는 각각 O(1) 이다.",
      isCorrect: false,
      explanation: "아닙니다. 힙의 완전 이진트리를 재정비해야 하므로 push와 pop은 O(log N)의 복잡도가 소요됩니다."
    },
    {
      text: "힙의 최솟값을 단순 조회하는 heap[0] 연산의 시간 복잡도는 O(1) 이다.",
      isCorrect: true,
      explanation: "정답입니다! 파이썬 최소 힙의 맨 앞 인덱스인 heap[0]은 언제나 최솟값 원소가 파킹되어 있습니다. 이를 pop으로 삭제하며 꺼내지 않고, 단순 조회만 수행하는 것은 즉각적인 O(1) 성능이 보장됩니다."
    },
    {
      text: "heapify()를 통한 일괄 힙 전환 연산의 시간 복잡도는 O(N log N) 이다.",
      isCorrect: false,
      explanation: "아닙니다. heapify는 모든 요소를 하나씩 넣는 것보다 훨씬 빠른 상하식 재구성 알고리즘을 타므로 O(N)의 뛰어난 선형 성능을 제공합니다."
    },
    {
      text: "파이썬의 heapq는 기본적으로 최대값 우선 힙(Max Heap)이다.",
      isCorrect: false,
      explanation: "아닙니다. 파이썬 heapq의 기본 정렬 기준은 오직 작은 값 우선인 '최소 힙(Min Heap)'입니다."
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
          Lesson 5-3. heapq 라이브러리 (최소 / 최대 힙) 🏆
        </h1>
        <p className="text-[15px] text-slate-500 dark:text-zinc-400 font-semibold leading-relaxed mt-3">
          상시 정렬 상태에서 최댓값과 최솟값을 꺼내는 우선순위 큐(Priority Queue)의 핵심 원리와 최대 힙 변환 공식을 분석합니다.
        </p>
      </div>

      {/* 균일한 높이의 얇은 분리 장막 선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 mb-12" />

      {/* Section 1 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          1. heapq의 기본 용법 (최소 힙)
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            배열에 무작위 데이터를 넣었다가 뺄 때, 상시 정렬된 순서에서 최솟값을 뽑아내고 싶을 때 사용합니다.  
            일반 리스트에서 매번 정렬(<MathBadge>list.sort()</MathBadge> - <MathBadge>O(N log N)</MathBadge>)을 하면 무참히 시간 초과가 나지만, 힙은 삽입과 추출을 단 <MathBadge>O(log N)</MathBadge>의 최적화된 연산으로 통과시켜 줍니다.
          </p>
        </div>
        <CodeViewer isDarkMode={isDarkMode} code={codeMinHeap} />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 2 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          2. heapify() — 일괄 힙 전환법 (선형 O(N) 보장)
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            이미 다량의 무작위 정수형 배열이 채워진 상황에서 힙 구조로 재배치할 때 씁니다.  
            반복문으로 돌며 <MathBadge>heappush</MathBadge>를 낱개로 연사하는 것보다 훨씬 빠른 최적화 선형 시간 복잡도 <MathBadge>O(N)</MathBadge>을 온전히 보장합니다.
          </p>
        </div>
        <CodeViewer isDarkMode={isDarkMode} code={codeHeapify} />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 3 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          3. 최대 힙 (Max Heap) — 부호 반전 치트키
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            파이썬은 기본적으로 최소 힙만 지원하므로 큰 값이 상시 맨 앞으로 오도록 최대 힙을 구성하고 싶다면 데이터를 집어넣기 전에 <strong>마이너스 부호(-)</strong>를 곱해서 넣고, 꺼낼 때 다시 복구하는 부호 스위칭 공식을 상시 탑재하세요.
          </p>
        </div>
        <CodeViewer isDarkMode={isDarkMode} code={codeMaxHeap} />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Quiz */}
      <section>
        <QuizPanel 
          question="Q5-3. 파이썬 최소 힙 heapq 자료형을 가동하는 과정에서, 힙의 최솟값(가장 작은 데이터)을 힙 내부에서 아예 꺼내 삭제하지 않고 단순히 어떤 값인지만 엿보고(Peeking) 조회하는 가장 빠른 시간 복잡도는 무엇일까요?"
          options={quizOptions}
        />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Bottom Tip Callout */}
      <Callout type="success" title="실전 코딩테스트 응용 팁 & 추천 문제">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>튜플을 이용한 우선순위 세팅</strong>: heapq는 원소로 튜플을 집어넣으면 튜플의 첫 번째 원소 기준으로 최소 힙을 구성합니다! 이를 이용해 <MathBadge>heapq.heappush(heap, (우선순위_가중치, 실제_데이터))</MathBadge> 공식을 쓰면, 가중치가 작은 순서대로 꺼내는 다익스트라 최단경로 및 힙 정렬 구조를 무결하게 구현할 수 있습니다.
          </li>
          <li>
            <strong>추천 기출문제</strong>: 프로그래머스 -{' '}
            <a
              href="https://school.programmers.co.kr/learn/courses/30/lessons/42626"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 underline underline-offset-2 transition-colors font-semibold"
            >
              [더 맵게]
            </a>{' '}
            (가장 매운 음식을 힙으로 지속 정렬하는 고득점 키트 필수 문제)
          </li>
        </ul>
      </Callout>
    </div>
  );
}
