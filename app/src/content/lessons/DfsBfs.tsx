import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Recall from '../../components/Recall';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Table from '../../components/Table';
import Term from '../../components/Term';

export default function DfsBfs() {
  return (
    <Lesson
      part="3부 · 알고리즘"
      title="DFS와 BFS"
      lede="그래프 문제의 8할은 이 두 템플릿을 어디에 무엇을 담느냐로 갈립니다. 뼈대를 손에 새기는 강입니다."
      tags={['3-3', '탐색', '최단 거리']}
    >
      <Recall from={['p2-collections', 'p1-dict']}>
        <p>
          2-1에서 <Term>deque</Term>의 <Term>popleft</Term>가 <Term>O(1)</Term>이라는 것과,
          <Term>defaultdict(list)</Term>로 그래프를 세 줄에 만드는 법을 봤습니다.
          1-5에서는 «이미 본 것인가»를 <strong>집합이 한 번에 답한다</strong>고 했습니다.
        </p>
        <p>
          이 강은 그 둘을 그대로 씁니다. <strong>BFS의 큐가 <Term>deque</Term>이고,
          방문 표시가 그 «이미 본 것인가»</strong>입니다.
        </p>
      </Recall>

      <Section no={1} title="둘 중 무엇을 쓸까">
        <Table
          head={['', 'DFS', 'BFS']}
          rows={[
            ['다음에 갈 곳', '가장 최근 것 (스택·재귀)', '가장 먼저 온 것 (큐)'],
            ['잘하는 일', '경로 전부 훑기, 백트래킹', '가중치 없는 최단 거리'],
            ['최단 거리', '보장하지 않는다', '보장한다'],
            ['메모리', '깊이만큼', '한 겹의 너비만큼'],
          ]}
        />

        <Note tone="success" title="«최단»이 보이면 BFS">
          <p>
            «가장 짧은», «최소 몇 번», «며칠 만에» 같은 말이 보이고 각 이동의 비용이
            모두 같다면 답은 BFS입니다. 비용이 서로 다르면 다익스트라(3-7)입니다.
          </p>
        </Note>
      </Section>

      <Section no={2} title="그래프를 담는 법">
        <Code label="인접 리스트">{`
n, m = 4, 5
graph = [[] for _ in range(n + 1)]     # 정점 번호를 그대로 인덱스로 쓴다

edges = [(1, 2), (1, 3), (1, 4), (2, 4), (3, 4)]
for a, b in edges:
    graph[a].append(b)
    graph[b].append(a)                 # 양방향이면 두 줄

# 문제가 «번호가 작은 것부터» 를 요구하면 반드시 정렬한다
for adj in graph:
    adj.sort()
`}</Code>

        <Note tone="warn" title="인접 행렬은 언제 쓰나">
          <p>
            <Term>graph[a][b]</Term>로 «두 정점이 붙어 있나»를 O(1)에 물어야 할 때만.
            메모리가 <Term>O(V²)</Term>라 정점이 1만 개면 1억 칸입니다.
            대부분의 문제는 인접 리스트가 맞습니다.
          </p>
        </Note>
      </Section>

      <Section no={3} title="DFS 두 가지 꼴">
        <Code label="재귀와 스택">{`
import sys
sys.setrecursionlimit(10 ** 6)

def dfs(x, visited, graph):
    visited[x] = True
    for nxt in graph[x]:
        if not visited[nxt]:
            dfs(nxt, visited, graph)

def dfs_stack(start, graph, n):
    visited = [False] * (n + 1)
    stack = [start]
    order = []

    while stack:
        x = stack.pop()
        if visited[x]:
            continue
        visited[x] = True
        order.append(x)
        # 스택은 나중에 넣은 것이 먼저 나온다 → 작은 번호부터 방문하려면 뒤집어 넣는다
        for nxt in reversed(graph[x]):
            if not visited[nxt]:
                stack.append(nxt)

    return order
`}</Code>

        <Note tone="danger" title="재귀 DFS 는 깊이가 곧 위험입니다">
          <p>
            일렬로 늘어선 10만 개짜리 그래프에서 재귀 DFS는 <Term>RecursionError</Term>가
            나거나, 한도를 올려도 스택 메모리 때문에 죽습니다.
            <strong>정점 수가 10만 단위라면 스택 버전</strong>을 쓰세요.
          </p>
        </Note>
      </Section>

      <Section no={4} title="BFS 와 최단 거리">
        <p>
          BFS는 시작점에서 가까운 순서로 퍼집니다. 그래서 <strong>도착한 순간의 거리가
          곧 최단 거리</strong>입니다. 거리를 따로 배열에 적으면 <Term>visited</Term>와
          거리 배열을 하나로 합칠 수도 있습니다.
        </p>

        <Code label="격자에서의 최단 거리">{`
from collections import deque

def bfs_grid(board, n, m):
    dx, dy = [-1, 1, 0, 0], [0, 0, -1, 1]
    dist = [[-1] * m for _ in range(n)]      # -1 이 «아직 못 감» 이자 방문 표시

    q = deque([(0, 0)])
    dist[0][0] = 0                            # 넣는 순간 기록한다

    while q:
        x, y = q.popleft()
        for d in range(4):
            nx, ny = x + dx[d], y + dy[d]
            if not (0 <= nx < n and 0 <= ny < m):
                continue
            if dist[nx][ny] != -1 or board[nx][ny] == 0:
                continue
            dist[nx][ny] = dist[x][y] + 1
            q.append((nx, ny))

    return dist[n - 1][m - 1]
`}</Code>

        <Note tone="danger" title="방문 표시는 꺼낼 때가 아니라 넣을 때">
          <p>
            <Term>popleft</Term> 뒤에 표시하면 같은 칸이 큐에 여러 번 들어갑니다.
            큐가 부풀어 시간 초과가 나고, 거리 값도 나중에 들어온 더 긴 경로로
            덮일 수 있습니다. <strong><Term>append</Term> 하는 그 줄 옆에서 표시하세요.</strong>
          </p>
        </Note>
      </Section>

      <Section no={5} title="여러 곳에서 동시에 퍼질 때">
        <p>
          «토마토가 여러 개 있고 동시에 익어 간다»처럼 출발점이 여럿이면,
          <strong>처음부터 전부 큐에 넣고 시작</strong>하면 됩니다. 코드는 한 줄도
          바뀌지 않습니다.
        </p>

        <Code label="다중 시작 BFS">{`
from collections import deque

q = deque()
for i in range(n):
    for j in range(m):
        if board[i][j] == 1:      # 이미 익은 토마토 전부
            q.append((i, j))
            dist[i][j] = 0
`}</Code>
      </Section>

      <Quiz
        question="가중치가 모두 1인 미로에서 최소 이동 횟수를 구합니다. BFS 에서 visited 를 세우는 시점은?"
        choices={[
          {
            text: '큐에 넣는 순간',
            right: true,
            why: 'BFS 는 큐에 들어간 시점이 그 칸에 도달한 시점입니다. 넣을 때 표시해야 같은 칸이 중복으로 들어가지 않고, 처음 도달했을 때의 거리가 그대로 최단 거리로 유지됩니다.',
          },
          {
            text: '큐에서 꺼내는 순간',
            why: '꺼낼 때 표시하면 그 칸이 큐에 남아 있는 동안 다른 이웃이 또 넣습니다. 큐가 부풀어 시간 초과가 나고, 거리 계산도 흔들립니다.',
          },
          {
            text: '이웃을 모두 확인한 뒤',
            why: '그 사이에 같은 칸이 여러 번 큐에 들어갑니다. 표시가 늦을수록 중복이 늘어납니다.',
          },
          {
            text: 'BFS 에는 visited 가 필요 없다',
            why: '사이클이 있는 그래프에서는 무한히 돕니다. 방문 표시는 종료를 보장하는 장치이기도 합니다.',
          },
        ]}
      />
    </Lesson>
  );
}
