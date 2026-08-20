import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Recall from '../../components/Recall';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Term from '../../components/Term';

export default function SolveDeploy() {
  return (
    <Lesson
      part="4부 · 기출 해설"
      title="기능개발"
      lede="앞의 것이 끝나야 뒤의 것도 나갑니다. «앞에서 꺼내는» 구조를 알아보는 연습이자, 나눗셈 올림의 함정을 만나는 자리입니다."
      tags={['4-3', '큐', 'Lv.2']}
      source={{ label: '프로그래머스', href: 'https://school.programmers.co.kr/learn/courses/30/lessons/42586' }}
    >
      <Recall from={['p2-collections', 'p1-number']}>
        <p>
          2-1에서 <Term>deque</Term>는 <strong>양 끝만 쓰는 자료구조</strong>라고 했습니다.
          1-2에서는 <Term>//</Term>가 <strong>작은 쪽으로 내림</strong>이라는 것을 봤습니다.
        </p>
        <p>
          «앞의 것이 끝나야 뒤의 것도 나간다»는 문장이 곧 선입선출이고,
          «며칠 걸리나»는 언제나 <strong>올림</strong>입니다. 그 올림을
          내림으로 만드는 방법이 여기서 나옵니다.
        </p>
      </Recall>

      <Section no={1} title="문제">
        <p>
          기능마다 진도율 <Term>progresses</Term>와 하루 개발 속도 <Term>speeds</Term>가
          주어집니다. 진도율이 100%가 되면 배포할 수 있지만,
          <strong> 앞 기능이 아직 끝나지 않았다면 뒤 기능은 함께 기다립니다.</strong>
          각 배포마다 몇 개의 기능이 나가는지를 순서대로 돌려줍니다.
        </p>

        <Note tone="success" title="큐가 보이는 자리">
          <p>
            «앞의 것이 끝나야 뒤의 것이 나간다»는 문장이 곧 선입선출입니다.
            작업 개수가 100개 이하라 리스트로 풀어도 통과하지만,
            <strong>구조를 알아보는 눈</strong>을 기르는 것이 이 문제의 값입니다.
          </p>
        </Note>
      </Section>

      <Section no={2} title="며칠 걸리는지부터">
        <p>
          진도 93%에 속도 1이면 7일입니다. 진도 30%에 속도 30이면
          <Term>70 / 30 = 2.33…</Term>이라 <strong>3일</strong>입니다 —
          남은 일수는 언제나 <strong>올림</strong>입니다.
        </p>

        <Code label="올림을 정수만으로">{`
import math

remain, speed = 70, 30

# 셋 다 같은 답을 준다. 다만 첫 줄만 실수를 한 번 거친다.
print(math.ceil(remain / speed))       # => 3
print(-(-remain // speed))             # => 3
print((remain + speed - 1) // speed)   # => 3
`}</Code>

        <Note tone="warn" title="math.ceil 은 실수를 거칩니다">
          <p>
            이 문제의 수는 작아서 문제가 없지만, 값이 커지면
            <Term>ceil(a / b)</Term>는 부동소수점 오차로 한 칸 어긋날 수 있습니다.
            <strong><Term>-(-a // b)</Term>를 손에 익혀 두세요</strong> —
            1-2에서 본 «바닥 내림»을 뒤집어 올림을 만든 것입니다.
          </p>
        </Note>
      </Section>

      <Section no={3} title="풀이">
        <Code label="제출용 풀이">{`
from collections import deque

def solution(progresses, speeds):
    # 각 기능이 며칠 뒤에 완성되는지로 바꾼다
    days = deque(-(-(100 - p) // s) for p, s in zip(progresses, speeds))

    answer = []
    while days:
        front = days.popleft()      # 맨 앞 기능이 배포 기준일이 된다
        count = 1
        # 앞의 것보다 빨리 끝나는 것들은 같은 날 함께 나간다
        while days and days[0] <= front:
            days.popleft()
            count += 1
        answer.append(count)

    return answer


print(solution([93, 30, 55], [1, 30, 5]))                       # => [2, 1]
print(solution([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1]))   # => [1, 3, 2]
`}</Code>

        <p>
          핵심은 <strong>맨 앞 기능의 완성일이 그 묶음의 기준</strong>이라는 것입니다.
          뒤에 오는 기능이 그보다 빨리 끝나면 기다렸다가 함께 나가고,
          더 늦게 끝나면 다음 묶음의 새 기준이 됩니다.
        </p>
      </Section>

      <Section no={4} title="큐 없이 쓰면">
        <p>
          <Term>deque</Term>가 정석이지만, 기준일 하나만 들고 한 번 훑어도 됩니다.
          앞에서 빼는 일이 사라지므로 리스트로도 O(N)입니다.
        </p>

        <Code label="한 번만 훑는 풀이">{`
def solution(progresses, speeds):
    answer = []
    front = 0        # 지금 묶음의 기준일

    for p, s in zip(progresses, speeds):
        day = -(-(100 - p) // s)
        if day > front:            # 기준보다 늦게 끝난다 → 새 묶음
            answer.append(1)
            front = day
        else:                      # 기준 안에 끝난다 → 이번 묶음에 합류
            answer[-1] += 1

    return answer
`}</Code>
      </Section>

      <Quiz
        question="남은 진도를 속도로 나눈 «걸리는 날짜» 를 구할 때, 정수만으로 올림하는 표현은?"
        choices={[
          {
            text: '-(-remain // speed)',
            right: true,
            why: '파이썬의 // 는 작은 쪽으로 내림입니다. 부호를 뒤집어 내림하고 다시 뒤집으면 올림이 됩니다. (remain + speed - 1) // speed 도 같은 결과이고, 둘 다 실수를 거치지 않아 오차가 없습니다.',
          },
          {
            text: 'remain // speed + 1',
            why: '딱 나누어떨어질 때 하루가 더해집니다. 진도 50 속도 50 이면 1일이어야 하는데 2일이 됩니다.',
          },
          {
            text: 'int(remain / speed) + 1',
            why: '나누어떨어지는 경우가 틀리고, 실수 연산이라 큰 수에서 오차도 생깁니다.',
          },
          {
            text: 'round(remain / speed)',
            why: 'round 는 반올림이라 2.1 을 2 로 만듭니다. 하루가 모자랍니다.',
          },
        ]}
      />
    </Lesson>
  );
}
