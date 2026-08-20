import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Table from '../../components/Table';
import Term from '../../components/Term';

export default function Conditions() {
  return (
    <Lesson
      part="0부 · 파이썬 첫걸음"
      title="조건"
      lede="«이럴 때는 이렇게». 프로그램이 갈림길에서 길을 고르는 법입니다."
      tags={['0-4', 'if', '비교']}
    >
      <Section no={1} title="if · elif · else">
        <Code label="갈림길">{`
score = 85

if score >= 90:
    print('A')
elif score >= 80:      # 위가 아니면서 이 조건이면
    print('B')         # => B
else:                  # 위 어느 것도 아니면
    print('C')
`}</Code>

        <p>
          위에서부터 차례로 보다가 <strong>처음 맞는 하나만</strong> 실행하고 끝냅니다.
          <Term>elif</Term>와 <Term>else</Term>는 없어도 되고, <Term>elif</Term>는
          여러 개여도 됩니다. 조건 끝의 <strong>콜론(<Term>:</Term>)과 다음 줄의
          들여쓰기</strong>가 짝이라는 것을 잊지 마세요.
        </p>
      </Section>

      <Section no={2} title="비교하는 말">
        <Table
          head={['쓰는 법', '뜻']}
          rows={[
            ['a == b', '같다 — 등호 두 개'],
            ['a != b', '다르다'],
            ['a > b · a >= b', '크다 · 크거나 같다'],
            ['a < b · a <= b', '작다 · 작거나 같다'],
            ['a in b', 'b 안에 a 가 있다'],
          ]}
        />

        <Note tone="danger" title="= 과 == 는 완전히 다릅니다">
          <p>
            <Term>=</Term>는 «이름을 붙여라»이고 <Term>==</Term>는 «같으냐»입니다.
            <Term>if score = 90:</Term>이라고 쓰면 파이썬은 <Term>SyntaxError</Term>로
            멈춥니다 — 다행히 <strong>조용히 틀리는 대신 바로 알려 주는</strong> 쪽입니다.
          </p>
        </Note>

        <Code label="파이썬만의 편한 것">{`
age = 15

# 범위는 이어서 쓸 수 있다 — 수학 그대로다
if 10 <= age < 20:
    print('십대')          # => 십대

# and 는 «둘 다», or 는 «둘 중 하나», not 은 «반대»
if age >= 10 and age < 20:
    print('같은 뜻')        # => 같은 뜻

# in 으로 «들어 있나» 를 묻는다
if '가' in '가나다':
    print('있다')          # => 있다
`}</Code>
      </Section>

      <Section no={3} title="비어 있으면 거짓이다">
        <p>
          파이썬은 <Term>0</Term>, 빈 글자 <Term>''</Term>, 빈 리스트 <Term>[]</Term>를
          <strong>거짓</strong>으로 봅니다. 값이 있으면 참입니다. 덕분에
          «비어 있나»를 짧게 물을 수 있습니다.
        </p>

        <Code label="짧게 묻기">{`
items = []

if not items:
    print('비었다')        # => 비었다

if len(items) == 0:       # 같은 뜻이지만 위가 더 파이썬답다
    print('비었다')        # => 비었다
`}</Code>

        <Note tone="warn" title="다만 «0이 값인 경우» 를 조심하세요">
          <p>
            점수가 0점인 것과 점수가 아예 없는 것은 다릅니다.
            <Term>if score:</Term>는 0점을 «없음»으로 취급해 버립니다.
            0이 의미 있는 값일 때는 <Term>if score is not None:</Term>처럼
            <strong>무엇을 묻는지 정확히</strong> 쓰세요.
          </p>
        </Note>
      </Section>

      <Section no={4} title="한 줄로 고르기">
        <p>
          «조건에 따라 값 하나를 고른다»는 한 줄로 쓸 수 있습니다.
          <strong>값을 고르는 자리</strong>에만 쓰고, 일을 시키는 자리에는 쓰지 마세요.
        </p>

        <Code label="삼항식">{`
n = 7

label = '짝수' if n % 2 == 0 else '홀수'
print(label)              # => 홀수

# 큰 쪽 고르기 — 이럴 땐 max 가 더 낫다
bigger = 3 if 3 > 5 else 5
print(bigger, max(3, 5))  # => 5 5
`}</Code>
      </Section>

      <Quiz
        question="if score = 90: 이라고 썼습니다. 어떻게 될까요?"
        choices={[
          {
            text: 'SyntaxError — 조건 자리에는 «같으냐»를 묻는 == 를 써야 한다',
            right: true,
            why: '= 는 이름을 붙이는 일이고 == 는 같은지 묻는 일입니다. 조건 자리에 대입을 쓰면 파이썬은 문법 오류로 멈춥니다. C 같은 언어에서는 이것이 오류가 아니라 조용히 통과해 버리는 유명한 함정인데, 파이썬은 막아 줍니다.',
          },
          {
            text: 'score 에 90 이 들어가고 조건은 항상 참이 된다',
            why: 'C 나 자바에서는 그렇게 동작해 버그가 됩니다. 파이썬은 아예 문법으로 막았습니다.',
          },
          {
            text: '경고만 뜨고 실행된다',
            why: '실행되지 않습니다. 프로그램이 시작조차 하지 못합니다.',
          },
          {
            text: 'score 가 90 과 같은지 묻는다',
            why: '그것을 묻고 싶다면 == 를 써야 합니다.',
          },
        ]}
      />
    </Lesson>
  );
}
