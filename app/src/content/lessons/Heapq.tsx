import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Term from '../../components/Term';

export default function Heapq() {
  return (
    <Lesson
      part="2부 · 여섯 개의 표준 도구"
      title="heapq"
      lede="«남은 것 중 가장 작은 것»을 계속 꺼내야 한다면 정렬을 반복하지 마세요. 힙은 그 질문 하나에 O(log N)으로 답합니다."
      tags={['2-2', '우선순위 큐', '다익스트라']}
    >
      <Section no={1} title="힙은 리스트다">
        <p>
          파이썬에는 힙 클래스가 없습니다. <strong>평범한 리스트를 힙의 규칙에 맞게 다루는
          함수들</strong>이 있을 뿐입니다. 그래서 <Term>len()</Term>도 <Term>while heap:</Term>도
          그대로 통합니다.
        </p>

        <Code label="네 가지 연산">{`
import heapq

heap = []
heapq.heappush(heap, 3)      # 넣기        O(log N)
heapq.heappush(heap, 1)
heapq.heappush(heap, 2)

print(heap[0])               # 1  가장 작은 것 보기 (꺼내지 않는다)  O(1)
print(heapq.heappop(heap))   # 1  가장 작은 것 꺼내기               O(log N)

arr = [5, 3, 8, 1]
heapq.heapify(arr)           # 있는 리스트를 힙으로  O(N)
print(heapq.heappop(arr))    # 1
`}</Code>

        <Note tone="warn" title="힙은 «정렬된 리스트»가 아닙니다">
          <p>
            <Term>heap[0]</Term>이 최솟값인 것만 보장합니다. <Term>print(heap)</Term>을 찍어
            보면 나머지는 뒤죽박죽입니다. 정렬된 결과가 필요하면
            <strong>하나씩 <Term>heappop</Term>해서 꺼내야</strong> 합니다.
          </p>
        </Note>
      </Section>

      <Section no={2} title="최대 힙은 부호를 뒤집어 만든다">
        <p>
          파이썬의 힙은 <strong>최소 힙 하나뿐</strong>입니다. 가장 큰 것을 꺼내야 한다면
          넣을 때 부호를 뒤집고, 꺼낼 때 되돌립니다.
        </p>

        <Code label="최대 힙">{`
import heapq

heap = []
for x in [3, 1, 4]:
    heapq.heappush(heap, -x)      # 넣을 때 뒤집고

print(-heapq.heappop(heap))       # 4  꺼낼 때 되돌린다
`}</Code>
      </Section>

      <Section no={3} title="튜플을 넣으면 우선순위가 된다">
        <p>
          힙은 원소를 <Term>&lt;</Term>로 비교합니다. 튜플은 앞에서부터 비교하므로,
          <strong>맨 앞자리에 «작을수록 먼저 나와야 하는 값»</strong>을 두면 그대로
          우선순위 큐가 됩니다.
        </p>

        <Code label="다익스트라의 심장">{`
import heapq

# (거리, 정점) — 거리가 작은 것부터 나온다
pq = [(0, 1)]
while pq:
    dist, node = heapq.heappop(pq)
    # ... 더 짧은 길을 찾으면 heapq.heappush(pq, (nd, nxt))
    break
`}</Code>

        <Note tone="danger" title="비교할 수 없는 것을 두 번째 자리에 두지 마세요">
          <p>
            앞자리 값이 같으면 힙은 <strong>다음 자리를 비교</strong>합니다. 두 번째가
            딕셔너리처럼 크기 비교가 안 되는 값이면 그 순간
            <Term>TypeError</Term>로 멈춥니다. 이럴 때는 «넣은 순서» 같은 정수를 사이에
            끼워 <Term>(우선순위, 순번, 데이터)</Term>로 만드세요.
          </p>
        </Note>
      </Section>

      <Section no={4} title="가장 큰 K개만 필요할 때">
        <p>
          10만 개 중 가장 큰 10개를 구하는 데 전체 정렬(O(N log N))은 과합니다.
          크기 K짜리 힙을 유지하면 O(N log K)입니다.
        </p>

        <Code label="K개만 남기기">{`
import heapq

k = 3
heap = []
for x in [5, 1, 8, 3, 9, 2]:
    heapq.heappush(heap, x)
    if len(heap) > k:
        heapq.heappop(heap)      # 가장 작은 것을 버린다 → 큰 K개만 남는다

print(sorted(heap, reverse=True))   # [9, 8, 5]

# 한 줄로 끝내는 방법도 있다
print(heapq.nlargest(3, [5, 1, 8, 3, 9, 2]))    # [9, 8, 5]
print(heapq.nsmallest(3, [5, 1, 8, 3, 9, 2]))   # [1, 2, 3]
`}</Code>
      </Section>

      <Quiz
        question="heapq 로 최대 힙을 만들어야 합니다. 가장 흔히 쓰는 방법은?"
        choices={[
          {
            text: '넣을 때 값에 -1 을 곱하고, 꺼낼 때 다시 -1 을 곱한다',
            right: true,
            why: '파이썬 heapq 는 최소 힙만 제공합니다. 부호를 뒤집으면 «가장 작은 -x» 가 «가장 큰 x» 가 되어 그대로 최대 힙이 됩니다. 꺼낼 때 되돌리는 것을 잊지 마세요.',
          },
          {
            text: 'heapq.heapify(arr, reverse=True) 를 쓴다',
            why: 'heapify 에는 reverse 인자가 없습니다. sorted 와 혼동하기 쉬운 자리입니다.',
          },
          {
            text: '리스트를 내림차순 정렬한 뒤 heapify 한다',
            why: 'heapify 는 최소 힙 규칙으로 다시 정리하므로 정렬해 둔 순서는 의미가 없습니다.',
          },
          {
            text: 'heap[-1] 을 읽는다',
            why: '힙은 정렬된 배열이 아닙니다. 마지막 원소가 최댓값이라는 보장이 전혀 없습니다.',
          },
        ]}
      />
    </Lesson>
  );
}
