import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Recall from '../../components/Recall';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Term from '../../components/Term';

export default function Io() {
  return (
    <Lesson
      part="1부 · 통과하는 문법"
      title="입력과 출력"
      lede="0부에서 배운 input()을 시험장의 것으로 바꿉니다. 알고리즘이 맞았는데도 시간 초과가 나는 첫 번째 이유가 대개 여기입니다."
      tags={['1-1', 'sys.stdin', '시간 초과']}
    >
      <Recall from="p0-input">
        <p>
          0-3에서 <Term>input()</Term>으로 한 줄을 읽고 그 자리에서 수로 바꾸는 법을
          익혔습니다. <strong>읽어 온 것은 언제나 글자</strong>였고, 그래서
          <Term>int()</Term>를 씌워야 했습니다.
        </p>
        <Code label="0-3에서 손에 익힌 두 줄">{`
n = int(input())                      # 한 줄에 수 하나
a, b = map(int, input().split())      # 한 줄에 수 여럿
`}</Code>
        <p>
          여기서는 이 두 줄을 <strong>시험장의 것으로</strong> 바꿉니다. 미리 말해 두면,
          바꾼 뒤에도 <strong>위 두 줄은 그대로 씁니다.</strong>
        </p>
      </Recall>

      <Section no={1} title="쓰던 input() 을 그대로 두면">
        <p>
          먼저 분명히 해 둡니다 — <strong>0-3의 코드는 맞습니다.</strong> 한두 줄을
          읽는 문제라면 이 강을 읽지 않아도 통과합니다.
        </p>
        <p>
          문제는 줄이 많아질 때입니다. <Term>input()</Term>은 한 줄을 읽을 때마다
          프롬프트를 확인하고, 줄 끝의 개행을 떼고, 인코딩을 다시 맞춥니다.
          10만 줄을 읽는 문제에서는 이 잔일이 쌓여
          <strong>알고리즘보다 입력이 더 오래</strong> 걸립니다. 답은 맞는데
          시간 초과로 떨어지는, 가장 억울한 실패입니다.
        </p>
        <p>
          <Term>sys.stdin.readline</Term>은 그 잔일을 하지 않습니다. 대신 개행 문자를
          떼 주지 않으므로, 문자열로 쓸 때는 우리가 떼야 합니다.
        </p>

        <Code label="모든 문제의 첫 두 줄">{`
import sys
input = sys.stdin.readline
`}</Code>

        <p>
          이름을 <Term>input</Term>으로 덮어쓰면 <strong>0부에서 익힌 코드를 한 글자도
          바꾸지 않아도 됩니다.</strong> <Term>int(input())</Term>도,
          <Term>map(int, input().split())</Term>도 그대로 쓰면서 속도만 가져갑니다.
          손에 익은 것을 버리지 않아도 되는 것이 이 두 줄의 값입니다.
        </p>
      </Section>

      <Section no={2} title="읽는 다섯 가지 모양">
        <p>입력의 생김새는 사실상 다섯 가지뿐입니다. 이 다섯 줄이면 대부분의 문제가 열립니다.</p>

        <Code label="입력 다섯 모양">{`
import sys
input = sys.stdin.readline

# 1) 정수 하나
n = int(input())

# 2) 한 줄에 여러 정수
n, m = map(int, input().split())

# 3) 한 줄짜리 정수 배열
arr = list(map(int, input().split()))

# 4) 여러 줄짜리 2차원 배열
board = [list(map(int, input().split())) for _ in range(n)]

# 5) 붙어 있는 숫자 문자열 (예: "01101")
grid = [list(map(int, input().rstrip())) for _ in range(n)]
`}</Code>

        <Note tone="warn" title="문자열로 받을 때는 반드시 rstrip()">
          <p>
            <Term>readline</Term>은 개행을 남깁니다. <Term>s = input()</Term>으로 받은
            문자열은 실제로 <Term>"abc\n"</Term>이라 길이가 하나 더 크고, 비교도 어긋납니다.
            정수 변환(<Term>int()</Term>)은 공백을 알아서 무시하므로 숫자는 괜찮지만,
            <strong> 문자열은 항상 <Term>.rstrip()</Term>을 붙이세요.</strong>
          </p>
        </Note>
      </Section>

      <Section no={3} title="출력도 모아서 한 번에">
        <p>
          <Term>print</Term>는 부를 때마다 출력 버퍼를 비웁니다. 10만 번 부르면 10만 번
          비웁니다. 결과를 리스트에 모았다가 <strong>마지막에 한 번</strong> 내보내면 이
          비용이 사라집니다.
        </p>

        <Code label="출력 모으기">{`
import sys
input = sys.stdin.readline

n = int(input())
answers = []

for _ in range(n):
    a, b = map(int, input().split())
    answers.append(a + b)

# 한 줄에 하나씩 — 개행으로 이어 붙여 한 번에 출력
sys.stdout.write('\\n'.join(map(str, answers)) + '\\n')

# 한 줄에 공백으로 이어 출력할 때는 print 의 언패킹이 가장 간결하다
print(*answers)
`}</Code>

        <Note tone="success" title="print(*arr) 를 기억해 두세요">
          <p>
            <Term>print(*arr)</Term>는 리스트를 공백으로 이어 한 줄에 출력합니다.
            <Term>' '.join(map(str, arr))</Term>과 결과가 같은데 훨씬 짧고, 원소가 정수여도
            문자열 변환을 신경 쓸 필요가 없습니다.
          </p>
        </Note>
      </Section>

      <Section no={4} title="실수하기 쉬운 자리">
        <p>
          <Term>input = sys.stdin.readline</Term>을 <strong>함수 안에서</strong> 선언하면
          그 함수 밖에서는 여전히 느린 <Term>input</Term>이 불립니다. 항상 파일 맨 위,
          전역에 두세요.
        </p>
        <p>
          그리고 <Term>readline</Term>은 파일 끝에서 빈 문자열을 돌려줍니다. 입력 줄 수가
          명시되지 않은 문제에서는 <Term>for line in sys.stdin:</Term>으로 도는 편이 안전합니다.
        </p>

        <Code label="줄 수를 모를 때">{`
import sys

for line in sys.stdin:
    line = line.rstrip()
    if not line:          # 빈 줄이 섞여 들어올 수 있다
        continue
    a, b = map(int, line.split())
    print(a + b)
`}</Code>
      </Section>

      <Quiz
        question="sys.stdin.readline 으로 문자열을 받아 비교했는데 분명히 같은 값인데도 계속 다르다고 나옵니다. 가장 먼저 의심할 것은?"
        choices={[
          {
            text: '줄 끝에 개행 문자가 남아 있다',
            right: true,
            why: 'readline 은 개행을 떼지 않습니다. "abc\\n" 과 "abc" 는 다른 문자열이므로 .rstrip() 으로 잘라내야 합니다. int() 로 감싸면 공백을 무시하기 때문에 숫자에서는 이 문제가 드러나지 않아, 문자열 문제에서 처음 만나게 됩니다.',
          },
          {
            text: '입력이 유니코드라 인코딩이 깨졌다',
            why: '표준 입력의 인코딩 문제는 코딩테스트 환경에서 거의 발생하지 않습니다. 같은 값이 다르게 보이는 흔한 원인은 눈에 보이지 않는 개행입니다.',
          },
          {
            text: 'input 을 sys.stdin.readline 으로 덮어썼기 때문에 문자열이 바이트가 되었다',
            why: 'readline 이 돌려주는 것은 여전히 문자열입니다. 바이트로 읽으려면 sys.stdin.buffer 를 써야 합니다.',
          },
          {
            text: '== 대신 is 로 비교해야 한다',
            why: 'is 는 같은 객체인지를 묻습니다. 값 비교는 == 가 맞고, is 로 바꾸면 오히려 예측할 수 없는 결과가 나옵니다.',
          },
        ]}
      />
    </Lesson>
  );
}
