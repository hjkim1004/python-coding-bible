import Code from '../../components/Code';
import Figure from '../../components/Figure';
import Lesson, { Section } from '../../components/Lesson';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Recall from '../../components/Recall';
import Table from '../../components/Table';
import Term from '../../components/Term';

export default function Complexity() {
  return (
    <Lesson
      part="0부 · 파이썬 첫걸음"
      title="빠르다는 것"
      lede="코딩테스트에는 시간 제한이 있습니다. 이 강은 O(N)이라는 표기를 읽는 법 — 이 책의 나머지 전부가 그 표기로 말합니다."
      tags={['0-9', '시간 복잡도', 'O 표기']}
    >
      <Recall from="p0-loop">
        <p>
          0-5에서 <Term>for</Term>로 <Term>n</Term>번 도는 법을 봤습니다.
          한 번 도는 데 드는 시간은 아주 짧지만, <strong>몇 번 도느냐</strong>는
          우리가 짠 코드가 정합니다.
        </p>
        <p>
          채점 서버는 대개 <strong>1초에서 5초</strong> 안에 답이 나오기를 요구합니다.
          그래서 «맞는 답»만으로는 부족하고 «제 시간 안의 답»이어야 합니다.
        </p>
      </Recall>

      <Section no={1} title="시계 대신 «몇 번 도는가»를 센다">
        <p>
          같은 코드도 컴퓨터가 다르면 걸리는 시간이 다릅니다. 그래서 초를 재는 대신
          <strong>«입력이 커질 때 일이 몇 배로 늘어나는가»</strong>를 셉니다.
          그것을 적는 약속이 <Term>O</Term> 표기입니다.
        </p>

        <Code label="세어 보기">{`
arr = [5, 3, 9, 1]

# ① 몇 개가 들어 있든 딱 한 번 본다
print(arr[0])          # => 5

# ② 들어 있는 만큼 본다 — 4개면 4번, 10만 개면 10만 번
for x in arr:
    pass

# ③ 하나마다 또 전부를 본다 — 4개면 16번, 10만 개면 100억 번
for x in arr:
    for y in arr:
        pass
`}</Code>

        <p>
          <Term>N</Term>을 «입력의 크기»라 할 때, 위 셋은 각각
          <strong>1번</strong>, <strong>N번</strong>, <strong>N × N번</strong>입니다.
          이것을 <Term>O(1)</Term>, <Term>O(N)</Term>, <Term>O(N²)</Term>이라 적습니다.
        </p>

        <Note tone="info" title="정확한 횟수가 아니라 «모양»을 적습니다">
          <p>
            <Term>2N + 5</Term>번 도는 코드도 그냥 <Term>O(N)</Term>이라 씁니다.
            <strong>N이 10만쯤 되면 앞의 2와 뒤의 5는 결과를 바꾸지 못하기 때문</strong>입니다.
            우리가 알고 싶은 것은 «N이 열 배가 되면 일이 몇 배가 되는가»뿐입니다.
          </p>
        </Note>
      </Section>

      <Section no={2} title="자주 나오는 다섯 가지">
        <Table
          head={['표기', '무슨 뜻', '어디서 보나']}
          rows={[
            ['O(1)', '입력이 커져도 늘 같다', 'arr[3], 딕셔너리에서 꺼내기'],
            ['O(log N)', '반씩 줄여 가며 찾는다', '이진 탐색 · 힙'],
            ['O(N)', '한 번 훑는다', '반복문 한 겹, sum, in'],
            ['O(N log N)', '훑기 + 반씩 줄이기', '정렬'],
            ['O(N²)', '하나마다 또 전부 훑는다', '반복문 두 겹'],
          ]}
        />

        <Figure
          label="입력 크기가 커질 때 O(1)·O(log N)·O(N)·O(N제곱)이 각각 얼마나 가파르게 늘어나는지 보여 주는 선 그래프"
          viewBox="0 0 640 260"
          caption="가로는 입력 크기 N, 세로는 해야 할 일의 양. O(N²)는 조금만 커져도 천장을 뚫습니다."
        >
          {/* 축 */}
          <line x1="56" y1="220" x2="600" y2="220" stroke="var(--divider)" strokeWidth="1.5" />
          <line x1="56" y1="220" x2="56" y2="24" stroke="var(--divider)" strokeWidth="1.5" />
          <text x="596" y="244" textAnchor="end" className="fig-small">입력 크기 N →</text>
          <text x="56" y="18" textAnchor="middle" className="fig-small">일의 양</text>

          {/* O(N^2) */}
          <path d="M56 220 Q 200 214 300 150 T 420 28" fill="none" stroke="var(--danger)" strokeWidth="2.5" />
          <text x="430" y="34" className="fig-accent" fill="var(--danger)">O(N²)</text>

          {/* O(N) */}
          <line x1="56" y1="220" x2="560" y2="70" stroke="var(--primary)" strokeWidth="2.5" />
          <text x="566" y="70" className="fig-accent">O(N)</text>

          {/* O(log N) */}
          <path d="M56 220 Q 160 176 300 166 T 560 158" fill="none" stroke="var(--success)" strokeWidth="2.5" />
          <text x="566" y="158" className="fig-accent" fill="var(--success)">O(log N)</text>

          {/* O(1) */}
          <line x1="56" y1="206" x2="560" y2="206" stroke="var(--text-faint)" strokeWidth="2" strokeDasharray="5 5" />
          <text x="566" y="206" className="fig-small">O(1)</text>
        </Figure>

        <p>
          위에서 아래로 갈수록 느립니다. <Term>O(log N)</Term>이 특히 좋습니다 —
          <strong>N이 10억이어도 서른 번</strong>이면 끝나기 때문입니다.
          반으로 줄이기를 서른 번 하면 10억이 1이 됩니다.
        </p>
      </Section>

      <Section no={3} title="파이썬은 1초에 몇 번 도는가">
        <p>
          어림잡아 <strong>1초에 2천만 번에서 5천만 번</strong>입니다. 이 수 하나만
          들고 있으면 «내 풀이가 통과할까»를 코드를 짜기 전에 가늠할 수 있습니다.
        </p>

        <Table
          head={['입력 크기 N', '가능한 복잡도', '메모']}
          rows={[
            ['N ≤ 10', 'O(N!) · O(2^N)', '전부 해 봐도 된다'],
            ['N ≤ 1,000', 'O(N²)', '두 겹 반복문이 100만 번'],
            ['N ≤ 100,000', 'O(N log N)', '정렬까지는 괜찮다'],
            ['N ≤ 10,000,000', 'O(N)', '한 번 훑는 것만'],
            ['N이 10억 이상', 'O(log N)', '이진 탐색 · 수식']
          ]}
        />

        <Note tone="success" title="문제의 제한이 풀이를 알려 줍니다">
          <p>
            문제에 «N은 1,000 이하»라고 적혀 있다면 <strong>두 겹 반복문을 써도 된다는
            뜻</strong>이고, «N은 10만 이하»라면 <strong>두 겹은 쓰지 말라는 뜻</strong>입니다.
            제한은 조건이 아니라 <strong>힌트</strong>입니다. 문제를 읽을 때
            제일 먼저 보세요.
          </p>
        </Note>
      </Section>

      <Section no={4} title="그래서 왜 이걸 배우나">
        <p>
          답이 맞는데도 떨어지는 경우가 있기 때문입니다. 채점 결과가 «틀렸습니다»가
          아니라 <strong>«시간 초과»</strong>로 나오면, 그것은
          <strong>«생각은 맞았는데 방법이 느리다»</strong>는 뜻입니다.
        </p>
        <p>
          1부부터는 «어떻게 쓰는가»가 아니라 <strong>«왜 그렇게 써야 하는가»</strong>입니다.
          그리고 그 «왜»의 대답이 거의 언제나 이 표기로 나옵니다 —
          «리스트의 <Term>in</Term>은 <Term>O(N)</Term>인데 집합은 <Term>O(1)</Term>이라서»처럼요.
        </p>

        <Note tone="info" title="지금 다 외우지 않아도 됩니다">
          <p>
            <strong>«O(N)은 한 번 훑는 것, O(N²)는 두 겹»</strong> 이 둘만 들고 가세요.
            나머지는 1부에서 실제로 쓰이는 자리마다 다시 짚습니다.
            1-3의 리스트 표가 첫 번째입니다.
          </p>
        </Note>
      </Section>

      <Section no={5} title="0부를 마치며">
        <p>
          여기까지가 1부를 읽는 데 필요한 전부입니다. 화면에 찍고, 입력을 받고,
          값에 이름을 붙이고, 갈림길에서 고르고, 되풀이하고, 담아 두고, 함수로 묶고,
          자기를 부르고, 빠르기를 가늠하는 것.
        </p>
        <p>
          <strong>1부에서는 이 도구들을 시험장의 것으로 바꿉니다.</strong>
          방금 배운 <Term>input()</Term>이 왜 문제가 되는지부터 시작합니다.
        </p>
      </Section>

      <Quiz
        question="문제에 «N은 100,000 이하» 라고 적혀 있습니다. 무엇을 알 수 있을까요?"
        choices={[
          {
            text: '두 겹 반복문(O(N²))은 쓰지 말라는 뜻이다',
            right: true,
            why: '10만의 제곱은 100억입니다. 파이썬이 1초에 수천만 번을 도니 몇 분이 걸립니다. 이 제한은 O(N) 이나 O(N log N) 으로 풀라는 힌트입니다. 제한은 조건이 아니라 힌트이므로 문제를 읽을 때 가장 먼저 보세요.',
          },
          {
            text: '메모리가 부족하니 리스트를 쓰지 말라는 뜻이다',
            why: '10만 개짜리 리스트는 메모리에 아무 부담이 없습니다. 제한이 말하는 것은 대개 시간 쪽입니다.',
          },
          {
            text: '입력이 작으니 완전 탐색으로 풀어도 된다는 뜻이다',
            why: '완전 탐색이 허락되는 크기는 대개 N이 20 안팎일 때입니다. 10만은 그보다 훨씬 큽니다.',
          },
          {
            text: '아무것도 알 수 없다 — 제한은 그냥 조건일 뿐이다',
            why: '제한은 출제자가 남긴 가장 큰 힌트입니다. 어떤 복잡도까지 허락되는지를 알려 줍니다.',
          },
        ]}
      />
    </Lesson>
  );
}
