import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Table from '../../components/Table';
import Term from '../../components/Term';

export default function Variables() {
  return (
    <Lesson
      part="0부 · 파이썬 첫걸음"
      title="변수와 자료형"
      lede="값에 이름을 붙여 두는 일. 그리고 «3»과 «'3'»이 왜 다른지 — 여기서 어긋나면 뒤가 전부 어긋납니다."
      tags={['0-2', '변수', '형 변환']}
    >
      <Section no={1} title="이름을 붙인다">
        <p>
          <Term>=</Term>는 «같다»가 아니라 <strong>«이 값에 이 이름을 붙여라»</strong>입니다.
          한 번 붙인 이름은 나중에 다른 값으로 옮겨 붙일 수 있습니다.
        </p>

        <Code label="변수">{`
score = 90
name = '가나다'

print(name, score)      # => 가나다 90

score = score + 5       # 오른쪽을 먼저 계산해 다시 score 에 붙인다
print(score)            # => 95

score += 5              # 위와 같은 뜻, 더 짧게
print(score)            # => 100
`}</Code>

        <Note tone="info" title="이름 짓기">
          <p>
            영문자·숫자·밑줄을 쓰되 숫자로 시작할 수 없습니다. 파이썬에서는
            <Term>snake_case</Term>(소문자와 밑줄)가 관례입니다. 그리고
            <strong>한 글자 이름은 뜻이 분명할 때만</strong> 쓰세요 —
            <Term>i</Term>는 인덱스, <Term>n</Term>은 개수처럼요.
          </p>
        </Note>
      </Section>

      <Section no={2} title="네 가지 자료형">
        <Table
          head={['이름', '무엇', '예']}
          rows={[
            ['int', '정수', '0, 7, -42'],
            ['float', '실수', '3.14, -0.5'],
            ['str', '글자(문자열)', "'가나다', '7'"],
            ['bool', '참과 거짓', 'True, False'],
          ]}
        />

        <Code label="무엇인지 물어보기">{`
print(type(7))          # => <class 'int'>
print(type(7.0))        # => <class 'float'>
print(type('7'))        # => <class 'str'>
print(type(True))       # => <class 'bool'>
`}</Code>

        <Note tone="danger" title="7 과 '7' 은 다릅니다">
          <p>
            <Term>7</Term>은 계산할 수 있는 수이고 <Term>'7'</Term>은 글자입니다.
            <Term>7 + 1</Term>은 8이지만 <Term>'7' + '1'</Term>은 <Term>'71'</Term>입니다 —
            <strong>글자끼리의 <Term>+</Term>는 이어 붙이기</strong>이기 때문입니다.
            그리고 <Term>'7' + 1</Term>은 아예 오류입니다.
          </p>
        </Note>
      </Section>

      <Section no={3} title="형을 바꾼다">
        <p>
          이것이 0부에서 <strong>가장 자주 쓰게 될 것</strong>입니다. 다음 강에서
          입력을 받으면 그것이 언제나 글자로 오기 때문입니다.
        </p>

        <Code label="형 변환">{`
print(int('7') + 1)     # => 8      글자를 수로
print(str(7) + '1')     # => 71     수를 글자로
print(float('3.5'))     # => 3.5
print(int(3.9))         # => 3      실수를 정수로 — 반올림이 아니라 버림이다

print('7' * 3)          # => 777    글자 곱하기는 반복이다
print(7 * 3)            # => 21
`}</Code>
      </Section>

      <Section no={4} title="글자 안에 값 끼워 넣기">
        <p>
          따옴표 앞에 <Term>f</Term>를 붙이면 중괄호 안의 값이 그 자리에 들어갑니다.
          이것을 <strong>f-문자열</strong>이라 부릅니다.
        </p>

        <Code label="f-문자열">{`
name = '가나다'
score = 90

print(f'{name}님의 점수는 {score}점입니다')   # => 가나다님의 점수는 90점입니다
print(f'{score} + 10 = {score + 10}')       # => 90 + 10 = 100
`}</Code>

        <Note tone="warn" title="코딩테스트에서는 print 를 자주 쓰지 않습니다">
          <p>
            f-문자열은 답을 예쁘게 꾸미기보다 <strong>중간 값을 확인할 때</strong> 씁니다.
            «여기까지 값이 뭐지?» 싶을 때 f-문자열로 변수를 통째로 찍어 보는 것이
            가장 빠른 디버깅입니다.
          </p>
        </Note>
      </Section>

      <Note tone="success" title="이 강이 이어지는 곳">
        <p>
          여기서 본 <strong>수와 글자의 구분</strong>은 두 곳에서 다시 만납니다.
          <strong>1-2</strong>에서는 그 «수»가 나눗셈과 실수 오차에서 어떻게 어긋나는지를,
          <strong>1-4</strong>에서는 그 «이어 붙이기»가 반복될 때 왜 시간을 잡아먹는지를 봅니다.
        </p>
      </Note>

      <Quiz
        question="'7' + 1 을 실행하면 어떻게 될까요?"
        choices={[
          {
            text: 'TypeError — 글자와 수는 더할 수 없다',
            right: true,
            why: "파이썬은 글자끼리의 + 는 이어 붙이기로, 수끼리의 + 는 덧셈으로 봅니다. 둘을 섞으면 무엇을 원하는지 알 수 없어 오류를 냅니다. int('7') + 1 로 형을 맞춰 주어야 합니다.",
          },
          {
            text: "8 — 파이썬이 알아서 '7' 을 수로 바꾼다",
            why: '자바스크립트라면 그럴 수 있지만 파이썬은 알아서 바꾸지 않습니다. 조용히 바꾸는 편이 더 위험하다고 보기 때문입니다.',
          },
          {
            text: "'71' — 1 을 글자로 바꿔 이어 붙인다",
            why: "'7' + '1' 이라면 '71' 이 맞습니다. 하지만 오른쪽이 글자가 아니라 수이므로 오류입니다.",
          },
          {
            text: '아무 일도 일어나지 않는다',
            why: '파이썬은 잘못을 만나면 조용히 넘어가지 않고 그 자리에서 멈춰 알려 줍니다.',
          },
        ]}
      />
    </Lesson>
  );
}
