import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Term from '../../components/Term';

export default function Sorting() {
  return (
    <Lesson
      part="3부 · 알고리즘"
      title="정렬"
      lede="시험장에서 정렬 알고리즘을 직접 짤 일은 거의 없습니다. 대신 «무엇을 기준으로 세울 것인가»가 그대로 답이 됩니다."
      tags={['3-4', 'Timsort', '안정 정렬']}
    >
      <Section no={1} title="파이썬 정렬을 믿는다">
        <p>
          <Term>sorted</Term>와 <Term>list.sort</Term>는 Timsort로 구현되어 있습니다.
          최악에도 O(N log N)이고, 이미 어느 정도 정렬된 데이터에서는 훨씬 빠릅니다.
          <strong>퀵 정렬을 직접 구현할 이유는 없습니다</strong> — 오히려 최악의 경우
          O(N²)에 빠질 위험만 늘어납니다.
        </p>

        <Code label="정렬 알고리즘의 값 (외우지 말고 감만)">{`
# 선택·삽입·버블: O(N^2)   — 개념 이해용
# 병합·힙:        O(N log N) — 최악에도 보장
# 퀵:             평균 O(N log N), 최악 O(N^2)
# 계수 정렬:      O(N + K)   — 값의 범위 K 가 작을 때만
`}</Code>

        <Note tone="success" title="값의 범위가 좁으면 계수 정렬">
          <p>
            «0 이상 10000 이하의 수가 1000만 개»처럼 <strong>값의 종류는 적고 개수는 많은</strong>
            입력이라면 크기 K짜리 개수 배열을 만들어 세는 편이 훨씬 빠릅니다.
            <Term>collections.Counter</Term>나 리스트 하나면 됩니다.
          </p>
        </Note>

        <Code label="계수 정렬">{`
def counting_sort(arr, max_value):
    counts = [0] * (max_value + 1)
    for x in arr:
        counts[x] += 1

    result = []
    for value, c in enumerate(counts):
        result.extend([value] * c)
    return result
`}</Code>
      </Section>

      <Section no={2} title="기준을 세우는 법">
        <p>1-7에서 본 <Term>key</Term>가 여기서 그대로 답이 됩니다.</p>

        <Code label="자주 나오는 기준들">{`
data = [('가', 3, 90), ('나', 1, 90), ('다', 2, 80)]

# 점수 내림차순, 같으면 번호 오름차순
data.sort(key=lambda x: (-x[2], x[1]))

# 문자열 길이 오름차순, 같으면 사전순
words = ['bb', 'a', 'cc', 'b']
words.sort(key=lambda w: (len(w), w))

# 절댓값 기준
nums = [-3, 1, -1, 2]
nums.sort(key=abs)

# 딕셔너리를 값 기준으로
d = {'a': 3, 'b': 1}
print(sorted(d.items(), key=lambda kv: kv[1]))
`}</Code>

        <Note tone="warn" title="문자열은 마이너스를 붙일 수 없습니다">
          <p>
            숫자는 내림차순을 <Term>-x</Term>로 만들 수 있지만 문자열은 안 됩니다.
            «점수 내림차순, 이름 오름차순»처럼 방향이 섞이면
            <strong>이름으로 먼저 정렬하고 점수로 다시 정렬</strong>하세요.
            파이썬 정렬은 안정 정렬이라 앞의 순서가 유지됩니다.
          </p>
        </Note>

        <Code label="안정 정렬을 이용한 두 번 정렬">{`
data = [('나', 90), ('가', 90), ('다', 80)]

data.sort(key=lambda x: x[0])        # 덜 중요한 기준을 먼저
data.sort(key=lambda x: -x[1])       # 중요한 기준을 나중에
print(data)                          # [('가', 90), ('나', 90), ('다', 80)]
`}</Code>
      </Section>

      <Section no={3} title="정렬은 전처리다">
        <p>
          정렬 자체를 묻는 문제보다, <strong>정렬해 두면 쉬워지는 문제</strong>가 훨씬 많습니다.
          두 수의 합, 구간 겹침, 회의실 배정, 좌표 압축 — 전부 «먼저 정렬»로 시작합니다.
        </p>

        <Code label="정렬이 열어 주는 두 가지 기술">{`
# 1) 투 포인터 — 정렬된 배열에서 합이 target 인 쌍 찾기  O(N)
def two_sum(arr, target):
    arr.sort()
    lo, hi = 0, len(arr) - 1
    while lo < hi:
        s = arr[lo] + arr[hi]
        if s == target:
            return arr[lo], arr[hi]
        if s < target:
            lo += 1        # 더 큰 값이 필요하다
        else:
            hi -= 1        # 더 작은 값이 필요하다
    return None

# 2) 좌표 압축 — 큰 값들을 «몇 번째로 작은가» 로 바꾼다
from bisect import bisect_left

arr = [1000000, 5, 300, 5]
ranks = sorted(set(arr))
print([bisect_left(ranks, x) for x in arr])    # [2, 0, 1, 0]
`}</Code>
      </Section>

      <Quiz
        question="10만 명의 학생을 «점수 내림차순, 점수가 같으면 이름 오름차순» 으로 정렬합니다. 가장 안전한 방법은?"
        choices={[
          {
            text: '이름으로 먼저 정렬한 뒤 점수 내림차순으로 다시 정렬한다',
            right: true,
            why: '파이썬 정렬은 안정 정렬이라 나중 정렬이 앞의 순서를 흐트러뜨리지 않습니다. key=lambda x: (-점수, 이름) 도 같은 결과를 내지만, 문자열에 마이너스를 붙일 수 없는 상황에서는 이 두 줄이 확실합니다.',
          },
          {
            text: 'key=(점수, 이름) 에 reverse=True 를 준다',
            why: 'reverse 는 모든 기준을 뒤집습니다. 이름까지 역순이 되어 조건이 깨집니다.',
          },
          {
            text: '점수로 먼저 정렬하고 이름으로 다시 정렬한다',
            why: '순서가 반대입니다. 나중에 한 이름 정렬이 이겨서 점수 순서가 무너집니다.',
          },
          {
            text: '직접 퀵 정렬을 구현해 비교 조건을 넣는다',
            why: '최악의 경우 O(N²) 이 되고 코드도 길어집니다. 내장 정렬이 더 빠르고 더 안전합니다.',
          },
        ]}
      />
    </Lesson>
  );
}
