import CodeViewer from '../../components/ui/CodeViewer';
import Callout from '../../components/ui/Callout';
import MathBadge from '../../components/ui/MathBadge';
import QuizPanel from '../../components/ui/QuizPanel';

interface SortingProps {
  isDarkMode: boolean;
}

export default function Sorting({ isDarkMode }: SortingProps) {
  const codeExample1 = `
# 퀵 정렬(Quick Sort)의 직관적인 파이썬 구현 기법
def quick_sort(array):
    # 리스트가 하나 이하의 원소만 담고 있다면 종료
    if len(array) <= 1:
        return array
        
    pivot = array[0] # 피벗은 첫 번째 원소
    tail = array[1:] # 피벗을 제외한 리스트
    
    left_side = [x for x in tail if x <= pivot]  # 분할된 왼쪽 부분
    right_side = [x for x in tail if x > pivot] # 분할된 오른쪽 부분
    
    # 분할 이후 왼쪽 부분과 오른쪽 부분에서 각각 정렬을 수행하고, 전체 리스트를 반환
    return quick_sort(left_side) + [pivot] + quick_sort(right_side)

array = [5, 7, 9, 0, 3, 1, 6, 2, 4, 8]
print(quick_sort(array)) # 출력: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
`;

  const codeExample2 = `
# 파이썬 람다(Lambda) 식을 활용한 복합 다중 정렬 치트키
students = [
    ("홍길동", 85, 2026),
    ("이순신", 95, 2024),
    ("임꺽정", 85, 2025)
]

# 1순위: 점수(인덱스 1) 내림차순 (-)
# 2순위: 입학연도(인덱스 2) 오름차순 (+)
# 3순위: 이름(인덱스 0) 사전순
sorted_students = sorted(students, key=lambda x: (-x[1], x[2], x[0]))

print(sorted_students)
# 출력: [('이순신', 95, 2024), ('임꺽정', 85, 2025), ('홍길동', 85, 2026)]
`;

  const quizOptions = [
    {
      text: "Quick Sort (퀵 정렬)",
      isCorrect: false,
      explanation: "퀵 정렬은 평균 복잡도가 O(N log N)이지만, 이미 정렬된 리스트에 대해서 피벗을 잘못 잡으면 O(N^2)으로 떨어지는 치명적인 한계가 있어 하이브리드 언어 내장 정렬로는 잘 쓰이지 않습니다."
    },
    {
      text: "Timsort (팀소트)",
      isCorrect: true,
      explanation: "정답입니다! Timsort는 병합 정렬(Merge Sort)과 삽입 정렬(Insertion Sort)을 고도로 융합한 알고리즘으로, 파이썬 내장 정렬의 표준 엔진이며 최악의 상황에서도 O(N log N)과 안정 정렬(Stable Sort)을 확실하게 보장해 줍니다."
    },
    {
      text: "Bubble Sort (버블 정렬)",
      isCorrect: false,
      explanation: "버블 정렬은 O(N^2) 정렬로 실무 및 코테 내장 정렬에서 사용되지 않습니다."
    },
    {
      text: "Heap Sort (힙 정렬)",
      isCorrect: false,
      explanation: "힙 정렬은 O(N log N)이지만 캐시 지역성이 낮아 실제 성능은 Timsort보다 느립니다."
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
          Lesson 4. 정렬 (Sorting) 🗂️
        </h1>
        <p className="text-[15px] text-slate-500 dark:text-zinc-400 font-semibold leading-relaxed">
          데이터들을 특정 기준에 맞추어 오름차순/내림차순으로 기계적으로 정렬하는 기본 알고리즘과 파이썬 고유의 다중 조건 정렬을 마스터합니다.
        </p>
      </div>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 mb-12" />

      {/* Section 1 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          1. 핵심 정렬 알고리즘 시간 복잡도 비교
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            코딩 테스트에서 정렬은 가장 기초적이면서 강력한 전처리 도구입니다. 상황에 맞게 어떤 정렬을 선택할지 결정하려면 각 정렬 방식의 복잡도를 이해해야 합니다.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-slate-600 dark:text-zinc-300 border-collapse border border-slate-200 dark:border-zinc-800 text-[13.5px]">
              <thead>
                <tr className="bg-slate-100 dark:bg-zinc-900 font-bold">
                  <th className="border border-slate-200 dark:border-zinc-800 px-4 py-2">알고리즘 명칭</th>
                  <th className="border border-slate-200 dark:border-zinc-800 px-4 py-2">평균 복잡도</th>
                  <th className="border border-slate-200 dark:border-zinc-800 px-4 py-2">최악 복잡도</th>
                  <th className="border border-slate-200 dark:border-zinc-800 px-4 py-2">특징 및 최적 대상</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-200 dark:border-zinc-800 px-4 py-2 font-semibold">선택 정렬 (Selection)</td>
                  <td className="border border-slate-200 dark:border-zinc-800 px-4 py-2"><MathBadge>O(N²)</MathBadge></td>
                  <td className="border border-slate-200 dark:border-zinc-800 px-4 py-2"><MathBadge>O(N²)</MathBadge></td>
                  <td className="border border-slate-200 dark:border-zinc-800 px-4 py-2">가장 원시적인 형태, N이 매우 작을 때만 동작</td>
                </tr>
                <tr className="bg-slate-50/50 dark:bg-zinc-900/20">
                  <td className="border border-slate-200 dark:border-zinc-800 px-4 py-2 font-semibold">삽입 정렬 (Insertion)</td>
                  <td className="border border-slate-200 dark:border-zinc-800 px-4 py-2"><MathBadge>O(N²)</MathBadge></td>
                  <td className="border border-slate-200 dark:border-zinc-800 px-4 py-2"><MathBadge>O(N²)</MathBadge></td>
                  <td className="border border-slate-200 dark:border-zinc-800 px-4 py-2">거의 정렬되어 있는 최상의 데이터 집합에 대단히 빠름</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-zinc-800 px-4 py-2 font-semibold">퀵 정렬 (Quick)</td>
                  <td className="border border-slate-200 dark:border-zinc-800 px-4 py-2"><MathBadge>O(N log N)</MathBadge></td>
                  <td className="border border-slate-200 dark:border-zinc-800 px-4 py-2"><MathBadge>O(N²)</MathBadge></td>
                  <td className="border border-slate-200 dark:border-zinc-800 px-4 py-2">일반적으로 고성능, 단 이미 정렬된 리스트에서는 최악 지연</td>
                </tr>
                <tr className="bg-slate-50/50 dark:bg-zinc-900/20">
                  <td className="border border-slate-200 dark:border-zinc-800 px-4 py-2 font-semibold">계수 정렬 (Counting)</td>
                  <td className="border border-slate-200 dark:border-zinc-800 px-4 py-2"><MathBadge>O(N + K)</MathBadge></td>
                  <td className="border border-slate-200 dark:border-zinc-800 px-4 py-2"><MathBadge>O(N + K)</MathBadge></td>
                  <td className="border border-slate-200 dark:border-zinc-800 px-4 py-2">값의 범위가 한정적일 때 메모리와 속도를 초고속 트레이드</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 2 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          2. 파이썬 다운 퀵 정렬 구현
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            파이썬의 핵심 기법인 <strong>List Comprehension</strong>을 활용하면, 다른 프로그래밍 언어의 복잡한 피벗 교환 소스코드를 단 몇 줄의 직관적인 구문으로 압축하여 퀵 정렬을 구현할 수 있습니다.
          </p>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeExample1} />
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 3 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          3. 실전 정렬의 종결자: 다중 조건 람다(Lambda) 정렬
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            실전 코딩 테스트에서 사용자가 직접 소스코드로 정렬 함수를 바닥부터 빌드하는 경우는 드뭅니다. 대신 파이썬 내장 정렬의 <strong>Lambda Key</strong> 구성을 통해 여러 조건의 정렬 요구사항을 우아하게 해결합니다.
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2">
            <li>람다 내부에 튜플(<MathBadge>(key1, key2, ...)</MathBadge>)을 전달하면 순서대로 다중 정렬이 정밀 적용됩니다.</li>
            <li>수 자료형 조건 변수 앞에 마이너스(<MathBadge>-</MathBadge>) 부호를 얹으면 해당 조건만 <strong>내림차순 역순</strong> 정렬됩니다!</li>
          </ul>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeExample2} />
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Quiz */}
      <section>
        <QuizPanel 
          question="Q4. 파이썬의 표준 정렬 함수인 sorted() 및 .sort() 메서드가 채택하고 있으며, 최악의 시나리오에서도 O(N log N) 정렬 성능과 원소간의 순서 보장(Stable)을 확약해 주는 내부 핵심 정렬 엔진은 무엇입니까?"
          options={quizOptions}
        />
      </section>

      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Warning Callout */}
      <Callout type="warning" title="계수 정렬(Counting Sort)의 한계와 전제 조건! 🛑">
        <p className="mb-2">
          계수 정렬은 정렬하고자 하는 데이터 중 <strong>최대값과 최소값의 차이가 1,000,000 이하</strong>일 때 극도의 강세를 보입니다.
        </p>
        <p>
          만약 원소 개수는 2개뿐인데 원소값이 각각 <MathBadge>0</MathBadge>과 <MathBadge>10,000,000,000</MathBadge>(100억)이라면, 단 2개의 숫자를 정렬하기 위해 100억 칸짜리 리스트를 선언하게 되므로 엄청난 공간적 낭비와 <strong>메모리 폭탄</strong>을 초래하게 됩니다. 값의 차이가 너무 클 때는 반드시 범용적인 Timsort 기법을 설계하여 회피하십시오!
        </p>
      </Callout>
    </div>
  );
}
