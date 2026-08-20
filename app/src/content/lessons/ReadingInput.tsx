import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Term from '../../components/Term';

export default function ReadingInput() {
  return (
    <Lesson
      part="0부 · 파이썬 첫걸음"
      title="입력받기"
      lede="코딩테스트는 «주어진 입력을 읽어 답을 출력하는» 일입니다. 그 첫 절반을 배웁니다."
      tags={['0-3', 'input', 'split']}
    >
      <Section no={1} title="input() 은 한 줄을 읽어 온다">
        <p>
          <Term>input()</Term>은 <strong>바깥에서 들어온 한 줄</strong>을 읽어 돌려줍니다.
          연습할 때는 내가 키보드로 치는 줄이고, 채점 서버에서는
          <strong>문제가 미리 준비해 둔 입력의 한 줄</strong>입니다. 코드는 똑같습니다.
        </p>

        <Code label="한 줄 읽기">{`
name = input()          # 바깥에서 한 줄을 읽어 name 에 붙인다
print('안녕,', name)

# 입력이  가나다   라면
# 출력은  안녕, 가나다
`}</Code>

        <Note tone="warn" title="코딩테스트에서는 «무엇을 입력하세요» 를 찍지 마세요">
          <p>
            <Term>input('이름: ')</Term>처럼 괄호 안에 안내 문구를 넣을 수 있지만,
            채점 서버는 <strong>출력이 정답과 한 글자라도 다르면 오답</strong>으로 봅니다.
            안내 문구도 출력이므로 그대로 틀립니다. 문제가 요구한 것만 출력하세요.
          </p>
        </Note>
      </Section>

      <Section no={2} title="읽어 온 것은 언제나 글자다">
        <p>
          이것이 <strong>처음 오는 사람이 가장 많이 걸려 넘어지는 자리</strong>입니다.
          <Term>3</Term>을 입력해도 <Term>input()</Term>이 돌려주는 것은 수 <Term>3</Term>이
          아니라 <strong>글자 <Term>'3'</Term></strong>입니다.
        </p>

        <Code label="그래서 이런 일이 생긴다">{`
# 입력으로 3 을 주었다고 하자
n = input()

print(n + 1)      # ❌ TypeError — 글자와 수는 더할 수 없다
print(n * 2)      # ❌ 33 이 나온다. 글자를 두 번 반복한 것이다

n = int(input())  # ✅ 읽자마자 수로 바꿔 둔다
print(n + 1)      # 4
`}</Code>

        <Note tone="success" title="읽는 즉시 바꾸세요">
          <p>
            <Term>int(input())</Term>는 «한 줄 읽어서 정수로»라는 뜻입니다.
            안쪽 괄호부터 실행된다고 읽으면 됩니다 — <Term>input()</Term>이 먼저 글자를
            가져오고, 그것을 <Term>int()</Term>가 수로 바꿉니다. 실수라면
            <Term>float(input())</Term>입니다.
          </p>
        </Note>
      </Section>

      <Section no={3} title="한 줄에 여러 개가 있을 때">
        <p>
          <Term>5 3</Term>처럼 한 줄에 두 수가 공백으로 놓여 오는 경우가 훨씬 많습니다.
          <Term>split()</Term>이 공백을 기준으로 <strong>여러 조각으로 잘라</strong> 줍니다.
        </p>

        <Code label="자르고, 바꾸고, 나눠 담기">{`
# 입력이  5 3  이라고 하자

parts = input().split()       # ['5', '3']  — 잘랐지만 아직 글자다
print(parts)

a = int(parts[0])             # 첫 번째 조각을 수로
b = int(parts[1])             # 두 번째 조각을 수로
print(a + b)                  # 8
`}</Code>

        <p>
          조각마다 <Term>int()</Term>를 손으로 씌우는 것은 번거롭습니다.
          <Term>map</Term>은 <strong>«모든 조각에 이 함수를 씌워라»</strong>라는 뜻입니다.
        </p>

        <Code label="map 으로 한 번에">{`
# 입력이  5 3  이라고 하자

a, b = map(int, input().split())    # 두 조각을 각각 int 로 바꿔 a 와 b 에 나눠 담는다
print(a + b)                        # 8

# 개수가 정해져 있지 않다면 리스트로 받는다
arr = list(map(int, input().split()))
print(arr)                          # 입력이  1 2 3  이면  [1, 2, 3]
`}</Code>

        <Note tone="info" title="a, b = ... 는 «나눠 담기» 입니다">
          <p>
            왼쪽에 이름을 쉼표로 늘어놓으면 오른쪽의 값들이 순서대로 하나씩 들어갑니다.
            <strong>개수가 맞지 않으면 오류</strong>입니다 — 두 개가 올 줄 알았는데
            세 개가 오면 그 자리에서 멈춥니다.
          </p>
        </Note>
      </Section>

      <Section no={4} title="여러 줄을 읽을 때">
        <p>
          «첫 줄에 개수 <Term>n</Term>, 다음 <Term>n</Term>줄에 데이터»는 가장 흔한
          입력 형식입니다. 다음 강에서 배울 반복문을 미리 한 번 보겠습니다.
        </p>

        <Code label="n 줄 읽기">{`
n = int(input())          # 몇 줄이 오는지 먼저 읽는다

numbers = []
for _ in range(n):        # 그 횟수만큼 되풀이한다 (0-5에서 배웁니다)
    numbers.append(int(input()))

print(sum(numbers))
`}</Code>

        <Note tone="success" title="여기까지가 0부의 input 입니다">
          <p>
            <strong>1부 1-1에서 이 <Term>input()</Term>을 더 빠른 것으로 바꿉니다.</strong>
            10만 줄을 읽는 문제에서는 <Term>input()</Term>이 알고리즘보다 오래 걸리기
            때문입니다. 다만 <strong>바꾸고 나서도 쓰는 법은 똑같습니다</strong> —
            지금 익힌 <Term>int(input())</Term>과 <Term>map(int, input().split())</Term>을
            그대로 쓰게 됩니다. 그러니 여기서 손에 익혀 두세요.
          </p>
        </Note>
      </Section>

      <Quiz
        question="입력으로 3 을 준 뒤 n = input(); print(n + 1) 을 실행하면?"
        choices={[
          {
            text: 'TypeError — input() 이 돌려준 것은 수가 아니라 글자 \'3\' 이다',
            right: true,
            why: "input() 은 무엇이 들어오든 언제나 글자(str)로 돌려줍니다. '3' + 1 은 글자와 수를 더하는 셈이라 오류입니다. n = int(input()) 처럼 읽는 즉시 수로 바꿔 두는 것이 습관이 되어야 합니다.",
          },
          {
            text: '4 — 파이썬이 알아서 수로 읽는다',
            why: 'input() 은 알아서 바꾸지 않습니다. 이름이나 문장이 들어올 수도 있으니 글자로 두는 것이 기본입니다.',
          },
          {
            text: "'31' 이 출력된다",
            why: "오른쪽이 글자 '1' 이었다면 이어 붙여 '31' 이 됩니다. 하지만 여기서는 수 1 이라 오류입니다.",
          },
          {
            text: '아무것도 출력되지 않는다',
            why: '오류가 난 자리에서 프로그램이 멈추며 메시지를 보여 줍니다. 조용히 넘어가지 않습니다.',
          },
        ]}
      />
    </Lesson>
  );
}
