import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Recall from '../../components/Recall';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Term from '../../components/Term';

export default function SolveGameMap() {
  return (
    <Lesson
      part="4부 · 기출 해설"
      title="게임 맵 최단거리"
      lede="«최단»이라는 말이 보이면 왜 DFS를 접어야 하는지, 그리고 상태를 한 칸 늘리면 어디까지 갈 수 있는지."
      tags={['4-6', 'BFS', 'Lv.2']}
      source={{ label: '프로그래머스', href: 'https://school.programmers.co.kr/learn/courses/30/lessons/1844' }}
    >
      <Recall from="p3-dfsbfs">
        <p>
          3-3에서 <strong>«최단»이 보이고 이동 비용이 모두 같으면 BFS</strong>라고 했습니다.
          방문 표시는 <strong>꺼낼 때가 아니라 넣을 때</strong>라는 것도요.
        </p>
        <p>
          이 문제는 그 격자 BFS를 거의 그대로 옮겨 적습니다. 대신
          <strong>DFS로 풀면 왜 안 되는지</strong>를 눈으로 확인하고,
          상태를 한 칸 늘리는 확장까지 갑니다.
        </p>
      </Recall>

      <Section no={1} title="문제">
        <p>
          <Term>n × m</Term> 격자 <Term>maps</Term>가 주어집니다. <Term>1</Term>은 길,
          <Term>0</Term>은 벽입니다. 왼쪽 위 <Term>(0, 0)</Term>에서 오른쪽 아래
          <Term>(n-1, m-1)</Term>까지 <strong>지나는 칸 수의 최솟값</strong>을 구하고,
          도달할 수 없으면 <Term>-1</Term>을 돌려줍니다. 격자는 최대 100 × 100입니다.
        </p>

        <Note tone="danger" title="DFS 로 풀면 왜 안 되나">
          <p>
            DFS는 «한 갈래를 끝까지» 갑니다. 도착에 닿아도 그것이 최단이라는 보장이 없어
            <strong>모든 경로를 다 훑고 최솟값을 골라야</strong> 합니다. 100 × 100 격자에서
            그 경로의 수는 천문학적입니다. BFS는 가까운 칸부터 퍼지므로
            <strong>처음 닿은 순간이 곧 최단</strong>입니다.
          </p>
        </Note>
      </Section>

      <Section no={2} title="풀이">
        <Code label="제출용 풀이">{`
from collections import deque

def solution(maps):
    n, m = len(maps), len(maps[0])
    dx, dy = [-1, 1, 0, 0], [0, 0, -1, 1]

    # 방문 표시와 거리를 한 배열로 겸한다
    dist = [[-1] * m for _ in range(n)]
    dist[0][0] = 1                       # 문제는 «지나는 칸 수» 이므로 1부터 센다

    q = deque([(0, 0)])
    while q:
        x, y = q.popleft()
        if (x, y) == (n - 1, m - 1):
            return dist[x][y]

        for d in range(4):
            nx, ny = x + dx[d], y + dy[d]
            if not (0 <= nx < n and 0 <= ny < m):
                continue
            if maps[nx][ny] == 0 or dist[nx][ny] != -1:
                continue
            dist[nx][ny] = dist[x][y] + 1
            q.append((nx, ny))            # 넣는 줄 옆에서 표시한다

    return -1


print(solution([[1, 0, 1, 1, 1],
                [1, 0, 1, 0, 1],
                [1, 0, 1, 1, 1],
                [1, 1, 1, 0, 1],
                [0, 0, 0, 0, 1]]))        # => 11

print(solution([[1, 0, 1, 1, 1],
                [1, 0, 1, 0, 1],
                [1, 0, 1, 1, 1],
                [1, 1, 1, 0, 0],
                [0, 0, 0, 0, 1]]))        # => -1
`}</Code>
      </Section>

      <Section no={3} title="이 문제에서 틀리는 세 자리">
        <ul>
          <li>
            <strong>시작 칸을 0으로 센다</strong> — 답은 «이동 횟수»가 아니라
            «지나는 칸 수»입니다. 출발 칸도 세므로 <Term>dist[0][0] = 1</Term>입니다.
            0으로 시작하면 모든 답이 1씩 작습니다.
          </li>
          <li>
            <strong>도달 불가를 처리하지 않는다</strong> — 큐가 비었는데도 도착하지
            못했다면 <Term>-1</Term>입니다. 이 <Term>return</Term>이 없으면
            <Term>None</Term>이 나갑니다.
          </li>
          <li>
            <strong>세로·가로를 바꿔 쓴다</strong> — <Term>len(maps)</Term>가 행,
            <Term>len(maps[0])</Term>이 열입니다. 정사각형 예제만 보고 짜면
            직사각형 테스트에서 무너집니다.
          </li>
        </ul>

        <Note tone="warn" title="맵을 직접 고치지 마세요">
          <p>
            방문 표시를 <Term>maps[nx][ny] = 0</Term>으로 하는 풀이가 흔합니다.
            메모리는 아끼지만 <strong>입력을 망가뜨립니다.</strong> 채점에서는 문제가 없더라도,
            같은 입력을 두 번 쓰는 순간 답이 달라지는 코드는 신뢰할 수 없습니다.
          </p>
        </Note>
      </Section>

      <Section no={4} title="같은 뼈대로 풀리는 것들">
        <p>
          이동 규칙만 바꾸면 그대로 다른 문제가 됩니다 — 벽을 한 번 부술 수 있다면
          <strong>«부순 적 있는가»를 상태에 더해</strong> <Term>dist[x][y][부순 여부]</Term>로
          만들고, 출발점이 여럿이면 처음부터 전부 큐에 넣습니다.
          <strong>BFS 문제는 결국 «다음 상태를 어떻게 만드느냐»만 다릅니다.</strong>
        </p>

        <Code label="벽을 한 번 부술 수 있다면">{`
from collections import deque

def solution(maps):
    n, m = len(maps), len(maps[0])
    dx, dy = [-1, 1, 0, 0], [0, 0, -1, 1]

    # 칸마다 상태가 둘 — [0] 아직 안 부숨 / [1] 한 번 부숨
    dist = [[[-1, -1] for _ in range(m)] for _ in range(n)]
    dist[0][0][0] = 1
    q = deque([(0, 0, 0)])

    while q:
        x, y, broken = q.popleft()
        if (x, y) == (n - 1, m - 1):
            return dist[x][y][broken]

        for d in range(4):
            nx, ny = x + dx[d], y + dy[d]
            if not (0 <= nx < n and 0 <= ny < m):
                continue
            if maps[nx][ny] == 1 and dist[nx][ny][broken] == -1:
                dist[nx][ny][broken] = dist[x][y][broken] + 1
                q.append((nx, ny, broken))
            elif maps[nx][ny] == 0 and broken == 0 and dist[nx][ny][1] == -1:
                dist[nx][ny][1] = dist[x][y][0] + 1      # 여기서 한 번 쓴다
                q.append((nx, ny, 1))

    return -1


# 벽을 못 부수면 -1 이던 그 맵이다
print(solution([[1, 0, 1, 1, 1],
                [1, 0, 1, 0, 1],
                [1, 0, 1, 1, 1],
                [1, 1, 1, 0, 0],
                [0, 0, 0, 0, 1]]))    # => 11
`}</Code>

        <p>
          «같은 칸이라도 어떤 상태로 왔는지»에 따라 앞으로 갈 수 있는 곳이 달라지므로,
          방문 표시를 <strong>칸이 아니라 (칸, 상태)에 대해</strong> 합니다. 이 한 줄의
          확장이 BFS 문제의 난이도를 가르는 자리입니다.
        </p>
      </Section>

      <Quiz
        question="이 문제를 DFS 로 풀면 무엇이 문제일까요?"
        choices={[
          {
            text: '먼저 도착했다고 최단이라는 보장이 없어 모든 경로를 훑어야 한다',
            right: true,
            why: 'DFS 는 한 갈래를 끝까지 파고들므로 처음 닿은 경로가 최단이 아닐 수 있습니다. 최솟값을 얻으려면 모든 경로를 봐야 하는데, 100×100 격자에서 그 수는 감당할 수 없습니다. 모든 이동 비용이 1이므로 BFS 가 정답입니다.',
          },
          {
            text: '재귀 깊이가 1만을 넘어 RecursionError 가 난다',
            why: '깊이는 최대 1만 칸이라 한도를 올리면 넘길 수 있습니다. 근본 문제는 깊이가 아니라 최단 보장이 없다는 데 있습니다.',
          },
          {
            text: 'DFS 는 격자에서 쓸 수 없다',
            why: '격자에서도 DFS 는 잘 동작합니다. 연결 요소를 세는 문제라면 오히려 DFS 가 편합니다.',
          },
          {
            text: '방문 배열을 쓸 수 없기 때문이다',
            why: 'DFS 도 방문 배열을 씁니다. 다만 최단을 구하려면 되돌아올 때 표시를 풀어야 해서 더 복잡해집니다.',
          },
        ]}
      />
    </Lesson>
  );
}
