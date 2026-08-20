import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Term from '../../components/Term';

export default function MakingFunctions() {
  return (
    <Lesson
      part="0부 · 파이썬 첫걸음"
      title="함수와 가져오기"
      lede="같은 일을 이름 붙여 두고 부르는 법, 그리고 남이 만들어 둔 것을 데려오는 법. 0부의 마지막입니다."
      tags={['0-7', 'def', 'import']}
    >
      <Section no={1} title="함수를 만든다">
        <p>
          <Term>def</Term>는 «이런 이름의 일을 정의한다»입니다. 정의만으로는
          아무 일도 일어나지 않고, <strong>불러야</strong> 실행됩니다.
        </p>

        <Code label="만들고 부르기">{`
def add(a, b):        # a 와 b 를 받아
    return a + b      # 더한 값을 돌려준다

print(add(2, 3))      # => 5
print(add(10, 20))    # => 30
`}</Code>

        <p>
          <Term>a</Term>와 <Term>b</Term>는 <strong>받을 자리</strong>이고,
          <Term>add(2, 3)</Term>의 2와 3이 그 자리에 들어갑니다.
          <Term>return</Term>은 <strong>값을 돌려주며 함수를 끝냅니다.</strong>
        </p>

        <Code label="return 이 없으면">{`
def shout(word):
    print(word + '!')     # 화면에 찍기만 한다

result = shout('안녕')     # => 안녕!     화면에는 찍히지만
print(result)             # => None     돌려준 값은 없다
`}</Code>

        <Note tone="warn" title="«찍는 것»과 «돌려주는 것»은 다릅니다">
          <p>
            <Term>print</Term>는 사람에게 보여 주는 일이고 <Term>return</Term>은
            코드에게 값을 건네는 일입니다. 프로그래머스처럼
            <strong>«함수를 완성하라»는 문제에서는 반드시 <Term>return</Term></strong>이어야
            합니다 — <Term>print</Term>로 찍으면 채점기는 «아무것도 돌려주지 않았다»고 봅니다.
            반대로 백준식 문제는 <Term>print</Term>로 출력해야 합니다.
          </p>
        </Note>
      </Section>

      <Section no={2} title="일찍 돌려주기">
        <p>
          <Term>return</Term>을 만나면 그 즉시 함수가 끝납니다. 이 성질을 쓰면
          조건을 겹겹이 쌓지 않아도 됩니다.
        </p>

        <Code label="먼저 걸러 내기">{`
def grade(score):
    if score >= 90:
        return 'A'        # 여기서 끝. 아래는 보지 않는다
    if score >= 80:
        return 'B'
    return 'C'

print(grade(95), grade(85), grade(20))    # => A B C
`}</Code>
      </Section>

      <Section no={3} title="함수 안의 이름은 함수 안에서만">
        <Code label="바깥과 안">{`
total = 0

def wrong():
    total = 10        # 바깥의 total 이 아니라 «안쪽의 새 total» 을 만든 것이다

wrong()
print(total)          # => 0    바깥은 그대로다

def right(value):
    return value + 10  # 받아서 돌려주는 편이 낫다

total = right(total)
print(total)          # => 10
`}</Code>

        <Note tone="success" title="«받아서 돌려주기»를 기본으로">
          <p>
            바깥 변수를 함수 안에서 바꾸는 방법(<Term>global</Term>)이 있지만,
            <strong>어디서 값이 바뀌었는지 알 수 없어지므로</strong> 쓰지 않는 편이 좋습니다.
            필요한 것을 인자로 받고 결과를 <Term>return</Term>하면 함수 하나가
            «무엇을 하는지»가 그 줄에서 다 보입니다. 다만 리스트를 넘길 때는
            이야기가 다릅니다 — 1-7에서 다룹니다.
          </p>
        </Note>
      </Section>

      <Section no={4} title="남이 만들어 둔 것을 데려온다">
        <p>
          파이썬에는 이미 만들어진 도구 묶음이 함께 딸려 옵니다.
          <Term>import</Term>로 데려와 쓰면 됩니다.
        </p>

        <Code label="import 의 두 가지 모양">{`
import math                       # 묶음째 데려오기
print(math.gcd(12, 18))           # => 6      묶음 이름을 앞에 붙여 쓴다

from collections import deque     # 묶음에서 필요한 것만
q = deque([1, 2])                 # 이름을 그대로 쓴다
q.append(3)
print(q)                          # => deque([1, 2, 3])
`}</Code>

        <Note tone="info" title="2부가 통째로 이 이야기입니다">
          <p>
            <strong>2부의 여섯 강</strong>이 «직접 만들면 느린 일을 대신해 주는
            표준 도구»를 다룹니다. 그때 <Term>import</Term> 문이 계속 나오는데,
            지금 이 두 줄이면 전부 읽을 수 있습니다.
          </p>
        </Note>
      </Section>

      <Section no={5} title="다음 두 강">
        <p>
          여기까지가 파이썬을 «쓰는» 법입니다. 0부에 두 강이 더 남았는데,
          둘 다 <strong>1부를 읽으려면 필요한 것</strong>입니다.
        </p>
        <ul>
          <li>
            <strong>0-8 재귀</strong> — 방금 만든 함수가 <strong>자기 자신을 부르면</strong>
            무슨 일이 생기는지. 3부의 절반이 이 위에 서 있습니다.
          </li>
          <li>
            <strong>0-9 빠르다는 것</strong> — <Term>O(N)</Term>이라는 표기를 읽는 법.
            이 책의 나머지 전부가 그 표기로 말합니다.
          </li>
        </ul>
      </Section>

      <Quiz
        question="프로그래머스처럼 «함수를 완성하라»는 문제에서 답을 print 로 찍으면 어떻게 될까요?"
        choices={[
          {
            text: '오답이 된다 — 채점기는 return 으로 돌려준 값을 본다',
            right: true,
            why: 'print 는 사람에게 보여 주는 일이고 return 은 코드에게 값을 건네는 일입니다. 채점기는 함수를 부른 뒤 돌려받은 값을 정답과 비교하므로, return 이 없으면 None 을 돌려준 것이 되어 틀립니다. 화면에 맞는 답이 찍혀 있어도 그렇습니다.',
          },
          {
            text: '정답으로 인정된다 — 화면에 답이 나왔으니까',
            why: '화면 출력은 채점 대상이 아닙니다. 백준식 문제라면 반대로 print 가 맞습니다 — 문제가 무엇을 요구하는지 보고 골라야 합니다.',
          },
          {
            text: '오류가 난다',
            why: '오류는 나지 않습니다. 조용히 None 을 돌려주고 오답이 되는 쪽이라 더 찾기 어렵습니다.',
          },
          {
            text: 'print 와 return 은 같은 일이다',
            why: '완전히 다른 일입니다. 이 둘을 구분하는 것이 0부에서 가장 중요한 것 중 하나입니다.',
          },
        ]}
      />
    </Lesson>
  );
}
