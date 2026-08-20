import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Recall from '../../components/Recall';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Term from '../../components/Term';

export default function Simulation() {
  return (
    <Lesson
      part="3부 · 알고리즘"
      title="구현과 시뮬레이션"
      lede="아이디어는 없습니다. 문제가 시킨 대로 정확히 옮기면 됩니다. 그래서 실수의 자리를 미리 없애는 것이 실력입니다."
      tags={['3-2', '방향 배열', '경계 검사']}
    >
      <Recall from="p1-loop">
        <p>
          1-6에서 이중 루프를 빠져나오는 법과, 도는 중에 목록을 고치면
          <strong>한 칸씩 건너뛴다</strong>는 것을 봤습니다.
        </p>
        <p>
          구현 문제는 아이디어가 없는 대신 <strong>그런 실수의 자리가 전부 모여 있는</strong>
          유형입니다. 여기서는 실수할 자리를 미리 없애는 방법을 봅니다 —
          방향 배열, 경계 검사, 상태 묶기.
        </p>
      </Recall>

      <Section no={1} title="방향은 배열 두 개로">
        <p>
          상하좌우로 움직이는 코드를 <Term>if</Term> 네 개로 쓰면 네 번 실수할 수 있습니다.
          방향을 <strong>배열로 만들고 한 번만 돌면</strong> 실수할 자리가 하나로 줄어듭니다.
        </p>

        <Code label="4방향과 8방향">{`
# 상 하 좌 우 — 순서는 문제가 요구하는 우선순위에 맞춘다
dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]

for d in range(4):
    nx, ny = x + dx[d], y + dy[d]

# 대각선까지 8방향
moves = [(-1, -1), (-1, 0), (-1, 1),
         (0, -1),           (0, 1),
         (1, -1),  (1, 0),  (1, 1)]

for mx, my in moves:
    nx, ny = x + mx, y + my
`}</Code>

        <Note tone="warn" title="회전은 인덱스로">
          <p>
            «오른쪽으로 90도 돈다»는 방향 배열을 시계 방향 순서로 만들어 두면
            <Term>d = (d + 1) % 4</Term> 한 줄입니다. 왼쪽 회전은 <Term>(d - 1) % 4</Term>이고,
            파이썬의 <Term>%</Term>는 음수에서도 양수를 돌려주므로 따로 보정할 필요가 없습니다.
          </p>
        </Note>
      </Section>

      <Section no={2} title="경계 검사를 한곳에 모은다">
        <Code label="범위 밖인가">{`
n, m = 5, 5

def in_range(x, y):
    return 0 <= x < n and 0 <= y < m

# 쓸 때는 이렇게 — 조건이 흩어지지 않는다
for d in range(4):
    nx, ny = x + dx[d], y + dy[d]
    if not in_range(nx, ny):
        continue
    if board[nx][ny] == 1:
        continue
    # 갈 수 있다
`}</Code>

        <Note tone="danger" title="파이썬의 음수 인덱스는 오류가 아닙니다">
          <p>
            <Term>board[-1][0]</Term>은 «맨 아랫줄»을 읽습니다. C였다면 즉시 터졌을 실수가
            파이썬에서는 <strong>조용히 엉뚱한 값</strong>을 돌려줍니다. 그래서
            <Term>0 &lt;= x</Term> 검사를 절대 빼면 안 됩니다.
          </p>
        </Note>
      </Section>

      <Section no={3} title="시간을 계산하고 시작한다">
        <p>
          구현 문제는 «그대로 하면 되는» 대신 그 «그대로»가 얼마나 도는지를 먼저 세야 합니다.
          파이썬은 대략 <strong>1초에 2천만~5천만 번</strong>의 단순 연산을 합니다.
          <Term>N ≤ 1000</Term>인데 3중 루프라면 10억 번이라 통과할 수 없습니다.
        </p>

        <Code label="회전은 만들지 말고 빌려 쓴다">{`
board = [[1, 2], [3, 4]]

# 시계 방향 90도 회전 — 직접 짜면 인덱스에서 틀린다
rotated = [list(row) for row in zip(*board[::-1])]
print(rotated)     # [[3, 1], [4, 2]]

# 반시계 방향
rotated_ccw = [list(row) for row in zip(*board)][::-1]
`}</Code>
      </Section>

      <Section no={4} title="상태를 한 곳에 담는다">
        <p>
          시뮬레이션이 길어지면 변수가 흩어집니다. «지금 어디에, 어느 방향으로, 몇 번째 턴에»를
          <strong>하나의 튜플이나 함수 인자</strong>로 묶어 두면 디버깅이 쉬워집니다.
          중간 상태를 출력해 볼 때도 한 줄이면 됩니다.
        </p>

        <Code label="상태를 묶어 두기">{`
x, y, d = 0, 0, 0          # 위치와 방향

def step(x, y, d):
    nx, ny = x + dx[d], y + dy[d]
    if not in_range(nx, ny):
        d = (d + 1) % 4    # 벽이면 방향만 튼다
        return x, y, d
    return nx, ny, d

for turn in range(100):
    x, y, d = step(x, y, d)
`}</Code>
      </Section>

      <Quiz
        question="격자 탐색에서 경계 검사를 빠뜨렸는데 오류 없이 이상한 답만 나옵니다. 왜일까요?"
        choices={[
          {
            text: '파이썬은 음수 인덱스를 «뒤에서부터»로 해석해 반대쪽 값을 읽는다',
            right: true,
            why: 'board[-1] 은 오류가 아니라 마지막 행입니다. 격자의 왼쪽 밖으로 나간 좌표가 오른쪽 끝의 값을 읽어 오면서, 예외 없이 조용히 틀린 답이 만들어집니다. 그래서 0 <= x 검사가 필수입니다.',
          },
          {
            text: '인덱스가 범위를 넘으면 파이썬이 0 을 돌려준다',
            why: '양수 방향으로 넘어가면 IndexError 가 납니다. 조용히 틀리는 쪽은 음수 방향입니다.',
          },
          {
            text: '2차원 리스트는 경계 검사가 필요 없다',
            why: '필요합니다. 오히려 두 축을 모두 검사해야 해서 실수하기 쉬운 자리입니다.',
          },
          {
            text: 'try-except 가 예외를 삼켰다',
            why: '예외를 잡은 코드가 없다면 그런 일은 일어나지 않습니다. 원인은 애초에 예외가 나지 않았다는 데 있습니다.',
          },
        ]}
      />
    </Lesson>
  );
}
