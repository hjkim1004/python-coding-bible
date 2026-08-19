import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Term from '../../components/Term';

export default function SolveTargetNumber() {
  return (
    <Lesson
      part="4부 · 기출 해설"
      title="타겟 넘버"
      lede="완전 탐색을 DFS로 쓰는 가장 깨끗한 예. 제한 조건이 작다는 것이 곧 «전부 해 보라»는 허락입니다."
      tags={['4-5', 'DFS', 'Lv.2']}
      source={{ label: '프로그래머스', href: 'https://school.programmers.co.kr/learn/courses/30/lessons/43165' }}
    >
      <Section no={1} title="문제">
        <p>
          자연수 배열 <Term>numbers</Term>의 각 수 앞에 <Term>+</Term> 또는 <Term>-</Term>를
          붙여 순서대로 더합니다. 그 합이 <Term>target</Term>이 되는 경우의 수를 구합니다.
          수는 <strong>2개 이상 20개 이하</strong>입니다.
        </p>

        <Note tone="success" title="20 이라는 숫자가 풀이를 알려 줍니다">
          <p>
            각 수마다 부호가 둘이므로 경우의 수는 <Term>2^20</Term>, 약 <strong>100만</strong>입니다.
            파이썬이 1초에 수천만 번을 도니 <strong>전부 해 봐도 됩니다.</strong>
            제한이 40이었다면 1조가 되어 완전 탐색은 불가능했을 것입니다 —
            <strong>N 제한을 먼저 읽는 습관</strong>이 풀이를 고릅니다.
          </p>
        </Note>
      </Section>

      <Section no={2} title="가지를 둘로 뻗는다">
        <p>
          «<Term>i</Term>번째 수까지 썼고 지금 합이 <Term>total</Term>»이라는 상태에서,
          다음 수를 더하는 가지와 빼는 가지로 갈라집니다. 끝까지 갔을 때
          합이 <Term>target</Term>이면 한 가지를 센 것입니다.
        </p>

        <Code label="제출용 풀이">{`
def solution(numbers, target):
    def dfs(index, total):
        if index == len(numbers):          # 다 썼다 — 셀지 말지 판정한다
            return 1 if total == target else 0
        return (dfs(index + 1, total + numbers[index])
                + dfs(index + 1, total - numbers[index]))

    return dfs(0, 0)


print(solution([1, 1, 1, 1, 1], 3))       # 5
print(solution([4, 1, 2, 1], 4))          # 2
`}</Code>

        <Note tone="warn" title="멈추는 조건을 가장 먼저 씁니다">
          <p>
            재귀에서 가장 흔한 사고는 «언제 멈추는가»를 뒤에 쓰는 것입니다.
            <Term>index == len(numbers)</Term>를 함수의 첫 줄에 두면
            인덱스가 배열을 넘어서는 일 자체가 생기지 않습니다.
          </p>
        </Note>
      </Section>

      <Section no={3} title="같은 문제를 BFS 로">
        <p>
          «지금까지 만들 수 있는 합들»을 한 겹씩 넓혀 가도 답은 같습니다.
          재귀가 부담스러울 때 쓸 수 있는 꼴입니다.
        </p>

        <Code label="한 겹씩 넓히기">{`
def solution(numbers, target):
    totals = [0]
    for n in numbers:
        totals = [t + n for t in totals] + [t - n for t in totals]
    return totals.count(target)
`}</Code>

        <Note tone="danger" title="짧다고 언제나 좋은 것은 아닙니다">
          <p>
            이 풀이는 마지막 단계에서 <Term>2^20</Term>개의 값을 <strong>리스트에 전부
            들고 있습니다.</strong> 수가 20개라 겨우 버티지만, 25개만 되어도 메모리가
            무너집니다. DFS는 깊이만큼(20칸)만 쓰므로 이 문제에서는 재귀 쪽이 안전합니다.
          </p>
        </Note>
      </Section>

      <Section no={4} title="한 걸음 더 — 가지치기와 DP">
        <p>
          남은 수를 전부 더해도 <Term>target</Term>에 닿지 못한다면 그 아래는 볼 필요가
          없습니다. 이것이 <strong>가지치기</strong>이고, 완전 탐색을 실전에서 살리는 기술입니다.
        </p>

        <Code label="남은 합으로 가지치기">{`
def solution(numbers, target):
    # suffix[i] = i번째부터 끝까지 전부 더한 값
    suffix = [0] * (len(numbers) + 1)
    for i in range(len(numbers) - 1, -1, -1):
        suffix[i] = suffix[i + 1] + numbers[i]

    def dfs(index, total):
        if abs(target - total) > suffix[index]:
            return 0                       # 남은 것을 다 써도 닿지 못한다
        if index == len(numbers):
            return 1 if total == target else 0
        return (dfs(index + 1, total + numbers[index])
                + dfs(index + 1, total - numbers[index]))

    return dfs(0, 0)


print(solution([1, 1, 1, 1, 1], 3))       # 5
print(solution([4, 1, 2, 1], 4))          # 2
`}</Code>

        <p>
          «몇 가지인가»만 필요하다면 <strong>같은 합에 도달한 경로를 하나로 묶어</strong>
          세는 DP도 가능합니다. 3-6에서 본 «무엇을 기억할지»가 여기서는
          «지금까지의 합마다 경우의 수»입니다.
        </p>

        <Code label="합을 키로 세는 DP">{`
from collections import defaultdict

def solution(numbers, target):
    counts = defaultdict(int)
    counts[0] = 1

    for n in numbers:
        nxt = defaultdict(int)
        for total, c in counts.items():
            nxt[total + n] += c
            nxt[total - n] += c
        counts = nxt

    return counts[target]
`}</Code>
      </Section>

      <Quiz
        question="numbers 의 길이 제한이 20 이라는 사실이 알려 주는 것은?"
        choices={[
          {
            text: '경우의 수가 2^20 ≈ 100만이므로 완전 탐색으로 충분하다',
            right: true,
            why: '각 수마다 부호가 둘이니 전체 경우는 2^N 입니다. N이 20이면 약 100만 번으로 파이썬이 넉넉히 감당합니다. 제한이 40이었다면 1조가 되어 DP 같은 다른 접근이 필요했을 것입니다.',
          },
          {
            text: '배열이 작으므로 정렬해서 이진 탐색해야 한다',
            why: '부호를 붙이는 순서가 정해져 있어 정렬하면 문제가 달라집니다. 이 문제는 탐색이 아니라 열거입니다.',
          },
          {
            text: '재귀 깊이가 20 이므로 setrecursionlimit 이 필요하다',
            why: '깊이 20은 기본 한도 1000 안에 넉넉히 들어옵니다. 이 문제에서는 필요 없습니다.',
          },
          {
            text: '메모리가 부족하므로 리스트를 쓰면 안 된다',
            why: '2^20 개를 한꺼번에 리스트에 담는 풀이라면 부담이 되지만, DFS 는 깊이만큼만 쓰므로 메모리는 문제가 되지 않습니다.',
          },
        ]}
      />
    </Lesson>
  );
}
