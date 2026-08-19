import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Term from '../../components/Term';

export default function SolveBfsDfs() {
  return (
    <Lesson
      part="4부 · 기출 해설"
      title="DFS와 BFS (백준 1260)"
      lede="3-3의 템플릿을 그대로 옮겨 적는 문제. 이 코드가 이후 만나는 모든 그래프 문제의 뼈대가 됩니다."
      tags={['4-2', 'DFS · BFS', '실버 II']}
      source={{ label: '백준 1260번', href: 'https://www.acmicpc.net/problem/1260' }}
    >
      <Section no={1} title="문제">
        <p>
          정점 <Term>N</Term>개와 간선 <Term>M</Term>개의 그래프에서 시작 정점
          <Term>V</Term>로부터 DFS 결과와 BFS 결과를 각각 한 줄씩 출력합니다.
          <strong> 방문할 수 있는 정점이 여럿이면 번호가 작은 것을 먼저</strong> 방문합니다.
        </p>

        <Code label="입력과 출력">{`
# 입력
# 4 5 1      정점 4개, 간선 5개, 시작 정점 1번
# 1 2
# 1 3
# 1 4
# 2 4
# 3 4

# 출력
# 1 2 4 3    DFS
# 1 2 3 4    BFS
`}</Code>

        <Note tone="danger" title="가장 많이 깨지는 한 줄">
          <p>
            «번호가 작은 것부터»는 곧 <strong>인접 리스트 정렬</strong>입니다. 간선 입력
            순서를 그대로 믿으면 예제는 맞고 채점은 틀리는, 가장 억울한 오답이 납니다.
          </p>
        </Note>
      </Section>

      <Section no={2} title="그래프 만들기">
        <Code label="입력을 그래프로">{`
import sys
input = sys.stdin.readline

n, m, v = map(int, input().split())
graph = [[] for _ in range(n + 1)]     # 번호를 그대로 인덱스로

for _ in range(m):
    a, b = map(int, input().split())
    graph[a].append(b)
    graph[b].append(a)                 # 양방향

for adj in graph:
    adj.sort()                         # ← 이 두 줄이 정답을 만든다
`}</Code>
      </Section>

      <Section no={3} title="두 탐색">
        <Code label="DFS 와 BFS">{`
from collections import deque

def dfs(x, graph, visited, order):
    visited[x] = True
    order.append(x)
    for nxt in graph[x]:
        if not visited[nxt]:
            dfs(nxt, graph, visited, order)


def bfs(start, graph, n):
    visited = [False] * (n + 1)
    order, q = [], deque([start])
    visited[start] = True              # 넣는 순간 방문 처리

    while q:
        x = q.popleft()
        order.append(x)
        for nxt in graph[x]:
            if not visited[nxt]:
                visited[nxt] = True
                q.append(nxt)

    return order
`}</Code>

        <Note tone="warn" title="스택으로 쓴다면 뒤집어 넣으세요">
          <p>
            스택은 나중에 넣은 것이 먼저 나옵니다. 정렬된 이웃을 그대로 넣으면
            <strong>번호가 큰 정점부터</strong> 방문하게 됩니다.
            <Term>reversed(graph[x])</Term>로 넣어야 재귀 버전과 순서가 같아집니다.
          </p>
        </Note>
      </Section>

      <Section no={4} title="제출용 전체 코드">
        <Code label="그대로 제출">{`
import sys
from collections import deque

input = sys.stdin.readline
sys.setrecursionlimit(10 ** 6)

n, m, v = map(int, input().split())
graph = [[] for _ in range(n + 1)]

for _ in range(m):
    a, b = map(int, input().split())
    graph[a].append(b)
    graph[b].append(a)

for adj in graph:
    adj.sort()

visited = [False] * (n + 1)
dfs_order = []

def dfs(x):
    visited[x] = True
    dfs_order.append(x)
    for nxt in graph[x]:
        if not visited[nxt]:
            dfs(nxt)

def bfs(start):
    seen = [False] * (n + 1)
    order, q = [], deque([start])
    seen[start] = True
    while q:
        x = q.popleft()
        order.append(x)
        for nxt in graph[x]:
            if not seen[nxt]:
                seen[nxt] = True
                q.append(nxt)
    return order

dfs(v)
print(*dfs_order)
print(*bfs(v))
`}</Code>

        <p>
          두 탐색 모두 정점과 간선을 한 번씩만 훑으므로 <Term>O(V+E)</Term>입니다.
          출력은 <Term>print(*order)</Term>로 한 번에 내보냅니다 — 1-1에서 본 습관입니다.
        </p>
      </Section>

      <Quiz
        question="예제는 맞는데 제출하면 틀립니다. 이 문제에서 가장 먼저 볼 곳은?"
        choices={[
          {
            text: '인접 리스트를 정렬했는지',
            right: true,
            why: '«번호가 작은 것부터 방문» 이라는 조건은 인접 리스트 정렬로만 지켜집니다. 예제 입력이 우연히 오름차순이면 정렬 없이도 예제는 통과하므로, 채점에서야 드러납니다.',
          },
          {
            text: '재귀 한도를 올렸는지',
            why: '중요한 습관이지만 한도를 넘으면 오답이 아니라 RecursionError 로 멈춥니다. 지금 증상과는 다릅니다.',
          },
          {
            text: 'BFS 를 DFS 보다 먼저 출력했는지',
            why: '출력 순서가 바뀌면 예제부터 틀립니다. 예제가 맞는다면 이 문제는 아닙니다.',
          },
          {
            text: '간선을 양방향으로 저장했는지',
            why: '한 방향만 저장하면 예제에서도 결과가 달라집니다. 예제가 맞았다면 이미 양방향입니다.',
          },
        ]}
      />
    </Lesson>
  );
}
