import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Table from '../../components/Table';
import Term from '../../components/Term';

export default function Itertools() {
  return (
    <Lesson
      part="2부 · 여섯 개의 표준 도구"
      title="itertools"
      lede="완전 탐색은 «모든 경우»를 만드는 일입니다. 그 목록을 직접 재귀로 짜지 않아도 됩니다."
      tags={['2-3', '순열과 조합', '완전 탐색']}
    >
      <Section no={1} title="넷 중 무엇을 쓸지 고르기">
        <Table
          head={['함수', '순서를 따지나', '같은 것을 다시 뽑나', '개수']}
          rows={[
            ['permutations(a, r)', '따진다', '아니오', 'nPr'],
            ['combinations(a, r)', '따지지 않는다', '아니오', 'nCr'],
            ['product(a, repeat=r)', '따진다', '예', 'n^r'],
            ['combinations_with_replacement(a, r)', '따지지 않는다', '예', 'nHr'],
          ]}
        />

        <Code label="네 가지를 눈으로">{`
from itertools import permutations, combinations, product, combinations_with_replacement

a = ['A', 'B', 'C']

print(list(permutations(a, 2)))
# [('A','B'), ('A','C'), ('B','A'), ('B','C'), ('C','A'), ('C','B')]

print(list(combinations(a, 2)))
# [('A','B'), ('A','C'), ('B','C')]

print(list(product(a, repeat=2)))
# ('A','A') 부터 ('C','C') 까지 9가지

print(list(combinations_with_replacement(a, 2)))
# [('A','A'), ('A','B'), ('A','C'), ('B','B'), ('B','C'), ('C','C')]
`}</Code>

        <Note tone="success" title="«순서가 바뀌면 다른 답인가?»만 물으세요">
          <p>
            번호표를 나눠 주는 문제라면 순서가 중요하니 <Term>permutations</Term>,
            팀을 뽑는 문제라면 순서가 상관없으니 <Term>combinations</Term>입니다.
            이 한 질문이면 넷 중 하나가 정해집니다.
          </p>
        </Note>
      </Section>

      <Section no={2} title="product 는 중첩 for 문을 편다">
        <p>
          «각 칸에 상/하/좌/우 중 하나를 고르는 경우를 모두 시도»처럼 for 문을
          몇 겹 써야 할지 모를 때, <Term>product</Term>는 그 겹을 <Term>repeat</Term> 하나로 바꿉니다.
        </p>

        <Code label="중첩 루프 펴기">{`
from itertools import product

# for i in range(3):
#     for j in range(3):
#         for k in range(3):
for i, j, k in product(range(3), repeat=3):
    pass

# 2차원 격자 전체 돌기 — 두 겹이 한 줄로
n, m = 3, 4
for r, c in product(range(n), range(m)):
    pass
`}</Code>
      </Section>

      <Section no={3} title="누적합과 이어 붙이기">
        <Code label="accumulate 와 chain">{`
from itertools import accumulate, chain

print(list(accumulate([1, 2, 3, 4])))       # [1, 3, 6, 10]  누적합
print(list(accumulate([3, 1, 4], max)))     # [3, 3, 4]      누적 최댓값

print(list(chain([1, 2], [3, 4])))          # [1, 2, 3, 4]
print(list(chain.from_iterable([[1, 2], [3]])))   # [1, 2, 3]  2차원 펴기
`}</Code>

        <p>
          구간 합을 여러 번 묻는 문제라면 <Term>accumulate</Term>로 누적합 배열을 한 번
          만들어 두고, 각 질문에 <Term>prefix[b] - prefix[a-1]</Term>로 O(1)에 답하세요.
        </p>
      </Section>

      <Section no={4} title="경우의 수를 세어 보고 쓰기">
        <Note tone="danger" title="완전 탐색은 «작을 때만» 완전 탐색입니다">
          <p>
            <Term>permutations</Term>의 개수는 계승으로 늘어납니다. 원소가 10개면 360만,
            <strong>13개면 60억</strong>입니다. 문제의 <Term>N</Term> 제한이 10 언저리로
            작다면 완전 탐색을 쓰라는 신호이고, 20을 넘어가면 다른 접근(DP·그리디)을
            찾으라는 신호입니다.
          </p>
        </Note>

        <p>
          그리고 이 함수들이 돌려주는 것은 리스트가 아니라 <strong>반복자</strong>입니다.
          한 번 돌면 소진되므로, 두 번 써야 한다면 <Term>list()</Term>로 받아 두세요.
          반대로 한 번만 돌 것이라면 <Term>list()</Term>로 감싸지 않는 편이 메모리에 이롭습니다.
        </p>
      </Section>

      <Quiz
        question="서로 다른 카드 N장 중 3장을 뽑아 만들 수 있는 «합»의 종류를 구합니다. 어떤 함수가 맞을까요?"
        choices={[
          {
            text: 'combinations(cards, 3) — 순서가 바뀌어도 합은 같다',
            right: true,
            why: '(1,2,3) 과 (3,2,1) 은 합이 같으므로 순서를 따질 이유가 없습니다. permutations 를 쓰면 같은 조합을 6번씩 계산해 6배 느려집니다.',
          },
          {
            text: 'permutations(cards, 3) — 세 장을 순서대로 뽑으니까',
            why: '뽑는 행위에 순서가 있어 보여도, 답으로 쓰는 값(합)이 순서와 무관하면 조합입니다. 같은 결과를 3! 번 중복 계산하게 됩니다.',
          },
          {
            text: 'product(cards, repeat=3) — 세 자리를 채우니까',
            why: 'product 는 같은 카드를 다시 뽑는 경우까지 포함합니다. «서로 다른 카드 3장» 이라는 조건이 깨집니다.',
          },
          {
            text: 'combinations_with_replacement(cards, 3)',
            why: '같은 카드를 여러 번 뽑는 것을 허용하는 함수입니다. 카드가 한 장씩만 있다면 조건에 맞지 않습니다.',
          },
        ]}
      />
    </Lesson>
  );
}
