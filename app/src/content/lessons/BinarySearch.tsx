import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Recall from '../../components/Recall';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Term from '../../components/Term';

export default function BinarySearch() {
  return (
    <Lesson
      part="3부 · 알고리즘"
      title="이진 탐색"
      lede="배열에서 값을 찾는 기술이자, 「답 자체」를 찾는 기술입니다. 후자를 알아야 어려운 문제가 쉬워집니다."
      tags={['3-5', '파라메트릭 서치', 'O(log N)']}
    >
      <Recall from="p2-bisect">
        <p>
          2-4에서 정렬된 배열에 «몇 개인가»를 <Term>O(log N)</Term>에 묻는 법을 봤습니다.
          <Term>bisect_right(a, hi) - bisect_left(a, lo)</Term> 한 줄이었습니다.
        </p>
        <p>
          여기서는 그 «절반 버리기»를 <strong>배열이 아니라 답의 범위에</strong> 적용합니다.
          문제의 제한이 10억처럼 비현실적으로 크다면, 답을 만들지 말고
          <strong>«이 값이면 되는가»를 물어 좁히라</strong>는 신호입니다.
        </p>
      </Recall>

      <Section no={1} title="범위를 반으로 줄인다">
        <p>
          정렬된 배열에서 매번 절반을 버리므로 <Term>N</Term>이 10억이어도
          <strong>서른 번</strong>이면 끝납니다. 문제에서 탐색 범위가 1억, 10억처럼
          비현실적으로 크게 주어졌다면 이진 탐색을 쓰라는 신호입니다.
        </p>

        <Code label="값 찾기">{`
def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1
`}</Code>

        <Note tone="warn" title="경계에서 무한 루프가 나는 자리">
          <p>
            <Term>lo &lt;= hi</Term>와 <Term>hi = mid - 1</Term>은 짝입니다.
            <Term>lo &lt; hi</Term>로 돌면서 <Term>hi = mid</Term>를 쓰는 꼴도 있습니다.
            <strong>두 꼴을 섞지 마세요</strong> — 섞이는 순간 구간이 줄지 않아 멈추지 않습니다.
            헷갈리면 2부의 <Term>bisect</Term>를 쓰는 편이 안전합니다.
          </p>
        </Note>
      </Section>

      <Section no={2} title="답을 이진 탐색한다 — 파라메트릭 서치">
        <p>
          «랜선을 잘라 N개를 만들 때 가능한 최대 길이», «최소 시간», «최대 무게» 같은 문제가
          여기에 해당합니다. 이때 배열이 아니라 <strong>답의 범위</strong>를 반으로 줄입니다.
        </p>
        <p>
          핵심은 이 성질입니다 — <strong>어떤 값에서 되면 그보다 작은 값에서도 반드시 되고,
          안 되면 그보다 큰 값에서도 안 된다.</strong> 이 «되고/안 되고»의 경계가 답입니다.
        </p>

        <Code label="랜선 자르기 꼴">{`
def max_length(lines, need):
    def count(length):
        # 이 길이로 자르면 몇 개가 나오나
        return sum(line // length for line in lines)

    lo, hi, answer = 1, max(lines), 0
    while lo <= hi:
        mid = (lo + hi) // 2
        if count(mid) >= need:
            answer = mid       # 된다 → 기록해 두고 더 크게 시도
            lo = mid + 1
        else:
            hi = mid - 1       # 안 된다 → 더 작게
    return answer

print(max_length([802, 743, 457, 539], 11))    # 200
`}</Code>

        <Note tone="success" title="세 줄로 요약되는 틀">
          <ul>
            <li><strong>판정 함수</strong>를 만든다 — «이 값이면 되는가?»를 O(N)에 답한다.</li>
            <li><strong>답의 범위</strong>를 잡는다 — 최솟값과 최댓값.</li>
            <li>되면 기록하고 한쪽으로, 안 되면 반대쪽으로 좁힌다.</li>
          </ul>
        </Note>
      </Section>

      <Section no={3} title="«최소를 최대로» 같은 말이 보이면">
        <p>
          «가장 가까운 두 공유기 사이의 거리를 최대로», «가장 오래 걸리는 작업 시간을 최소로» —
          이런 문장은 거의 언제나 파라메트릭 서치입니다. 답을 하나 정해 놓고
          <strong>«이 정도는 되는가?»</strong>를 묻는 방식으로 뒤집으면 판정 함수가 보입니다.
        </p>

        <Code label="공유기 설치 꼴">{`
def max_min_gap(houses, c):
    houses.sort()

    def can(gap):
        count, last = 1, houses[0]
        for h in houses[1:]:
            if h - last >= gap:
                count += 1
                last = h
        return count >= c

    lo, hi, answer = 1, houses[-1] - houses[0], 0
    while lo <= hi:
        mid = (lo + hi) // 2
        if can(mid):
            answer = mid
            lo = mid + 1
        else:
            hi = mid - 1
    return answer

print(max_min_gap([1, 2, 8, 4, 9], 3))    # 3
`}</Code>
      </Section>

      <Section no={4} title="복잡도 감각">
        <p>
          판정 함수가 O(N)이고 답의 범위가 <Term>M</Term>이면 전체는
          <Term>O(N log M)</Term>입니다. N이 20만이고 M이 10억이어도
          20만 × 30 = 600만이라 넉넉히 통과합니다.
          <strong>판정 함수 안에 또 반복문을 넣지 않는 것</strong>이 관건입니다.
        </p>
      </Section>

      <Quiz
        question="«가능한 최대 길이» 를 구하는 파라메트릭 서치에서, 판정 함수가 True 일 때 어느 쪽으로 좁혀야 할까요?"
        choices={[
          {
            text: '답을 기록해 두고 lo = mid + 1 로 더 큰 값을 시도한다',
            right: true,
            why: '«최대» 를 구하므로 되는 값을 찾았다면 더 큰 값도 되는지 확인해야 합니다. 되는 값을 만날 때마다 answer 에 기록해 두면 마지막에 남는 것이 가능한 최댓값입니다.',
          },
          {
            text: 'hi = mid - 1 로 더 작은 값을 시도한다',
            why: '«최소» 를 구하는 문제에서의 방향입니다. 최대를 구하는데 작은 쪽으로 가면 답이 필요 이상으로 작아집니다.',
          },
          {
            text: '즉시 mid 를 답으로 반환한다',
            why: '되는 값 중 하나일 뿐 최댓값이라는 보장이 없습니다.',
          },
          {
            text: '탐색을 처음부터 다시 시작한다',
            why: '이진 탐색의 장점을 버리는 방법입니다. 구간을 좁히는 것으로 충분합니다.',
          },
        ]}
      />
    </Lesson>
  );
}
