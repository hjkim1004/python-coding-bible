import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Table from '../../components/Table';
import Term from '../../components/Term';

export default function Numbers() {
  return (
    <Lesson
      part="1부 · 통과하는 문법"
      title="수와 나눗셈"
      lede="파이썬의 정수는 넘치지 않습니다. 대신 나눗셈이 다른 언어와 다르게 굴러가고, 실수는 조용히 어긋납니다."
      tags={['1-2', '//와 %', '부동소수점']}
    >
      <Section no={1} title="정수는 넘치지 않는다">
        <p>
          C나 자바에서 <Term>int</Term>는 21억을 넘으면 무너집니다. 파이썬의 정수는 메모리가
          허락하는 한 자랍니다. <strong>오버플로를 막는 코드는 쓰지 않아도 됩니다.</strong>
        </p>
        <p>
          다만 공짜는 아닙니다. 자릿수가 커질수록 곱셈이 느려지므로, 큰 수를 반복해서 곱하는
          문제라면 문제가 요구하는 나머지 연산(<Term>% 1_000_000_007</Term>)을
          <strong> 매 단계마다</strong> 취해야 합니다. 마지막에 한 번 취하면 그 전에 이미 느려집니다.
        </p>

        <Code label="나머지는 매 단계마다">{`
MOD = 1_000_000_007

result = 1
for i in range(1, 100_001):
    result = result * i % MOD   # 매번 줄여야 자릿수가 폭발하지 않는다
`}</Code>
      </Section>

      <Section no={2} title="나눗셈 네 가지">
        <p>결과가 정수인지 실수인지, 그리고 음수에서 어디로 버리는지가 전부 다릅니다.</p>

        <Table
          head={['연산', '뜻', '7과 2', '-7과 2']}
          rows={[
            ['a / b', '실수 나눗셈', '3.5', '-3.5'],
            ['a // b', '몫 — 작은 쪽으로 내림', '3', '-4'],
            ['a % b', '나머지 — 부호는 b를 따른다', '1', '1'],
            ['divmod(a, b)', '몫과 나머지를 한 번에', '(3, 1)', '(-4, 1)'],
          ]}
        />

        <Note tone="danger" title="-7 // 2 는 -3 이 아니라 -4 입니다">
          <p>
            파이썬의 <Term>//</Term>는 0 쪽이 아니라 <strong>더 작은 쪽으로</strong> 내립니다.
            C·자바·자바스크립트는 0 쪽으로 자르므로 <Term>-3</Term>이 나옵니다. 다른 언어의
            풀이를 옮겨 적을 때 <strong>음수가 섞이면 답이 하나씩 어긋나는</strong> 원인이 여기입니다.
          </p>
          <p>
            0 쪽으로 자르고 싶다면 <Term>int(a / b)</Term>가 아니라
            <Term>-(-a // b)</Term> 같은 정수 연산을 쓰세요. <Term>int(a / b)</Term>는
            실수를 한 번 거치므로 큰 수에서 오차가 납니다.
          </p>
        </Note>

        <p>
          <Term>%</Term>의 부호가 나누는 수를 따른다는 성질은 오히려 편합니다.
          원형으로 도는 문제에서 <Term>(i - 1) % n</Term>은 음수 인덱스 걱정 없이
          바로 마지막 칸을 가리킵니다.
        </p>

        <Code label="원형 배열에서 앞뒤로 한 칸">{`
n = 5
for i in range(n):
    left = (i - 1) % n    # i가 0일 때 4
    right = (i + 1) % n   # i가 4일 때 0
`}</Code>
      </Section>

      <Section no={3} title="실수는 믿지 않는다">
        <p>
          <Term>0.1 + 0.2</Term>는 <Term>0.3</Term>이 아닙니다. 컴퓨터는 실수를 2의 거듭제곱
          조각으로 흉내 내므로 <Term>0.1</Term>부터가 이미 정확한 값이 아닙니다.
          <strong> 실수를 <Term>==</Term>로 비교하지 마세요.</strong>
        </p>

        <Code label="실수를 다루는 세 가지 방법">{`
# ❌ 이렇게 하면 언젠가 틀린다
print(0.1 + 0.2 == 0.3)            # False

# ✅ 1. 오차 범위를 두고 비교한다
print(abs((0.1 + 0.2) - 0.3) < 1e-9)   # True

# ✅ 2. 아예 정수로 바꿔서 다룬다 (돈·좌표는 대개 이쪽이 정답)
price = 1050          # 10.50원을 10.50 대신 1050(전) 으로
print(price // 100, price % 100)

# ✅ 3. 정확한 십진 계산이 필요하면 Decimal
from decimal import Decimal
print(Decimal('0.1') + Decimal('0.2') == Decimal('0.3'))   # True
`}</Code>

        <Note tone="warn" title="round() 는 우리가 배운 반올림이 아닙니다">
          <p>
            파이썬의 <Term>round</Term>는 <strong>은행가 반올림</strong>을 씁니다.
            0.5는 가까운 짝수로 갑니다 — <Term>round(0.5)</Term>는 0, <Term>round(2.5)</Term>는 2입니다.
            문제가 «소수점 첫째 자리에서 반올림»을 요구한다면
            <Term>int(x + 0.5)</Term>처럼 직접 쓰는 편이 안전합니다(음수라면 부호를 나눠서).
          </p>
        </Note>
      </Section>

      <Section no={4} title="자주 쓰는 수 연산">
        <Code label="외워 둘 만한 것들">{`
print(abs(-7))          # 7
print(pow(2, 10))       # 1024
print(pow(2, 10, 1000)) # 24  — 거듭제곱 후 나머지를 한 번에 (빠르다)
print(2 ** 10)          # 1024
print(10 ** 18)         # 큰 수도 그대로

print(max(3, 9), min(3, 9))
print(sum([1, 2, 3]))

print(int('1010', 2))   # 10  — 2진 문자열을 정수로
print(bin(10))          # '0b1010'
print(format(10, 'b'))  # '1010'  — 접두어 없이
`}</Code>

        <p>
          <Term>pow(a, b, m)</Term>은 거듭제곱을 하면서 매번 나머지를 취합니다. 직접
          <Term>a ** b % m</Term>이라고 쓰면 <strong>먼저 거대한 수를 만든 뒤</strong> 나누므로
          지수가 크면 그대로 시간 초과입니다.
        </p>
      </Section>

      <Quiz
        question="다른 언어에서 옮겨 온 풀이가 음수 입력에서만 답이 1 어긋납니다. 어디를 봐야 할까요?"
        choices={[
          {
            text: '// 연산이 0 쪽이 아니라 작은 쪽으로 내린다',
            right: true,
            why: '파이썬의 // 는 바닥 내림이라 -7 // 2 가 -4 입니다. C·자바는 0 쪽으로 잘라 -3 이 되고, 이 한 칸 차이가 인덱스나 좌표에서 그대로 오답이 됩니다. 0 쪽 자르기가 필요하면 -(-a // b) 를 쓰세요.',
          },
          {
            text: '정수가 오버플로했다',
            why: '파이썬 정수는 넘치지 않습니다. 자릿수만큼 메모리를 더 쓸 뿐 값이 망가지지 않습니다.',
          },
          {
            text: 'int() 가 음수를 반올림했다',
            why: 'int() 는 반올림이 아니라 0 쪽으로 버립니다. 다만 실수를 한 번 거치므로 큰 수에서는 별도의 오차 문제가 생깁니다.',
          },
          {
            text: '% 의 결과가 음수라서',
            why: '파이썬에서 % 의 부호는 나누는 수를 따르므로 b 가 양수면 결과도 항상 0 이상입니다. 오히려 음수 인덱스를 안전하게 만들어 주는 성질입니다.',
          },
        ]}
      />
    </Lesson>
  );
}
