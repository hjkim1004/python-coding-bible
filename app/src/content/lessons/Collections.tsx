import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Recall from '../../components/Recall';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Term from '../../components/Term';

export default function Collections() {
  return (
    <Lesson
      part="2부 · 여섯 개의 표준 도구"
      title="collections"
      lede="큐가 필요할 때, 셀 때, 없는 키를 물을 때. 직접 만들면 O(N)인 일을 O(1)로 바꿔 주는 세 가지."
      tags={['2-1', 'deque', 'Counter']}
    >
      <Recall from="p1-list">
        <p>
          1-3에서 리스트의 <strong>앞에서 하는 일이 비싸다</strong>는 것을 봤습니다.
          <Term>arr.pop(0)</Term>은 뒤의 원소를 전부 한 칸씩 당기므로 O(N)이었습니다.
        </p>
        <p>
          여기서 그 문제를 <strong>도구로 해결합니다.</strong> 양 끝이 모두 싼 줄,
          세는 일만 하는 계수기, 없는 키에 기본값을 주는 사전 — 세 가지입니다.
        </p>
      </Recall>

      <Section no={1} title="deque — 양쪽이 모두 싼 줄">
        <p>
          리스트의 <Term>pop(0)</Term>은 뒤의 원소를 전부 한 칸씩 당기므로 O(N)입니다.
          <Term>deque</Term>는 양쪽 끝을 모두 O(1)로 다룹니다.
          <strong>BFS를 쓰는 모든 문제의 큐는 deque입니다.</strong>
        </p>

        <Code label="deque 의 전부">{`
from collections import deque

q = deque([1, 2, 3])

q.append(4)        # 오른쪽에 넣기      O(1)
q.appendleft(0)    # 왼쪽에 넣기        O(1)
print(q.pop())     # 오른쪽에서 빼기    O(1)
print(q.popleft()) # 왼쪽에서 빼기      O(1)  ← 리스트에는 없는 것

q.rotate(1)        # 오른쪽으로 한 칸 회전 (원형 문제에 쓴다)
print(len(q), q[0])
`}</Code>

        <Note tone="warn" title="deque 는 가운데가 느립니다">
          <p>
            <Term>q[i]</Term>로 가운데를 읽는 일은 O(N)입니다. 인덱스로 마구 접근해야 한다면
            리스트가 맞습니다. deque는 <strong>양 끝만 쓰는 자료구조</strong>라고 기억하세요.
          </p>
        </Note>

        <Code label="BFS 의 뼈대 — 3부에서 계속 쓴다">{`
from collections import deque

def bfs(graph, start):
    visited = [False] * len(graph)
    q = deque([start])
    visited[start] = True          # 넣는 순간 방문 처리한다

    while q:
        x = q.popleft()
        for nxt in graph[x]:
            if not visited[nxt]:
                visited[nxt] = True
                q.append(nxt)
`}</Code>
      </Section>

      <Section no={2} title="Counter — 세는 일만 한다">
        <Code label="세고, 순위 매기고, 빼기">{`
from collections import Counter

c = Counter('banana')
print(c)                    # Counter({'a': 3, 'n': 2, 'b': 1})
print(c['a'], c['z'])       # 3 0   ← 없는 키를 물어도 오류가 아니라 0

print(c.most_common(2))     # [('a', 3), ('n', 2)]  빈도 내림차순
print(sum(c.values()))      # 6

# 두 묶음의 차이 — 애너그램·재고 문제에서 한 줄로 끝난다
need = Counter('aabbc')
have = Counter('abc')
print(need - have)          # Counter({'a': 1, 'b': 1})  모자란 것만
`}</Code>

        <Note tone="success" title="애너그램 판별은 한 줄">
          <p>
            <Term>Counter(a) == Counter(b)</Term> 하나면 두 문자열이 같은 글자로
            이루어졌는지 알 수 있습니다. 정렬해서 비교(<Term>sorted(a) == sorted(b)</Term>)해도
            되지만 이쪽이 O(N)으로 더 빠릅니다.
          </p>
        </Note>
      </Section>

      <Section no={3} title="defaultdict — 없는 키에 기본값을 준다">
        <p>
          그래프를 인접 리스트로 만들 때 «이 정점의 목록이 이미 있는가»를 매번 확인하는
          코드가 통째로 사라집니다.
        </p>

        <Code label="그래프를 세 줄로">{`
from collections import defaultdict

graph = defaultdict(list)
for a, b in [(1, 2), (1, 3), (2, 3)]:
    graph[a].append(b)
    graph[b].append(a)      # 양방향

print(graph[1])             # [2, 3]
print(graph[99])            # []  ← 물어본 순간 빈 리스트가 만들어진다

counts = defaultdict(int)   # 기본값 0
groups = defaultdict(list)  # 기본값 []
seen = defaultdict(set)     # 기본값 set()
`}</Code>

        <Note tone="danger" title="읽기만 해도 키가 생깁니다">
          <p>
            <Term>graph[99]</Term>를 «있나 보자»는 마음으로 읽으면 그 순간 키가 만들어집니다.
            나중에 <Term>len(graph)</Term>이 예상보다 크거나, 정점 개수를 세는 문제에서
            답이 커지는 원인이 대개 이것입니다. 존재만 확인할 때는
            <Term>if 99 in graph</Term>를 쓰세요 — <Term>in</Term>은 키를 만들지 않습니다.
          </p>
        </Note>
      </Section>

      <Quiz
        question="BFS 를 리스트로 구현하고 pop(0) 으로 큐를 흉내 냈더니 시간 초과가 났습니다. 왜일까요?"
        choices={[
          {
            text: 'pop(0) 이 뒤의 원소를 전부 한 칸씩 당기므로 매번 O(N) 이다',
            right: true,
            why: '리스트는 배열이라 앞을 빼면 나머지를 모두 옮겨야 합니다. 정점이 N개면 전체가 O(N²) 이 됩니다. deque 의 popleft 는 O(1) 이라 BFS 전체가 O(V+E) 로 유지됩니다.',
          },
          {
            text: 'BFS 자체가 DFS 보다 느리기 때문이다',
            why: '두 탐색 모두 정점과 간선을 한 번씩 훑어 O(V+E) 로 같습니다. 느려진 원인은 알고리즘이 아니라 자료구조입니다.',
          },
          {
            text: '리스트가 메모리를 두 배로 쓰기 때문이다',
            why: '메모리 문제가 아니라 시간 문제입니다. pop(0) 한 번마다 원소를 옮기는 일이 실제로 일어납니다.',
          },
          {
            text: 'visited 를 리스트로 만들었기 때문이다',
            why: 'visited 를 인덱스로 읽고 쓰는 것은 O(1) 이라 문제가 없습니다. 오히려 정점 번호가 조밀하다면 집합보다 리스트가 빠릅니다.',
          },
        ]}
      />
    </Lesson>
  );
}
