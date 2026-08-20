import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Recall from '../../components/Recall';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Term from '../../components/Term';

export default function SolveGymSuit() {
  return (
    <Lesson
      part="4부 · 기출 해설"
      title="체육복"
      lede="그리디의 정당성을 눈으로 확인하는 첫 문제. «앞번호부터 빌린다»는 한 줄이 왜 손해가 아닌지를 증명합니다."
      tags={['4-1', '그리디', 'Lv.1']}
      source={{ label: '프로그래머스', href: 'https://school.programmers.co.kr/learn/courses/30/lessons/42862' }}
    >
      <Recall from={['p3-greedy', 'p1-dict']}>
        <p>
          3-1에서 그리디는 <strong>정당성이 절반</strong>이라고 했습니다.
          1-5에서는 <Term>set(a) - set(b)</Term>로 겹치는 것을 걷어 내는 법을 봤습니다.
        </p>
        <p>
          이 문제는 그 둘이 한 줄씩 필요합니다. 겹침을 걷어 내는 전처리 한 줄과,
          «앞번호부터 빌린다»가 왜 손해가 아닌지를 말하는 한 문장.
        </p>
      </Recall>

      <Section no={1} title="문제">
        <p>
          전체 학생 <Term>n</Term>명 중 체육복을 도난당한 학생 <Term>lost</Term>와
          여벌을 가져온 학생 <Term>reserve</Term>가 주어집니다. 여벌은
          <strong> 바로 앞번호나 바로 뒷번호 학생에게만</strong> 빌려줄 수 있을 때,
          수업을 들을 수 있는 학생 수의 최댓값을 구합니다.
        </p>

        <Note tone="warn" title="문제가 숨겨 둔 두 가지">
          <ul>
            <li>
              <strong>여벌을 가져왔는데 본인도 도난당한 학생</strong> — 자기 여벌을 입으므로
              남에게 빌려줄 수 없습니다.
            </li>
            <li>
              <strong>입력이 정렬되어 있다는 보장이 없습니다</strong> — 순서를 가정하면
              특정 케이스에서만 틀립니다.
            </li>
          </ul>
        </Note>
      </Section>

      <Section no={2} title="먼저 틀려 보기">
        <p>여벌 학생을 꺼내 이웃 아무에게나 빌려주는 코드입니다. 예제는 통과합니다.</p>

        <Code label="통과하지 못하는 풀이">{`
def solution(n, lost, reserve):
    answer = n - len(lost)
    for r in reserve:
        for l in lost:
            if abs(r - l) <= 1:
                answer += 1
                lost.remove(l)
                break
    return answer
`}</Code>

        <Note tone="danger" title="반례">
          <p>
            <Term>n=5</Term>, <Term>lost=[2,4]</Term>, <Term>reserve=[3]</Term>을 넣어 보세요.
            3번이 <strong>4번에게 먼저</strong> 주면 2번은 빌릴 곳이 없어 3명입니다.
            <strong>2번에게</strong> 주면 4명입니다.
            «누구에게 먼저 주는가»가 답을 바꿉니다.
          </p>
        </Note>
      </Section>

      <Section no={3} title="탐욕적 선택과 그 정당성">
        <p>
          규칙은 한 줄입니다 — <strong>번호가 작은 도난 학생부터, 앞번호에게 먼저 빌린다.</strong>
        </p>
        <p>
          정당성은 이렇게 말합니다. <Term>i</Term>번 학생이 빌릴 수 있는 곳은
          <Term>i-1</Term>과 <Term>i+1</Term> 둘뿐입니다. 이때 <Term>i-1</Term>의 여벌은
          <strong>이미 지나온 번호라 앞으로 아무도 쓸 수 없는 자원</strong>이고,
          <Term>i+1</Term>의 여벌은 <strong>뒤에 올 i+2가 쓸 수 있는 자원</strong>입니다.
          곧 버려질 것을 먼저 쓰는 선택은 손해가 될 수 없습니다.
        </p>

        <Code label="제출용 풀이">{`
def solution(n, lost, reserve):
    # 1) 여벌이 있는데 본인도 도난당한 학생은 양쪽에서 뺀다
    real_lost = sorted(set(lost) - set(reserve))
    real_reserve = sorted(set(reserve) - set(lost))

    answer = n - len(real_lost)

    # 2) 작은 번호부터, 앞번호 → 뒷번호 순으로 빌린다
    for l in real_lost:
        if l - 1 in real_reserve:
            real_reserve.remove(l - 1)
            answer += 1
        elif l + 1 in real_reserve:
            real_reserve.remove(l + 1)
            answer += 1

    return answer


print(solution(5, [2, 4], [1, 3, 5]))   # => 5
print(solution(5, [2, 4], [3]))         # => 4
print(solution(3, [3], [1]))            # => 2
`}</Code>
      </Section>

      <Section no={4} title="한 단계 더 — O(N) 배열 카운팅">
        <p>
          위 풀이의 <Term>list.remove()</Term>는 O(N)이라 전체가 O(N²)입니다. 학생 수가
          커지는 변형 문제라면 체육복 개수를 배열에 직접 세는 편이 안전합니다.
        </p>
        <p>
          <Term>clothes[i]</Term>가 2면 여벌 보유, 1이면 정상, 0이면 빌려야 하는 학생입니다.
          <strong>교집합을 따로 걷어내지 않아도 <Term>+1</Term>과 <Term>-1</Term>이 상쇄</strong>되어
          자연스럽게 1벌로 돌아온다는 점이 이 풀이의 아름다움입니다.
        </p>

        <Code label="배열 카운팅">{`
def solution(n, lost, reserve):
    clothes = [1] * (n + 2)       # 양끝에 여유 칸 → 경계 검사가 사라진다

    for r in reserve:
        clothes[r] += 1
    for l in lost:
        clothes[l] -= 1

    for i in range(1, n + 1):
        if clothes[i] == 0:
            if clothes[i - 1] == 2:            # 앞번호 먼저
                clothes[i - 1] -= 1
                clothes[i] += 1
            elif i + 1 <= n and clothes[i + 1] == 2:
                clothes[i + 1] -= 1
                clothes[i] += 1

    return sum(1 for i in range(1, n + 1) if clothes[i] >= 1)
`}</Code>
      </Section>

      <Quiz
        question="«앞번호부터 빌린다» 만큼이나 반드시 선행되어야 하는 전처리는?"
        choices={[
          {
            text: '여벌을 가져왔지만 본인도 도난당한 학생을 양쪽 목록에서 제외한다',
            right: true,
            why: '그 학생은 자기 여벌을 입으므로 빌려줄 수도, 빌릴 수도 없습니다. 걷어내지 않으면 한 명이 두 번 계산되어 정답보다 큰 수가 나옵니다.',
          },
          {
            text: '번호가 큰 학생부터 역순으로 빌려준다',
            why: '방향 자체는 중요하지 않습니다. 한 방향으로 «가까운 쪽부터» 일관되게 빌려주면 결과는 같습니다.',
          },
          {
            text: 'lost 와 reserve 의 길이가 같은지 확인한다',
            why: '두 목록의 길이는 아무 관계가 없습니다. 여벌이 남아도 빌려줄 이웃이 없으면 쓰이지 않습니다.',
          },
          {
            text: 'n 이 30 이하이므로 완전 탐색으로 바꾼다',
            why: '완전 탐색으로도 통과는 하지만, 탐욕적 선택의 정당성이 증명되므로 O(N) 으로 풀 수 있습니다.',
          },
        ]}
      />
    </Lesson>
  );
}
