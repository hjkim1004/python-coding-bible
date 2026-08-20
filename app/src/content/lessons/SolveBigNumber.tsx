import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Term from '../../components/Term';

export default function SolveBigNumber() {
  return (
    <Lesson
      part="4부 · 기출 해설"
      title="가장 큰 수"
      lede="«어느 쪽이 앞이어야 하는가»를 한 값만 보고는 정할 수 없는 정렬. 2-6의 cmp_to_key 가 필요한 자리입니다."
      tags={['4-4', '정렬', 'Lv.2']}
      source={{ label: '프로그래머스', href: 'https://school.programmers.co.kr/learn/courses/30/lessons/42746' }}
    >
      <Section no={1} title="문제">
        <p>
          정수 배열 <Term>numbers</Term>의 수들을 이어 붙여 만들 수 있는 가장 큰 수를
          문자열로 돌려줍니다. 예를 들어 <Term>[6, 10, 2]</Term>라면 <Term>"6210"</Term>입니다.
        </p>

        <Note tone="warn" title="크기순 정렬로는 풀리지 않습니다">
          <p>
            <Term>[3, 30]</Term>을 봅시다. 수의 크기로는 30이 크지만, 이어 붙이면
            <Term>"330"</Term>이 <Term>"303"</Term>보다 큽니다.
            <strong>어느 쪽이 앞이어야 하는지는 두 수를 함께 봐야만</strong> 정해집니다.
          </p>
        </Note>
      </Section>

      <Section no={2} title="두 수만 놓고 비교하는 규칙">
        <p>
          <Term>a</Term>와 <Term>b</Term> 중 누가 앞이어야 할까요? 답은 단순합니다 —
          <strong>이어 붙여 본 뒤 더 큰 쪽이 이깁니다.</strong>
          <Term>{'a + b > b + a'}</Term>이면 <Term>a</Term>가 앞입니다.
        </p>
        <p>
          이 규칙이 전체 정렬로 이어지는 이유는, 이 비교가
          <strong>추이성</strong>(a가 b보다 앞이고 b가 c보다 앞이면 a는 c보다 앞)을
          만족하기 때문입니다. 그래서 두 개씩 비교하는 규칙 하나로 전체 줄을 세울 수 있습니다.
        </p>

        <Code label="cmp_to_key 로 푸는 정석">{`
from functools import cmp_to_key

def solution(numbers):
    strings = list(map(str, numbers))

    def compare(a, b):
        if a + b > b + a:
            return -1        # a 가 앞
        if a + b < b + a:
            return 1         # b 가 앞
        return 0

    strings.sort(key=cmp_to_key(compare))
    answer = ''.join(strings)

    # [0, 0, 0] 이면 "000" 이 아니라 "0" 이어야 한다
    return '0' if answer[0] == '0' else answer


print(solution([6, 10, 2]))         # => 6210
print(solution([3, 30, 34, 5, 9]))  # => 9534330
print(solution([0, 0]))             # => 0
`}</Code>

        <Note tone="danger" title="0만 남는 경우를 반드시 처리하세요">
          <p>
            <Term>[0, 0, 0]</Term>은 이어 붙이면 <Term>"000"</Term>이 됩니다. 답은
            <Term>"0"</Term>이어야 합니다. <strong>첫 글자가 0이면 전체가 0</strong>이라는
            성질을 이용해 한 줄로 막을 수 있습니다.
          </p>
        </Note>
      </Section>

      <Section no={3} title="cmp_to_key 없이 푸는 요령">
        <p>
          <Term>numbers</Term>의 원소가 1000 이하라면 각 수를 <strong>세 번 반복한 문자열</strong>로
          비교해도 같은 순서가 나옵니다. 자릿수를 맞춰 놓고 앞에서부터 비교하는 셈이라,
          느린 <Term>cmp_to_key</Term>를 피할 수 있습니다.
        </p>

        <Code label="key 하나로">{`
def solution(numbers):
    strings = list(map(str, numbers))
    strings.sort(key=lambda s: s * 3, reverse=True)
    answer = ''.join(strings)
    return '0' if answer[0] == '0' else answer
`}</Code>

        <Note tone="warn" title="«세 번»은 제한 조건에서 나온 수입니다">
          <p>
            원소가 1000 이하라 최대 네 자리이므로, 세 번 반복하면 어떤 두 수를 비교해도
            <strong>앞자리에서 승부가 갈립니다.</strong> 제한이 커지면 반복 횟수도 커져야 하므로,
            이 요령을 쓸 때는 <strong>문제의 범위를 반드시 확인</strong>하세요.
            확신이 없으면 <Term>cmp_to_key</Term>가 안전합니다.
          </p>
        </Note>
      </Section>

      <Section no={4} title="이 문제에서 챙겨 갈 것">
        <p>
          «정렬 기준을 하나의 값으로 뽑을 수 있는가»를 먼저 물으세요. 뽑을 수 있으면
          <Term>key</Term>가 답이고, <strong>두 값의 관계로만 정의되는 순서</strong>라면
          <Term>cmp_to_key</Term>입니다. 그리고 정렬 문제에서 답이 미묘하게 틀린다면
          <strong>«전부 같은 값일 때», «0일 때», «하나뿐일 때»</strong>를 먼저 넣어 보세요.
        </p>
      </Section>

      <Quiz
        question="[3, 30] 을 이어 붙여 가장 큰 수를 만들려 합니다. 왜 단순 내림차순 정렬로는 안 될까요?"
        choices={[
          {
            text: '어느 쪽이 앞이어야 하는지는 두 수를 이어 붙여 봐야만 알 수 있다',
            right: true,
            why: '수의 크기는 30 > 3 이지만 "330" > "303" 이므로 3이 앞이어야 합니다. 하나의 값으로 순서를 뽑을 수 없고 두 값의 관계로만 정해지므로 cmp_to_key 가 필요합니다.',
          },
          {
            text: '문자열 정렬은 사전순이라 숫자에 쓸 수 없다',
            why: '사전순 자체는 쓸 수 있습니다. 다만 자릿수가 다를 때 원하는 순서와 어긋나는 것이 문제입니다.',
          },
          {
            text: '정수 정렬은 안정 정렬이 아니기 때문이다',
            why: '파이썬 정렬은 안정 정렬입니다. 안정성과는 무관한 문제입니다.',
          },
          {
            text: '자릿수를 먼저 맞춰야 하기 때문이다',
            why: '자릿수를 맞추는 것은 요령 중 하나(s * 3)일 뿐, 근본 원인은 순서가 두 값의 관계로만 정해진다는 데 있습니다.',
          },
        ]}
      />
    </Lesson>
  );
}
