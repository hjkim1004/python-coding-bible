import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Term from '../../components/Term';

export default function GraphTheory() {
  return (
    <Lesson
      part="3부 · 알고리즘"
      title="그래프 이론"
      lede="«같은 무리인가»를 묻는 유니온 파인드, «순서를 세울 수 있는가»를 묻는 위상 정렬, «가장 싸게 잇는 법»을 묻는 최소 신장 트리."
      tags={['3-8', '유니온 파인드', '위상 정렬']}
    >
      <Section no={1} title="유니온 파인드 — 같은 무리인가">
        <p>
          «이 둘이 연결되어 있나»를 계속 물어야 할 때 매번 탐색하면 O(V+E)입니다.
          유니온 파인드는 <strong>각 무리의 «대표»만 기억</strong>해서 거의 O(1)에 답합니다.
        </p>

        <Code label="두 함수가 전부">{`
def find(parent, x):
    # 경로 압축 — 찾아 올라가면서 부모를 대표로 바꿔 둔다
    if parent[x] != x:
        parent[x] = find(parent, parent[x])
    return parent[x]

def union(parent, a, b):
    a, b = find(parent, a), find(parent, b)
    if a == b:
        return False        # 이미 같은 무리 — 사이클이라는 뜻
    parent[max(a, b)] = min(a, b)
    return True

n = 6
parent = list(range(n + 1))     # 처음엔 저마다가 자기 대표

union(parent, 1, 2)
union(parent, 2, 3)
print(find(parent, 1) == find(parent, 3))    # True
`}</Code>

        <Note tone="success" title="경로 압축을 빼면 트리가 일자로 늘어납니다">
          <p>
            <Term>parent[x] = find(...)</Term> 한 줄이 경로 압축입니다. 이 줄이 없으면
            최악의 경우 한 줄로 늘어선 트리를 매번 끝까지 타고 올라가
            <strong>O(N)</strong>이 됩니다. 한 줄로 전체 복잡도가 갈립니다.
          </p>
        </Note>
      </Section>

      <Section no={2} title="크루스칼 — 가장 싸게 전부 잇기">
        <p>
          간선을 비용 순으로 정렬해 놓고, <strong>사이클을 만들지 않는 간선만</strong>
          차례로 고릅니다. «사이클인가»를 유니온 파인드가 답해 줍니다.
          이것이 그리디가 통하는 대표적인 예입니다.
        </p>

        <Code label="최소 신장 트리">{`
def kruskal(n, edges):
    # edges: (비용, a, b)
    edges.sort()
    parent = list(range(n + 1))
    total = 0

    for cost, a, b in edges:
        if union(parent, a, b):     # 사이클이 아니면 채택
            total += cost

    return total

print(kruskal(3, [(1, 1, 2), (2, 2, 3), (3, 1, 3)]))    # 3
`}</Code>
      </Section>

      <Section no={3} title="위상 정렬 — 순서를 세운다">
        <p>
          «A를 끝내야 B를 할 수 있다»는 선후 관계에서 전체 순서를 만듭니다.
          <strong>진입차수</strong>(들어오는 화살표의 수)가 0인 것부터 꺼내면 됩니다.
        </p>

        <Code label="위상 정렬">{`
from collections import deque

def topology_sort(n, graph, indegree):
    q = deque(i for i in range(1, n + 1) if indegree[i] == 0)
    order = []

    while q:
        x = q.popleft()
        order.append(x)
        for nxt in graph[x]:
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                q.append(nxt)

    # 전부 담기지 못했다면 사이클이 있다는 뜻
    return order if len(order) == n else []
`}</Code>

        <Note tone="warn" title="결과 길이가 정점 수보다 짧으면 사이클입니다">
          <p>
            사이클 안의 정점들은 진입차수가 끝내 0이 되지 않아 큐에 들어가지 못합니다.
            «순서를 정할 수 있는가»를 묻는 문제라면 <strong>이 길이 비교가 곧 답</strong>입니다.
          </p>
        </Note>
      </Section>

      <Section no={4} title="어떤 도구를 꺼낼지 알아보는 말">
        <ul>
          <li><strong>«같은 팀인가», «연결되어 있나», «몇 개의 덩어리인가»</strong> → 유니온 파인드</li>
          <li><strong>«모두 잇는 최소 비용»</strong> → 크루스칼</li>
          <li><strong>«선수 과목», «작업 순서», «먼저 해야 한다»</strong> → 위상 정렬</li>
          <li><strong>«사이클이 있는가»</strong> → 유니온 파인드(무향) 또는 위상 정렬(유향)</li>
        </ul>
      </Section>

      <Quiz
        question="유니온 파인드에서 find 의 «경로 압축» 한 줄을 빼면 어떻게 될까요?"
        choices={[
          {
            text: '트리가 한 줄로 늘어나 find 가 최악 O(N) 이 된다',
            right: true,
            why: 'union 이 반복되면 부모 사슬이 길어집니다. 경로 압축은 찾아 올라가는 김에 부모를 대표로 바꿔 사슬을 평평하게 만듭니다. 이 한 줄이 있고 없고로 거의 O(1) 과 O(N) 이 갈립니다.',
          },
          {
            text: '답이 틀린다',
            why: '답 자체는 맞습니다. 느려질 뿐이라 작은 입력에서는 문제를 눈치채지 못합니다.',
          },
          {
            text: '사이클을 찾지 못한다',
            why: '사이클 판정은 두 대표가 같은지로 하므로 압축과 무관하게 동작합니다.',
          },
          {
            text: '재귀 깊이가 줄어든다',
            why: '오히려 반대입니다. 사슬이 길어져 재귀가 깊어지고 RecursionError 위험도 커집니다.',
          },
        ]}
      />
    </Lesson>
  );
}
