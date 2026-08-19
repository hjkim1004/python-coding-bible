import CodeViewer from '../../components/ui/CodeViewer';
import Callout from '../../components/ui/Callout';
import MathBadge from '../../components/ui/MathBadge';
import QuizPanel from '../../components/ui/QuizPanel';

interface StandardLibraryProps {
  isDarkMode: boolean;
}

export default function StandardLibrary({ isDarkMode }: StandardLibraryProps) {
  const codeSys = `
import sys

# 1. 단일 문자열 초고속 입력 받기 (rstrip은 필수!)
name = sys.stdin.readline().rstrip()

# 2. 정수 한 개 입력 받기
n = int(sys.stdin.readline().rstrip())

# 3. 공백으로 구분된 여러 정수 리스트로 받기 (가장 빈출!)
data = list(map(int, sys.stdin.readline().split()))

# 4. 재귀 최대 깊이 해제 (DFS 필수)
sys.setrecursionlimit(10 ** 6) # 깊이 제한을 100만으로 확장
`;

  const codeCollections = `
from collections import deque, Counter, defaultdict

# 1. deque (시간복잡도 O(1) 양방향 큐, BFS 핵심!)
queue = deque([1, 2, 3])
queue.append(4)
queue.appendleft(0)
first_out = queue.popleft() # 0 추출 (O(1))

# 2. Counter (리스트 원소 빈도수 집계 사전)
fruits = ["apple", "blue", "apple", "red", "blue", "apple"]
counter = Counter(fruits)
print(counter["apple"]) # 3
print(counter.most_common(1)) # [('apple', 3)] 가장 흔한 1개

# 3. defaultdict (KeyError를 철벽 방어하는 인접 리스트의 신)
graph = defaultdict(list)
graph["Node_A"].append("Node_B") # 초기화 없이 바로 append 가능!
`;

  const codeHeapq = `
import heapq

# 1. 최소 힙 (기본 작동, 작은 값이 항상 맨 앞으로)
heap = []
heapq.heappush(heap, 4)
heapq.heappush(heap, 1)
heapq.heappush(heap, 7)
min_val = heap[0] # 1 조회 (O(1))
extracted = heapq.heappop(heap) # 1 삭제 추출 (O(log N))

# 2. 최대 힙 (음수 부호 트릭 활용)
max_heap = []
data = [1, 5, 3, 9]
for val in data:
    heapq.heappush(max_heap, -val) # 음수로 변환해 삽입

max_value = -heapq.heappop(max_heap) # 9 추출 및 복원!
`;

  const codeItertools = `
from itertools import permutations, combinations, product

data = ['A', 'B', 'C']

# 1. 순열 (r개를 순서 고려해 뽑기)
print(list(permutations(data, 2)))
# [('A', 'B'), ('A', 'C'), ('B', 'A'), ... ]

# 2. 조합 (r개를 순서 없이 묶기, 최빈출!)
print(list(combinations(data, 2)))
# [('A', 'B'), ('A', 'C'), ('B', 'C')]

# 3. 중복 순열 (repeat=r)
print(list(product(['A', 'B'], repeat=3)))
`;

  const codeBisect = `
from bisect import bisect_left, bisect_right

# 정렬된 리스트에서 특정 범위에 속하는 데이터 개수를 O(log N)만에 알아내는 치트키 기법!
def count_by_range(a, left_value, right_value):
    right_index = bisect_right(a, right_value)
    left_index = bisect_left(a, left_value)
    return right_index - left_index

sorted_arr = [1, 2, 3, 3, 3, 3, 4, 8]
# 값이 3인 데이터 개수 구하기
print(count_by_range(sorted_arr, 3, 3)) # 4 (3이 총 4개 들어있음!)
`;

  const codeMath = `
import math

# 1. 최대공약수(gcd) 및 최소공배수(lcm - 3.9+)
print(math.gcd(24, 18)) # 6

# 2. 제곱근 정수 반환 (isqrt)
print(math.isqrt(25)) # 5

# 3. 올림과 내림
print(math.ceil(3.14))  # 4 (올림)
print(math.floor(3.14)) # 3 (내림)
`;

  const quizOptions = [
    {
      text: "math.gcd()",
      isCorrect: false,
      explanation: "gcd는 두 수의 최대공약수를 구하는 함수입니다."
    },
    {
      text: "collections.defaultdict()",
      isCorrect: false,
      explanation: "defaultdict는 존재하지 않는 키에 대해 기본값을 자동 초기화하는 특수 사전입니다."
    },
    {
      text: "heapq.heappush() / heappop()",
      isCorrect: false,
      explanation: "heapq는 최소/최대 값을 상시 정렬하며 꺼해야 하는 다익스트라 최단경로 등에 매우 강력하지만, 정렬된 배열 안의 범위 개수 쿼리와는 다릅니다."
    },
    {
      text: "bisect_left() / bisect_right()",
      isCorrect: true,
      explanation: "정답입니다! 정렬된 리스트에서 특정 범위 값의 데이터 개수를 이진 탐색으로 단 O(log N) 만에 차감 계산해 내는 범위 카운팅 쿼리의 주역들입니다."
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
          Lesson 5. 필수 표준 라이브러리 개요 📚
        </h1>
        <p className="text-[15px] text-slate-500 dark:text-zinc-400 font-semibold leading-relaxed">
          파이썬 생태계 최고의 무기인 6대 표준 모듈의 모든 단골 기믹과 실전 응용(최대 힙, 범위 이진탐색 쿼리) 기술을 완전 독파합니다.
        </p>
      </div>

      {/* 균일한 높이의 얇은 분리 장막 선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 mb-12" />

      {/* Section 1 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          1. sys — 빠른 입출력 및 재귀 해제
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            대용량 입력을 빠르게 받아 시간 초과를 피하고, DFS 탐색 시 파이썬의 기본 스택 한계(1,000회)를 해제해 줍니다.
          </p>
        </div>
        <CodeViewer isDarkMode={isDarkMode} code={codeSys} />
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-10" />

      {/* Section 2 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          2. collections — deque, Counter, defaultdict
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            시간복잡도 <MathBadge>O(1)</MathBadge>의 선입선출 큐를 지원하는 <MathBadge>deque</MathBadge>, 빈도수를 세어주는 <MathBadge>Counter</MathBadge>, 에러 없는 인접 리스트 제작을 돕는 <MathBadge>defaultdict</MathBadge>를 포함합니다.
          </p>
        </div>
        <CodeViewer isDarkMode={isDarkMode} code={codeCollections} />
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-10" />

      {/* Section 3 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          3. heapq — 최소 / 최대 우선순위 큐
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            원소를 추가하고 최솟값(혹은 최대값)을 꺼내는 연산이 단 <MathBadge>O(log N)</MathBadge> 만에 이루어집니다. 파이썬의 heapq는 기본적으로 최소 힙이므로 최대 힙 구현 시엔 음수 부호 트릭이 필요합니다.
          </p>
        </div>
        <CodeViewer isDarkMode={isDarkMode} code={codeHeapq} />
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-10" />

      {/* Section 4 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          4. itertools — 완탐 순열과 조합
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            모든 후보군을 생성해 뒤져야 하는 완전 탐색에서 <MathBadge>permutations</MathBadge>(순열)과 <MathBadge>combinations</MathBadge>(조합, 최빈출!)은 수학적 경우의 수를 단숨에 풀어내는 열쇠입니다.
          </p>
        </div>
        <CodeViewer isDarkMode={isDarkMode} code={codeItertools} />
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-10" />

      {/* Section 5 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          5. bisect — 정렬 데이터 이진 탐색 범위 쿼리
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            배열이 정렬되어 있을 때, 특정 범위 <MathBadge>[left_value, right_value]</MathBadge>에 해당하는 원소 개수를 이진 탐색의 빠른 속도인 <MathBadge>O(log N)</MathBadge>으로 카운트해내는 기법입니다.
          </p>
        </div>
        <CodeViewer isDarkMode={isDarkMode} code={codeBisect} />
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-10" />

      {/* Section 6 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          6. math — 초고속 기하 및 수학 포맷 공식
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            최대공약수(gcd), 최소공배수(lcm), 소수 판별의 핵심인 제곱근(isqrt), 무조건 올림(ceil)/내림(floor) 공식을 초고속 기계어로 가동합니다.
          </p>
        </div>
        <CodeViewer isDarkMode={isDarkMode} code={codeMath} />
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-10" />

      {/* Quiz */}
      <section>
        <QuizPanel 
          question="Q5. 파이썬의 어떤 내장 표준 모듈이 정렬된 리스트에서 주어진 범위 값(예: 3이상 7이하인 원소 수)을 단 O(log N) 만에 찾아 차감 계산해 내는 이진 탐색 범주 연산의 치트키 역할을 할까요?"
          options={quizOptions}
        />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Bottom Tip Callout */}
      <Callout type="success" title="실전 코딩테스트 응용 팁 & 추천 문제">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>3장 카드 조합 구하기</strong>: 카드 리스트에서 합이 10인 카드 3장의 묶음을 탐색하려면 백트래킹을 짜지 말고 <MathBadge>itertools.combinations(cards, 3)</MathBadge>을 돌려 조합들을 필터링하세요! 단 3줄 만에 풀 수 있습니다.
          </li>
          <li>
            <strong>추천 문제</strong>: 프로그래머스 -{' '}
            <a
              href="https://school.programmers.co.kr/learn/courses/30/lessons/86491"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 underline underline-offset-2 transition-colors font-semibold"
            >
              [최소직사각형]
            </a>
            , 백준 -{' '}
            <a
              href="https://www.acmicpc.net/problem/15649"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 underline underline-offset-2 transition-colors font-semibold"
            >
              [N과 M (1)]
            </a>
          </li>
        </ul>
      </Callout>
    </div>
  );
}
