import CodeViewer from '../../components/ui/CodeViewer';
import Callout from '../../components/ui/Callout';
import MathBadge from '../../components/ui/MathBadge';
import QuizPanel from '../../components/ui/QuizPanel';

interface DfsBfsProps {
  isDarkMode: boolean;
}

export default function DfsBfs({ isDarkMode }: DfsBfsProps) {
  const codeExample1 = `
# DFS (깊이 우선 탐색) 재귀 구현 예제
def dfs(graph, v, visited):
    # 현재 노드를 방문 처리
    visited[v] = True
    print(v, end=' ')
    # 현재 노드와 연결된 다른 노드를 재귀적으로 방문
    for i in graph[v]:
        if not visited[i]:
            dfs(graph, i, visited)

# 각 노드가 연결된 정보를 표현 (2차원 인접 리스트)
graph = [
    [],        # 0번 노드는 사용 안 함
    [2, 3, 8], # 1번 노드와 연결된 노드들
    [1, 7],    # 2번 노드와 연결된 노드들
    [1, 4, 5],
    [3, 5],
    [3, 4],
    [7],
    [2, 6, 8],
    [1, 7]
]

# 각 노드가 방문된 정보를 표현 (1차원 리스트)
visited = [False] * 9

# 정의된 DFS 함수 호출
dfs(graph, 1, visited)  # 출력: 1 2 7 6 8 3 4 5
`;

  const codeExample2 = `
from collections import deque

# BFS (너비 우선 탐색) 큐 구현 예제
def bfs(graph, start, visited):
    # 큐(Queue) 구현을 위해 deque 라이브러리 사용
    queue = deque([start])
    # 현재 노드를 방문 처리
    visited[start] = True
    # 큐가 빌 때까지 반복
    while queue:
        # 큐에서 하나의 원소를 뽑아 출력
        v = queue.popleft()
        print(v, end=' ')
        # 아직 방문하지 않은 인접 원소들을 큐에 삽입하고 방문 처리
        for i in graph[v]:
            if not visited[i]:
                queue.append(i)
                visited[i] = True

# 각 노드가 연결된 정보를 표현 (2차원 인접 리스트)
graph = [
    [],
    [2, 3, 8],
    [1, 7],
    [1, 4, 5],
    [3, 5],
    [3, 4],
    [7],
    [2, 6, 8],
    [1, 7]
]

visited = [False] * 9

# 정의된 BFS 함수 호출
bfs(graph, 1, visited)  # 출력: 1 2 3 8 7 4 5 6
`;

  const quizOptions = [
    {
      text: "단순 파이썬 List와 pop(0) 메서드 사용",
      isCorrect: false,
      explanation: "리스트의 pop(0)은 O(N)의 시간 복잡도를 가지므로 대량의 데이터 탐색 시 시간 초과 오답이 발생합니다."
    },
    {
      text: "collections.deque를 임포트하여 popleft() 메서드 사용",
      isCorrect: true,
      explanation: "정답입니다! collections.deque의 popleft()는 O(1) 시간 복잡도를 보장하는 초고속 연산이므로 BFS 큐 구현의 표준 치트키입니다."
    },
    {
      text: "queue.Queue 클래스 객체를 동적 선언하여 사용",
      isCorrect: false,
      explanation: "queue.Queue는 멀티스레딩 지원용 락(Lock) 기법이 포함되어 있어 단순 코테 풀이 용도로는 성능 저하를 초래합니다."
    },
    {
      text: "정렬(Sorting) 기법을 매 턴마다 호출하여 최소 노드 추출",
      isCorrect: false,
      explanation: "정렬은 BFS의 큐 추출 과정과는 관련이 없습니다."
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
          Lesson 3. DFS/BFS 그래프 탐색 🗺️
        </h1>
        <p className="text-[15px] text-slate-500 dark:text-zinc-400 font-semibold leading-relaxed">
          그래프 전체를 체계적으로 탐색하는 양대 기둥, 깊이 우선 탐색(DFS)과 너비 우선 탐색(BFS)의 매커니즘을 마스터합니다.
        </p>
      </div>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 mb-12" />

      {/* Section 1 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          1. DFS & BFS 핵심 개념 정리
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            그래프 탐색이란 <strong>'하나의 노드에서 시작하여 다중 연결된 모든 노드를 방문하는 것'</strong>을 뜻합니다.  
            이를 위해 아래의 두 가지 핵심 선택지를 가집니다.
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2">
            <li>
              <strong>DFS (Depth-First Search, 깊이 우선 탐색)</strong>:  
              최대한 깊은 곳까지 우선 탐색한 뒤, 갈 곳이 없으면 뒤로 돌아와 다른 가지를 찾는 기법입니다. 주로 <strong>재귀(Recursion) 함수</strong>나 <strong>스택(Stack)</strong>으로 구현합니다.
            </li>
            <li>
              <strong>BFS (Breadth-First Search, 너비 우선 탐색)</strong>:  
              가까운 노드들부터 인접 순서대로 넓게 퍼지며 우선 탐색하는 기법입니다. 주로 <strong>큐(Queue)</strong> 자료구조를 사용하며, <strong>최단 경로(Shortest Path)</strong>를 구하는 문제에 극강의 성능을 냅니다.
            </li>
          </ul>
        </div>
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 2 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          2. DFS (깊이 우선 탐색) 구현과 원리
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            DFS는 스택이나 재귀 호출의 특성을 이용합니다. 탐색 과정은 다음과 같습니다.
          </p>
          <ol className="list-decimal list-inside pl-4 space-y-1">
            <li>탐색 시작 노드를 스택에 넣고 방문 처리합니다.</li>
            <li>스택 최상단 노드의 인접 노드 중 방문하지 않은 노드가 있으면, 그 노드를 스택에 넣고 방문 처리합니다. 방문하지 않은 인접 노드가 없으면 최상단 노드를 스택에서 꺼냅니다.</li>
            <li>위 2번 과정을 더 이상 수행할 수 없을 때까지 무한 반복합니다.</li>
          </ol>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeExample1} />

        <Callout type="danger" title="파이썬 재귀 호출 제한(Recursion Limit) 주의! 🛑">
          파이썬은 시스템 보호를 위해 기본 최대 재귀 깊이가 <MathBadge>1,000회</MathBadge> 정도로 대단히 낮게 세팅되어 있습니다.  
          따라서 노드가 많은 DFS를 재귀로 구현하면 <strong>RecursionError</strong>를 직면하고 탈락하게 됩니다.  
          반드시 코드 최상단에 <MathBadge>import sys; sys.setrecursionlimit(10**6)</MathBadge>을 선언해 제한을 수백만 번 수준으로 넓혀주어야 안전합니다!
        </Callout>
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 3 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          3. BFS (너비 우선 탐색) 구현과 원리
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            BFS는 선입선출(FIFO)인 큐를 활용하여 동작합니다. 원리는 다음과 같습니다.
          </p>
          <ol className="list-decimal list-inside pl-4 space-y-1">
            <li>시작 노드를 큐에 삽입하고 방문 처리를 합니다.</li>
            <li>큐에서 노드를 꺼낸 뒤, 해당 노드의 인접 노드 중 방문하지 않은 노드를 모두 큐에 삽입하고 방문 처리를 합니다.</li>
            <li>위 과정을 큐가 빌 때까지 반복합니다.</li>
          </ol>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeExample2} />
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Quiz */}
      <section>
        <QuizPanel 
          question="Q3. 너비 우선 탐색(BFS)을 파이썬으로 완벽하게 수현하고자 할 때, 일반적인 List의 pop(0) 대신 반드시 사용해야 하는 성능 극대화 치트키 모듈과 메서드는 무엇입니까?"
          options={quizOptions}
        />
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Real-world Tip Callout */}
      <Callout type="success" title="어느 상황에 어떤 것을 쓸까? 💡">
        <ul className="list-disc list-inside pl-2 space-y-1">
          <li><strong>최단 거리 / 최소 횟수 찾기</strong>: 무조건 <strong>BFS</strong>를 쓰세요. BFS는 현재 탐색 레이어 기준 동심원 구조로 퍼져나가므로 처음 도달한 해가 반드시 최단 경로임이 보장됩니다.</li>
          <li><strong>경로의 특징이나 가중치 기록 필요</strong>: <strong>DFS</strong>가 더 유리할 수 있습니다. 각 경로마다 가지쳐서 탐색할 수 있으며 상태(State) 백트래킹이 수월합니다.</li>
        </ul>
      </Callout>
    </div>
  );
}
