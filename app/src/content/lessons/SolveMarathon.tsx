import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Recall from '../../components/Recall';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Term from '../../components/Term';

export default function SolveMarathon() {
  return (
    <Lesson
      part="4부 · 기출 해설"
      title="완주하지 못한 선수"
      lede="정답은 한 줄로 보이는데 정확도 테스트만 통과하고 효율성에서 떨어집니다. 왜 그런지가 이 문제의 전부입니다."
      tags={['4-2', '해시', 'Lv.1']}
      source={{ label: '프로그래머스', href: 'https://school.programmers.co.kr/learn/courses/30/lessons/42576' }}
    >
      <Recall from={['p2-collections', 'p1-dict']}>
        <p>
          2-1에서 <Term>Counter</Term>가 세는 일만 한다고 했고, 뺄셈이 된다는 것도 봤습니다.
          1-5에서는 <strong>집합에는 «몇 개인지»가 없다</strong>고 했습니다.
        </p>
        <p>
          이 문제는 그 «몇 개인지»가 정답을 가릅니다. 동명이인이 있기 때문입니다.
          <strong>집합으로 풀면 조용히 틀립니다.</strong>
        </p>
      </Recall>

      <Section no={1} title="문제">
        <p>
          마라톤 참가자 명단 <Term>participant</Term>와 완주자 명단 <Term>completion</Term>이
          주어집니다. 완주하지 못한 선수 한 명의 이름을 돌려줍니다.
          <strong>참가자는 최대 10만 명</strong>이고 <strong>동명이인이 있을 수 있습니다.</strong>
        </p>

        <Note tone="warn" title="이 두 줄이 문제의 전부입니다">
          <p>
            «10만 명»은 O(N²)을 쓰지 말라는 뜻이고, «동명이인»은 이름을 집합으로 다루지
            말라는 뜻입니다. 제한 조건이 곧 풀이를 지정하는, 아주 정직한 문제입니다.
          </p>
        </Note>
      </Section>

      <Section no={2} title="틀리는 풀이 둘">
        <Code label="① 효율성에서 떨어진다">{`
def solution(participant, completion):
    for name in completion:
        participant.remove(name)     # remove 는 O(N)
    return participant[0]
`}</Code>

        <p>
          <Term>list.remove</Term>는 찾는 데 O(N), 뒤를 당기는 데 또 O(N)입니다.
          10만 번 반복하면 100억 번이라 <strong>정확도는 통과하고 효율성에서 떨어집니다.</strong>
        </p>

        <Code label="② 동명이인에서 틀린다">{`
def solution(participant, completion):
    return list(set(participant) - set(completion))[0]
`}</Code>

        <Note tone="danger" title="집합은 «몇 명인지»를 잊어버립니다">
          <p>
            참가자에 «leo»가 둘이고 완주자에 «leo»가 하나면 답은 «leo»입니다.
            그런데 집합으로 빼면 두 «leo»가 하나로 뭉쳐 통째로 사라져
            <strong>결과가 빈 리스트</strong>가 됩니다. 개수가 의미를 갖는 문제에
            집합을 쓰면 안 되는 이유입니다.
          </p>
        </Note>
      </Section>

      <Section no={3} title="세는 문제이므로 Counter">
        <p>
          «누가 빠졌나»가 아니라 <strong>«몇 명이 빠졌나»</strong>를 묻는 문제입니다.
          2-1의 <Term>Counter</Term>는 뺄셈을 지원하므로 한 줄이면 끝납니다.
        </p>

        <Code label="제출용 풀이">{`
from collections import Counter

def solution(participant, completion):
    # 참가자에서 완주자를 빼면 완주하지 못한 사람만 남는다
    return (Counter(participant) - Counter(completion)).most_common(1)[0][0]


print(solution(['leo', 'kiki', 'eden'], ['eden', 'kiki']))              # => leo
print(solution(['marina', 'josipa', 'nikola', 'vinko', 'filipa'],
               ['josipa', 'filipa', 'marina', 'nikola']))               # => vinko
print(solution(['mislav', 'stanko', 'mislav', 'ana'],
               ['stanko', 'ana', 'mislav']))                            # => mislav
`}</Code>

        <p>
          <Term>Counter</Term>의 뺄셈은 <strong>0 이하가 된 항목을 자동으로 버립니다.</strong>
          그래서 남는 것은 정확히 «참가만 하고 완주하지 못한 사람»뿐입니다.
          전체가 O(N)입니다.
        </p>
      </Section>

      <Section no={4} title="정렬로도 풀린다">
        <p>
          <Term>Counter</Term>가 떠오르지 않아도 길은 있습니다. 두 명단을 정렬해
          나란히 비교하면 <strong>처음으로 어긋나는 자리</strong>가 답입니다.
          O(N log N)이라 이것도 통과합니다.
        </p>

        <Code label="정렬 풀이">{`
def solution(participant, completion):
    participant.sort()
    completion.sort()

    for p, c in zip(participant, completion):
        if p != c:
            return p
    return participant[-1]      # 끝까지 같았다면 마지막 사람이 빠진 것
`}</Code>

        <Note tone="success" title="마지막 줄을 잊지 마세요">
          <p>
            완주자는 참가자보다 정확히 한 명 적습니다. <Term>zip</Term>은 짧은 쪽에서
            멈추므로 <strong>맨 마지막 참가자는 비교되지 않습니다.</strong>
            끝까지 어긋나지 않았다면 그 사람이 답입니다.
          </p>
        </Note>
      </Section>

      <Quiz
        question="set(participant) - set(completion) 으로 풀면 어떤 입력에서 무너질까요?"
        choices={[
          {
            text: '동명이인이 있을 때 — 개수 정보가 사라진다',
            right: true,
            why: "참가자에 'mislav' 가 둘, 완주자에 하나여도 집합끼리 빼면 통째로 사라져 빈 결과가 나옵니다. «몇 개인가» 가 의미를 갖는 문제에서는 집합이 아니라 Counter 나 정렬을 써야 합니다.",
          },
          {
            text: '참가자가 10만 명일 때 — 집합 연산이 O(N²) 이다',
            why: '집합 연산 자체는 O(N) 에 가깝습니다. 크기는 문제가 아니고, 사라지는 것은 중복 정보입니다.',
          },
          {
            text: '이름에 대문자가 섞여 있을 때',
            why: '제한 조건상 이름은 소문자 알파벳입니다. 설령 대문자가 있어도 집합 연산은 정상 동작합니다.',
          },
          {
            text: '완주자가 한 명도 없을 때',
            why: '그 경우에도 집합 연산은 답을 냅니다. 다만 완주자 수는 참가자보다 정확히 하나 적다고 보장되어 있습니다.',
          },
        ]}
      />
    </Lesson>
  );
}
