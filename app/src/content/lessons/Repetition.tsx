import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Term from '../../components/Term';

export default function Repetition() {
  return (
    <Lesson
      part="0부 · 파이썬 첫걸음"
      title="반복"
      lede="같은 일을 여러 번. 컴퓨터가 사람보다 잘하는 거의 유일한 일이고, 코딩테스트의 대부분입니다."
      tags={['0-5', 'for', 'while']}
    >
      <Section no={1} title="정해진 횟수만큼 — for">
        <Code label="range 로 세면서 돌기">{`
for i in range(3):
    print(i)
# => 0
# => 1
# => 2
`}</Code>

        <p>
          <Term>range(3)</Term>은 <strong>0, 1, 2</strong>입니다.
          <strong>3은 포함하지 않습니다</strong> — 이 «끝을 포함하지 않는다»는 규칙은
          파이썬 곳곳에서 되풀이되니 여기서 익혀 두세요.
        </p>

        <Code label="range 의 세 가지 모양">{`
print(list(range(5)))          # => [0, 1, 2, 3, 4]
print(list(range(2, 5)))       # => [2, 3, 4]        2부터 5 직전까지
print(list(range(5, 0, -1)))   # => [5, 4, 3, 2, 1]  거꾸로
`}</Code>

        <Note tone="info" title="i 를 안 쓸 거라면 _ 로 두세요">
          <p>
            «세 번 반복»만 필요하고 지금이 몇 번째인지는 필요 없을 때
            <Term>for _ in range(3):</Term>이라고 씁니다. 밑줄은
            <strong>«이 값은 쓰지 않는다»</strong>는 신호로 통합니다.
          </p>
        </Note>
      </Section>

      <Section no={2} title="담긴 것을 하나씩 — for">
        <p>
          <Term>for</Term>는 사실 «세는» 것이 아니라
          <strong>«늘어놓인 것을 앞에서부터 하나씩 꺼내는»</strong> 일입니다.
        </p>

        <Code label="꺼내며 돌기">{`
for fruit in ['사과', '배', '감']:
    print(fruit)
# => 사과
# => 배
# => 감

for ch in '가나':
    print(ch)
# => 가
# => 나

# 몇 번째인지도 함께 필요하면 enumerate
for i, fruit in enumerate(['사과', '배']):
    print(i, fruit)
# => 0 사과
# => 1 배
`}</Code>
      </Section>

      <Section no={3} title="조건이 참인 동안 — while">
        <p>
          몇 번 돌지 <strong>미리 알 수 없을 때</strong> 씁니다.
          조건이 거짓이 되는 순간 멈춥니다.
        </p>

        <Code label="while">{`
n = 10
count = 0

while n > 1:          # n이 1보다 큰 동안 되풀이한다
    n = n // 2        # 반으로 줄인다
    count += 1

print(count)          # => 3   (10 → 5 → 2 → 1)
`}</Code>

        <Note tone="danger" title="줄어들지 않으면 영원히 돕니다">
          <p>
            <Term>while</Term>을 쓸 때는 <strong>«무엇이 조건을 거짓으로 만드는가»</strong>를
            먼저 정하세요. 위 코드에서 <Term>n = n // 2</Term>를 빠뜨리면 프로그램이
            멈추지 않습니다. 채점 서버에서는 그것이 시간 초과로 나타납니다.
          </p>
        </Note>
      </Section>

      <Section no={4} title="중간에 그만두거나 건너뛰기">
        <Code label="break 와 continue">{`
# break — 반복을 즉시 끝낸다
for i in range(10):
    if i == 3:
        break
    print(i)
# => 0
# => 1
# => 2

# continue — 이번 회차만 건너뛰고 다음으로 간다
for i in range(5):
    if i % 2 == 1:
        continue
    print(i)
# => 0
# => 2
# => 4
`}</Code>

        <Note tone="warn" title="break 는 자기를 감싼 하나만 끊습니다">
          <p>
            반복문 안에 반복문이 있을 때 안쪽의 <Term>break</Term>는
            <strong>안쪽만</strong> 끊습니다. 두 겹을 한 번에 빠져나오는 방법은
            1-6에서 다룹니다.
          </p>
        </Note>
      </Section>

      <Quiz
        question="range(2, 5) 는 무엇을 만들까요?"
        choices={[
          {
            text: '2, 3, 4 — 시작은 포함하고 끝은 포함하지 않는다',
            right: true,
            why: '파이썬의 범위는 «시작 이상, 끝 미만» 입니다. 슬라이싱도 같은 규칙을 따르므로 여기서 익혀 두면 뒤가 편합니다. 개수가 끝 - 시작 으로 딱 떨어진다는 것도 이 규칙의 장점입니다.',
          },
          {
            text: '2, 3, 4, 5 — 양쪽 다 포함한다',
            why: '5를 포함하려면 range(2, 6) 이라고 써야 합니다.',
          },
          {
            text: '3, 4, 5 — 시작을 포함하지 않는다',
            why: '반대입니다. 시작은 포함하고 끝을 포함하지 않습니다.',
          },
          {
            text: '2 부터 5 까지 0.5 씩',
            why: 'range 는 정수만 다룹니다. 세 번째 인자는 간격이며 역시 정수입니다.',
          },
        ]}
      />
    </Lesson>
  );
}
