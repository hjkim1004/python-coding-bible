import CodeViewer from '../../components/ui/CodeViewer';
import Callout from '../../components/ui/Callout';
import MathBadge from '../../components/ui/MathBadge';
import QuizPanel from '../../components/ui/QuizPanel';

interface GymSuitProps {
  isDarkMode: boolean;
}

export default function GymSuit({ isDarkMode }: GymSuitProps) {
  const codeBrute = `
# ❌ 나이브한 접근: 여벌 학생을 앞에서부터 아무에게나 빌려준다
def solution(n, lost, reserve):
    answer = n - len(lost)
    for r in reserve:
        for l in lost:
            if abs(r - l) <= 1:   # 앞뒤 한 명까지 대여 가능
                answer += 1
                lost.remove(l)
                break
    return answer

# 함정 1. lost / reserve 가 정렬돼 있다는 보장이 없다
# 함정 2. 여벌을 가져왔는데 본인도 도난당한 학생(교집합)을 걸러내지 않았다
`;

  const codeFinal = `
def solution(n, lost, reserve):
    # 1) 여벌이 있는데 본인도 도난당한 학생은 '자기 것'을 입는다 → 양쪽에서 제외
    real_lost = sorted(set(lost) - set(reserve))
    real_reserve = sorted(set(reserve) - set(lost))

    answer = n - len(real_lost)

    # 2) 번호가 작은 도난 학생부터 '앞번호 → 뒷번호' 순으로 빌린다
    for l in real_lost:
        if l - 1 in real_reserve:
            real_reserve.remove(l - 1)
            answer += 1
        elif l + 1 in real_reserve:
            real_reserve.remove(l + 1)
            answer += 1

    return answer


print(solution(5, [2, 4], [1, 3, 5]))  # 5
print(solution(5, [2, 4], [3]))        # 4
print(solution(3, [3], [1]))           # 2
`;

  const codeArray = `
# 💎 O(N) 배열 카운팅 풀이 — 체육복 보유 수를 배열에 직접 기록한다
def solution(n, lost, reserve):
    clothes = [1] * (n + 2)          # 1번 ~ n번 (양끝 여유 칸으로 경계 검사 제거)

    for r in reserve:
        clothes[r] += 1              # 여벌 → 2벌
    for l in lost:
        clothes[l] -= 1              # 도난 → 0벌 (여벌 학생이 잃으면 다시 1벌)

    for i in range(1, n + 1):
        if clothes[i] == 0:
            if clothes[i - 1] == 2:  # 앞번호 먼저
                clothes[i - 1] -= 1
                clothes[i] += 1
            elif i + 1 <= n and clothes[i + 1] == 2:
                clothes[i + 1] -= 1
                clothes[i] += 1

    return sum(1 for i in range(1, n + 1) if clothes[i] >= 1)
`;

  const quizOptions = [
    {
      text: "번호가 큰 학생부터 역순으로 빌려주면 더 많은 학생이 수업을 듣는다",
      isCorrect: false,
      explanation: "방향 자체는 중요하지 않습니다. 오름차순이든 내림차순이든 '가까운 쪽부터 순서대로' 일관되게 빌려주면 결과는 같습니다. 핵심은 방향이 아니라 앞번호를 먼저 소진하는 규칙입니다."
    },
    {
      text: "여벌을 가져왔지만 본인도 도난당한 학생을 양쪽 목록에서 먼저 제외해야 한다",
      isCorrect: true,
      explanation: "정답입니다! 여벌이 있는데 도난당한 학생은 자기 여벌을 입으므로 빌려줄 수도, 빌릴 수도 없습니다. 이 교집합을 걷어내지 않으면 한 명이 두 번 계산되어 정답보다 큰 수가 나옵니다."
    },
    {
      text: "lost 와 reserve 의 길이가 같은지 먼저 검사해야 한다",
      isCorrect: false,
      explanation: "두 목록의 길이는 아무 관계가 없습니다. 여벌이 남아도 빌려줄 이웃이 없으면 쓰이지 않습니다."
    },
    {
      text: "n 이 30 이하이므로 모든 경우를 완전 탐색해야 한다",
      isCorrect: false,
      explanation: "완전 탐색으로도 통과는 하지만, 이 문제는 '앞번호부터 빌린다'는 탐욕적 선택의 정당성이 증명되므로 O(N)으로 풀립니다."
    }
  ];

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <div className="text-[12px] font-extrabold tracking-widest text-indigo-500 uppercase mb-2">
          PART 3. 기출문제 상세 해설집
        </div>
        <h1 className="text-3.5xl font-black tracking-tight text-slate-950 dark:text-white leading-none mb-4">
          Lesson 1. 프로그래머스 - 체육복 👕
        </h1>
        <p className="text-[15px] text-slate-500 dark:text-zinc-400 font-semibold leading-relaxed">
          그리디의 정당성을 눈으로 확인하는 입문 필수 기출. '앞번호부터 빌린다'는 한 줄 규칙이 왜 최적해인지를 증명합니다.
        </p>
        <div className="flex flex-wrap items-center gap-2 mt-5">
          <span className="text-[11.5px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            난이도 Lv.1
          </span>
          <span className="text-[11.5px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            유형 그리디
          </span>
          <span className="text-[11.5px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-500/10 text-slate-500 dark:text-zinc-400 border border-slate-500/20">
            시간복잡도 O(N)
          </span>
        </div>
      </div>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 mb-12" />

      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          1. 문제 이해
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            전체 학생 <MathBadge>n</MathBadge>명 중 체육복을 도난당한 학생 목록 <MathBadge>lost</MathBadge>와
            여벌 체육복을 가져온 학생 목록 <MathBadge>reserve</MathBadge>가 주어집니다.
            여벌은 <strong>자기 바로 앞번호 또는 바로 뒷번호 학생에게만</strong> 빌려줄 수 있을 때,
            체육 수업을 들을 수 있는 학생 수의 최댓값을 구합니다.
          </p>
        </div>

        <Callout type="warning" title="문제가 숨겨 둔 두 개의 함정">
          <ul className="list-disc list-inside pl-2 space-y-1">
            <li><strong>여벌을 가져왔는데 본인도 도난당한 학생</strong> — 자기 여벌을 입으므로 남에게 빌려줄 수 없습니다.</li>
            <li><strong>입력이 정렬돼 있다는 보장이 없다</strong> — 순서를 가정하고 짜면 특정 케이스에서만 틀립니다.</li>
          </ul>
        </Callout>
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          2. 먼저 틀려 보기 — 나이브한 접근
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            여벌 학생을 하나씩 꺼내 이웃 아무에게나 빌려주는 코드입니다. 예제는 통과하지만 채점 서버에서는 무너집니다.
          </p>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeBrute} />

        <Callout type="danger" title="반례로 무너지는 순간 ⚠️">
          <p>
            <MathBadge>n=5</MathBadge>, <MathBadge>lost=[2,4]</MathBadge>, <MathBadge>reserve=[3]</MathBadge>를 넣어 보세요.
            3번 학생이 <strong>4번에게 먼저</strong> 빌려주면 2번은 빌릴 곳이 없어 3명만 수업을 듣습니다.
            하지만 3번이 <strong>2번에게</strong> 주면 4명이 수업을 듣습니다.
            즉 <strong>'누구에게 먼저 주느냐'는 순서가 정답을 바꿉니다.</strong>
          </p>
        </Callout>
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          3. 탐욕적 선택과 그 정당성
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            규칙은 단 한 줄입니다. <strong>번호가 작은 도난 학생부터, 앞번호 이웃에게 먼저 빌린다.</strong>
          </p>
          <p>
            정당성은 이렇게 증명합니다. 번호 <MathBadge>i</MathBadge>의 도난 학생이 빌릴 수 있는 후보는
            <MathBadge>i-1</MathBadge>과 <MathBadge>i+1</MathBadge> 둘뿐입니다.
            이때 <MathBadge>i-1</MathBadge>번 여벌은 이미 지나온 번호라 <strong>앞으로 다른 누구도 쓸 수 없는 자원</strong>이고,
            <MathBadge>i+1</MathBadge>번 여벌은 <strong>뒤에 올 i+2번이 쓸 수 있는 자원</strong>입니다.
            그러므로 쓸모를 잃게 될 앞번호를 먼저 소진하는 편이 손해가 없습니다.
          </p>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeFinal} />
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          4. 한 단계 더 — O(N) 배열 카운팅 풀이
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            위 풀이의 <MathBadge>list.remove()</MathBadge>는 매번 <MathBadge>O(N)</MathBadge>이라 전체가
            <MathBadge>O(N^2)</MathBadge>이 됩니다. 학생 수가 커지는 변형 문제라면
            체육복 개수를 배열에 직접 세는 방식이 안전합니다.
          </p>
          <p>
            <MathBadge>clothes[i]</MathBadge>가 <MathBadge>2</MathBadge>면 여벌 보유,
            <MathBadge>1</MathBadge>이면 정상, <MathBadge>0</MathBadge>이면 빌려야 하는 학생입니다.
            교집합 처리를 따로 하지 않아도 <MathBadge>+1</MathBadge>과 <MathBadge>-1</MathBadge>이 상쇄되어
            자연스럽게 1벌로 돌아온다는 점이 이 풀이의 아름다움입니다.
          </p>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeArray} />

        <Callout type="info" title="배열 크기를 n+2로 잡는 이유">
          <p>
            <MathBadge>clothes[i-1]</MathBadge>을 볼 때 <MathBadge>i=1</MathBadge>이면 인덱스가 0이 됩니다.
            앞뒤로 한 칸씩 여유를 두면 <strong>경계 검사 if 문이 통째로 사라져</strong> 코드가 짧아지고 실수도 줄어듭니다.
          </p>
        </Callout>
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      <section>
        <QuizPanel
          question="Q1. 체육복 문제에서 '앞번호부터 빌린다'는 규칙만큼이나 반드시 선행되어야 하는 전처리는 무엇입니까?"
          options={quizOptions}
        />
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      <Callout type="success" title="이 문제에서 챙겨 갈 것 💡">
        <p>
          그리디 문제는 <strong>규칙을 찾는 것</strong>이 아니라 <strong>규칙이 왜 손해가 아닌지를 말할 수 있는 것</strong>이 절반입니다.
          '앞번호를 먼저 쓰는 이유는 그 자원이 곧 쓸모를 잃기 때문' 처럼, 한 문장으로 정당성을 설명할 수 없다면
          그 풀이는 아직 완성되지 않은 것입니다.
        </p>
      </Callout>
    </div>
  );
}
