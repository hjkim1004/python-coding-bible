import CodeViewer from '../../components/ui/CodeViewer';
import Callout from '../../components/ui/Callout';
import MathBadge from '../../components/ui/MathBadge';
import QuizPanel from '../../components/ui/QuizPanel';

interface ShortestPathProps {
  isDarkMode: boolean;
}

export default function ShortestPath({ isDarkMode }: ShortestPathProps) {
  const codeExample1 = `
import heapq
import sys

# 입력 속도 향상 설정
input = sys.stdin.readline
INF = int(1e9) # 무한을 의미하는 값으로 10억 설정

# 노드의 개수, 간선의 개수
n, m = 6, 11
# 시작 노드 번호
start = 1
# 각 노드에 연결되어 있는 노드에 대한 정보를 담는 리스트 생성
graph = [[] for _ in range(n + 1)]
# 최단 거리 테이블을 모두 무한으로 초기화
distance = [INF] * (n + 1)

# 임의의 11개 간선 정보 (출발노드, 도착노드, 가중치 비용)
edges = [
    (1, 2, 2), (1, 3, 5), (1, 4, 1),
    (2, 3, 3), (2, 4, 2),
    (3, 2, 3), (3, 6, 5),
    (4, 3, 3), (4, 5, 1),
    (5, 3, 1), (5, 6, 2)
]
for u, v, w in edges:
    graph[u].append((v, w))

def dijkstra(start):
    q = []
    # 시작 노드로 가기 위한 최단 거리는 0으로 설정하여 큐에 삽입 (거리, 노드번호) 순서쌍!
    heapq.heappush(q, (0, start))
    distance[start] = 0
    
    while q:
        # 가장 최단 거리가 짧은 노드에 대한 정보 꺼내기
        dist, now = heapq.heappop(q)
        # 현재 노드가 이미 처리된 적이 있는 노드라면 패스
        if distance[now] < dist:
            continue
        # 현재 노드와 연결된 다른 인접 노드들을 확인
        for i in graph[now]:
            cost = dist + i[1]
            # 현재 노드를 거쳐서 다른 노드로 이동하는 거리가 더 짧은 경우
            if cost < distance[i[0]]:
                distance[i[0]] = cost
                heapq.heappush(q, (cost, i[0]))

# 다익스트라 알고리즘 수행
dijkstra(start)

# 모든 노드로 가기 위한 최단 거리를 출력
for i in range(1, n + 1):
    if distance[i] == INF:
        print("도달 불가")
    else:
        print(f"{i}번 노드까지의 최단 거리: {distance[i]}")
# 출력: 
# 1번 노드까지의 최단 거리: 0
# 2번 노드까지의 최단 거리: 2
# 3번 노드까지의 최단 거리: 3
# 4번 노드까지의 최단 거리: 1
# 5번 노드까지의 최단 거리: 2
# 6번 노드까지의 최단 거리: 4
`;

  const codeExample2 = `
# 플로이드-워셜(Floyd-Warshall) 알고리즘 표준 템플릿
# 2차원 인접 행렬을 생성하고 무한으로 초기화
INF = int(1e9)
n, m = 4, 7
graph = [[INF] * (n + 1) for _ in range(n + 1)]

# 자기 자신으로 가는 비용은 0으로 초기화
for a in range(1, n + 1):
    graph[a][a] = 0

# 각 간선 정보를 입력받아 그 값으로 초기화 (시작노드, 도착노드, 가중치 비용)
edges = [
    (1, 2, 4), (1, 4, 6),
    (2, 1, 3), (2, 3, 7),
    (3, 1, 5), (3, 4, 4),
    (4, 2, 2)
]
for a, b, c in edges:
    graph[a][b] = c

# 점화식 D[a][b] = min(D[a][b], D[a][k] + D[k][b]) 에 따라 플로이드-워셜 점진적 연산
for k in range(1, n + 1): # 경유지 노드 K
    for a in range(1, n + 1): # 출발 노드 A
        for b in range(1, n + 1): # 도착 노드 B
            graph[a][b] = min(graph[a][b], graph[a][k] + graph[k][b])

# 수행된 결과를 2차원 행렬 형태로 출력
for a in range(1, n + 1):
    for b in range(1, n + 1):
        if graph[a][b] == INF:
            print("INF", end=" ")
        else:
            print(graph[a][b], end=" ")
    print()
# 출력:
# 0 4 11 6 
# 3 0 7 9 
# 5 6 0 4 
# 5 2 9 0 
`;

  const quizOptions = [
    {
      text: "O(V^3)",
      isCorrect: false,
      explanation: "O(V^3)는 3중 For 루프를 완전 회전시키는 플로이드-워셜 알고리즘의 시간 복잡도입니다."
    },
    {
      text: "O(E log V)",
      isCorrect: true,
      explanation: "정답입니다! 매 단계마다 최단거리가 최소인 노드를 선별할 때 heapq(최소 힙) 자료구조를 가동하면 검색 연산 속도가 비약적으로 줄어들어, 다익스트라 최적화 성능은 최종 O(E log V)를 보장받게 됩니다."
    },
    {
      text: "O(V + E)",
      isCorrect: false,
      explanation: "O(V + E)는 단순 BFS/DFS의 가중치 없는 탐색 복잡도입니다."
    },
    {
      text: "O(E^2 log V)",
      isCorrect: false,
      explanation: "잘못 설계된 비효율적인 수치입니다."
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
          Lesson 7. 최단 경로 (Shortest Path) 🛣️
        </h1>
        <p className="text-[15px] text-slate-500 dark:text-zinc-400 font-semibold leading-relaxed">
          지도와 네트워크 위에서 한 지점으로부터 다른 임의 지점들까지의 최단 가중치 도달 경로를 찾아내는 핵심 알고리즘을 마스터합니다.
        </p>
      </div>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 mb-12" />

      {/* Section 1 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          1. 최단 경로 문제의 양대 분파
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            가중치가 설정된 그래프 상에서 출발 노드에서 도착 노드까지의 누적 비용을 극도로 아끼는 최단 경로 문제는 코딩테스트의 최고난도 변별력 단골 문항입니다. 상황에 따라 아래 두 전용 무기를 꺼내듭니다.
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2">
            <li>
              <strong>다익스트라 (Dijkstra) 알고리즘</strong>:  
              <strong>"1개의 특정 출발점"</strong>에서 다른 모든 목적지 노드까지의 개별 최단 거리를 모두 계산합니다. 음의 간선이 없을 때만 가동되며, <strong>우선순위 큐(heapq)</strong>를 적용해 최적화합니다.
            </li>
            <li>
              <strong>플로이드-워셜 (Floyd-Warshall) 알고리즘</strong>:  
              <strong>"모든 시작점에서 모든 목적지점까지"</strong>의 최단 거리 쌍을 전부 2차원 배열에 계산해 보관합니다. 3중 반복문을 기반으로 점진 계산하는 <strong>DP 패러다임</strong>을 채택하고 있습니다.
            </li>
          </ul>
        </div>
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 2 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          2. 다익스트라 최적화 템플릿 (heapq 가동)
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            매 단계마다 아직 거쳐가지 않은 후보 노드 중 최단 거리가 가장 얇은 노드를 무조건 빠르게 찾아내는 수단으로 <MathBadge>heapq</MathBadge>(최소 힙)를 결합합니다.  
            기존 선형 완전탐색형 다익스트라(<MathBadge>O(V²)</MathBadge>) 대비 극단적으로 빠른 시간 효율을 선사해 줍니다.
          </p>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeExample1} />
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 3 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          3. 플로이드-워셜 알고리즘 템플릿
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            플로이드-워셜 알고리즘은 <MathBadge>D[a][b] = min(D[a][b], D[a][k] + D[k][b])</MathBadge> 라는 지극히 단순한 DP 점화식 3중 루프를 통해 작동합니다.  
            직관적이고 단순하여 코드가 짧은 장점이 있으나, 시간 복잡도가 무려 <MathBadge>O(V³)</MathBadge>에 달하므로 노드의 개수 <MathBadge>V</MathBadge>가 <strong>500개 이하</strong>인 소형 문제에서만 채택할 수 있습니다!
          </p>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeExample2} />
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Quiz */}
      <section>
        <QuizPanel 
          question="Q7. 가중치 단방향/양방향 그래프 상에서 시작노드가 단 한 개 주어졌을 때, heapq 라이브러리 기반 우선순위 큐를 정교하게 탑재하여 성능 극대화를 이룩한 최적화 다익스트라 알고리즘의 공식적인 시간 복잡도는 어떻게 됩니까?"
          options={quizOptions}
        />
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Bottom Tip Callout */}
      <Callout type="warning" title="시간 복잡도를 확인하고 다익스트라 vs 플로이드-워셜을 고르세요! 🛑">
        <p className="mb-2">
          코딩 테스트의 노드 범위 세팅에 따라 채용해야 할 최단 경로 전용 무기가 단 한순간에 갈려 나갑니다.
        </p>
        <p>
          - 노드의 개수가 <strong>10,000개 이상, 간선이 100,000개 이상</strong>으로 크다: 무조건 <strong>O(E log V) 다익스트라</strong>를 사용하십시오.  
          - 노드의 개수가 <strong>200~300개 수준</strong>으로 매우 아담하고, '모든 지점에서 모든 지점'의 다중 탐색을 요구한다: 코드가 간결하고 인접행렬로 직관 계산할 수 있는 <strong>O(V³) 플로이드-워셜</strong>을 안전히 탑재하십시오!
        </p>
      </Callout>
    </div>
  );
}
