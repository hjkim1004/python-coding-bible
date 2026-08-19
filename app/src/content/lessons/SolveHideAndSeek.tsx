import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Term from '../../components/Term';

export default function SolveHideAndSeek() {
  return (
    <Lesson
      part="4부 · 기출 해설"
      title="숨바꼭질 (백준 1697)"
      lede="격자도 그래프도 아닌 «수직선» 위의 BFS. 그래프가 눈에 보이지 않을 때 그것을 알아보는 연습입니다."
      tags={['4-4', 'BFS', '실버 I']}
      source={{ label: '백준 1697번', href: 'https://www.acmicpc.net/problem/1697' }}
    >
      <Section no={1} title="문제">
        <p>
          수빈이는 점 <Term>N</Term>에, 동생은 점 <Term>K</Term>에 있습니다(0 이상 10만 이하).
          수빈이는 1초에 <Term>X-1</Term>, <Term>X+1</Term>, <Term>2X</Term> 중 한 곳으로
          이동합니다. 동생을 찾는 가장 빠른 시간을 구합니다.
        </p>

        <Note tone="success" title="이것이 왜 그래프인가">
          <p>
            «점»을 정점으로, «1초의 이동»을 간선으로 보면 이 문제는 그래프입니다.
            모든 이동의 비용이 <strong>똑같이 1초</strong>이므로,
            «가장 빠른 시간»은 곧 <strong>가중치 없는 최단 거리 = BFS</strong>입니다.
            문제에 그래프라는 말이 한 번도 나오지 않아도 알아볼 수 있어야 합니다.
          </p>
        </Note>
      </Section>

      <Section no={2} title="왜 DP 나 그리디가 아닌가">
        <p>
          «목표보다 작으면 2배로 뛰고, 넘으면 1씩 빼면 되지 않나»라는 그리디가
          떠오르지만 반례가 있습니다. <Term>N=5, K=17</Term>에서 그 그리디는
          5 → 10 → 20 → 19 → 18 → 17로 <strong>5초</strong>를 씁니다.
          실제 최단은 5 → 4 → 8 → 16 → 17로 <strong>4초</strong>입니다 —
          <strong>먼저 한 칸 «뒤로» 가는 것이 이득</strong>인 경우가 있기 때문입니다.
          한 걸음 앞만 봐서는 그것을 알 수 없습니다.
        </p>
        <p>
          BFS는 이 고민을 하지 않습니다. <strong>가까운 순서대로 전부 퍼뜨리므로</strong>,
          처음 <Term>K</Term>에 도달하는 순간이 곧 최단입니다.
        </p>
      </Section>

      <Section no={3} title="제출용 전체 코드">
        <Code label="수직선 위의 BFS">{`
import sys
from collections import deque

input = sys.stdin.readline
MAX = 100_000

n, k = map(int, input().split())

dist = [-1] * (MAX + 1)      # -1 이 «아직 못 감» 이자 방문 표시
q = deque([n])
dist[n] = 0

while q:
    x = q.popleft()
    if x == k:
        break

    for nx in (x - 1, x + 1, x * 2):
        if 0 <= nx <= MAX and dist[nx] == -1:
            dist[nx] = dist[x] + 1
            q.append(nx)

print(dist[k])
`}</Code>

        <Note tone="danger" title="범위를 10만으로 막는 이유">
          <p>
            <Term>x * 2</Term>는 얼마든지 커질 수 있지만, 동생의 위치가 최대 10만이므로
            그보다 멀리 가는 것은 <strong>언제나 손해</strong>입니다(돌아오려면 1씩 빼야 하니까).
            상한을 막지 않으면 큐가 무한히 자라 메모리 초과가 납니다.
          </p>
        </Note>

        <Note tone="warn" title="dist 배열 하나가 visited 를 겸합니다">
          <p>
            <Term>dist[nx] == -1</Term>이 곧 «아직 방문하지 않았다»입니다. 배열을 둘 두면
            둘을 동기화하는 실수가 생깁니다. <strong>거리 배열 하나로 방문까지 표시</strong>하는
            것이 3-3에서 익힌 습관입니다.
          </p>
        </Note>
      </Section>

      <Section no={4} title="한 걸음 더">
        <p>
          <Term>N ≥ K</Term>라면 갈 수 있는 방법은 «1씩 빼기»뿐입니다.
          <Term>N - K</Term>가 곧 답이므로 탐색 없이 즉시 끝납니다.
          이렇게 <strong>탐색이 필요 없는 경우를 앞에서 잘라 내면</strong> 최악 입력에서
          시간이 크게 줍니다.
        </p>

        <Code label="앞에서 잘라 내기">{`
if n >= k:
    print(n - k)
else:
    # 위의 BFS
    pass
`}</Code>

        <p>
          같은 뼈대로 «이동 방법»만 바꾸면 벽 부수고 이동하기, 토마토, 미로 탈출이
          모두 풀립니다. <strong>BFS 문제는 결국 «다음 상태를 어떻게 만드느냐»</strong>만
          다릅니다.
        </p>
      </Section>

      <Quiz
        question="이 문제를 «작으면 2배로 뛰고 넘으면 1씩 뺀다» 는 그리디로 풀면 왜 틀릴까요?"
        choices={[
          {
            text: '뒤로 한 칸 물러선 뒤 뛰는 것이 더 빠른 경우가 있다',
            right: true,
            why: 'N=5, K=17 에서 그 그리디는 5→10→20→19→18→17 로 5초를 씁니다. 실제 최단은 5→4→8→16→17 로 4초입니다. 지금의 한 걸음이 나중에 어떤 길을 여는지 보이지 않으므로 탐욕적 기준이 성립하지 않습니다. 모든 이동 비용이 같으니 BFS 가 정답입니다.',
          },
          {
            text: '2배 이동이 1초보다 오래 걸리기 때문이다',
            why: '문제에서 모든 이동은 똑같이 1초입니다. 비용이 같다는 사실이 오히려 BFS 를 쓸 수 있게 해 줍니다.',
          },
          {
            text: 'N 이 K 보다 클 수 있기 때문이다',
            why: 'N ≥ K 인 경우는 오히려 가장 쉬운 경우입니다. 2배 이동은 값을 키우기만 하므로 빼기만 하면 되고, 답은 N-K 로 즉시 나옵니다.',
          },
          {
            text: '수직선은 그래프가 아니라 그리디를 쓸 수 없다',
            why: '점을 정점으로, 이동을 간선으로 보면 그대로 그래프입니다. 문제는 자료구조가 아니라 탐욕적 기준의 정당성입니다.',
          },
        ]}
      />
    </Lesson>
  );
}
