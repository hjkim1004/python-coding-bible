import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Term from '../../components/Term';

export default function MathLib() {
  return (
    <Lesson
      part="2부 · 여섯 개의 표준 도구"
      title="math"
      lede="최대공약수·소수 판별·조합의 수. 직접 짜면 실수하기 쉬운 계산들을 표준 라이브러리가 정확하고 빠르게 해 줍니다."
      tags={['2-5', 'gcd와 lcm', '소수']}
    >
      <Section no={1} title="약수와 배수">
        <Code label="gcd 와 lcm">{`
import math

print(math.gcd(12, 18))        # 6
print(math.gcd(12, 18, 24))    # 6   ← 3.9+ 는 여러 개도 받는다
print(math.lcm(4, 6))          # 12  ← 3.9+

# lcm 이 없는 환경(3.8 이하)이라면 gcd 로 만든다
def lcm(a, b):
    return a * b // math.gcd(a, b)
`}</Code>

        <Note tone="warn" title="채점 서버의 파이썬 버전을 의심하세요">
          <p>
            <Term>math.lcm</Term>은 3.9부터입니다. 오래된 채점 환경에서는
            <Term>NameError</Term>가 아니라 <Term>AttributeError</Term>로 떨어집니다.
            <strong>위의 두 줄짜리 lcm을 손에 익혀 두면</strong> 버전을 걱정할 일이 없습니다.
          </p>
        </Note>
      </Section>

      <Section no={2} title="제곱근과 소수 판별">
        <p>
          <Term>N</Term>이 소수인지 보려면 2부터 <Term>N-1</Term>까지 나눠 볼 필요가 없습니다.
          약수는 <strong>제곱근을 기준으로 짝을 이루므로</strong>, 제곱근까지만 보면 됩니다 —
          O(N)이 O(√N)이 됩니다.
        </p>

        <Code label="소수 판별">{`
import math

def is_prime(n):
    if n < 2:
        return False
    for i in range(2, math.isqrt(n) + 1):   # isqrt 는 정수 제곱근 (오차가 없다)
        if n % i == 0:
            return False
    return True

print(is_prime(97))     # True
`}</Code>

        <Note tone="danger" title="int(n ** 0.5) 대신 math.isqrt(n)">
          <p>
            <Term>n ** 0.5</Term>는 실수 연산이라 아주 큰 수에서 오차가 납니다.
            제곱수인데도 제곱근이 <Term>0.9999…</Term>로 계산되어 <Term>int()</Term>가
            한 칸 작게 자르는 순간, <strong>가장 큰 약수 하나를 놓쳐</strong> 소수 판별이
            틀립니다. <Term>math.isqrt</Term>는 정수만으로 계산해 그런 일이 없습니다.
          </p>
        </Note>

        <p>
          범위 안의 소수를 <strong>전부</strong> 구해야 한다면 하나씩 판별하지 말고
          에라토스테네스의 체를 쓰세요. O(N log log N)입니다.
        </p>

        <Code label="에라토스테네스의 체">{`
import math

def primes_upto(n):
    sieve = [True] * (n + 1)
    sieve[0] = sieve[1] = False

    for i in range(2, math.isqrt(n) + 1):
        if sieve[i]:
            # i의 배수를 i*i 부터 지운다 (그 앞은 이미 지워졌다)
            for j in range(i * i, n + 1, i):
                sieve[j] = False

    return [i for i, ok in enumerate(sieve) if ok]

print(primes_upto(30))   # [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
`}</Code>
      </Section>

      <Section no={3} title="세는 계산">
        <Code label="조합·순열·계승">{`
import math

print(math.factorial(5))     # 120
print(math.comb(5, 2))       # 10   nCr  (3.8+)
print(math.perm(5, 2))       # 20   nPr  (3.8+)

print(math.ceil(3.2))        # 4   올림
print(math.floor(-3.2))      # -4  내림 (작은 쪽으로)
print(math.inf)              # 무한대 — 최솟값을 찾는 초기값으로 쓴다
`}</Code>

        <p>
          최단 거리 문제에서 «아직 못 간 곳»의 초기값으로 <Term>math.inf</Term>를 쓰면
          «충분히 큰 수»를 얼마로 잡을지 고민할 필요가 없습니다.
          <Term>float('inf')</Term>와 같은 값입니다.
        </p>
      </Section>

      <Quiz
        question="10^18 에 가까운 큰 수의 소수 판별에서, 제곱수인데도 답이 틀립니다. 가장 유력한 원인은?"
        choices={[
          {
            text: 'int(n ** 0.5) 가 실수 오차로 한 칸 작게 잘렸다',
            right: true,
            why: '** 0.5 는 부동소수점 연산이라 큰 수에서 정확하지 않습니다. 제곱근이 999999.9999… 로 계산되면 int() 가 999999 로 잘라 마지막 약수를 검사하지 못합니다. math.isqrt 는 정수 연산이라 이 문제가 없습니다.',
          },
          {
            text: '파이썬 정수가 오버플로했다',
            why: '파이썬 정수는 넘치지 않습니다. 문제는 정수가 아니라 중간에 끼어든 실수 연산입니다.',
          },
          {
            text: 'range 가 10^9 를 넘으면 동작하지 않는다',
            why: 'range 는 값을 미리 만들지 않아 큰 수도 다룹니다. 다만 실제로 다 돌면 느릴 뿐입니다.',
          },
          {
            text: '% 연산이 큰 수에서 부정확하다',
            why: '정수 나머지 연산은 자릿수와 무관하게 정확합니다.',
          },
        ]}
      />
    </Lesson>
  );
}
