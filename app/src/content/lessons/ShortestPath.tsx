import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Table from '../../components/Table';
import Term from '../../components/Term';

export default function ShortestPath() {
  return (
    <Lesson
      part="3부 · 알고리즘"
      title="최단 경로"
      lede="이동 비용이 서로 다르면 BFS로는 부족합니다. 무엇을 묻느냐에 따라 셋 중 하나를 고르면 됩니다."
      tags={['3-7', '다익스트라', '플로이드']}
    >
      <Section no={1} title="셋 중 무엇을 쓸까">
        <Table
          head={['상황', '알고리즘', '복잡도']}
          rows={[
            ['모든 간선 비용이 같다', 'BFS', 'O(V+E)'],
            ['한 점에서 모든 점으로, 비용 ≥ 0', '다익스트라', 'O(E log V)'],
            ['모든 점에서 모든 점으로', '플로이드-워셜', 'O(V³)'],
            ['음수 간선이 있다', '벨만-포드', 'O(VE)'],
          ]}
        />

        <Note tone="success" title="정점 수를 보고 고르세요">
          <p>
            플로이드는 <Term>O(V³)</Term>이라 정점이 <strong>500을 넘으면</strong> 위험합니다.
            «모든 쌍»을 물어도 정점이 많다면 각 정점에서 다익스트라를 돌리는 편이 낫습니다.
          </p>
        </Note>
      </Section>

      <Section no={2} title="다익스트라 — 우선순위 큐로">
        <p>
          «아직 확정하지 않은 것 중 가장 가까운 정점»을 반복해서 확정합니다.
          그 «가장 가까운 것»을 꺼내는 일이 바로 2-2의 힙입니다.
        </p>

        <Code label="제출용 다익스트라">{`
import heapq

def dijkstra(graph, start, n):
    INF = float('inf')
    dist = [INF] * (n + 1)
    dist[start] = 0

    pq = [(0, start)]        # (지금까지의 거리, 정점)
    while pq:
        d, x = heapq.heappop(pq)

        # 이미 더 짧은 길로 확정된 정점이면 버린다 — 이 두 줄이 성능을 지킨다
        if d > dist[x]:
            continue

        for nxt, cost in graph[x]:
            nd = d + cost
            if nd < dist[nxt]:
                dist[nxt] = nd
                heapq.heappush(pq, (nd, nxt))

    return dist

# 간선은 (도착, 비용) 으로 담는다
graph = [[] for _ in range(4)]
graph[1].append((2, 3))
graph[2].append((3, 4))
`}</Code>

        <Note tone="danger" title="«이미 처리한 정점 건너뛰기»를 빼지 마세요">
          <p>
            힙에는 같은 정점이 여러 번 들어갑니다. <Term>if d &gt; dist[x]: continue</Term>가
            없으면 낡은 값으로 이웃을 전부 다시 훑어 <strong>정점 수가 커질수록 급격히
            느려집니다.</strong> 답은 맞는데 시간 초과가 나는 전형적인 자리입니다.
          </p>
        </Note>

        <Note tone="warn" title="음수 간선에는 쓸 수 없습니다">
          <p>
            다익스트라는 «한 번 확정한 최단 거리는 더 줄지 않는다»를 전제합니다.
            음수 간선이 있으면 그 전제가 깨집니다. 음수가 있으면 벨만-포드를,
            음수 사이클까지 판정해야 하면 벨만-포드의 <Term>V</Term>번째 갱신 여부를 보세요.
          </p>
        </Note>
      </Section>

      <Section no={3} title="플로이드-워셜 — 세 겹의 루프">
        <p>
          «<Term>k</Term>를 거쳐 가면 더 짧아지는가»를 모든 <Term>k</Term>에 대해 물어봅니다.
          <strong>거쳐 가는 정점 <Term>k</Term>가 가장 바깥 루프</strong>여야 한다는 것이 전부입니다.
        </p>

        <Code label="플로이드-워셜">{`
INF = float('inf')
n = 4
dist = [[INF] * (n + 1) for _ in range(n + 1)]

for i in range(1, n + 1):
    dist[i][i] = 0
# ... 간선 입력: dist[a][b] = min(dist[a][b], cost)

for k in range(1, n + 1):            # 거쳐 가는 정점이 바깥
    for a in range(1, n + 1):
        for b in range(1, n + 1):
            if dist[a][k] + dist[k][b] < dist[a][b]:
                dist[a][b] = dist[a][k] + dist[k][b]
`}</Code>

        <Note tone="danger" title="루프 순서를 바꾸면 조용히 틀립니다">
          <p>
            <Term>k</Term>가 안쪽으로 들어가면 «아직 계산되지 않은 경유지»를 참고하게 되어
            일부 경로를 놓칩니다. <strong>오류 없이 답만 틀리므로</strong> 가장 찾기 어려운
            버그 중 하나입니다.
          </p>
        </Note>
      </Section>

      <Section no={4} title="경로 자체를 복원해야 할 때">
        <Code label="어디서 왔는지 적어 둔다">{`
import heapq

def dijkstra_path(graph, start, end, n):
    INF = float('inf')
    dist = [INF] * (n + 1)
    prev = [0] * (n + 1)          # 직전 정점을 기록한다
    dist[start] = 0
    pq = [(0, start)]

    while pq:
        d, x = heapq.heappop(pq)
        if d > dist[x]:
            continue
        for nxt, cost in graph[x]:
            nd = d + cost
            if nd < dist[nxt]:
                dist[nxt] = nd
                prev[nxt] = x
                heapq.heappush(pq, (nd, nxt))

    # 끝에서 거꾸로 따라 올라간 뒤 뒤집는다
    path, cur = [], end
    while cur:
        path.append(cur)
        cur = prev[cur]
    return dist[end], path[::-1]
`}</Code>
      </Section>

      <Quiz
        question="다익스트라가 답은 맞는데 시간 초과가 납니다. 가장 먼저 확인할 곳은?"
        choices={[
          {
            text: '힙에서 꺼낸 거리가 이미 기록된 거리보다 크면 건너뛰는 두 줄이 있는지',
            right: true,
            why: '같은 정점이 힙에 여러 번 들어가는 것은 정상입니다. 다만 낡은 값을 꺼냈을 때 그냥 넘기지 않으면 이웃을 몇 번이고 다시 훑게 됩니다. if d > dist[x]: continue 두 줄이 이 낭비를 막습니다.',
          },
          {
            text: '인접 행렬 대신 인접 리스트를 썼는지',
            why: '인접 리스트가 맞는 선택이므로 이미 잘 하고 있는 부분입니다. 간선이 적을 때 행렬을 쓰면 오히려 느려집니다.',
          },
          {
            text: 'INF 를 float(\'inf\') 대신 큰 정수로 바꿨는지',
            why: '미세한 차이는 있지만 시간 초과를 뒤집을 만한 요인은 아닙니다.',
          },
          {
            text: '시작 정점의 거리를 0 으로 두었는지',
            why: '이것이 틀리면 시간이 아니라 답이 틀립니다. 답이 맞는다면 이미 제대로 되어 있습니다.',
          },
        ]}
      />
    </Lesson>
  );
}
