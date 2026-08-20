import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Term from '../../components/Term';

export default function SolveNetwork() {
  return (
    <Lesson
      part="4부 · 기출 해설"
      title="네트워크"
      lede="«덩어리가 몇 개인가»를 묻는 문제. 탐색으로도, 유니온 파인드로도 풀립니다. 두 도구가 같은 질문에 답하는 것을 확인합니다."
      tags={['4-7', '연결 요소', 'Lv.3']}
      source={{ label: '프로그래머스', href: 'https://school.programmers.co.kr/learn/courses/30/lessons/43162' }}
    >
      <Section no={1} title="문제">
        <p>
          컴퓨터 <Term>n</Term>대의 연결 상태가 인접 행렬 <Term>computers</Term>로 주어집니다.
          <Term>computers[i][j]</Term>가 1이면 <Term>i</Term>와 <Term>j</Term>가 연결된 것이고,
          <strong>직접 또는 간접으로 이어진 컴퓨터들은 하나의 네트워크</strong>입니다.
          네트워크가 몇 개인지 구합니다. 컴퓨터는 최대 200대입니다.
        </p>

        <Note tone="success" title="이 문제의 이름은 «연결 요소 개수»입니다">
          <p>
            «몇 개의 덩어리로 나뉘는가», «섬이 몇 개인가», «친구 무리가 몇 개인가» —
            말만 다를 뿐 전부 같은 질문입니다. <strong>아직 방문하지 않은 정점에서
            탐색을 시작한 횟수</strong>가 곧 답입니다.
          </p>
        </Note>
      </Section>

      <Section no={2} title="탐색으로 세기">
        <Code label="DFS 풀이">{`
def solution(n, computers):
    visited = [False] * n

    def dfs(x):
        visited[x] = True
        for y in range(n):
            if computers[x][y] == 1 and not visited[y]:
                dfs(y)

    count = 0
    for i in range(n):
        if not visited[i]:
            dfs(i)          # 여기서 시작한 횟수가 곧 덩어리의 수
            count += 1

    return count


print(solution(3, [[1, 1, 0], [1, 1, 0], [0, 0, 1]]))   # => 2
print(solution(3, [[1, 1, 0], [1, 1, 1], [0, 1, 1]]))   # => 1
`}</Code>

        <p>
          한 번의 <Term>dfs</Term>가 한 덩어리를 통째로 칠합니다. 바깥 루프에서
          «아직 안 칠해진 정점»을 만날 때마다 <strong>새 덩어리를 발견한 것</strong>이므로
          그 횟수를 세면 됩니다. 인접 행렬을 훑으므로 <Term>O(N²)</Term>,
          N이 200이니 4만 번입니다.
        </p>
      </Section>

      <Section no={3} title="유니온 파인드로 세기">
        <p>
          3-8의 도구로도 풀립니다. 연결된 것끼리 묶은 뒤
          <strong>서로 다른 대표가 몇 명인지</strong> 세면 됩니다.
        </p>

        <Code label="유니온 파인드 풀이">{`
def solution(n, computers):
    parent = list(range(n))

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])     # 경로 압축
        return parent[x]

    def union(a, b):
        a, b = find(a), find(b)
        if a != b:
            parent[max(a, b)] = min(a, b)

    for i in range(n):
        for j in range(i + 1, n):           # 대칭이므로 절반만 본다
            if computers[i][j] == 1:
                union(i, j)

    return len({find(i) for i in range(n)})


print(solution(3, [[1, 1, 0], [1, 1, 0], [0, 0, 1]]))   # => 2
print(solution(3, [[1, 1, 0], [1, 1, 1], [0, 1, 1]]))   # => 1
`}</Code>

        <Note tone="danger" title="마지막 줄에서 parent 를 그대로 세면 틀립니다">
          <p>
            <Term>len(set(parent))</Term>로 세면 안 됩니다. <Term>parent</Term>에는
            <strong>아직 대표까지 압축되지 않은 중간 값</strong>이 남아 있을 수 있어
            덩어리 수가 실제보다 많게 나옵니다. 반드시
            <Term>find(i)</Term>를 한 번씩 불러 <strong>최종 대표로 세야</strong> 합니다.
          </p>
        </Note>
      </Section>

      <Section no={4} title="둘 중 무엇을 쓸까">
        <ul>
          <li>
            <strong>한 번만 세면 된다</strong> → 탐색이 짧고 직관적입니다.
          </li>
          <li>
            <strong>연결이 계속 추가되고 그때마다 물어본다</strong> → 유니온 파인드입니다.
            간선이 하나 늘 때마다 탐색을 다시 돌리면 O(V+E)를 매번 내지만,
            유니온 파인드는 거의 O(1)에 답합니다.
          </li>
        </ul>

        <p>
          이 문제는 한 번만 세므로 어느 쪽이든 통과합니다. 도구를 고르는 기준은
          «지금 한 번인가, 계속 물을 것인가»입니다.
        </p>
      </Section>

      <Quiz
        question="유니온 파인드로 네트워크 개수를 셀 때, 마지막에 무엇을 세어야 할까요?"
        choices={[
          {
            text: 'find(i) 를 모든 i 에 대해 부른 결과의 종류 수',
            right: true,
            why: 'parent 배열에는 아직 최종 대표까지 압축되지 않은 중간 값이 남아 있을 수 있습니다. find 를 한 번씩 불러 최종 대표로 정리한 뒤 세야 덩어리 수가 정확합니다.',
          },
          {
            text: 'parent 배열의 서로 다른 값의 개수',
            why: '중간 값이 섞여 있어 실제보다 많게 나올 수 있습니다. find 를 거치지 않은 값은 대표가 아닙니다.',
          },
          {
            text: 'union 을 호출한 횟수',
            why: '이미 같은 무리인 쌍에도 union 이 불립니다. 호출 횟수는 덩어리 수와 관계가 없습니다.',
          },
          {
            text: 'parent[i] == i 인 i 의 개수',
            why: '이 방법은 경로 압축과 union 규칙이 맞물릴 때 우연히 맞기도 하지만, 대표가 갱신되는 순서에 의존해 안전하지 않습니다. find 로 확인하는 편이 확실합니다.',
          },
        ]}
      />
    </Lesson>
  );
}
