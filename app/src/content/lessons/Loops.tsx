import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Recall from '../../components/Recall';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Term from '../../components/Term';

export default function Loops() {
  return (
    <Lesson
      part="1부 · 통과하는 문법"
      title="반복과 조건"
      lede="반복문은 쉽습니다. 어려운 것은 이중 루프를 한 번에 빠져나오는 일과, 도는 도중에 목록을 고치는 일입니다."
      tags={['1-6', 'enumerate', '이중 루프 탈출']}
    >
      <Recall from="p0-loop">
        <p>
          0-5에서 <Term>for</Term>와 <Term>range</Term>, <Term>while</Term>,
          <Term>break</Term>와 <Term>continue</Term>를 익혔습니다.
          <Term>range(5)</Term>가 <strong>0부터 4까지</strong>라는 것도요.
        </p>
        <p>
          여기서는 그 도구들이 <strong>실전에서 걸려 넘어지는 세 자리</strong>를 봅니다 —
          이중 루프를 한 번에 빠져나오기, 도는 중에 목록을 고치는 사고, 그리고
          컴프리헨션. 0-5의 <Term>range</Term>도 한 번 더 짚습니다 —
          <strong>자주 틀리는 것은 여러 번 볼 값이 있습니다.</strong>
        </p>
      </Recall>

      <Section no={1} title="range 를 정확히 읽기">
        <Code label="세 가지 모양">{`
for i in range(5):        # 0 1 2 3 4      — 끝은 포함하지 않는다
    pass
for i in range(2, 5):     # 2 3 4
    pass
for i in range(5, 0, -1): # 5 4 3 2 1      — 거꾸로
    pass

# 인덱스가 필요 없다면 이름을 _ 로 둔다
for _ in range(int(input())):
    pass
`}</Code>

        <p>
          값과 인덱스가 함께 필요하면 <Term>range(len(arr))</Term> 대신
          0-5에서 잠깐 본 <Term>enumerate</Term>를 쓰세요.
          인덱스를 잘못 세는 실수가 통째로 사라집니다.
        </p>

        <Code label="enumerate 와 zip">{`
arr = ['a', 'b', 'c']

for i, value in enumerate(arr):
    print(i, value)                # 0 a / 1 b / 2 c

for i, value in enumerate(arr, start=1):
    print(i, value)                # 1 a / 2 b / 3 c

# 두 목록을 나란히 — 짧은 쪽에서 멈춘다
names = ['가', '나']
scores = [90, 80, 70]
for name, score in zip(names, scores):
    print(name, score)             # 가 90 / 나 80
`}</Code>
      </Section>

      <Section no={2} title="이중 루프를 한 번에 빠져나오기">
        <p>
          <Term>break</Term>는 자기를 감싼 <strong>가장 안쪽 루프 하나만</strong> 끊습니다.
          2차원 탐색에서 답을 찾은 순간 전부 멈추고 싶다면 방법이 세 가지 있습니다.
        </p>

        <Code label="세 가지 탈출">{`
board = [[1, 2], [3, 4]]
target = 3

# 1) 깃발을 든다 — 가장 흔하지만 줄이 길다
found = False
for row in board:
    for x in row:
        if x == target:
            found = True
            break
    if found:
        break

# 2) 함수로 감싸고 return 한다 — 가장 깔끔하다
def find(board, target):
    for i, row in enumerate(board):
        for j, x in enumerate(row):
            if x == target:
                return i, j
    return None

# 3) for-else — 루프가 break 없이 끝났을 때만 else 가 돈다
for row in board:
    for x in row:
        if x == target:
            break
    else:
        continue      # 안쪽이 그냥 끝났으면 다음 줄로
    break             # 안쪽이 break 로 끝났으면 여기까지
`}</Code>

        <Note tone="success" title="2번을 쓰세요">
          <p>
            탈출이 필요한 이중 루프는 <strong>함수로 떼어 내고 <Term>return</Term></strong>하는
            것이 가장 짧고 가장 덜 틀립니다. 깃발 변수는 하나 늘어날 때마다 잊어버릴
            자리가 하나 늘어납니다.
          </p>
        </Note>
      </Section>

      <Section no={3} title="도는 도중에 고치지 않는다">
        <p>
          반복 중인 리스트에서 원소를 지우면 인덱스가 밀려 <strong>한 칸씩 건너뜁니다.</strong>
          오류도 나지 않아서 더 위험합니다.
        </p>

        <Code label="건너뛰는 삭제">{`
arr = [1, 2, 2, 3]

# ❌ 2가 하나 살아남는다
for x in arr:
    if x == 2:
        arr.remove(x)
print(arr)              # [1, 2, 3]

# ✅ 새 리스트를 만든다
arr = [1, 2, 2, 3]
arr = [x for x in arr if x != 2]
print(arr)              # [1, 3]
`}</Code>
      </Section>

      <Section no={4} title="컴프리헨션과 삼항식">
        <p>
          컴프리헨션은 «리스트를 만드는 for 문»입니다. 짧아서가 아니라
          <strong>만드는 일과 도는 일이 섞이지 않아서</strong> 읽기 쉽습니다.
        </p>

        <Code label="자주 쓰는 모양">{`
# 값 바꾸기
squares = [x * x for x in range(5)]              # [0, 1, 4, 9, 16]

# 거르기
evens = [x for x in range(10) if x % 2 == 0]

# 값도 바꾸고 거르기도 — if 는 뒤, if-else 는 앞
labels = ['짝' if x % 2 == 0 else '홀' for x in range(4)]

# 2차원 만들기
board = [[0] * 3 for _ in range(2)]

# 평평하게 펴기 — for 의 순서는 바깥부터 쓴다
flat = [x for row in board for x in row]

# 집합·딕셔너리도 같은 문법
uniq = {x % 3 for x in range(10)}
squared = {x: x * x for x in range(4)}
`}</Code>

        <Note tone="warn" title="한 줄에 두 겹까지만">
          <p>
            조건이 붙은 삼중 컴프리헨션은 다음 날의 자신이 읽지 못합니다. 두 겹을 넘으면
            평범한 <Term>for</Term> 문으로 푸는 편이 «아름답게 완성»에 가깝습니다.
          </p>
        </Note>
      </Section>

      <Quiz
        question="2차원 배열을 훑다가 답을 찾으면 즉시 전부 멈춰야 합니다. 가장 안전한 방법은?"
        choices={[
          {
            text: '탐색을 함수로 떼어 내고 찾는 즉시 return 한다',
            right: true,
            why: 'return 은 몇 겹이든 한 번에 빠져나옵니다. 깃발 변수도, for-else 의 continue/break 짝도 필요 없어 잊어버릴 자리가 없습니다.',
          },
          {
            text: '안쪽 루프에서 break 를 두 번 쓴다',
            why: 'break 는 자기를 감싼 가장 안쪽 루프 하나만 끊습니다. 두 번 써도 두 겹을 빠져나오지 못합니다.',
          },
          {
            text: 'exit() 로 프로그램을 끝낸다',
            why: '뒤에 출력할 것이 남아 있으면 그대로 잘립니다. 여러 테스트 케이스를 도는 문제에서는 첫 케이스에서 끝나 버립니다.',
          },
          {
            text: '루프 변수를 범위 끝값으로 바꿔 반복을 끝낸다',
            why: 'range 로 도는 for 문에서 루프 변수를 바꿔도 다음 회차에 다시 덮어써집니다. 파이썬에서는 통하지 않는 방법입니다.',
          },
        ]}
      />
    </Lesson>
  );
}
