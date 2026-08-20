import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Term from '../../components/Term';

export default function FirstProgram() {
  return (
    <Lesson
      part="0부 · 파이썬 첫걸음"
      title="첫 프로그램"
      lede="파이썬을 한 번도 써 본 적 없어도 괜찮습니다. 여기서 시작해 1부로 넘어가면 됩니다."
      tags={['0-1', 'print', '들여쓰기']}
    >
      <Section no={1} title="화면에 내보내기">
        <p>
          파이썬에게 무언가를 시키려면 <strong>한 줄에 한 가지</strong>를 적습니다.
          가장 먼저 배우는 것은 «화면에 보여 줘»라는 명령, <Term>print</Term>입니다.
        </p>

        <Code label="첫 줄">{`
print('안녕')          # => 안녕
print(1 + 2)          # => 3
print('점수:', 90)     # => 점수: 90
`}</Code>

        <p>
          <Term>print</Term> 뒤의 괄호 안에 보여 줄 것을 적습니다. 쉼표로 여러 개를
          늘어놓으면 사이에 <strong>공백 한 칸</strong>을 넣어 이어 줍니다.
        </p>

        <Note tone="info" title="따옴표가 있고 없고의 차이">
          <p>
            <Term>'안녕'</Term>처럼 따옴표로 감싸면 <strong>글자 그대로</strong>이고,
            <Term>1 + 2</Term>처럼 감싸지 않으면 <strong>계산해서</strong> 보여 줍니다.
            <Term>print('1 + 2')</Term>는 <Term>1 + 2</Term>라고 찍힙니다.
            작은따옴표와 큰따옴표는 아무 차이가 없습니다 — 이 책은 작은따옴표를 씁니다.
          </p>
        </Note>
      </Section>

      <Section no={2} title="# 뒤는 사람에게 하는 말">
        <p>
          <Term>#</Term>부터 줄 끝까지는 파이썬이 읽지 않습니다. 나중의 자신에게
          남기는 쪽지입니다. 이 책의 코드에 붙은 설명이 전부 그것입니다.
        </p>

        <Code label="주석">{`
# 이 줄은 실행되지 않는다
print('실행된다')      # => 실행된다    이 뒤에 적은 글자는 실행되지 않는다

# 이 책에서는 => 뒤에 «이 줄이 내놓는 답» 을 적어 둔다
print(7 // 2)         # => 3
`}</Code>

        <Note tone="success" title="# => 는 이 책의 약속입니다">
          <p>
            <Term>{'# =>'}</Term> 뒤에 적힌 것은 <strong>그 줄이 실제로 내놓는 값</strong>입니다.
            그냥 적어 둔 것이 아니라, 책을 고칠 때마다 기계가 코드를 돌려
            그 값이 맞는지 대조합니다. 그러니 <strong>믿고 따라 치셔도 됩니다.</strong>
          </p>
        </Note>
      </Section>

      <Section no={3} title="들여쓰기가 곧 문법이다">
        <p>
          많은 언어가 <Term>{'{ }'}</Term>로 «여기서 여기까지가 한 덩이»를 표시합니다.
          파이썬은 <strong>줄 앞의 빈칸</strong>으로 그것을 표시합니다.
          그래서 들여쓰기는 «보기 좋으라고» 하는 것이 아니라 <strong>틀리면 프로그램이
          달라지는 문법</strong>입니다.
        </p>

        <Code label="들여쓴 만큼이 «안쪽»이다">{`
if 3 > 2:
    print('안쪽')      # if 에 딸린 줄 — 조건이 맞을 때만 실행된다
    print('여기도')     # 같은 깊이라 함께 딸려 있다
print('바깥쪽')        # 들여쓰지 않았으므로 언제나 실행된다
`}</Code>

        <Note tone="danger" title="빈칸 네 칸으로 통일하세요">
          <p>
            깊이만 맞으면 두 칸이든 네 칸이든 동작하지만,
            <strong>탭과 빈칸을 섞으면 눈에는 같아 보여도 파이썬은 다르게 읽습니다.</strong>
            그 오류(<Term>IndentationError</Term>)는 시험장에서 가장 허무한 실패입니다.
            에디터가 탭을 빈칸 네 칸으로 바꾸도록 설정해 두세요.
          </p>
        </Note>
      </Section>

      <Section no={4} title="오류 메시지는 적이 아니다">
        <p>
          파이썬은 잘못을 만나면 <strong>어디가 왜 잘못됐는지</strong> 말해 줍니다.
          맨 아랫줄부터 읽으세요 — 거기에 이름과 이유가 있습니다.
        </p>

        <Code label="자주 만나는 넷">{`
# print('안녕'          →  SyntaxError      괄호를 닫지 않았다
# print(nmae)           →  NameError        그런 이름이 없다 (오타)
# print('3' + 3)        →  TypeError        글자와 수를 더할 수 없다
#     print('안녕')      →  IndentationError 이유 없이 들여썼다
`}</Code>

        <Note tone="success" title="오류가 났다는 것은 «어디가 문제인지 안다»는 뜻입니다">
          <p>
            진짜 무서운 것은 오류 없이 <strong>조용히 틀린 답</strong>을 내는 코드입니다.
            이 책이 함정을 자주 짚는 이유가 그것입니다.
          </p>
        </Note>
      </Section>

      <Quiz
        question="파이썬에서 들여쓰기는 무엇입니까?"
        choices={[
          {
            text: '어디까지가 한 덩이인지를 정하는 문법 — 틀리면 프로그램이 달라진다',
            right: true,
            why: '다른 언어의 중괄호 { } 자리를 파이썬은 들여쓰기가 대신합니다. 보기 좋으라고 하는 장식이 아니라, 잘못 들여쓰면 조건문 안에 있어야 할 줄이 바깥으로 나가 버립니다.',
          },
          {
            text: '보기 좋게 하려는 약속일 뿐 동작에는 영향이 없다',
            why: '다른 많은 언어에서는 맞는 말이지만 파이썬은 다릅니다. 들여쓰기가 곧 구조입니다.',
          },
          {
            text: '반드시 탭 문자로 해야 한다',
            why: '빈칸도 됩니다. 중요한 것은 섞지 않는 것입니다 — 섞으면 눈에는 같아 보이는데 파이썬은 다르게 읽습니다.',
          },
          {
            text: '함수 안에서만 필요하다',
            why: '조건문·반복문·클래스 등 «안쪽» 이 생기는 모든 곳에서 필요합니다.',
          },
        ]}
      />
    </Lesson>
  );
}
