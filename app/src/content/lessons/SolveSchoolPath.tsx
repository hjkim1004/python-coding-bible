import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Recall from '../../components/Recall';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Term from '../../components/Term';

export default function SolveSchoolPath() {
  return (
    <Lesson
      part="4부 · 기출 해설"
      title="등굣길"
      lede="«경로가 몇 가지인가»를 묻는 순간 완전 탐색을 접습니다. 59자리 수를 하나씩 셀 수는 없기 때문입니다."
      tags={['4-9', 'DP', 'Lv.3']}
      source={{ label: '프로그래머스', href: 'https://school.programmers.co.kr/learn/courses/30/lessons/42898' }}
    >
      <Recall from="p3-dp">
        <p>
          3-6에서 DP의 어려움은 점화식이 아니라
          <strong>«무엇을 <Term>dp[i]</Term>에 담을지»를 한 문장으로 적는 일</strong>이라고 했습니다.
          직전 줄만 있으면 되는 경우 2차원을 1차원으로 줄이는 것도 봤습니다.
        </p>
        <p>
          여기서 그 한 문장은 «이 칸에 도달하는 방법의 수»입니다.
          그리고 «나머지를 구하라»는 요구 자체가 <strong>세지 말고 누적하라는 신호</strong>입니다.
        </p>
      </Recall>

      <Section no={1} title="문제">
        <p>
          <Term>m × n</Term> 격자의 왼쪽 위에서 오른쪽 아래까지
          <strong> 오른쪽과 아래로만</strong> 이동합니다. 물에 잠긴 칸
          <Term>puddles</Term>는 지날 수 없습니다. 가능한 경로의 수를
          <Term>1,000,000,007</Term>로 나눈 나머지를 구합니다. 격자는 최대 100 × 100입니다.
        </p>

        <Note tone="danger" title="완전 탐색이 불가능한 이유">
          <p>
            100 × 100 격자에서 오른쪽·아래로만 가는 경로의 수는
            조합으로 <Term>200C100</Term> — 자릿수가 <strong>59자리</strong>인 수입니다.
            하나씩 세는 것은 물론 불가능하고,
            <strong>«나머지를 구하라»는 말 자체가 «수를 세지 말고 DP를 하라»는 신호</strong>입니다.
          </p>
        </Note>
      </Section>

      <Section no={2} title="한 칸에 도달하는 경우의 수">
        <p>
          어떤 칸에 오는 방법은 <strong>왼쪽에서 오거나 위에서 오거나</strong> 둘뿐입니다.
          그러므로 <Term>dp[i][j] = dp[i-1][j] + dp[i][j-1]</Term>입니다.
          물웅덩이는 도달 방법이 0가지이므로 그대로 0으로 둡니다.
        </p>

        <Code label="제출용 풀이">{`
def solution(m, n, puddles):
    MOD = 1_000_000_007

    # 1번부터 쓰기 위해 한 줄·한 칸씩 여유를 둔다 — 경계 검사가 사라진다
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    blocked = {(y, x) for x, y in puddles}      # 입력은 (열, 행) 순서다

    dp[1][1] = 1
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if (i, j) == (1, 1):
                continue
            if (i, j) in blocked:
                continue                         # 물웅덩이는 0가지로 남는다
            dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % MOD

    return dp[n][m]


print(solution(4, 3, [[2, 2]]))    # => 4
`}</Code>

        <Note tone="danger" title="puddles 는 (열, 행) 입니다">
          <p>
            문제의 좌표는 <Term>[x, y]</Term> 곧 <strong>(열, 행)</strong> 순서인데,
            2차원 리스트는 <Term>dp[행][열]</Term>입니다. 이 뒤집힘을 놓치면
            <strong>정사각형 예제에서는 통과하고 직사각형에서만 틀립니다</strong> —
            가장 찾기 어려운 종류의 버그입니다.
          </p>
        </Note>
      </Section>

      <Section no={3} title="나머지를 «매 칸마다» 취한다">
        <p>
          1-2에서 본 그대로입니다. 마지막에 한 번만 나누면 그 전에 이미 59자리 수를
          더하고 있어 느려집니다. <strong>더할 때마다 줄여야</strong> 값이 작게 유지됩니다.
        </p>

        <Note tone="warn" title="0으로 시작하는 칸을 헷갈리지 마세요">
          <p>
            <Term>dp[1][1] = 1</Term>은 «출발점에 도달하는 방법이 한 가지»라는 뜻입니다.
            0으로 두면 모든 칸이 0이 됩니다. 그리고 이 칸을 루프 안에서 다시 덮어쓰지
            않도록 <Term>continue</Term>로 건너뛰어야 합니다.
          </p>
        </Note>
      </Section>

      <Section no={4} title="줄 하나로 줄이기">
        <p>
          <Term>dp[i][j]</Term>는 바로 위와 바로 왼쪽만 봅니다. 곧
          <strong>직전 줄만 있으면 됩니다.</strong> 한 줄짜리 배열을 왼쪽에서
          오른쪽으로 갱신하면, 갱신 전 값이 «위», 갱신 후 값이 «왼쪽»이 되어
          자연스럽게 두 방향을 모두 씁니다.
        </p>

        <Code label="1차원 DP">{`
def solution(m, n, puddles):
    MOD = 1_000_000_007
    blocked = {(y, x) for x, y in puddles}

    row = [0] * (m + 1)
    row[1] = 1

    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if (i, j) in blocked:
                row[j] = 0                       # 지날 수 없다
            elif j > 1:
                row[j] = (row[j] + row[j - 1]) % MOD
            # j == 1 이면 위에서 내려온 값(row[1])이 그대로 남는다

    return row[m]


print(solution(4, 3, [[2, 2]]))    # => 4
`}</Code>

        <p>
          이 문제는 100 × 100이라 2차원으로도 넉넉하지만, 격자가 커지는 변형에서는
          이 «줄 하나» 기법이 메모리 초과를 막습니다.
        </p>
      </Section>

      <Quiz
        question="문제가 «경우의 수를 1,000,000,007 로 나눈 나머지» 를 요구하는 것은 무슨 신호일까요?"
        choices={[
          {
            text: '경우의 수가 자릿수를 감당할 수 없을 만큼 크니 세지 말고 DP 로 누적하라는 뜻',
            right: true,
            why: '나머지를 요구한다는 것은 답이 천문학적이라는 뜻이고, 곧 하나씩 세는 완전 탐색이 불가능하다는 신호입니다. 점화식으로 누적하면서 더할 때마다 나머지를 취하면 값이 작게 유지됩니다.',
          },
          {
            text: '답이 음수가 될 수 있으니 보정하라는 뜻',
            why: '경로의 수는 음수가 될 수 없습니다. 뺄셈이 섞인 점화식이라면 보정이 필요하지만 이 문제는 덧셈뿐입니다.',
          },
          {
            text: '파이썬 정수가 오버플로하므로 막으라는 뜻',
            why: '파이썬 정수는 넘치지 않습니다. 다만 자릿수가 커지면 덧셈이 느려지므로 매번 줄이는 편이 좋습니다.',
          },
          {
            text: '1,000,000,007 이 소수라서 해시에 쓰라는 뜻',
            why: '소수인 것은 맞지만 여기서는 단순히 «너무 커진 수를 접어 두는» 용도입니다.',
          },
        ]}
      />
    </Lesson>
  );
}
