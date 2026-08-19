import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Term from '../../components/Term';

export default function DictSet() {
  return (
    <Lesson
      part="1부 · 통과하는 문법"
      title="딕셔너리와 집합"
      lede="«이미 나온 값인가»를 묻는 순간 리스트를 버리세요. 같은 질문에 리스트는 N번, 집합은 한 번에 답합니다."
      tags={['1-5', '해시 O(1)', '중복 제거']}
    >
      <Section no={1} title="집합이 사는 것">
        <p>
          집합과 딕셔너리는 해시로 자리를 계산합니다. 값이 몇 개든
          <strong> 넣기·빼기·찾기가 평균 O(1)</strong>입니다. 리스트의 <Term>in</Term>이 O(N)인
          것과 비교하면, 10만 개짜리 데이터에서 10만 번 묻는 코드는
          100억 번과 10만 번으로 갈립니다.
        </p>

        <Code label="같은 일, 다른 시간">{`
data = list(range(100_000))

# ❌ 100_000 x 100_000
seen_list = []
for x in data:
    if x not in seen_list:      # 매번 전체를 훑는다
        seen_list.append(x)

# ✅ 100_000
seen = set()
for x in data:
    if x not in seen:           # 한 번에 안다
        seen.add(x)
`}</Code>

        <Note tone="warn" title="집합에는 순서가 없습니다">
          <p>
            집합은 «있다/없다»만 답합니다. 넣은 순서도, 크기 순서도 보장하지 않습니다.
            정렬된 결과가 필요하면 <Term>sorted(s)</Term>로 꺼내야 하고, 그 순간
            O(N log N)을 다시 냅니다. 순서가 필요하면 처음부터 리스트를 함께 쓰세요.
          </p>
        </Note>
      </Section>

      <Section no={2} title="집합 연산으로 한 줄에 끝내기">
        <Code label="교집합·차집합">{`
a = {1, 2, 3, 4}
b = {3, 4, 5}
arr = [3, 1, 3, 2]

print(a & b)    # {3, 4}        교집합
print(a | b)    # {1,2,3,4,5}   합집합
print(a - b)    # {1, 2}        차집합
print(a ^ b)    # {1, 2, 5}     한쪽에만 있는 것

print(len(set(arr)))            # 중복을 뺀 개수
print(sorted(set(arr)))         # 중복 제거 + 정렬 (좌표 압축의 첫 줄)

# 빈 집합은 {} 가 아니라 set() 이다 — {} 는 빈 딕셔너리
empty = set()
`}</Code>

        <p>
          «여벌을 가져왔는데 본인도 잃어버린 학생»처럼 <strong>두 목록의 겹침을 걷어내는</strong>
          전처리는 <Term>set(a) - set(b)</Term> 한 줄이면 끝납니다. 4부의 기출 해설에서
          이 한 줄이 정답과 오답을 가릅니다.
        </p>
      </Section>

      <Section no={3} title="딕셔너리로 세고 묶기">
        <Code label="세는 세 가지 방법">{`
words = ['a', 'b', 'a', 'c', 'a']

# 1) get 으로 기본값을 주며 센다
count = {}
for w in words:
    count[w] = count.get(w, 0) + 1

# 2) defaultdict — 없는 키를 물으면 0부터 시작한다
from collections import defaultdict
count = defaultdict(int)
for w in words:
    count[w] += 1

# 3) Counter — 세는 일만 한다면 가장 짧다
from collections import Counter
count = Counter(words)
print(count)                 # Counter({'a': 3, 'b': 1, 'c': 1})
print(count.most_common(1))  # [('a', 3)]
`}</Code>

        <Note tone="danger" title="없는 키를 [] 로 읽으면 KeyError 입니다">
          <p>
            <Term>count['z']</Term>는 키가 없으면 즉시 멈춥니다. 기본값이 필요하면
            <Term>count.get('z', 0)</Term>을, 자동으로 만들어지길 원하면
            <Term>defaultdict</Term>를 쓰세요. 다만 <Term>defaultdict</Term>는
            <strong>읽기만 해도 키가 생깁니다</strong> — 나중에 <Term>len(d)</Term>을 셀 때
            생각보다 커져 있는 이유가 대개 이것입니다.
          </p>
        </Note>

        <Code label="딕셔너리를 도는 법">{`
d = {'a': 1, 'b': 2}

for key in d:                 # 키만
    pass
for key, value in d.items():  # 키와 값 — 가장 많이 쓴다
    pass
for value in d.values():
    pass

print('a' in d)               # 키가 있는지 — O(1)

# 값 기준으로 정렬해 꺼내기
for key, value in sorted(d.items(), key=lambda kv: -kv[1]):
    print(key, value)
`}</Code>
      </Section>

      <Section no={4} title="키가 될 수 있는 것">
        <p>
          해시로 자리를 계산하므로, 키는 <strong>변하지 않는 값</strong>이어야 합니다.
          리스트는 키가 될 수 없고 튜플은 됩니다. 좌표를 키로 쓸 때
          <Term>(x, y)</Term> 튜플을 쓰는 이유가 이것입니다.
        </p>

        <Code label="좌표를 키로">{`
visited = set()
visited.add((3, 4))           # 튜플은 된다
print((3, 4) in visited)      # True

# visited.add([3, 4])         # TypeError: unhashable type: 'list'

# 2차원 배열이 크지 않다면 집합보다 2차원 리스트가 더 빠르다
n, m = 5, 5
grid_visited = [[False] * m for _ in range(n)]
`}</Code>
      </Section>

      <Quiz
        question="10만 개의 정수에서 «지금까지 나온 적 있는 값인지»를 매번 확인해야 합니다. 무엇을 써야 할까요?"
        choices={[
          {
            text: 'set — 평균 O(1) 로 답한다',
            right: true,
            why: '집합은 해시로 자리를 계산하므로 크기와 무관하게 평균 O(1) 입니다. 리스트의 in 은 O(N) 이라 전체가 O(N²) 이 되어 10만 개에서는 통과할 수 없습니다.',
          },
          {
            text: 'list — in 연산자로 확인하면 된다',
            why: 'in 이 한 줄이라 싸 보이지만 안에서 전체를 훑습니다. 반복문 안에 들어가는 순간 O(N²) 입니다.',
          },
          {
            text: '정렬한 뒤 이진 탐색한다',
            why: '값이 계속 늘어나는 상황에서는 매번 정렬을 유지해야 해서 삽입이 O(N) 입니다. 넣기와 찾기가 모두 필요하면 집합이 맞습니다.',
          },
          {
            text: '문자열로 이어 붙여 find 로 찾는다',
            why: '부분 문자열 검색은 자릿수가 다른 수끼리 잘못 걸리고, 문자열 이어 붙이기 자체가 O(N²) 입니다.',
          },
        ]}
      />
    </Lesson>
  );
}
