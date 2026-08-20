import Code from '../../components/Code';
import Figure from '../../components/Figure';
import Lesson, { Section } from '../../components/Lesson';
import Recall from '../../components/Recall';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Table from '../../components/Table';
import Term from '../../components/Term';

export default function Lists() {
  return (
    <Lesson
      part="1부 · 통과하는 문법"
      title="리스트"
      lede="리스트는 무엇이든 받아 줍니다. 그 친절함이 어디서 O(N)을 청구하는지 알아야 시간 초과를 피할 수 있습니다."
      tags={['1-3', '복잡도', '얕은 복사']}
    >
      <Recall from={['p0-container', 'p0-complexity']}>
        <p>
          0-6에서 리스트를 만들고, <Term>append</Term>로 뒤에 붙이고,
          <Term>arr[0]</Term>으로 꺼냈습니다. 번호가 0부터라는 것과
          <Term>arr[-1]</Term>이 맨 뒤라는 것도 봤습니다.
        </p>
        <p>
          0-9에서는 <Term>O(N)</Term>이 «한 번 훑는 것»이라고 했습니다.
          <strong>그 코드는 전부 맞습니다.</strong> 여기서는 그중 어떤 것이
          겉보기에는 한 줄이면서 <strong>속으로는 N번 도는지</strong>를 봅니다 —
          시간 초과의 가장 흔한 출처입니다.
        </p>
      </Recall>

      <Section no={1} title="연산마다 값이 다르다">
        <p>
          리스트는 <strong>배열</strong>입니다. 값들이 메모리에
          <strong>한 줄로 나란히</strong> 놓여 있다는 뜻입니다. 그래서
          «세 번째 것을 달라»는 즉시 답할 수 있습니다 — 시작 자리에서 세 칸만 가면
          되니까요. 이것이 <Term>O(1)</Term>입니다.
        </p>
        <p>
          문제는 <strong>중간이나 앞을 건드릴 때</strong>입니다. 나란히 놓여 있어야
          하므로, 앞의 하나를 빼면 <strong>뒤의 것을 전부 한 칸씩 당겨야</strong> 합니다.
          그 «전부»가 <Term>O(N)</Term>입니다.
        </p>
        <p>
          한마디로 <strong>끝에서 하는 일은 싸고, 앞에서 하는 일은 비쌉니다.</strong>
        </p>

        <Figure
          label="리스트에서 맨 앞을 빼면 뒤의 값들이 전부 한 칸씩 왼쪽으로 당겨지는 모습"
          viewBox="0 0 640 210"
          caption="맨 뒤를 빼면 아무도 움직이지 않지만, 맨 앞을 빼면 뒤의 전부가 한 칸씩 옮겨 갑니다."
        >
          <text x="0" y="20" className="fig-strong">arr.pop() — 맨 뒤에서</text>
          {[10, 20, 30, 40].map((v, i) => (
            <g key={`t${v}`}>
              <rect
                x={12 + i * 62} y="34" width="54" height="40" rx="9"
                fill={i === 3 ? 'var(--sunken)' : 'var(--primary-soft)'}
                stroke={i === 3 ? 'var(--danger)' : 'transparent'}
                strokeWidth="1.5" strokeDasharray={i === 3 ? '4 4' : undefined}
              />
              <text x={39 + i * 62} y="59" textAnchor="middle" className="fig-mono">{v}</text>
            </g>
          ))}
          <text x="272" y="59" className="fig-accent" fill="var(--success)">움직이는 것 없음 · O(1)</text>

          <text x="0" y="122" className="fig-strong">arr.pop(0) — 맨 앞에서</text>
          {[10, 20, 30, 40].map((v, i) => (
            <g key={`h${v}`}>
              <rect
                x={12 + i * 62} y="136" width="54" height="40" rx="9"
                fill={i === 0 ? 'var(--sunken)' : 'var(--primary-soft)'}
                stroke={i === 0 ? 'var(--danger)' : 'transparent'}
                strokeWidth="1.5" strokeDasharray={i === 0 ? '4 4' : undefined}
              />
              <text x={39 + i * 62} y="161" textAnchor="middle" className="fig-mono">{v}</text>
              {i > 0 && (
                <path
                  d={`M${20 + i * 62} 190 l -34 0`}
                  stroke="var(--danger)" strokeWidth="2" fill="none"
                />
              )}
            </g>
          ))}
          <text x="272" y="161" className="fig-accent" fill="var(--danger)">뒤의 전부가 한 칸씩 · O(N)</text>
        </Figure>

        <p>
          아래 표에서 <Term>O(1)</Term>은 «언제나 한 번», <Term>O(N)</Term>은
          «들어 있는 만큼»이라고 읽으면 됩니다.
        </p>

        <Table
          head={['연산', '복잡도', '메모']}
          rows={[
            ['arr[i]', 'O(1)', '인덱스 접근은 언제나 싸다'],
            ['arr.append(x)', 'O(1)', '끝에 붙이기'],
            ['arr.pop()', 'O(1)', '끝에서 빼기'],
            ['arr.pop(0)', 'O(N)', '앞에서 빼기 — 큐로 쓰면 안 된다'],
            ['arr.insert(0, x)', 'O(N)', '앞에 넣기'],
            ['x in arr', 'O(N)', '전부 훑는다. 집합이면 O(1)'],
            ['arr.remove(x)', 'O(N)', '찾고 + 밀기'],
            ['arr.sort()', 'O(N log N)', '제자리 정렬'],
            ['arr[a:b]', 'O(b-a)', '슬라이싱은 복사다'],
          ]}
        />

        <Note tone="danger" title="pop(0) 과 in 이 이중 루프 안에 있으면 이미 늦었습니다">
          <p>
            겉보기에 한 줄이라 O(1)처럼 읽히지만 안에서 N번을 돕니다. 반복문 안에서
            <Term>arr.pop(0)</Term>을 부르면 전체가 O(N²)입니다. 큐가 필요하면
            <Term>collections.deque</Term>를, 포함 검사가 필요하면 <Term>set</Term>을 쓰세요.
          </p>
        </Note>
      </Section>

      <Section no={2} title="2차원 리스트를 만드는 법">
        <p>
          코딩테스트에서 가장 많이 나는 사고 중 하나입니다.
          <Term>[[0] * m] * n</Term>은 <strong>같은 리스트를 n번 가리키는</strong> 리스트를 만듭니다.
          한 칸을 바꾸면 모든 줄이 함께 바뀝니다.
        </p>

        <Code label="틀린 방법과 맞는 방법">{`
# ❌ 한 줄만 만들고 그 줄을 n번 가리킨다
board = [[0] * 3] * 2
board[0][0] = 9
print(board)     # [[9, 0, 0], [9, 0, 0]]  — 두 줄이 함께 바뀐다

# ✅ 줄마다 새로 만든다
board = [[0] * 3 for _ in range(2)]
board[0][0] = 9
print(board)     # [[9, 0, 0], [0, 0, 0]]
`}</Code>

        <p>
          같은 이유로 리스트를 복사할 때 <Term>b = a</Term>는 복사가 아닙니다. 같은 것에
          이름을 하나 더 붙였을 뿐입니다. 한 겹이면 <Term>a[:]</Term>이나 <Term>list(a)</Term>,
          중첩이면 <Term>copy.deepcopy(a)</Term>가 필요합니다.
        </p>

        <Code label="복사의 세 층">{`
import copy

a = [[1, 2], [3, 4]]

b = a                    # 같은 것. b를 고치면 a도 바뀐다
c = a[:]                 # 겉만 새것. c[0] 은 여전히 a[0] 과 같은 리스트
d = copy.deepcopy(a)     # 속까지 새것

c[0][0] = 9
print(a)                 # [[9, 2], [3, 4]]  — 얕은 복사의 함정
`}</Code>
      </Section>

      <Section no={3} title="슬라이싱과 되짚기">
        <Code label="자주 쓰는 조각내기">{`
arr = [0, 1, 2, 3, 4, 5]

print(arr[2:5])     # [2, 3, 4]   — 끝은 포함하지 않는다
print(arr[:3])      # [0, 1, 2]
print(arr[3:])      # [3, 4, 5]
print(arr[-2:])     # [4, 5]      — 뒤에서 두 개
print(arr[::-1])    # [5, 4, 3, 2, 1, 0]  — 뒤집기
print(arr[::2])     # [0, 2, 4]   — 하나 걸러

# 범위를 벗어나도 오류가 아니다 — 잘라 준다
print(arr[3:100])   # [3, 4, 5]
print(arr[100:])    # []
`}</Code>

        <Note tone="warn" title="슬라이싱은 새 리스트를 만듭니다">
          <p>
            <Term>arr[1:]</Term>은 값을 복사합니다. 반복문 안에서 매번 슬라이싱하면
            길이에 비례하는 비용이 매번 듭니다. 인덱스만 옮기면 되는 자리에는
            슬라이싱 대신 <strong>시작 위치를 가리키는 변수</strong>를 쓰세요.
          </p>
        </Note>
      </Section>

      <Section no={4} title="리스트를 다루는 손버릇">
        <Code label="자주 쓰는 것들">{`
arr = [3, 1, 4, 1, 5]

arr.sort()                 # 제자리 정렬. 돌려주는 값은 None
new = sorted(arr)          # 새 리스트를 돌려준다
arr.sort(reverse=True)     # 내림차순

print(arr.count(1))        # 1이 몇 개인가 — O(N)
print(arr.index(4))        # 4의 첫 위치 — 없으면 ValueError

arr.reverse()              # 제자리 뒤집기
arr.extend([7, 8])         # 여러 개 붙이기
del arr[0]                 # 인덱스로 지우기

# 조건에 맞는 것만 남기기 — filter 보다 읽기 쉽다
evens = [x for x in arr if x % 2 == 0]

# 둘씩 짝지어 돌기
for a, b in zip(arr, arr[1:]):
    pass
`}</Code>

        <Note tone="danger" title="arr.sort() 의 결과를 변수에 담지 마세요">
          <p>
            <Term>arr = arr.sort()</Term>는 <Term>None</Term>을 담습니다. 제자리에서 바꾸는
            함수(<Term>sort</Term>, <Term>reverse</Term>, <Term>append</Term>)는 모두
            <Term>None</Term>을 돌려줍니다. 새 리스트가 필요하면 <Term>sorted()</Term>를 쓰세요.
          </p>
        </Note>
      </Section>

      <Quiz
        question="board = [[0] * 1000 for _ in range(1000)] 대신 [[0] * 1000] * 1000 을 썼습니다. 무슨 일이 벌어질까요?"
        choices={[
          {
            text: '1000개의 줄이 모두 같은 리스트라, 한 칸을 바꾸면 그 열 전체가 바뀐 것처럼 보인다',
            right: true,
            why: '맞습니다. * 는 값을 복제하지 않고 참조를 늘립니다. board[0][3] = 1 을 하면 모든 행의 3번 칸이 1로 보입니다. 2차원 배열은 반드시 컴프리헨션으로 줄마다 새로 만드세요.',
          },
          {
            text: '메모리를 1000배 더 쓴다',
            why: '오히려 메모리는 적게 씁니다 — 줄이 하나뿐이니까요. 문제는 메모리가 아니라 값이 공유된다는 데 있습니다.',
          },
          {
            text: '리스트가 읽기 전용이 되어 수정할 수 없다',
            why: '수정은 됩니다. 다만 한 곳을 고치면 모든 행에서 고쳐진 것처럼 보입니다.',
          },
          {
            text: '아무 차이도 없다',
            why: '값을 읽기만 한다면 차이가 드러나지 않습니다. 그래서 더 위험합니다 — 쓰기 시작하는 순간에야 무너집니다.',
          },
        ]}
      />
    </Lesson>
  );
}
