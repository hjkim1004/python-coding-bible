import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Recall from '../../components/Recall';
import Term from '../../components/Term';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';

export default function Greedy() {
  return (
    <Lesson
      part="3부 · 알고리즘"
      title="그리디"
      lede="지금 가장 좋아 보이는 것을 고릅니다. 어려운 것은 고르는 일이 아니라, 그 선택이 손해가 아님을 말하는 일입니다."
      tags={['3-1', '정당성', '정렬 후 선택']}
    >
      <Recall from="p1-function">
        <p>
          1-7에서 <Term>key</Term>로 정렬 기준을 세우는 법을 익혔습니다.
          <Term>sorted(arr, key=lambda x: (-x[1], x[0]))</Term> 같은 한 줄입니다.
        </p>
        <p>
          <strong>그 한 줄이 그리디의 절반입니다.</strong> 많은 그리디 문제가
          «어떤 기준으로 줄을 세울 것인가»로 환원되기 때문입니다.
          나머지 절반은 «그 기준이 왜 손해가 아닌가»를 말하는 일입니다.
        </p>
      </Recall>

      <Section no={1} title="그리디는 «증명»이 절반이다">
        <p>
          그리디는 전체를 보지 않고 <strong>지금 이 순간의 최선</strong>만 고릅니다.
          빠르고 코드도 짧지만, 그 선택이 최적해로 이어진다는 보장은 문제마다 다릅니다.
          그래서 그리디 문제를 풀었다는 것은 <strong>«왜 이 선택이 손해가 아닌가»를 한 문장으로
          말할 수 있다는 뜻</strong>입니다.
        </p>

        <Note tone="success" title="정당성을 말하는 두 가지 틀">
          <ul>
            <li>
              <strong>교환하면 나빠지지 않는다</strong> — 최적해에서 내 선택과 다른 부분을
              내 선택으로 바꿔도 답이 나빠지지 않음을 보인다.
            </li>
            <li>
              <strong>지금 쓰지 않으면 버려진다</strong> — 이 자원은 다음 단계에서 쓸 수
              없으므로, 지금 쓰는 편이 손해가 아니다.
            </li>
          </ul>
        </Note>
      </Section>

      <Section no={2} title="되는 예 — 거스름돈">
        <p>
          500·100·50·10원으로 거슬러 줄 때는 큰 단위부터 주면 최소 개수가 됩니다.
          이유는 <strong>큰 단위가 작은 단위의 배수</strong>이기 때문입니다. 100원 다섯 개를
          500원 하나가 언제나 대신할 수 있으므로, 큰 것을 미루는 선택은 이득이 없습니다.
        </p>

        <Code label="거스름돈">{`
n = 1260
count = 0

for coin in [500, 100, 50, 10]:
    count += n // coin
    n %= coin

print(count)     # 6
`}</Code>
      </Section>

      <Section no={3} title="안 되는 예 — 배수 관계가 깨질 때">
        <p>
          동전이 500·400·100원이고 800원을 거슬러 준다면, 그리디는 500 + 100 + 100 + 100으로
          4개를 줍니다. 최적해는 400 + 400으로 2개입니다.
          <strong>배수 관계가 없으면 큰 것부터 고르는 선택이 손해가 됩니다.</strong>
          이런 문제는 DP로 풀어야 합니다.
        </p>

        <Code label="같은 문제를 DP 로">{`
coins = [500, 400, 100]
target = 800
INF = float('inf')

dp = [0] + [INF] * target
for i in range(1, target + 1):
    for c in coins:
        if i >= c and dp[i - c] + 1 < dp[i]:
            dp[i] = dp[i - c] + 1

print(dp[target])    # 2
`}</Code>

        <Note tone="danger" title="«그리디가 맞나?»를 의심하는 신호">
          <p>
            선택지들이 서로 배수·포함 관계가 아니거나, «지금 조금 손해 보면 나중에 크게
            이득»인 구조가 보이면 그리디는 대개 틀립니다.
            <strong>반례를 30초 안에 하나 만들어 보는 습관</strong>이 오답을 막습니다.
          </p>
        </Note>
      </Section>

      <Section no={4} title="정렬이 그리디의 절반">
        <p>
          많은 그리디 문제가 «어떤 기준으로 줄을 세울 것인가»로 환원됩니다. 회의실 배정이
          대표적입니다 — <strong>끝나는 시간이 이른 것부터</strong> 고르면 최대 개수가 됩니다.
          일찍 끝날수록 남는 시간이 길고, 남는 시간이 길수록 뒤에 더 담을 수 있기 때문입니다.
        </p>

        <Code label="회의실 배정">{`
meetings = [(1, 4), (3, 5), (0, 6), (5, 7), (8, 9)]
meetings.sort(key=lambda m: (m[1], m[0]))    # 끝나는 시간 기준

count, last_end = 0, -1
for start, end in meetings:
    if start >= last_end:
        count += 1
        last_end = end

print(count)     # 3
`}</Code>
      </Section>

      <Quiz
        question="그리디 풀이를 제출하기 전에 반드시 해야 할 일은?"
        choices={[
          {
            text: '«이 선택이 왜 손해가 아닌가»를 한 문장으로 말해 본다',
            right: true,
            why: '그리디는 정당성이 성립할 때만 최적해를 줍니다. 말로 설명되지 않으면 대개 반례가 있습니다. 설명이 막히는 자리에서 반례를 찾아보면 십중팔구 나옵니다.',
          },
          {
            text: '시간 복잡도가 O(N log N) 이하인지 확인한다',
            why: '복잡도는 통과 여부의 문제이고, 그리디의 위험은 «틀린 답을 빠르게 내는» 것입니다. 순서가 반대입니다.',
          },
          {
            text: '입력이 정렬되어 있는지 확인한다',
            why: '중요한 확인이지만 그리디만의 문제는 아닙니다. 정렬 여부보다 선택 기준의 정당성이 먼저입니다.',
          },
          {
            text: 'DP 로도 풀리는지 확인한다',
            why: 'DP 로 풀린다고 그리디가 틀린 것은 아닙니다. 확인해야 할 것은 내 그리디 기준이 반례를 갖는지입니다.',
          },
        ]}
      />
    </Lesson>
  );
}
