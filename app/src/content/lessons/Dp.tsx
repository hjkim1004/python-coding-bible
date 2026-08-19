import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Term from '../../components/Term';

export default function Dp() {
  return (
    <Lesson
      part="3부 · 알고리즘"
      title="다이나믹 프로그래밍"
      lede="같은 계산을 두 번 하지 않는 기술입니다. 어려운 것은 점화식이 아니라, 「무엇을 기억할지」를 정하는 일입니다."
      tags={['3-6', '점화식', '메모이제이션']}
    >
      <Section no={1} title="DP 인지 알아보는 두 조건">
        <ul>
          <li>
            <strong>작은 문제로 쪼개진다</strong> — 큰 답이 작은 답으로 표현된다.
          </li>
          <li>
            <strong>같은 작은 문제가 여러 번 나온다</strong> — 그래서 기억해 두면 이득이다.
          </li>
        </ul>
        <p>
          두 번째가 없으면 그냥 분할 정복입니다. 두 조건이 모두 보이면
          <strong>«무엇을 <Term>dp[i]</Term>에 담을지»부터 문장으로 적으세요.</strong>
          «<Term>dp[i]</Term>는 i번째까지 봤을 때의 최댓값»처럼 한 문장으로 적히지 않으면
          점화식도 나오지 않습니다.
        </p>
      </Section>

      <Section no={2} title="탑다운과 바텀업">
        <Code label="같은 문제, 두 방향">{`
import sys
from functools import lru_cache

sys.setrecursionlimit(10 ** 6)

# 탑다운 — 큰 문제에서 내려간다. 점화식을 그대로 옮기면 되어 쓰기 쉽다
@lru_cache(maxsize=None)
def fib_top(n):
    if n < 2:
        return n
    return fib_top(n - 1) + fib_top(n - 2)

# 바텀업 — 작은 것부터 채운다. 재귀가 없어 깊이 걱정이 없고 대체로 더 빠르다
def fib_bottom(n):
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]
`}</Code>

        <Note tone="success" title="탑다운으로 먼저 쓰고, 필요하면 바텀업으로 옮기세요">
          <p>
            탑다운은 <strong>점화식을 그대로 옮기면 되어 틀릴 자리가 적습니다.</strong>
            깊이가 깊어 위험하거나 속도가 아슬아슬할 때만 바텀업으로 바꾸면 됩니다.
          </p>
        </Note>
      </Section>

      <Section no={3} title="세 가지 대표 꼴">
        <Code label="1) 계단 오르기 — 한 칸 앞을 본다">{`
# dp[i] = i번째 칸에 도달하는 방법의 수
n = 10
dp = [0] * (n + 1)
dp[0], dp[1] = 1, 1
for i in range(2, n + 1):
    dp[i] = dp[i - 1] + dp[i - 2]
`}</Code>

        <Code label="2) 0-1 배낭 — 넣거나 넣지 않거나">{`
# dp[w] = 무게 w 까지 담았을 때의 최대 가치
items = [(3, 5), (4, 6), (2, 3)]     # (무게, 가치)
capacity = 7
dp = [0] * (capacity + 1)

for weight, value in items:
    # 뒤에서부터 채운다 — 같은 물건을 두 번 담지 않기 위해서
    for w in range(capacity, weight - 1, -1):
        dp[w] = max(dp[w], dp[w - weight] + value)

print(dp[capacity])     # 11
`}</Code>

        <Note tone="danger" title="배낭에서 루프 방향이 답을 바꿉니다">
          <p>
            뒤에서부터 돌면 각 물건을 <strong>한 번만</strong> 쓰고(0-1 배낭),
            앞에서부터 돌면 <strong>여러 번</strong> 쓸 수 있습니다(무한 배낭).
            문제가 «각 물건은 하나뿐»이라고 했는데 앞에서부터 돌면 답이 커집니다.
          </p>
        </Note>

        <Code label="3) 최장 증가 부분 수열 (LIS)">{`
from bisect import bisect_left

# O(N^2) — 점화식이 그대로 보인다
def lis_slow(arr):
    dp = [1] * len(arr)
    for i in range(len(arr)):
        for j in range(i):
            if arr[j] < arr[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)

# O(N log N) — 길이만 필요하다면 이쪽
def lis_fast(arr):
    tails = []
    for x in arr:
        i = bisect_left(tails, x)
        if i == len(tails):
            tails.append(x)
        else:
            tails[i] = x
    return len(tails)

print(lis_slow([10, 20, 10, 30, 20, 50]))   # 4
print(lis_fast([10, 20, 10, 30, 20, 50]))   # 4
`}</Code>
      </Section>

      <Section no={4} title="DP 를 쓰기 전에 확인할 것">
        <p>
          <Term>dp</Term> 배열의 크기가 곧 메모리입니다. 2차원 <Term>dp[10000][10000]</Term>은
          1억 칸이라 메모리 제한을 넘깁니다. 이럴 때는
          <strong>«직전 줄만 있으면 되는가?»</strong>를 물어보세요 — 대개는 그렇고,
          그러면 2차원을 1차원 두 개로 줄일 수 있습니다.
        </p>

        <Code label="줄 하나만 남기기">{`
prev = [0] * (m + 1)
for i in range(1, n + 1):
    cur = [0] * (m + 1)
    for j in range(1, m + 1):
        cur[j] = max(prev[j], cur[j - 1])
    prev = cur       # 직전 줄만 들고 다닌다
`}</Code>
      </Section>

      <Quiz
        question="0-1 배낭 문제를 1차원 dp 로 풀 때 안쪽 루프를 «앞에서 뒤로» 돌면 무슨 일이 생길까요?"
        choices={[
          {
            text: '같은 물건을 여러 번 담게 되어 답이 커진다',
            right: true,
            why: '앞에서부터 돌면 이번 물건으로 갱신한 dp[w - weight] 를 같은 물건이 다시 참조합니다. 결과적으로 물건을 몇 개든 담을 수 있는 무한 배낭이 됩니다. 각 물건이 하나뿐이라면 반드시 뒤에서부터 돌아야 합니다.',
          },
          {
            text: '아무 차이도 없다',
            why: '방향이 곧 «같은 물건을 재사용하는가» 를 정합니다. 답이 달라집니다.',
          },
          {
            text: '무한 루프에 빠진다',
            why: 'range 로 도는 루프라 끝납니다. 결과값이 틀릴 뿐입니다.',
          },
          {
            text: '메모리 초과가 난다',
            why: '배열 크기는 그대로입니다. 문제는 시간이나 메모리가 아니라 값의 정확성입니다.',
          },
        ]}
      />
    </Lesson>
  );
}
