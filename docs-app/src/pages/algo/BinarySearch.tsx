import CodeViewer from '../../components/ui/CodeViewer';
import Callout from '../../components/ui/Callout';
import MathBadge from '../../components/ui/MathBadge';
import QuizPanel from '../../components/ui/QuizPanel';

interface BinarySearchProps {
  isDarkMode: boolean;
}

export default function BinarySearch({ isDarkMode }: BinarySearchProps) {
  const codeExample1 = `
# 이진 탐색(Binary Search) 반복문 방식 구현 예제
def binary_search(array, target, start, end):
    while start <= end:
        mid = (start + end) // 2 # 몫 연산자로 중간점 인덱스 계산 (정수 반환 필수!)
        # 찾은 경우 중간점 인덱스 반환
        if array[mid] == target:
            return mid
        # 중간점의 값보다 찾고자 하는 값이 작은 경우 왼쪽 확인
        elif array[mid] > target:
            end = mid - 1
        # 중간점의 값보다 찾고자 하는 값이 큰 경우 오른쪽 확인
        else:
            start = mid + 1
    return None # 원소가 없는 경우

# 전체 원소 입력받기 (단, 이진 탐색은 무조건 정렬된 리스트에서만 작동!)
array = [1, 3, 5, 7, 11, 13, 15, 17, 19]
target = 7

result = binary_search(array, target, 0, len(array) - 1)
if result == None:
    print("원소가 존재하지 않습니다.")
else:
    print(f"원소의 위치: {result}번 인덱스") # 출력: 원소의 위치: 3번 인덱스
`;

  const codeExample2 = `
from bisect import bisect_left, bisect_right

# 정렬된 배열에서 특정 범위 [left_value, right_value]에 속하는 원소 개수 구하는 치트키 함수
def count_by_range(array, left_value, right_value):
    right_index = bisect_right(array, right_value)
    left_index = bisect_left(array, left_value)
    return right_index - left_index

# 정렬된 리스트 선언
a = [1, 2, 3, 3, 3, 3, 4, 4, 8, 9]

# 값이 3인 데이터 개수 출력
print(count_by_range(a, 3, 3)) # 출력: 4

# 값이 [2, 4] 범위에 있는 데이터 개수 출력
print(count_by_range(a, 2, 4)) # 출력: 7 (2, 3, 3, 3, 3, 4, 4)
`;

  const quizOptions = [
    {
      text: "약 400번 이내",
      isCorrect: false,
      explanation: "400번은 O(N) 급의 성능이며 O(log N) 이진 탐색은 이보다 기하급수적으로 적은 횟수로 해결합니다."
    },
    {
      text: "약 40번 이내",
      isCorrect: true,
      explanation: "정답입니다! 2의 10승은 1,024(약 1천), 2의 20승은 약 100만, 2의 30승은 약 10억, 2의 40승은 약 1조(10^12)입니다. 따라서 탐색 범위가 1,000억에 달하더라도 최대 40번의 연산 이내에 목표 데이터를 확실히 찾아낼 수 있습니다."
    },
    {
      text: "약 4,000번 이내",
      isCorrect: false,
      explanation: "연산 횟수가 너무 과평가되었습니다."
    },
    {
      text: "약 40,000번 이내",
      isCorrect: false,
      explanation: "시간이 훨씬 많이 남을 정도로 초고속 해결이 됩니다."
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
          Lesson 5. 이진 탐색 (Binary Search) 🔍
        </h1>
        <p className="text-[15px] text-slate-500 dark:text-zinc-400 font-semibold leading-relaxed">
          탐색 범위를 매 회차마다 절반씩 파괴하며 나아가는 O(log N)의 초고속 이진 탐색과 파라메트릭 서치 기법을 연마합니다.
        </p>
      </div>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 mb-12" />

      {/* Section 1 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          1. 이진 탐색의 전제 조건과 매커니즘
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            이진 탐색(Binary Search)은 <strong>이미 '정렬'되어 있는 배열</strong>에서만 동작한다는 강력한 전제가 존재합니다.  
            하지만 이 전제가 갖춰진 순간, 데이터의 크기가 아무리 커지더라도 눈부시게 빠른 속도로 데이터를 찾아내는 최강의 알고리즘입니다.
          </p>
          <p>
            이진 탐색은 탐색 범위 내에서 3개의 포인트(<MathBadge>시작점</MathBadge>, <MathBadge>끝점</MathBadge>, <MathBadge>중간점(Mid)</MathBadge>)를 지정한 뒤, 중간점의 데이터와 찾고자 하는 대상 데이터를 지속적으로 대조하며 범위를 절반씩 배제해 나갑니다.
          </p>
        </div>
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 2 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          2. 이진 탐색 표준 템플릿
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            실전에서 실수 없이 기계적으로 타이핑해 써먹을 수 있는 표준적인 반복문 기반 이진 탐색 소스코드 템플릿입니다.  
            몫 연산자(<MathBadge>//</MathBadge>)를 통해 중간점 인덱스를 안전하게 계산하는 구성을 확인하세요.
          </p>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeExample1} />
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 3 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          3. 라이브러리 치트키: bisect의 극강 활용
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            파이썬의 표준 <MathBadge>bisect</MathBadge> 라이브러리를 활용하면 직접 탐색 함수를 짤 필요도 없이, <strong>'정렬된 배열 내 특정 값 범위에 속한 원소 개수'</strong>를 단 O(log N) 만에 기가 막히게 세어낼 수 있습니다.
          </p>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeExample2} />
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Quiz */}
      <section>
        <QuizPanel 
          question="Q5. 이진 탐색 알고리즘은 극강의 탐색 성능 O(log N)을 보장합니다. 그렇다면 탐색 공간 범위가 무려 1,000억(10^11)에 이르는 문제에서 최악의 시나리오가 펼쳐졌을 때, 이진 탐색이 수행하는 최대 비교 연산 횟수는 약 몇 번 이내입니까?"
          options={quizOptions}
        />
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Warning Callout */}
      <Callout type="danger" title="매우 큰 탐색 범위는 무조건 '파라메트릭 서치' 경보! 🛑">
        <p className="mb-2">
          코딩 테스트 문제 지문 중 <strong>"탐색 범위(예: 랜선의 길이, 예산의 상한)가 1,000만 또는 1억 이상"</strong>으로 비상식적이게 높게 주어졌을 때는 십중팔구 <strong>이진 탐색</strong> 및 <strong>파라메트릭 서치(Parametric Search)</strong>를 요구하는 문제입니다!
        </p>
        <p>
          파라메트릭 서치란 최적화 문제를 <strong>'결정 문제(예/아니오로 대답하는 문제)'</strong>로 바꾸어 이진 탐색을 통해 최적점을 조여가는 기법입니다. 이때 <MathBadge>O(N)</MathBadge> 이하의 선형 완전탐색은 즉각 시간 초과를 받고 격추당하므로, 즉각 이진 탐색 템플릿을 꺼내들어 구현하십시오!
        </p>
      </Callout>
    </div>
  );
}
