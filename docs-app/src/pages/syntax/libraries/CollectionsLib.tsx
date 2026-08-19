import CodeViewer from '../../../components/ui/CodeViewer';
import Callout from '../../../components/ui/Callout';
import MathBadge from '../../../components/ui/MathBadge';
import QuizPanel from '../../../components/ui/QuizPanel';

interface CollectionsLibProps {
  isDarkMode: boolean;
}

export default function CollectionsLib({ isDarkMode }: CollectionsLibProps) {
  const codeDeque = `
from collections import deque

# 1. deque 선언 및 양방향 제어 (BFS 필수템)
queue = deque([1, 2, 3])

queue.append(4)       # 우측 삽입 -> [1, 2, 3, 4]
queue.appendleft(0)  # 좌측 삽입 -> [0, 1, 2, 3, 4] (O(1) 성능!)

right_out = queue.pop()       # 우측 원소 추출 -> 4 (O(1))
left_out = queue.popleft()   # 좌측 원소 추출 -> 0 (O(1) 최적 속도!)
`;

  const codeCounter = `
from collections import Counter

# 1. Counter를 이용한 출현 빈도 사전 일괄 집계
data = ["red", "blue", "red", "green", "blue", "red"]
counter = Counter(data)

print(counter) # Counter({'red': 3, 'blue': 2, 'green': 1})
print(counter["red"]) # 3 (해당 원소 개수 즉시 조회 O(1))

# 2. most_common(k) - 가장 많이 출현한 상위 k개 원소 추출 (튜플 리스트 반환)
print(counter.most_common(2)) # [('red', 3), ('blue', 2)]
`;

  const codeDefaultdict = `
from collections import defaultdict

# 1. 존재하지 않는 키에 대해 KeyError 대신 자동으로 빈 리스트([])를 기본값으로 파킹해주는 사전
# 그래프의 인접 이웃 노드 리스트 구축 시 압도적 효율성!
graph = defaultdict(list)

# 일반 dict처럼 Key유무를 미리 분기하여 if key not in graph: graph[key] = [] 처럼 처리할 필요가 없음!
graph["Node_A"].append("Node_B")
graph["Node_A"].append("Node_C")

print(graph["Node_A"]) # ['Node_B', 'Node_C']
print(graph["Node_B"]) # [] (처음 선언된 키도 에러 없이 기본 리스트 [] 반환)
`;

  const quizOptions = [
    {
      text: "list.pop(0) 연산",
      isCorrect: true,
      explanation: "정답입니다! 일반 리스트의 pop(0)는 맨 앞 원소를 뽑은 후 빈칸을 채우기 위해 뒤쪽 N-1개의 모든 데이터를 한 칸씩 앞으로 당겨야 하므로 O(N)의 시간이 수반됩니다. N이 클 때는 무조건 deque.popleft()를 써야만 O(1)로 고속 탈출합니다."
    },
    {
      text: "deque.popleft() 연산",
      isCorrect: false,
      explanation: "deque.popleft()는 양방향 해시 포인터 이동만 수행하므로 O(1) 복잡도의 극대 속도를 냅니다."
    },
    {
      text: "list.append() 연산",
      isCorrect: false,
      explanation: "리스트의 append()는 맨 뒤에 단순히 자리를 덧붙이는 것이므로 O(1)로 안전하고 유효합니다."
    },
    {
      text: "dict.get() 연산",
      isCorrect: false,
      explanation: "사전의 get() 연산은 해시 탐색으로 O(1) 복잡도의 속도를 보장합니다."
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
          Lesson 5-2. collections 라이브러리 (특수 자료구조) 📦
        </h1>
        <p className="text-[15px] text-slate-500 dark:text-zinc-400 font-semibold leading-relaxed mt-3">
          O(1) 복잡도로 동작하는 양방향 대기열 deque, 빈도 사전 Counter, 그리고 그래프 탐색 빌드의 핵심 defaultdict 용법을 마스터합니다.
        </p>
      </div>

      {/* 균일한 높이의 얇은 분리 장막 선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 mb-12" />

      {/* Section 1 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          1. deque (Double-Ended Queue) — BFS 전파 탐색 필수 뼈대
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            파이썬의 기본 리스트는 배열 구조상 인덱스 `0`번째 데이터를 제거하거나 삽입할 때 엄청난 과도 마진 연산 오차(<MathBadge>O(N)</MathBadge>)가 걸려 성능 낭비의 핵심 주범이 됩니다.  
            이를 극복하기 위해 최적화된 양방향 노드 링 버퍼인 <MathBadge>deque</MathBadge>를 기계적으로 임포트해 BFS 구현에 투입해야 합니다.
          </p>
        </div>
        <CodeViewer isDarkMode={isDarkMode} code={codeDeque} />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 2 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          2. Counter — 출현 빈도수 일괄 계산기
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            특정 텍스트 단어 리스트나 문자열 안에서 각 요소가 몇 번씩 나타났는지 사전을 일일이 만드는 수동 코딩을 생략시켜 줍니다.  
            특히 <MathBadge>most_common(k)</MathBadge>은 가장 많이 등장한 상위 <MathBadge>k</MathBadge>개 데이터를 튜플 리스트로 신속하게 산출해 줍니다.
          </p>
        </div>
        <CodeViewer isDarkMode={isDarkMode} code={codeCounter} />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 3 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          3. defaultdict — KeyError 철벽 방어 및 그래프 빌드용 치트키
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            사전 자료형 사용 시, 사전에 존재하지 않는 키를 수정/참조하려 할 때 파이썬은 <MathBadge>KeyError</MathBadge>를 뱉고 폭사합니다.  
            <MathBadge>defaultdict(list)</MathBadge>를 활용하면, 키가 처음 등록되는 순간 자동으로 빈 리스트(<MathBadge>[]</MathBadge>)를 바인딩해주어, DFS/BFS 그래프의 <strong>인접 리스트</strong>를 구축할 때 놀라운 코드 간결함과 최적 성능을 냅니다.
          </p>
        </div>
        <CodeViewer isDarkMode={isDarkMode} code={codeDefaultdict} />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Quiz */}
      <section>
        <QuizPanel 
          question="Q5-2. 다음 파이썬 리스트 및 사전 연산 중, 데이터의 총량 N이 증가함에 따라 시간 복잡도가 O(N)으로 기하급수적으로 늘어나 성능 저하와 시간초과를 일으키는 가장 위험한 기법은 무엇일까요?"
          options={quizOptions}
        />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Bottom Tip Callout */}
      <Callout type="success" title="실전 코딩테스트 응용 팁 & 추천 문제">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>defaultdict(int) 로 아파트 빈도수 세기</strong>: 어떤 숫자들이 몇 번 나왔는지 체크할 때 초기화 여부 필요 없이 <MathBadge>count_map[key] += 1</MathBadge> 공식을 쓰세요! 기본 정수 `0`으로 자동 세팅되므로 키가 처음 나오든 백 번 나오든 완벽 무결하게 집계됩니다.
          </li>
          <li>
            <strong>추천 기출문제</strong>: 프로그래머스 -{' '}
            <a
              href="https://school.programmers.co.kr/learn/courses/30/lessons/138476"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 underline underline-offset-2 transition-colors font-semibold"
            >
              [귤 고르기]
            </a>{' '}
            (Counter의 빈도 집계를 활용해 가장 적은 종류 고르기 핵심)
          </li>
        </ul>
      </Callout>
    </div>
  );
}
