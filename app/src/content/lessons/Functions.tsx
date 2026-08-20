import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Recall from '../../components/Recall';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Term from '../../components/Term';

export default function Functions() {
  return (
    <Lesson
      part="1부 · 통과하는 문법"
      title="함수와 정렬 키"
      lede="코딩테스트에서 lambda 를 쓰는 자리는 사실상 하나입니다 — 정렬의 기준을 세울 때. 그 하나를 확실히 익힙니다."
      tags={['1-7', 'sort key', '가변 인자']}
    >
      <Recall from="p0-function">
        <p>
          0-7에서 <Term>def</Term>로 함수를 만들고 <Term>return</Term>으로 값을
          돌려줬습니다. <strong>찍는 것과 돌려주는 것은 다르다</strong>는 것도 봤습니다.
        </p>
        <p>
          여기서는 <strong>이름 없는 한 줄 함수</strong>(<Term>lambda</Term>)와,
          그것을 <strong>정렬의 기준</strong>으로 세우는 법을 봅니다. 코딩테스트에서
          <Term>lambda</Term>를 쓰는 자리는 사실상 이 하나입니다.
        </p>
      </Recall>

      <Section no={1} title="정렬의 기준은 key 가 정한다">
        <p>
          <Term>sort</Term>와 <Term>sorted</Term>는 <Term>key</Term>에 준 함수의
          <strong>결과값</strong>을 기준으로 줄을 세웁니다. 원소 자체는 바뀌지 않습니다.
        </p>

        <Code label="한 가지 기준">{`
words = ['banana', 'kiwi', 'apple']

print(sorted(words))                      # 사전순
print(sorted(words, key=len))             # 길이순
print(sorted(words, key=len, reverse=True))
print(sorted(words, key=lambda w: w[-1])) # 마지막 글자순
`}</Code>

        <p>
          기준이 둘 이상이면 <strong>튜플을 돌려주면 됩니다.</strong> 0-6에서 «한 몸인 값»을
          담는다고 했던 그 튜플입니다. 튜플은 <strong>앞에서부터 차례로 비교</strong>하므로,
          앞의 값이 같을 때만 뒤의 값을 봅니다.
        </p>

        <Code label="여러 기준 — 코테에서 가장 많이 쓰는 한 줄">{`
students = [('가', 3, 90), ('나', 1, 90), ('다', 2, 80)]

# 점수 내림차순, 점수가 같으면 번호 오름차순
result = sorted(students, key=lambda s: (-s[2], s[1]))
print(result)   # [('나', 1, 90), ('가', 3, 90), ('다', 2, 80)]
`}</Code>

        <Note tone="success" title="내림차순은 마이너스 부호로">
          <p>
            <Term>reverse=True</Term>는 <strong>모든 기준</strong>을 뒤집습니다. 어떤 것은
            내림차순, 어떤 것은 오름차순이어야 한다면 숫자 앞에 <Term>-</Term>를 붙이세요.
            문자열에는 마이너스를 붙일 수 없으므로, 그럴 때는
            <Term>functools.cmp_to_key</Term>를 쓰거나 두 번 나눠 정렬합니다.
          </p>
        </Note>

        <Note tone="warn" title="파이썬 정렬은 안정 정렬입니다">
          <p>
            기준이 같은 원소들의 <strong>원래 순서가 유지</strong>됩니다. 그래서 두 번 나눠
            정렬할 때는 <strong>덜 중요한 기준을 먼저</strong> 정렬해야 합니다 —
            나중에 한 정렬이 이깁니다.
          </p>
        </Note>
      </Section>

      <Section no={2} title="lambda 는 «이름 없는 한 줄 함수»">
        <Code label="같은 함수, 두 가지 표기">{`
def double(x):
    return x * 2

double = lambda x: x * 2      # 같은 일을 한다

# 값을 여러 개 받을 수도 있다
dist = lambda a, b: abs(a - b)
`}</Code>

        <p>
          <Term>lambda</Term>에는 <Term>return</Term>도, 여러 줄도 쓸 수 없습니다.
          한 줄로 표현되지 않는다면 그냥 <Term>def</Term>로 쓰세요. 억지로 한 줄에
          밀어 넣은 <Term>lambda</Term>는 짧아진 것이 아니라 읽기 어려워진 것입니다.
        </p>
      </Section>

      <Section no={3} title="인자로 넘긴 리스트는 원본입니다">
        <p>
          파이썬은 값을 복사해 넘기지 않습니다. 함수 안에서 리스트를 고치면
          <strong>바깥의 리스트가 바뀝니다.</strong> 반면 숫자나 문자열은 불변이라
          안에서 다시 대입해도 바깥은 그대로입니다.
        </p>

        <Code label="바뀌는 것과 바뀌지 않는 것">{`
def touch(numbers, count):
    numbers.append(4)     # 원본이 바뀐다
    count += 1            # 안에서만 바뀐다
    numbers = [9, 9]      # 이름만 새 리스트로 옮겨 붙였다 — 바깥은 그대로

arr = [1, 2, 3]
n = 0
touch(arr, n)
print(arr, n)             # [1, 2, 3, 4] 0
`}</Code>

        <Note tone="danger" title="기본값에 리스트를 쓰지 마세요">
          <p>
            <Term>def f(acc=[]):</Term>의 기본값은 <strong>함수가 정의될 때 딱 한 번</strong>
            만들어져 호출마다 공유됩니다. 두 번째 호출부터 이전 값이 남아 있습니다.
            <Term>def f(acc=None):</Term>로 두고 안에서
            <Term>if acc is None: acc = []</Term>로 만드세요.
          </p>
        </Note>
      </Section>

      <Section no={4} title="재귀를 쓸 때의 두 줄">
        <p>
          파이썬의 기본 재귀 한도는 1000입니다. DFS 깊이가 그보다 깊어질 수 있는 문제라면
          한도를 올려야 하고, 함수 호출 자체가 느리므로 깊이가 수십만이라면
          <strong>스택으로 바꿔 쓰는 편</strong>이 안전합니다.
        </p>

        <Code label="재귀 문제의 첫 줄">{`
import sys
sys.setrecursionlimit(10 ** 6)

def dfs(x):
    if x == 0:            # 멈추는 조건을 가장 먼저 쓴다
        return 0
    return x + dfs(x - 1)
`}</Code>

        <p>
          같은 인자로 몇 번이고 다시 불리는 재귀라면 <Term>functools.lru_cache</Term> 한 줄로
          결과를 기억하게 만들 수 있습니다. 2부에서 다룹니다.
        </p>
      </Section>

      <Quiz
        question="점수는 높은 순, 점수가 같으면 이름은 사전순으로 정렬하려 합니다. key 로 무엇을 돌려주어야 할까요?"
        choices={[
          {
            text: '(-점수, 이름) 튜플',
            right: true,
            why: '튜플은 앞에서부터 비교하므로 점수를 먼저 보고, 같을 때만 이름을 봅니다. 점수만 내림차순이어야 하니 숫자에 마이너스를 붙이고, 이름은 그대로 두어 오름차순을 유지합니다.',
          },
          {
            text: '(점수, 이름) 튜플에 reverse=True',
            why: 'reverse 는 모든 기준을 함께 뒤집습니다. 점수는 원하는 대로 내림차순이 되지만 이름까지 역순이 되어 조건이 깨집니다.',
          },
          {
            text: '점수로 정렬한 뒤 이름으로 다시 정렬한다',
            why: '순서가 반대입니다. 파이썬 정렬은 안정 정렬이라 나중에 한 정렬이 이깁니다. 이름으로 먼저, 점수로 나중에 정렬해야 원하는 결과가 나옵니다.',
          },
          {
            text: '문자열로 이어 붙여 정렬한다',
            why: '숫자를 문자열로 만들면 자릿수가 다를 때 순서가 무너집니다 — "9" 가 "10" 보다 뒤로 갑니다.',
          },
        ]}
      />
    </Lesson>
  );
}
