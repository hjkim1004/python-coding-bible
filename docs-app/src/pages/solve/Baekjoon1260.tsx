import CodeViewer from '../../components/ui/CodeViewer';
import Callout from '../../components/ui/Callout';
import MathBadge from '../../components/ui/MathBadge';
import QuizPanel from '../../components/ui/QuizPanel';

interface Baekjoon1260Props {
  isDarkMode: boolean;
}

export default function Baekjoon1260({ isDarkMode }: Baekjoon1260Props) {
  const codeInput = `
# 입력 예시
# 4 5 1      → 정점 4개, 간선 5개, 시작 정점 1번
# 1 2
# 1 3
# 1 4
# 2 4
# 3 4
#
# 출력
# 1 2 4 3    (DFS)
# 1 2 3 4    (BFS)
`;

  const codeGraph = `
import sys
from collections import deque

input = sys.stdin.readline

n, m, v = map(int, input().split())

# 인접 리스트 — 정점 번호를 그대로 인덱스로 쓰기 위해 n+1 칸
graph = [[] for _ in range(n + 1)]

for _ in range(m):
    a, b = map(int, input().split())
    graph[a].append(b)
    graph[b].append(a)   # 양방향 간선

# ⭐ 핵심: 번호가 작은 정점부터 방문해야 하므로 각 인접 리스트를 정렬한다
for adj in graph:
    adj.sort()
`;

  const codeDfs = `
def dfs(start):
    visited = [False] * (n + 1)
    result = []

    def _visit(x):
        visited[x] = True
        result.append(x)
        for nxt in graph[x]:
            if not visited[nxt]:
                _visit(nxt)

    _visit(start)
    return result


# 💎 재귀 없는 스택 버전 (깊이가 깊어도 안전하다)
def dfs_iterative(start):
    visited = [False] * (n + 1)
    result = []
    stack = [start]

    while stack:
        x = stack.pop()
        if visited[x]:
            continue
        visited[x] = True
        result.append(x)
        # 스택은 나중에 넣은 것이 먼저 나오므로 역순으로 넣는다
        for nxt in reversed(graph[x]):
            if not visited[nxt]:
                stack.append(nxt)

    return result
`;

  const codeBfs = `
def bfs(start):
    visited = [False] * (n + 1)
    result = []

    q = deque([start])
    visited[start] = True   # ⭐ 큐에 넣는 순간 방문 처리한다

    while q:
        x = q.popleft()
        result.append(x)
        for nxt in graph[x]:
            if not visited[nxt]:
                visited[nxt] = True
                q.append(nxt)

    return result
`;

  const codeFull = `
import sys
from collections import deque

input = sys.stdin.readline
sys.setrecursionlimit(10 ** 6)   # 재귀 DFS 사용 시 필수

n, m, v = map(int, input().split())
graph = [[] for _ in range(n + 1)]

for _ in range(m):
    a, b = map(int, input().split())
    graph[a].append(b)
    graph[b].append(a)

for adj in graph:
    adj.sort()

visited_dfs = [False] * (n + 1)
dfs_order = []

def dfs(x):
    visited_dfs[x] = True
    dfs_order.append(x)
    for nxt in graph[x]:
        if not visited_dfs[nxt]:
            dfs(nxt)

def bfs(start):
    visited = [False] * (n + 1)
    order, q = [], deque([start])
    visited[start] = True
    while q:
        x = q.popleft()
        order.append(x)
        for nxt in graph[x]:
            if not visited[nxt]:
                visited[nxt] = True
                q.append(nxt)
    return order

dfs(v)
print(*dfs_order)
print(*bfs(v))
`;

  const quizOptions = [
    {
      text: "큐에서 꺼낸(popleft) 직후에 방문 처리해야 한다",
      isCorrect: false,
      explanation: "그렇게 하면 같은 정점이 아직 큐 안에 있는 동안 다른 정점으로부터 또 삽입되어, 큐가 중복으로 부풀고 출력 순서도 깨집니다."
    },
    {
      text: "큐에 넣는(append) 순간 방문 처리해야 한다",
      isCorrect: true,
      explanation: "정답입니다! BFS는 '큐에 들어간 시점'이 곧 그 정점에 도달한 시점입니다. 삽입 즉시 방문 표시를 해야 중복 삽입이 없고, 최단 거리 계산에서도 올바른 레벨이 유지됩니다."
    },
    {
      text: "인접 리스트를 정렬하지 않아도 출력 순서는 항상 같다",
      isCorrect: false,
      explanation: "이 문제는 '방문할 수 있는 정점이 여러 개면 번호가 작은 것을 먼저'라고 못박고 있습니다. 정렬을 빠뜨리면 입력 순서에 따라 답이 달라집니다."
    },
    {
      text: "간선을 한 방향으로만 저장해도 된다",
      isCorrect: false,
      explanation: "1260번의 간선은 양방향입니다. 한쪽만 저장하면 도달 가능한 정점을 놓칩니다."
    }
  ];

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <div className="text-[12px] font-extrabold tracking-widest text-indigo-500 uppercase mb-2">
          PART 3. 기출문제 상세 해설집
        </div>
        <h1 className="text-3.5xl font-black tracking-tight text-slate-950 dark:text-white leading-none mb-4">
          Lesson 2. 백준 1260번 - DFS와 BFS 🧭
        </h1>
        <p className="text-[15px] text-slate-500 dark:text-zinc-400 font-semibold leading-relaxed">
          그래프 탐색의 표준 템플릿을 손에 새기는 문제. 이 한 문제의 코드가 이후 모든 그래프 문제의 뼈대가 됩니다.
        </p>
        <div className="flex flex-wrap items-center gap-2 mt-5">
          <span className="text-[11.5px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            난이도 실버 II
          </span>
          <span className="text-[11.5px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            유형 DFS · BFS
          </span>
          <span className="text-[11.5px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-500/10 text-slate-500 dark:text-zinc-400 border border-slate-500/20">
            시간복잡도 O(V+E)
          </span>
        </div>
      </div>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 mb-12" />

      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          1. 문제 이해
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            정점 <MathBadge>N</MathBadge>개와 간선 <MathBadge>M</MathBadge>개로 이루어진 그래프에서
            시작 정점 <MathBadge>V</MathBadge>로부터 DFS 결과와 BFS 결과를 각각 한 줄씩 출력합니다.
            <strong> 방문할 수 있는 정점이 여러 개라면 번호가 작은 것을 먼저 방문</strong>해야 합니다.
          </p>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeInput} />

        <Callout type="warning" title="채점에서 가장 많이 깨지는 한 줄">
          <p>
            '번호가 작은 것부터'라는 조건은 곧 <strong>인접 리스트 정렬</strong>을 뜻합니다.
            간선 입력 순서를 그대로 믿으면 예제는 맞고 채점은 틀리는, 가장 억울한 오답이 나옵니다.
          </p>
        </Callout>
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          2. 그래프 만들기 (인접 리스트)
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            정점 번호가 1부터 시작하므로 리스트 크기를 <MathBadge>N+1</MathBadge>로 잡아
            <strong> 번호를 인덱스로 그대로 사용</strong>합니다. 이렇게 하면 <MathBadge>-1</MathBadge> 보정이 사라져
            버그가 생길 자리 하나가 통째로 없어집니다.
          </p>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeGraph} />

        <Callout type="info" title="인접 행렬이 아니라 인접 리스트인 이유">
          <p>
            인접 행렬은 메모리가 <MathBadge>O(V^2)</MathBadge>이고, 한 정점의 이웃을 찾는 데
            항상 <MathBadge>O(V)</MathBadge>가 듭니다. 간선이 촘촘하지 않은 대부분의 코테 그래프에서는
            인접 리스트가 메모리와 속도 양쪽에서 유리합니다.
          </p>
        </Callout>
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          3. DFS — 한 갈래를 끝까지 파고든다
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            DFS는 갈 수 있는 곳까지 내려간 뒤 되돌아옵니다. 재귀로 쓰면 짧지만,
            파이썬 기본 재귀 한도는 1000이라 <MathBadge>sys.setrecursionlimit</MathBadge>이 필수입니다.
            깊이가 수십만까지 갈 수 있는 문제라면 아래 <strong>스택 버전</strong>이 안전합니다.
          </p>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeDfs} />

        <Callout type="danger" title="스택 버전에서 순서가 뒤집히는 함정 ⚠️">
          <p>
            스택은 나중에 넣은 것이 먼저 나옵니다. 정렬된 이웃을 그대로 넣으면
            <strong> 번호가 큰 정점부터</strong> 방문하게 됩니다.
            <MathBadge>reversed()</MathBadge>로 뒤집어 넣어야 재귀 버전과 같은 순서가 나옵니다.
          </p>
        </Callout>
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          4. BFS — 가까운 곳부터 넓게 퍼진다
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            BFS는 시작 정점에서 가까운 순서대로 방문하므로, 가중치가 없는 그래프에서는
            그 방문 순서가 곧 <strong>최단 거리</strong>가 됩니다.
            큐는 반드시 <MathBadge>collections.deque</MathBadge>를 씁니다 —
            리스트의 <MathBadge>pop(0)</MathBadge>은 <MathBadge>O(N)</MathBadge>이라 큐로 쓰면 안 됩니다.
          </p>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeBfs} />

        <Callout type="danger" title="방문 처리는 '꺼낼 때'가 아니라 '넣을 때' ⚠️">
          <p>
            꺼낼 때 방문 처리하면 같은 정점이 큐에 여러 번 들어갑니다.
            정점 수가 커지면 큐가 폭발해 시간 초과가 나고, 최단 거리 계산에서는 값까지 틀어집니다.
            <strong> append 하는 그 줄 바로 옆에서 visited 를 세우는 것</strong>이 BFS의 철칙입니다.
          </p>
        </Callout>
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          5. 제출용 전체 코드
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            그대로 제출해서 통과하는 완성본입니다. 두 탐색 모두
            정점과 간선을 한 번씩만 훑으므로 <MathBadge>O(V+E)</MathBadge>입니다.
          </p>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeFull} />

        <Callout type="info" title="print(*list) 를 쓰는 이유">
          <p>
            <MathBadge>print(*order)</MathBadge>는 리스트를 공백으로 이어 한 줄에 출력합니다.
            반복문 안에서 <MathBadge>print</MathBadge>를 N번 호출하면 출력만으로 시간 초과가 나는 문제도 있으니,
            <strong> 결과는 모았다가 한 번에 내보내는 습관</strong>을 들이세요.
          </p>
        </Callout>
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      <section>
        <QuizPanel
          question="Q1. BFS 구현에서 visited 배열을 세우는 시점으로 올바른 것은 무엇입니까?"
          options={quizOptions}
        />
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      <Callout type="success" title="이 문제에서 챙겨 갈 것 💡">
        <p>
          1260번의 코드는 <strong>외워 두는 템플릿</strong>입니다.
          미로 최단 거리, 섬의 개수, 바이러스 전파, 토마토 익히기 — 이후 만나는 그래프 문제 대부분이
          여기서 그래프를 만드는 방식과 탐색 루프를 그대로 쓰고, 문제마다 다른 것은
          <strong> 무엇을 result 에 담느냐</strong> 뿐입니다.
        </p>
      </Callout>
    </div>
  );
}
