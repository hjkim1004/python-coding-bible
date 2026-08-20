import Code from '../../components/Code';
import Figure from '../../components/Figure';
import Lesson, { Section } from '../../components/Lesson';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Recall from '../../components/Recall';
import Term from '../../components/Term';

export default function Recursion() {
  return (
    <Lesson
      part="0부 · 파이썬 첫걸음"
      title="재귀"
      lede="함수가 자기 자신을 부르는 일. 처음에는 이상해 보이지만, 3부의 절반이 이 위에 서 있습니다."
      tags={['0-8', 'def', '멈추는 조건']}
    >
      <Recall from="p0-function">
        <p>
          0-7에서 <Term>def</Term>로 함수를 만들고 <Term>return</Term>으로 값을
          돌려줬습니다. 함수 안에서 다른 함수를 부를 수 있다는 것도 자연스럽게 봤습니다.
        </p>
        <p>
          그렇다면 <strong>자기 자신을 부르면 어떻게 될까요?</strong> 그것이 재귀입니다.
        </p>
      </Recall>

      <Section no={1} title="자기를 부르는 함수">
        <p>
          1부터 <Term>n</Term>까지 더하는 일을 생각해 봅시다. 반복문으로도 되지만,
          이렇게 말할 수도 있습니다 — <strong>«1부터 n까지의 합»은 «1부터 n-1까지의 합»에
          n을 더한 것</strong>이라고요.
        </p>

        <Code label="말한 그대로 옮기기">{`
def total(n):
    if n == 1:          # 멈추는 조건 — 더 쪼갤 수 없는 가장 작은 경우
        return 1
    return n + total(n - 1)    # 자기 자신을 부른다

print(total(5))         # => 15
`}</Code>

        <p>
          <Term>total(5)</Term>는 <Term>total(4)</Term>의 답이 필요해서 그것을 부르고,
          <Term>total(4)</Term>는 <Term>total(3)</Term>을 부릅니다. 이렇게 내려가다가
          <Term>total(1)</Term>에서 <strong>더 부르지 않고 1을 돌려주는 순간</strong>
          답이 거꾸로 쌓여 올라옵니다.
        </p>

        <Figure
          label="total(4) 가 total(1) 까지 내려갔다가 답이 거꾸로 쌓여 올라오는 계단 그림"
          viewBox="0 0 640 250"
          caption="내려갈 때는 답을 기다리며 쌓이고, 가장 작은 경우에 닿으면 거꾸로 풀리며 올라옵니다."
        >
          {[0, 1, 2, 3].map((i) => {
            const y = 20 + i * 52;
            const x = 40 + i * 46;
            const labels = ['total(4) = 4 + ?', 'total(3) = 3 + ?', 'total(2) = 2 + ?', 'total(1) = 1'];
            const answers = ['10', '6', '3', '1'];
            const last = i === 3;
            return (
              <g key={i}>
                <rect
                  x={x} y={y} width="270" height="38" rx="10"
                  fill={last ? 'var(--primary-soft)' : 'var(--sunken)'}
                  stroke={last ? 'var(--accent)' : 'transparent'}
                  strokeWidth="1.5"
                />
                <text x={x + 16} y={y + 24} className="fig-mono">{labels[i]}</text>
                <text x={x + 300} y={y + 24} className="fig-accent">↩ {answers[i]}</text>
                {!last && (
                  <path
                    d={`M${x + 24} ${y + 38} l 22 14`}
                    stroke="var(--text-faint)" strokeWidth="1.5" fill="none" markerEnd=""
                  />
                )}
              </g>
            );
          })}
          <text x="40" y="238" className="fig-small">↓ 내려가며 쌓인다</text>
          <text x="600" y="238" textAnchor="end" className="fig-small">↩ 답이 올라온다</text>
        </Figure>

        <Code label="내려갔다 올라오는 길">{`
# total(5) 를 부르면 이런 일이 벌어진다
#
#   total(5) = 5 + total(4)      ← 답을 기다리며 멈춰 있다
#     total(4) = 4 + total(3)    ← 이것도 기다린다
#       total(3) = 3 + total(2)
#         total(2) = 2 + total(1)
#           total(1) = 1         ← 여기서 멈춘다. 이제 거꾸로 답이 올라간다
#         total(2) = 2 + 1 = 3
#       total(3) = 3 + 3 = 6
#     total(4) = 4 + 6 = 10
#   total(5) = 5 + 10 = 15
`}</Code>
      </Section>

      <Section no={2} title="멈추는 조건을 가장 먼저 쓴다">
        <Note tone="danger" title="멈추지 않으면 프로그램이 죽습니다">
          <p>
            <Term>if n == 1: return 1</Term>을 빼면 <Term>total(0)</Term>,
            <Term>total(-1)</Term>… 로 끝없이 내려가다
            <Term>RecursionError</Term>로 멈춥니다. 재귀를 쓸 때는
            <strong>«어디서 멈추는가»를 함수의 첫 줄에 쓰는 것</strong>을 습관으로 하세요.
          </p>
        </Note>

        <p>
          재귀 함수를 쓸 때 물어야 할 것은 언제나 둘입니다.
        </p>
        <ul>
          <li><strong>가장 작은 경우는 무엇이고 그때 답은 무엇인가</strong> — 멈추는 조건</li>
          <li><strong>큰 문제를 어떻게 한 단계 작은 문제로 바꾸는가</strong> — 자기를 부르는 줄</li>
        </ul>
      </Section>

      <Section no={3} title="쌓인다는 것 — 호출 스택">
        <p>
          위 그림에서 <Term>total(5)</Term>가 <strong>답을 기다리며 멈춰 있었다</strong>는
          점이 중요합니다. 파이썬은 «어디까지 갔다가 어디로 돌아와야 하는지»를 쌓아
          둡니다. 이 쌓이는 자리를 <strong>호출 스택</strong>이라 부릅니다.
        </p>
        <p>
          쌓을 자리는 무한하지 않습니다. 파이썬은 기본적으로
          <strong>1000번쯤 쌓이면</strong> 멈춥니다.
        </p>

        <Code label="한도 올리기 — 재귀 문제의 첫 줄">{`
import sys
sys.setrecursionlimit(10 ** 6)     # 100만까지 쌓을 수 있게 넓힌다
`}</Code>

        <Note tone="warn" title="한도를 올려도 공짜는 아닙니다">
          <p>
            깊이가 수십만이 되면 한도를 올려도 <strong>메모리가 먼저 바닥납니다.</strong>
            그럴 때는 재귀를 반복문으로 바꿔 씁니다 — 3-3에서 DFS를
            <strong>재귀 버전과 스택 버전</strong> 두 가지로 쓰는 이유가 이것입니다.
          </p>
        </Note>
      </Section>

      <Section no={4} title="같은 것을 두 번 계산하는 함정">
        <p>
          재귀는 편하지만 <strong>같은 답을 몇 번이고 다시 계산</strong>하기 쉽습니다.
          피보나치가 대표적입니다.
        </p>

        <Code label="느린 이유가 눈에 보이는 코드">{`
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(10))      # => 55   금방 나온다
# print(fib(40))    #         몇십 초가 걸린다
`}</Code>

        <p>
          <Term>fib(5)</Term>를 부르면 <Term>fib(3)</Term>이 두 번,
          <Term>fib(2)</Term>가 세 번 계산됩니다. <Term>n</Term>이 커질수록
          <strong>이 낭비가 폭발적으로 늘어납니다.</strong>
        </p>

        <Note tone="success" title="이 함정에 이름이 있고, 해결책도 있습니다">
          <p>
            «한 번 구한 답을 적어 두고 다시 쓰는» 방법을 <strong>메모이제이션</strong>이라
            합니다. <strong>2-6</strong>에서 그것을 한 줄로 하는 도구를 보고,
            <strong>3-6</strong>에서 그 아이디어에 이름을 붙입니다 —
            다이나믹 프로그래밍입니다.
          </p>
        </Note>
      </Section>

      <Section no={5} title="재귀와 반복 중 무엇을 쓸까">
        <p>
          위의 <Term>total</Term>은 사실 반복문이 더 낫습니다. 한 줄이면 되니까요.
        </p>

        <Code label="같은 일, 반복문으로">{`
def total(n):
    return sum(range(1, n + 1))

print(total(5))     # => 15
`}</Code>

        <p>
          재귀가 값을 하는 것은 <strong>«문제가 자기를 닮은 작은 문제로 쪼개질 때»</strong>입니다.
          미로에서 갈림길마다 또 갈림길이 나오는 탐색, 트리처럼 가지가 또 가지를 뻗는
          구조가 그렇습니다. <strong>3부의 DFS가 정확히 그 모양</strong>입니다.
        </p>

        <Note tone="info" title="지금 다 이해되지 않아도 괜찮습니다">
          <p>
            재귀는 한 번에 손에 붙는 개념이 아닙니다. 지금은
            <strong>«자기를 부른다», «멈추는 조건이 있어야 한다», «쌓였다가 돌아온다»</strong>
            셋만 들고 가세요. 3-3에서 실제 문제 위에서 다시 만납니다.
          </p>
        </Note>
      </Section>

      <Quiz
        question="재귀 함수를 쓸 때 가장 먼저 정해야 하는 것은?"
        choices={[
          {
            text: '어디서 멈추는가 — 더 쪼갤 수 없는 가장 작은 경우와 그때의 답',
            right: true,
            why: '멈추는 조건이 없으면 함수는 끝없이 자기를 부르다 RecursionError 로 죽습니다. 그래서 함수의 첫 줄에 멈추는 조건을 쓰는 것을 습관으로 삼습니다. 그다음이 «큰 문제를 한 단계 작은 문제로 어떻게 바꾸는가» 입니다.',
          },
          {
            text: 'sys.setrecursionlimit 으로 한도를 먼저 올린다',
            why: '깊은 재귀에서는 필요한 일이지만, 멈추는 조건이 없다면 한도를 아무리 올려도 결국 죽습니다. 순서가 반대입니다.',
          },
          {
            text: '반복문으로 바꿀 수 있는지 확인한다',
            why: '좋은 습관이지만 재귀를 쓰기로 정한 뒤라면 멈추는 조건이 먼저입니다.',
          },
          {
            text: '함수 이름을 짧게 짓는다',
            why: '이름은 동작에 영향을 주지 않습니다.',
          },
        ]}
      />
    </Lesson>
  );
}
