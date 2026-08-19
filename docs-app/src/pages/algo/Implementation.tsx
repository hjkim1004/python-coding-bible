import CodeViewer from '../../components/ui/CodeViewer';
import Callout from '../../components/ui/Callout';
import MathBadge from '../../components/ui/MathBadge';
import QuizPanel from '../../components/ui/QuizPanel';

interface ImplementationProps {
  isDarkMode: boolean;
}

export default function Implementation({ isDarkMode }: ImplementationProps) {
  const codeExample1 = `
# 상하좌우 이동 시뮬레이션
n = 5
x, y = 1, 1
plans = ['R', 'R', 'R', 'U', 'D', 'D']

# L, R, U, D에 따른 이동 방향 정의 (dx: 행 이동, dy: 열 이동)
# 가로(y)와 세로(x) 평면 좌표계에 유의!
dx = [0, 0, -1, 1]
dy = [-1, 1, 0, 0]
move_types = ['L', 'R', 'U', 'D']

# 이동 계획을 하나씩 확인
for plan in plans:
    # 이동 후 좌표 구하기
    for i in range(len(move_types)):
        if plan == move_types[i]:
            nx = x + dx[i]
            ny = y + dy[i]
    # 공간을 벗어나는 움직임은 무시
    if nx < 1 or ny < 1 or nx > n or ny > n:
        continue
    # 이동 수행
    x, y = nx, ny

print(x, y)  # 출력: 3 4
`;

  const codeExample2 = `
# 시각 문제: 00시 00분 00초부터 N시 59분 59초까지의 모든 시각 중 3이 하나라도 포함되는 모든 경우의 수
# N = 5일 때, 전체 데이터 수는 6 * 60 * 60 = 21,600개로 1초 내 완전탐색 가능!
n = 5
count = 0

for i in range(n + 1):
    for j in range(60):
        for k in range(60):
            # 매 시각을 문자열로 합쳐서 '3'이 포함되어 있는지 확인
            if '3' in str(i) + str(j) + str(k):
                count += 1

print(count)  # 출력: 11475
`;

  const quizOptions = [
    {
      text: "행렬의 크기만큼 이진 탐색 트리(Binary Search Tree) 생성",
      isCorrect: false,
      explanation: "2차원 공간을 이진 탐색 트리로 구성하는 것은 불필요하며 복잡도를 심각하게 늘립니다."
    },
    {
      text: "방향 벡터(dx, dy) 쌍을 이용해 조건문 중첩 없이 이동 좌표 계산",
      isCorrect: true,
      explanation: "정답입니다! 가로 이동(dy)과 세로 이동(dx)을 인덱싱된 배열로 정의하고 루프를 도는 '방향 벡터' 방식은 소스코드의 가독성을 극대화하고 실수 확률을 0에 수렴하게 만듭니다."
    },
    {
      text: "파이썬의 global 키워드로 모든 이동 함수를 전역 선언",
      isCorrect: false,
      explanation: "global은 네임스페이스 꼬임 현상을 유발하는 가급적 피해야 할 기법입니다."
    },
    {
      text: "재귀(Recursion) 함수로 4방향을 완전 재탐색",
      isCorrect: false,
      explanation: "단순 격자 이동에 재귀를 쓰면 불필요하게 스택 메모리를 낭비하며 시간 초과를 낼 위험이 있습니다."
    }
  ];

  return (
    <div className="animate-fadeIn">
      {/* 👑 OPEN PREMIUM TYPOGRAPHY HEADER */}
      <div className="mb-8">
        <div className="text-[12px] font-extrabold tracking-widest text-indigo-500 uppercase mb-2">
          PART 2. 핵심 알고리즘 이론
        </div>
        <h1 className="text-3.5xl font-black tracking-tight text-slate-950 dark:text-white leading-none mb-4">
          Lesson 2. 구현 (시뮬레이션) 🛠️
        </h1>
        <p className="text-[15px] text-slate-500 dark:text-zinc-400 font-semibold leading-relaxed">
          머릿속의 아이디어를 물리적인 소스코드로 정확하고 완결성 있게 표현하는 시뮬레이션 및 완전탐색 해법을 학습합니다.
        </p>
      </div>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 mb-12" />

      {/* Section 1 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          1. 구현(Implementation) 문제란?
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            코딩 테스트에서 '구현'이란 <strong>풀이를 떠올리기는 쉽지만 소스코드로 직접 작성하기 까다로운 문제</strong>를 지칭합니다. 대표적으로 다음과 같은 조건들이 포함됩니다.
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2">
            <li>알고리즘은 간단한데 코드가 극도로 길어지는 문제</li>
            <li>실수 연산을 정교하게 처리해야 하거나 특정 소수점 자리까지 출력하는 문제</li>
            <li>2차원 격자판(행렬) 상에서 동서남북 이동, 회전, 장애물 피하기를 요구하는 문제</li>
            <li>문자열을 아주 세밀하게 파싱하거나 재정렬해야 하는 문제</li>
          </ul>
        </div>
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 2 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          2. 2차원 공간 시뮬레이션 기법: 방향 벡터
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            시뮬레이션 문제의 대부분은 <strong>2차원 공간 격자</strong>를 배경으로 합니다. 이때 동서남북 이동을 처리하기 위해 가장 유용한 무기가 바로 <strong>방향 벡터(Direction Vector)</strong>입니다.
          </p>
          <p>
            보통 수학 좌표계와 달리 코딩테스트 격자는 행(<MathBadge>Row</MathBadge> - 상하, 보통 x로 표현)과 열(<MathBadge>Column</MathBadge> - 좌우, 보통 y로 표현)을 기준으로 움직이므로 매핑 관계를 상시 숙지해야 합니다.
          </p>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeExample1} />
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 3 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          3. 완전 탐색(Brute Force) 기법
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            완전 탐색은 <strong>가능한 모든 경우의 수를 무식하게 전부 탐색</strong>하는 기법입니다.  
            일반적으로 전체 데이터 개수가 <strong>100만 개 이하</strong>일 때 가장 빠르고 안전한 보검이 됩니다.
          </p>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeExample2} />
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Quiz */}
      <section>
        <QuizPanel 
          question="Q2. 2차원 격자 시뮬레이션 문제를 해결할 때 동, 서, 남, 북 방향으로 한 칸씩 탐색하거나 이동하는 로직을 가장 버그 없이 정교하게 구축할 수 있는 방법은 무엇입니까?"
          options={quizOptions}
        />
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Trap Warning Callout */}
      <Callout type="danger" title="메모리 제한과 자료형 범위를 의식하세요! 🛑">
        <p className="mb-2">
          파이썬은 아주 큰 정수 연산에 대해서는 오버플로우가 없지만, 2차원 리스트(행렬)를 크게 선언할 때는 <strong>메모리 제한</strong>에 즉각 걸립니다.
        </p>
        <p>
          보통 <MathBadge>1,000 x 1,000</MathBadge> 크기의 2차원 리스트는 약 4MB 정도의 메모리를 소모하므로 안전하지만, 격자 크기가 <MathBadge>10,000 x 10,000</MathBadge>을 넘어가면 <strong>메모리 초과(Memory Limit Exceeded) 🛑</strong>가 발생할 수 있습니다. 덩치가 큰 격자를 정의하기 전에 문제의 메모리 제한(보통 128MB ~ 512MB)을 반드시 확인하세요!
        </p>
      </Callout>
    </div>
  );
}
