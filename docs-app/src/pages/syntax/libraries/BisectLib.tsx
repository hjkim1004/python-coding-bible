import CodeViewer from '../../../components/ui/CodeViewer';
import Callout from '../../../components/ui/Callout';
import MathBadge from '../../../components/ui/MathBadge';
import QuizPanel from '../../../components/ui/QuizPanel';

interface BisectLibProps {
  isDarkMode: boolean;
}

export default function BisectLib({ isDarkMode }: BisectLibProps) {
  const codeBasic = `
from bisect import bisect_left, bisect_right

# 1. bisect 기본 작동 (정렬 리스트에서 원소 삽입할 위치의 인덱스 검색)
data = [1, 2, 4, 4, 8]
x = 4

# O(log N)의 압도적인 이진 탐색 속도로 검색!
print(bisect_left(data, x))  # 2 (값 4가 처음 나타나는 인덱)
print(bisect_right(data, x)) # 4 (값 4가 마지막으로 끝난 직후 삽입할 인덱스)
`;

  const codeRangeQuery = `
from bisect import bisect_left, bisect_right

# [실전 핵심 템플릿 🌟] 정렬된 리스트에서 [left_value, right_value] 범위에 속하는 데이터 개수 세기
# 일반 list 순회(O(N))와 달리, 이진 탐색으로 단 O(log N) 만에 원소 개수를 세어냅니다!
def count_by_range(arr, left_value, right_value):
    right_index = bisect_right(arr, right_value)
    left_index = bisect_left(arr, left_value)
    return right_index - left_index

sorted_list = [1, 2, 3, 3, 3, 3, 4, 4, 8, 9]

# 값이 3인 데이터 개수 구하기
print(count_by_range(sorted_list, 3, 3)) # 4 (3이 4개 들어있음)

# 값이 2이상 8이하인 데이터 개수 구하기
print(count_by_range(sorted_list, 2, 8)) # 8 (2, 3, 3, 3, 3, 4, 4, 8 총 8개)
`;

  const quizOptions = [
    {
      text: "O(1)",
      isCorrect: false,
      explanation: "인덱스를 직접 알고 있는 배열의 단순 조회가 아니므로 O(1)로는 불가능합니다."
    },
    {
      text: "O(N)",
      isCorrect: false,
      explanation: "리스트를 단순히 처음부터 끝까지 순회하는 선형 방식이 O(N)입니다."
    },
    {
      text: "O(log N)",
      isCorrect: true,
      explanation: "정답입니다! bisect의 내부 설계는 정렬된 데이터를 정확히 반씩 쪼개며 추적하는 '이진 탐색'을 가동하므로, 원소의 개수가 아무리 많아도 단 O(log N)의 뛰어난 시간 복잡도 성능을 발휘합니다."
    },
    {
      text: "O(N log N)",
      isCorrect: false,
      explanation: "정렬되지 않은 리스트를 정렬하는 Timsort 등의 Timsort 알고리즘 정렬 복잡도가 O(N log N)입니다."
    }
  ];

  return (
    <div className="animate-fadeIn">
      {/* 👑 OPEN PREMIUM TYPOGRAPHY HEADER */}
      <div className="mb-8">
        <div className="text-[12px] font-extrabold tracking-widest text-indigo-500 uppercase mb-2">
          PART 1. 파이썬 필수 문법
        </div>
        <h1 className="text-3xl font-black text-slate-950 dark:text-white leading-tight tracking-tight mt-1">
          Lesson 5-5. bisect 라이브러리 (이진 탐색 쿼리) 🔍
        </h1>
        <p className="text-[15px] text-slate-500 dark:text-zinc-400 font-semibold leading-relaxed mt-3">
          정렬된 데이터 배열에서 최적화된 속도로 작동하는 이진 탐색 인덱스 서칭법과 실전 '범위 카운트 쿼리' 비기를 정복합니다.
        </p>
      </div>

      {/* 균일한 높이의 얇은 분리 장막 선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 mb-12" />

      {/* Section 1 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          1. bisect_left() 와 bisect_right()의 기본 원리
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            데이터가 반드시 <strong>정렬(Sorted)</strong>되어 있을 때만 사용 가능합니다.  
            새로운 값 <MathBadge>x</MathBadge>를 정렬 순서를 헤치지 않고 임포트할 수 있는 인덱스 위치를 반환해 줍니다:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2">
            <li><MathBadge>bisect_left(arr, x)</MathBadge> : 값 <MathBadge>x</MathBadge>가 시작하는 <strong>가장 왼쪽</strong> 인덱스를 포인팅합니다.</li>
            <li><MathBadge>bisect_right(arr, x)</MathBadge> : 값 <MathBadge>x</MathBadge>가 끝난 직후 삽입될 수 있는 <strong>가장 오른쪽</strong> 인덱스를 포인팅합니다.</li>
          </ul>
        </div>
        <CodeViewer isDarkMode={isDarkMode} code={codeBasic} />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 2 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          2. [비기 🌟] 범위 개수 카운팅 O(log N) 치트키 함수
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            정렬된 리스트에서 "값이 3인 원소가 몇 개인지 세어라" 또는 "2이상 8이하인 원소가 몇 개인지 세어라"하는 쿼리는 코테의 대용량 문제에서 매초 마주칩니다.  
            일반 루프로 돌면 <MathBadge>O(N)</MathBadge>이지만, <MathBadge>bisect_right(arr, right) - bisect_left(arr, left)</MathBadge> 공식을 적용하면 단 <MathBadge>O(log N)</MathBadge> 만에 해결 가능합니다.
          </p>
        </div>
        <CodeViewer isDarkMode={isDarkMode} code={codeRangeQuery} />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Quiz */}
      <section>
        <QuizPanel 
          question="Q5-5. bisect_left() 및 bisect_right() 이진 탐색 라이브러리 함수가 정렬된 대용량 리스트(크기 N) 내부에서 목표 원소를 분할 추적해내는 연산의 평균 시간 복잡도는 무엇일까요?"
          options={quizOptions}
        />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Bottom Tip Callout */}
      <Callout type="success" title="실전 코딩테스트 응용 팁 & 추천 문제">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>정렬 유무 확인</strong>: bisect는 데이터가 이미 <strong>정렬</strong>되어 있을 때만 정상 소화됩니다! 만약 정렬되지 않은 임의의 배열에 bisect를 적용하면 논리적으로 엉망진창인 잘못된 인덱스를 반환하므로 주의하세요!
          </li>
          <li>
            <strong>추천 기출문제</strong>: 백준 -{' '}
            <a
              href="https://www.acmicpc.net/problem/10816"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 underline underline-offset-2 transition-colors font-semibold"
            >
              [숫자 카드 2]
            </a>{' '}
            (특정 범위 원소 수 카운팅 기법을 완벽 테스트하는 bisect 입문 명작)
          </li>
        </ul>
      </Callout>
    </div>
  );
}
