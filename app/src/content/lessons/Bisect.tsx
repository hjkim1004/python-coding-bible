import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Recall from '../../components/Recall';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Term from '../../components/Term';

export default function Bisect() {
  return (
    <Lesson
      part="2부 · 여섯 개의 표준 도구"
      title="bisect"
      lede="정렬된 배열에서 «몇 개인가»를 묻는 질문. 직접 이진 탐색을 짜면 경계에서 틀리고, bisect 는 두 줄이면 끝납니다."
      tags={['2-4', '이진 탐색', 'O(log N)']}
    >
      <Recall from="p1-list">
        <p>
          1-3의 표에서 <Term>x in arr</Term>과 <Term>arr.count(x)</Term>가
          <strong>둘 다 O(N)</strong>이었습니다. 전부 훑어야 하기 때문입니다.
        </p>
        <p>
          그런데 <strong>배열이 정렬되어 있다면</strong> 이야기가 달라집니다.
          매번 절반을 버릴 수 있으므로 <Term>O(log N)</Term>이 됩니다.
          여기서는 그 «절반 버리기»를 직접 짜지 않고 쓰는 법을 봅니다.
        </p>
      </Recall>

      <Section no={1} title="두 함수의 차이">
        <p>
          둘 다 «정렬을 유지하면서 <Term>x</Term>를 넣을 자리»를 돌려줍니다. 차이는
          <strong>같은 값이 이미 있을 때 그 앞이냐 뒤냐</strong>뿐입니다.
        </p>

        <Code label="left 와 right">{`
from bisect import bisect_left, bisect_right

a = [1, 2, 2, 2, 3]

print(bisect_left(a, 2))    # 1  ← 2들이 시작되는 자리
print(bisect_right(a, 2))   # 4  ← 2들이 끝난 다음 자리

print(bisect_left(a, 0))    # 0  없는 값도 «들어갈 자리» 를 준다
print(bisect_right(a, 9))   # 5
`}</Code>

        <Note tone="success" title="이 그림 하나만 기억하세요">
          <p>
            <Term>bisect_left</Term>는 <strong>같은 값 무리의 왼쪽 끝</strong>,
            <Term>bisect_right</Term>는 <strong>오른쪽 끝 다음</strong>을 가리킵니다.
            그래서 둘을 빼면 그 값의 개수가 됩니다.
          </p>
        </Note>
      </Section>

      <Section no={2} title="개수 세기 — 이 두 줄이 전부">
        <Code label="값의 개수와 범위의 개수">{`
from bisect import bisect_left, bisect_right

a = [1, 2, 2, 2, 3, 5, 8]

# x 가 몇 개인가
def count_of(a, x):
    return bisect_right(a, x) - bisect_left(a, x)

print(count_of(a, 2))       # 3

# lo 이상 hi 이하가 몇 개인가
def count_between(a, lo, hi):
    return bisect_right(a, hi) - bisect_left(a, lo)

print(count_between(a, 2, 5))   # 5  (2,2,2,3,5)
`}</Code>

        <p>
          질의가 10만 번 들어와도 배열을 <strong>한 번만 정렬</strong>해 두면 각 질의는
          O(log N)입니다. 매번 <Term>arr.count(x)</Term>로 세면 질의마다 O(N)이라
          그대로 시간 초과입니다.
        </p>
      </Section>

      <Section no={3} title="정렬을 유지하며 넣기">
        <Code label="insort">{`
from bisect import insort

a = [1, 3, 5]
insort(a, 4)
print(a)        # [1, 3, 4, 5]
`}</Code>

        <Note tone="warn" title="찾기는 O(log N), 넣기는 O(N)">
          <p>
            자리를 찾는 것은 이진 탐색이라 빠르지만, 리스트 중간에 실제로 밀어 넣는 일은
            여전히 원소를 옮깁니다. <strong>삽입이 잦다면 <Term>insort</Term>는 답이 아닙니다</strong> —
            전부 모아 한 번 정렬하거나, 힙을 쓰는 편이 낫습니다.
          </p>
        </Note>
      </Section>

      <Section no={4} title="«처음으로 조건을 만족하는 곳» 찾기">
        <p>
          bisect의 진짜 쓰임은 배열이 아니라 <strong>답의 범위</strong>에도 있습니다.
          정답이 «작으면 안 되고 크면 되는» 성질을 가질 때, 그 경계를 이진 탐색으로
          찾는 것이 파라메트릭 서치입니다. 3부에서 이어집니다.
        </p>

        <Code label="직접 쓰는 이진 탐색 — 경계를 흐리지 않는 꼴">{`
def lower_bound(arr, target):
    lo, hi = 0, len(arr)          # hi 는 «끝 다음» 으로 잡는다
    while lo < hi:                # 구간이 비면 멈춘다
        mid = (lo + hi) // 2
        if arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo                     # target 이 들어갈 가장 왼쪽 자리

print(lower_bound([1, 2, 2, 3], 2))   # 1  ← bisect_left 와 같다
`}</Code>
      </Section>

      <Quiz
        question="정렬된 배열에서 «값이 3 이상 7 이하인 원소의 개수»를 O(log N) 으로 구하려면?"
        choices={[
          {
            text: 'bisect_right(a, 7) - bisect_left(a, 3)',
            right: true,
            why: 'bisect_left(a,3) 은 3들이 시작되는 자리, bisect_right(a,7) 은 7들이 끝난 다음 자리입니다. 두 위치의 차이가 곧 [3, 7] 구간의 개수입니다.',
          },
          {
            text: 'bisect_left(a, 7) - bisect_right(a, 3)',
            why: '경계가 뒤집혀 양 끝의 3과 7이 빠집니다. 3이 여러 개일 때 특히 크게 어긋납니다.',
          },
          {
            text: 'sum(1 for x in a if 3 <= x <= 7)',
            why: '답은 맞지만 O(N) 입니다. 질의가 10만 번 들어오면 전체가 O(NQ) 가 되어 시간 초과입니다.',
          },
          {
            text: 'a.count(3) + a.count(7)',
            why: '3과 7만 세고 그 사이 값은 빠집니다. count 자체도 O(N) 입니다.',
          },
        ]}
      />
    </Lesson>
  );
}
