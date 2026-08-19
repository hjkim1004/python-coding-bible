import CodeViewer from '../../components/ui/CodeViewer';
import Callout from '../../components/ui/Callout';
import MathBadge from '../../components/ui/MathBadge';
import QuizPanel from '../../components/ui/QuizPanel';

interface GraphTheoryProps {
  isDarkMode: boolean;
}

export default function GraphTheory({ isDarkMode }: GraphTheoryProps) {
  const codeExample1 = `
# 경로 압축(Path Compression) 기법을 탑재한 Union-Find (서로소 집합) 최적 구현
def find_parent(parent, x):
    # 루트 노드가 아니라면, 루트 노드를 찾을 때까지 재귀적으로 호출
    # 경로 압축(Path Compression): 찾은 루트 노드를 즉시 부모로 등록해 O(V) -> 사실상 O(1) 수준 갱신!
    if parent[x] != x:
        parent[x] = find_parent(parent, parent[x])
    return parent[x]

# 두 원소가 속한 집합을 합치기 (Union)
def union_parent(parent, a, b):
    a = find_parent(parent, a)
    b = find_parent(parent, b)
    if a < b:
        parent[b] = a
    else:
        parent[a] = b

# 노드의 개수와 간선(Union 연산)의 개수 정의
v, e = 6, 4
parent = [0] * (v + 1) # 부모 테이블 초기화

# 부모 테이블상에서, 부모를 자기 자신으로 초기화
for i in range(1, v + 1):
    parent[i] = i

# Union 연산을 각각 수행
unions = [(1, 4), (2, 3), (2, 5), (5, 6)]
for a, b in unions:
    union_parent(parent, a, b)

# 각 원소가 속한 집합의 루트 노드 확인하기
print('각 원소의 루트 노드: ', end='')
for i in range(1, v + 1):
    print(find_parent(parent, i), end=' ')
# 출력: 각 원소의 루트 노드: 1 2 2 1 2 2 
`;

  const codeExample2 = `
from collections import deque

# 위상 정렬(Topology Sort) 알고리즘 구현 예제
# 노드의 개수와 간선의 개수
v, e = 7, 8
# 모든 노드에 대한 진입차수(Indegree)는 0으로 초기화
indegree = [0] * (v + 1)
# 각 노드에 연결된 간선 정보를 담기 위한 연결 리스트 초기화
graph = [[] for i in range(v + 1)]

# 방향 그래프의 모든 간선 정보 (출발, 도착)
edges = [
    (1, 2), (1, 5), (2, 3), (2, 6), (3, 4), (4, 7), (5, 6), (6, 4)
]
for a, b in edges:
    graph[a].append(b) # 정점 A에서 B로 이동 가능
    indegree[b] += 1 # 진입차수를 1 증가

# 위상 정렬 함수
def topology_sort():
    result = [] # 알고리즘 수행 결과를 담을 리스트
    q = deque() # 큐 기능을 위한 deque 라이브러리 사용
    
    # 처음 시작할 때는 진입차수가 0인 노드를 큐에 전부 삽입
    for i in range(1, v + 1):
        if indegree[i] == 0:
            q.append(i)
            
    # 큐가 빌 때까지 반복
    while q:
        # 큐에서 원소 꺼내기
        now = q.popleft()
        result.append(now)
        # 해당 원소와 연결된 노드들의 진입차수에서 1 빼기
        for i in graph[now]:
            indegree[i] -= 1
            # 새롭게 진입차수가 0이 되는 노드를 큐에 삽입
            if indegree[i] == 0:
                q.append(i)
                
    # 위상 정렬을 수행한 결과 출력
    for x in result:
        print(x, end=' ')

topology_sort()  # 출력: 1 2 5 3 6 4 7
`;

  const quizOptions = [
    {
      text: "다익스트라 최단경로 알고리즘",
      isCorrect: false,
      explanation: "다익스트라는 특정 시작점에서 다른 노드까지 가중치 합을 극소화하는 경로 추적 전용 알고리즘입니다."
    },
    {
      text: "위상 정렬 (Topology Sort)",
      isCorrect: true,
      explanation: "정답입니다! 위상 정렬은 '사이클이 없는 방향 그래프(DAG)' 상에서 전후 단계/선수 과목 이수 순서처럼 방향성에 위배되지 않게 모든 노드를 정렬하는 그래프 이론의 필살기입니다."
    },
    {
      text: "크루스칼 알고리즘",
      isCorrect: false,
      explanation: "크루스칼은 가장 작은 비용의 간선들을 사이클 없이 선별해 연결하여 최소 신장 트리(MST)를 구성하는 무방향 그래프 기법입니다."
    },
    {
      text: "벨만-포드 알고리즘",
      isCorrect: false,
      explanation: "벨만-포드는 음의 가중치 간선 순환을 잡아내기 위한 최단거리 대안입니다."
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
          Lesson 8. 기타 그래프 이론 🕸️
        </h1>
        <p className="text-[15px] text-slate-500 dark:text-zinc-400 font-semibold leading-relaxed">
          서로소 집합 관계를 실시간 추적하는 Union-Find 및 순서가 매겨진 의존성 노드 정렬인 위상 정렬 등 특수 그래프 해법을 마스터합니다.
        </p>
      </div>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 mb-12" />

      {/* Section 1 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          1. 서로소 집합 (Union-Find)과 경로 압축
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            서로소 집합(Disjoint-Set) 혹은 <strong>Union-Find</strong> 알고리즘은 그래프 내 노드 간의 <strong>연결 관계(네트워크 그룹)를 실시간 추적하고 판별</strong>하기 위한 고성능 자료구조 기법입니다.
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2">
            <li><strong>Union(합집합) 연산</strong>: 2개의 원소가 속한 개별 집합을 하나의 대표 루트 노드 그룹으로 묶어 합칩니다.</li>
            <li><strong>Find(찾기) 연산</strong>: 특정 원소가 속한 집합의 최종 '루트 노드'를 추적하여 반환합니다. 이를 대조해 두 노드가 현재 통신(연결) 상태인지 판별합니다.</li>
          </ul>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeExample1} />

        <Callout type="success" title="경로 압축(Path Compression)의 기적 ⚡">
          단순 Union-Find는 노드가 한 줄의 편향 사슬 트리 구조로 길어지면 Find 연산에 최악 <MathBadge>O(V)</MathBadge>의 탐색 지연이 생깁니다.  
          하지만 재귀 함수 리턴 단계에서 부모 테이블 값을 최종 루트 노드로 다이렉트 갱신해 박아두는 <strong>경로 압축(Path Compression)</strong>을 세팅해 두면, 모든 노드가 루트에 단방향 직결되어 연산 복잡도가 사실상 <strong>O(1)</strong> 수준인 아커만 역함수 복잡도로 극적 단축됩니다!
        </Callout>
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 2 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          2. 위상 정렬 (Topology Sort)과 진입차수
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            위상 정렬은 <strong>"사이클이 존재하지 않는 방향 그래프(DAG)"</strong> 상에서 각 정점들을 선후 관계 및 방향 흐름 조건에 맞추어 평면 순서대로 일렬 정렬하는 정교한 정렬 기법입니다.
          </p>
          <ul className="list-disc list-inside pl-2 space-y-1">
            <li><strong>진입차수(Indegree)</strong>: 특정 노드로 들어오는 방향성 간선의 개수를 뜻합니다.</li>
            <li><strong>진출차수(Outdegree)</strong>: 특정 노드로부터 바깥으로 뿜어져 나가는 방향 간선의 개수입니다.</li>
          </ul>
          <p>
            알고리즘은 진입차수가 <MathBadge>0</MathBadge>인(즉, 선행 조건이 아예 없는 즉시 실행 가능 상태) 노드들을 선별해 큐에 삽입해 나가면서 가동됩니다.
          </p>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeExample2} />
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Quiz */}
      <section>
        <QuizPanel 
          question="Q8. 방향 그래프 상에서 순환(Cycle)이 발생하지 않는 구조에서, 특정 '선수 과목 이수 체계'나 '공정 작업 순서'와 같이 방향의 인과관계 규격에 맞추어 모든 요소를 일직선 배치하는 정렬 기법은 무엇입니까?"
          options={quizOptions}
        />
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Bottom Tip Callout */}
      <Callout type="info" title="기타 그래프 이론 실전 기출 연계 💡">
        <p className="mb-2">
          그래프 이론은 아래의 대표 실전 응용 기출과 기계처럼 일치하며 연동됩니다.
        </p>
        <p>
          1. <strong>네트워크 연결 요소의 개수 / 무방향 그래프 사이클 판별</strong>: 고민하지 마시고 즉각 <strong>Union-Find (서로소 집합)</strong>을 가동하십시오!  
          2. <strong>모든 노드를 비용 최소 조건으로 전부 연결하는 케이블 가설 (최소 신장 트리)</strong>: 간선 정렬 후 Union-Find를 결합하는 <strong>크루스칼(Kruskal)</strong>을 배치하십시오!  
          3. <strong>순서가 결정된 작업 스케줄링 / 전제 이수 조건 정렬</strong>: <strong>위상 정렬</strong>을 작성하십시오!
        </p>
      </Callout>
    </div>
  );
}
