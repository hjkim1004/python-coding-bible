import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Term from '../../components/Term';

export default function SolveImmigration() {
  return (
    <Lesson
      part="4부 · 기출 해설"
      title="입국심사"
      lede="배열을 탐색하는 것이 아니라 «답의 범위»를 탐색합니다. 3-5의 파라메트릭 서치를 실제 문제 위에서 확인합니다."
      tags={['4-8', '파라메트릭 서치', 'Lv.3']}
      source={{ label: '프로그래머스', href: 'https://school.programmers.co.kr/learn/courses/30/lessons/43238' }}
    >
      <Section no={1} title="문제">
        <p>
          기다리는 사람이 <Term>n</Term>명이고, 심사관마다 한 명을 처리하는 데 걸리는
          시간이 <Term>times</Term>로 주어집니다. 모든 사람이 심사를 마치는 데 걸리는
          <strong>최소 시간</strong>을 구합니다.
        </p>
        <p>
          제한이 큽니다 — 사람은 최대 <strong>10억 명</strong>, 심사관은 10만 명,
          한 명당 시간도 최대 10억 분입니다.
        </p>

        <Note tone="danger" title="시뮬레이션은 시작도 할 수 없습니다">
          <p>
            «사람을 한 명씩 빈 심사대에 배치»하는 풀이는 10억 번을 돌아야 합니다.
            <strong>제한이 10억이면 답을 직접 만들지 말고 «답을 맞혀 보라»는 뜻</strong>입니다.
            10억은 이진 탐색으로 서른 번이면 좁혀집니다.
          </p>
        </Note>
      </Section>

      <Section no={2} title="문제를 뒤집는다">
        <p>
          «최소 시간은 얼마인가»는 바로 답하기 어렵습니다. 대신 이렇게 뒤집습니다 —
          <strong>«<Term>t</Term>분 동안 <Term>n</Term>명을 처리할 수 있는가?»</strong>
          이 질문에는 한 줄로 답할 수 있습니다.
        </p>
        <p>
          <Term>t</Term>분 동안 한 심사관이 처리하는 인원은 <Term>t // time</Term>명입니다.
          전부 더해 <Term>n</Term> 이상이면 «가능»입니다. 그리고 이 성질이 핵심입니다 —
          <strong><Term>t</Term>분에 가능하다면 <Term>t+1</Term>분에도 반드시 가능합니다.</strong>
          «불가능 → 가능»으로 딱 한 번 바뀌는 그 경계가 답입니다.
        </p>

        <Code label="제출용 풀이">{`
def solution(n, times):
    def can(t):
        # t분 동안 처리할 수 있는 총 인원
        total = 0
        for time in times:
            total += t // time
            if total >= n:      # 이미 충분하면 더 볼 필요가 없다
                return True
        return False

    lo, hi = 1, min(times) * n      # 가장 빠른 심사관 혼자 다 봐도 이 시간이면 끝난다
    while lo < hi:
        mid = (lo + hi) // 2
        if can(mid):
            hi = mid                # 가능하다 → 더 줄여 본다
        else:
            lo = mid + 1            # 불가능하다 → 늘려야 한다

    return lo


print(solution(6, [7, 10]))     # => 28
`}</Code>
      </Section>

      <Section no={3} title="범위를 어떻게 잡을까">
        <p>
          <strong>아래</strong>는 1분입니다. <strong>위</strong>는 «확실히 되는 값»이면
          무엇이든 좋습니다 — <Term>min(times) * n</Term>은 가장 빠른 심사관 한 명이
          혼자 다 보는 시간이므로 반드시 충분합니다.
        </p>

        <Note tone="warn" title="상한을 넉넉히 잡되 «확실히 되는 값»으로">
          <p>
            상한이 실제 답보다 작으면 이진 탐색은 <strong>조용히 틀린 답</strong>을 돌려줍니다.
            반대로 너무 크게 잡아도 로그라 몇 번 더 돌 뿐입니다.
            <strong>애매하면 크게 잡으세요.</strong> 여기서는 10억 × 10억이라
            <Term>10^18</Term>까지 가지만, 파이썬 정수는 넘치지 않고
            이진 탐색은 60번이면 끝납니다.
          </p>
        </Note>

        <p>
          <Term>can</Term>이 O(M), 범위가 <Term>10^18</Term>이므로 전체는
          <Term>O(M log(10^18))</Term> — 10만 × 60 = 600만 번입니다. 넉넉합니다.
        </p>
      </Section>

      <Section no={4} title="lo &lt; hi 꼴을 쓴 이유">
        <p>
          3-5에서 본 <Term>answer</Term> 변수에 기록하는 꼴 대신, 여기서는
          <Term>lo &lt; hi</Term>로 구간을 좁혀 <strong>«가능한 것 중 가장 작은 값»</strong>에
          자연스럽게 수렴시켰습니다. 두 꼴 다 맞지만 <strong>섞으면 안 됩니다</strong> —
          <Term>lo &lt; hi</Term>에는 <Term>hi = mid</Term>가, <Term>lo &lt;= hi</Term>에는
          <Term>hi = mid - 1</Term>이 짝입니다.
        </p>

        <Code label="기록하는 꼴로 쓴다면">{`
def solution(n, times):
    def can(t):
        return sum(t // time for time in times) >= n

    lo, hi, answer = 1, min(times) * n, 0
    while lo <= hi:
        mid = (lo + hi) // 2
        if can(mid):
            answer = mid            # 되면 기록하고 더 줄인다
            hi = mid - 1
        else:
            lo = mid + 1
    return answer


print(solution(6, [7, 10]))     # => 28
`}</Code>
      </Section>

      <Quiz
        question="이 문제에서 이진 탐색의 상한을 min(times) * n 으로 잡는 이유는?"
        choices={[
          {
            text: '가장 빠른 심사관 혼자 모두 처리하는 시간이라 반드시 가능한 값이기 때문',
            right: true,
            why: '상한은 «확실히 되는 값» 이어야 합니다. 가장 빠른 심사관 한 명만 일해도 그 시간이면 n명이 끝나므로, 실제 답은 반드시 이 값 이하입니다. 상한이 답보다 작으면 이진 탐색은 조용히 틀린 값을 돌려줍니다.',
          },
          {
            text: '가장 느린 심사관을 기준으로 잡으면 시간 초과가 나기 때문',
            why: 'max(times) * n 으로 잡아도 통과합니다. 범위가 커져도 이진 탐색은 로그라 몇 번 더 돌 뿐입니다.',
          },
          {
            text: 'n 이 10억이라 정수 범위를 넘지 않기 위해서',
            why: '파이썬 정수는 넘치지 않습니다. 자릿수가 커져도 값이 망가지지 않습니다.',
          },
          {
            text: '심사관 수만큼 나누어야 하기 때문',
            why: '심사관이 동시에 일하므로 실제 답은 이보다 작지만, 상한은 «가능함이 보장되는 값» 이기만 하면 됩니다.',
          },
        ]}
      />
    </Lesson>
  );
}
