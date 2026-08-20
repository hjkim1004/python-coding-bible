import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Recall from '../../components/Recall';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Term from '../../components/Term';

export default function Functools() {
  return (
    <Lesson
      part="2부 · 여섯 개의 표준 도구"
      title="functools"
      lede="한 줄로 재귀를 메모이제이션하고, 마이너스를 붙일 수 없는 값에 정렬 기준을 세웁니다."
      tags={['2-6', 'lru_cache', 'cmp_to_key']}
    >
      <Recall from="p1-function">
        <p>
          1-7에서 정렬의 기준을 <Term>key</Term>로 세웠습니다. 원소 하나에서
          <strong>값 하나를 뽑아</strong> 그것으로 줄을 세우는 방식이었습니다.
        </p>
        <p>
          그런데 «어느 쪽이 앞인지»가 <strong>두 값을 함께 봐야만</strong> 정해지는
          순서가 있습니다. 그럴 때 쓰는 것과, 같은 계산을 두 번 하지 않게 해 주는
          캐시를 봅니다.
        </p>
      </Recall>

      <Section no={1} title="lru_cache — 같은 답을 두 번 계산하지 않는다">
        <p>
          재귀로 쓴 피보나치는 같은 값을 수없이 다시 계산해 O(2^N)입니다.
          <Term>@lru_cache</Term> 한 줄이면 이미 구한 답을 기억해 O(N)이 됩니다.
          <strong>탑다운 DP를 손으로 짜지 않아도 되는 자리</strong>입니다.
        </p>

        <Code label="한 줄로 되는 메모이제이션">{`
import sys
from functools import lru_cache

sys.setrecursionlimit(10 ** 6)

@lru_cache(maxsize=None)     # 파이썬 3.9+ 라면 @cache 도 같다
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(100))              # 즉시 나온다
`}</Code>

        <Note tone="danger" title="인자가 리스트면 캐시가 되지 않습니다">
          <p>
            캐시는 인자를 <strong>딕셔너리의 키</strong>로 씁니다. 리스트는 키가 될 수
            없어 <Term>TypeError: unhashable type</Term>가 납니다.
            상태를 <Term>tuple</Term>로 바꾸거나, 바뀌지 않는 데이터는
            <strong>인자로 넘기지 말고 바깥에 두세요.</strong>
          </p>
        </Note>

        <Code label="리스트를 넘기지 않는 꼴">{`
from functools import lru_cache

items = [(3, 5), (2, 4)]     # 바뀌지 않으니 바깥에 둔다

@lru_cache(maxsize=None)
def best(i, capacity):        # 인자는 정수뿐 — 캐시가 걸린다
    if i == len(items):
        return 0
    weight, value = items[i]
    skip = best(i + 1, capacity)
    take = value + best(i + 1, capacity - weight) if capacity >= weight else 0
    return max(skip, take)
`}</Code>
      </Section>

      <Section no={2} title="cmp_to_key — 마이너스를 붙일 수 없을 때">
        <p>
          «두 값을 어느 쪽이 앞인지 직접 비교해 정해야» 하는 정렬이 있습니다.
          문자열을 이어 붙여 가장 큰 수를 만드는 문제가 대표적입니다 —
          <Term>key</Term> 하나로는 표현되지 않습니다.
        </p>

        <Code label="가장 큰 수 만들기">{`
from functools import cmp_to_key

def compare(a, b):
    # b+a 가 더 크면 b 가 앞이어야 한다 → 양수를 돌려준다
    if a + b > b + a:
        return -1     # a 가 앞
    if a + b < b + a:
        return 1      # b 가 앞
    return 0

nums = ['3', '30', '34', '5', '9']
nums.sort(key=cmp_to_key(compare))
print(''.join(nums))       # 9534330
`}</Code>

        <Note tone="warn" title="느립니다 — 정말 필요할 때만">
          <p>
            <Term>cmp_to_key</Term>는 비교할 때마다 파이썬 함수를 부르므로 일반
            <Term>key</Term>보다 훨씬 느립니다. <strong>튜플 key로 표현할 수 있다면
            언제나 그쪽이 낫습니다.</strong> 이어 붙여 비교하는 것처럼 두 값의 관계로만
            정의되는 순서일 때만 꺼내세요.
          </p>
        </Note>
      </Section>

      <Section no={3} title="reduce — 접어서 하나로">
        <Code label="가끔 쓰는 것">{`
from functools import reduce
import math

print(reduce(lambda acc, x: acc + x, [1, 2, 3, 4]))      # 10  (sum 이 낫다)
print(reduce(math.gcd, [12, 18, 24]))                    # 6   ← 이건 유용하다
`}</Code>

        <p>
          합계는 <Term>sum</Term>, 최대는 <Term>max</Term>가 있습니다.
          <Term>reduce</Term>가 실제로 값을 하는 자리는 «리스트 전체의 최대공약수»처럼
          <strong>둘씩 접어야만 되는 연산</strong>입니다.
        </p>
      </Section>

      <Quiz
        question="@lru_cache 를 붙인 재귀 함수가 TypeError: unhashable type: 'list' 로 멈춥니다. 어떻게 고칠까요?"
        choices={[
          {
            text: '리스트 인자를 없애고 인덱스 같은 정수만 인자로 남긴다',
            right: true,
            why: '캐시는 인자를 딕셔너리 키로 씁니다. 리스트는 해시할 수 없어 키가 되지 못합니다. 바뀌지 않는 데이터는 바깥에 두고 «몇 번째인가» 같은 정수만 인자로 넘기면 캐시가 정상적으로 걸립니다. 상태 자체가 필요하면 tuple 로 바꾸는 방법도 있습니다.',
          },
          {
            text: 'maxsize 를 늘린다',
            why: 'maxsize 는 몇 개를 기억할지일 뿐 키의 종류와 무관합니다.',
          },
          {
            text: 'lru_cache 대신 cache 를 쓴다',
            why: '@cache 는 maxsize 가 없는 lru_cache 와 같습니다. 키를 해시해야 하는 것은 똑같습니다.',
          },
          {
            text: 'sys.setrecursionlimit 을 올린다',
            why: '재귀 깊이와 관련된 오류는 RecursionError 입니다. 지금 오류는 인자를 캐시 키로 만들지 못해서 나는 것입니다.',
          },
        ]}
      />
    </Lesson>
  );
}
