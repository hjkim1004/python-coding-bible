import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Table from '../../components/Table';
import Term from '../../components/Term';

export default function Containers() {
  return (
    <Lesson
      part="0부 · 파이썬 첫걸음"
      title="값을 담아 두기"
      lede="값 하나에 이름 하나씩 붙이다 보면 끝이 없습니다. 여러 개를 한 이름에 담는 세 가지를 배웁니다."
      tags={['0-6', '리스트', '딕셔너리']}
    >
      <Section no={1} title="리스트 — 순서대로 담는다">
        <Code label="만들고 꺼내기">{`
scores = [90, 80, 70]

print(scores[0])       # => 90    첫 번째는 0번이다
print(scores[2])       # => 70
print(scores[-1])      # => 70    맨 뒤는 -1번
print(len(scores))     # => 3     몇 개인가
`}</Code>

        <Note tone="warn" title="번호는 0부터 셉니다">
          <p>
            세 개짜리 리스트의 번호는 <strong>0, 1, 2</strong>입니다.
            <Term>scores[3]</Term>은 <Term>IndexError</Term>입니다.
            반면 <strong>음수는 뒤에서부터</strong>라 오류가 아닙니다 —
            <Term>scores[-1]</Term>은 맨 뒤입니다. 이 «음수가 조용히 동작한다»는 성질이
            나중에 격자 탐색에서 함정이 됩니다.
          </p>
        </Note>

        <Code label="넣고 빼고 바꾸기">{`
scores = [90, 80]

scores.append(70)      # 뒤에 하나 붙이기
print(scores)          # => [90, 80, 70]

scores[0] = 100        # 그 자리를 바꾸기
print(scores)          # => [100, 80, 70]

last = scores.pop()    # 맨 뒤를 빼서 돌려받기
print(last, scores)    # => 70 [100, 80]

print(sum(scores), max(scores), min(scores))   # => 180 100 80
print(sorted([3, 1, 2]))                       # => [1, 2, 3]
`}</Code>

        <p>
          «비어 있는 리스트에서 시작해 반복문을 돌며 <Term>append</Term>»는
          코딩테스트에서 가장 많이 쓰는 모양입니다.
        </p>

        <Code label="가장 많이 쓰는 모양">{`
squares = []
for i in range(5):
    squares.append(i * i)

print(squares)         # => [0, 1, 4, 9, 16]
`}</Code>
      </Section>

      <Section no={2} title="딕셔너리 — 이름표를 붙여 담는다">
        <p>
          번호가 아니라 <strong>내가 정한 이름</strong>으로 꺼내고 싶을 때 씁니다.
          «이름 → 값»의 짝을 모아 둔 것입니다.
        </p>

        <Code label="딕셔너리">{`
score = {'국어': 90, '수학': 80}

print(score['국어'])          # => 90
score['영어'] = 70            # 새 짝을 넣는다
print(score)                  # => {'국어': 90, '수학': 80, '영어': 70}

print('수학' in score)        # => True    그런 이름표가 있나
print(score.get('과학', 0))   # => 0       없으면 이 값을 대신 준다

for subject, value in score.items():
    print(subject, value)
# => 국어 90
# => 수학 80
# => 영어 70
`}</Code>

        <Note tone="danger" title="없는 이름표를 [] 로 꺼내면 멈춥니다">
          <p>
            <Term>score['과학']</Term>은 <Term>KeyError</Term>입니다.
            있는지 모를 때는 <Term>.get(이름, 기본값)</Term>을 쓰거나
            <Term>in</Term>으로 먼저 확인하세요.
          </p>
        </Note>
      </Section>

      <Section no={3} title="튜플 — 바꿀 수 없게 담는다">
        <p>
          리스트와 거의 같지만 <strong>한 번 만들면 바꿀 수 없습니다.</strong>
          좌표처럼 «둘이 한 몸인 값»을 담을 때 씁니다.
        </p>

        <Code label="튜플">{`
point = (3, 4)

x, y = point           # 나눠 담기
print(x, y)            # => 3 4

# point[0] = 9         # ❌ TypeError — 튜플은 바꿀 수 없다

# 함수가 값을 둘 돌려주면 사실 튜플이다
print(divmod(7, 2))    # => (3, 1)
`}</Code>

        <Note tone="info" title="바꿀 수 없다는 것이 쓸모가 됩니다">
          <p>
            바꿀 수 없기 때문에 <strong>딕셔너리의 이름표가 될 수 있습니다.</strong>
            <Term>{"visited[(3, 4)]"}</Term>처럼 좌표를 이름표로 쓰는 일이 그래서 가능합니다.
            리스트는 바뀔 수 있어서 이름표가 되지 못합니다.
          </p>
        </Note>
      </Section>

      <Section no={4} title="어느 것을 쓸까">
        <ul>
          <li><strong>순서대로 여러 개</strong> → 리스트</li>
          <li><strong>이름표로 찾아야 한다</strong> → 딕셔너리</li>
          <li><strong>한 몸인 값 몇 개, 바뀌지 않는다</strong> → 튜플</li>
        </ul>
        <p>
          세 가지의 «숨은 비용»과 더 빠른 쓰임은 1-3과 1-5에서 이어집니다.
          지금은 <strong>담고 꺼내는 법</strong>만 손에 익히면 충분합니다.
        </p>
      </Section>

      <Section no={5} title="여기까지의 손버릇">
        <p>
          0부에서 쓸 것만 모았습니다. <strong>더 많은 메서드와 그 비용은 1-3·1-5</strong>에서
          표로 다시 정리합니다.
        </p>

        <Table
          head={['하고 싶은 일', '리스트', '딕셔너리']}
          rows={[
            ['만들기', 'arr = [] 또는 [1, 2]', "d = {} 또는 {'a': 1}"],
            ['꺼내기', 'arr[0] · arr[-1]', "d['a'] · d.get('a', 0)"],
            ['넣기', 'arr.append(x)', "d['b'] = 2"],
            ['빼기', 'arr.pop()', "d.pop('a')"],
            ['있나 보기', 'x in arr', "'a' in d"],
            ['개수', 'len(arr)', 'len(d)'],
            ['전부 훑기', 'for x in arr:', 'for k, v in d.items():'],
          ]}
        />
      </Section>

      <Quiz
        question="scores = [90, 80, 70] 일 때 scores[3] 은?"
        choices={[
          {
            text: 'IndexError — 번호는 0, 1, 2 뿐이다',
            right: true,
            why: '세 개짜리 리스트의 번호는 0부터 2까지입니다. 다만 음수 번호는 뒤에서부터 세는 정상 동작이라 오류가 나지 않습니다 — scores[-1] 은 맨 뒤인 70 입니다.',
          },
          {
            text: '70 — 세 번째 값',
            why: '세 번째 값은 scores[2] 입니다. 번호가 0부터 시작하므로 한 칸씩 밀립니다.',
          },
          {
            text: 'None',
            why: '파이썬은 없는 자리를 조용히 None 으로 주지 않습니다. 그 자리에서 멈추고 알려 줍니다.',
          },
          {
            text: '리스트가 자동으로 늘어난다',
            why: '읽기로는 늘어나지 않습니다. 뒤에 붙이려면 append 를 써야 합니다.',
          },
        ]}
      />
    </Lesson>
  );
}
