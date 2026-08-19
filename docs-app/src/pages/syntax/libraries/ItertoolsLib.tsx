import CodeViewer from '../../../components/ui/CodeViewer';
import Callout from '../../../components/ui/Callout';
import MathBadge from '../../../components/ui/MathBadge';
import QuizPanel from '../../../components/ui/QuizPanel';

interface ItertoolsLibProps {
  isDarkMode: boolean;
}

export default function ItertoolsLib({ isDarkMode }: ItertoolsLibProps) {
  const codePermutations = `
from itertools import permutations

# 1. permutations(arr, r) : arr에서 r개를 순서를 고려하여 고르는 경우의 수 (순열)
data = ['A', 'B', 'C']
result = list(permutations(data, 2))

print(result)
# [('A', 'B'), ('A', 'C'), ('B', 'A'), ('B', 'C'), ('C', 'A'), ('C', 'B')]
`;

  const codeCombinations = `
from itertools import combinations

# 2. combinations(arr, r) : arr에서 r개를 순서 없이 묶어내는 경우의 수 (조합, 코테 최다 출제! 🌟)
data = ['A', 'B', 'C']
result = list(combinations(data, 2))

print(result)
# [('A', 'B'), ('A', 'C'), ('B', 'C')]
`;

  const codeProduct = `
from itertools import product

# 3. product(arr, repeat=r) : 중복을 허용하여 r개를 일렬로 배열하는 경우의 수 (중복 순열)
data = ['A', 'B']
result = list(product(data, repeat=3))

print(result)
# [('A', 'A', 'A'), ('A', 'A', 'B'), ('A', 'B', 'A'), ... ('B', 'B', 'B')]
`;

  const codeReplacement = `
from itertools import combinations_with_replacement

# 4. combinations_with_replacement(arr, r) : 중복을 허용하여 r개를 순서 없이 고르는 경우의 수 (중복 조합)
data = ['A', 'B']
result = list(combinations_with_replacement(data, 2))

print(result)
# [('A', 'A'), ('A', 'B'), ('B', 'B')]
`;

  const quizOptions = [
    {
      text: "permutations (순열)",
      isCorrect: false,
      explanation: "순열은 순서를 고려해 나열하는 것으로, 카드 목록 [1, 2]와 [2, 1]을 다른 독립된 결과로 다룹니다."
    },
    {
      text: "combinations (조합)",
      isCorrect: true,
      explanation: "정답입니다! 조합(combinations)은 순서에 상관없이 원소들의 집합만을 고려하므로, 카드 [1, 2]와 [2, 1]을 동일한 하나의 묶음으로 취급합니다. 실전 기출 완전 탐색에서 후보 키나 동전 선택을 할 때 가장 널리 쓰입니다."
    },
    {
      text: "product (중복 순열)",
      isCorrect: false,
      explanation: "product는 중복을 허용하며 순서도 유효하게 세는 연산입니다."
    },
    {
      text: "combinations_with_replacement (중복 조합)",
      isCorrect: false,
      explanation: "중복 조합은 같은 원소를 여러 번 뽑는 것은 허용하되, 순서는 고려하지 않는 기법입니다."
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
          Lesson 5-4. itertools 라이브러리 (순열과 조합) 🌟
        </h1>
        <p className="text-[15px] text-slate-500 dark:text-zinc-400 font-semibold leading-relaxed mt-3">
          완전 탐색(Brute Force) 문제에서 모든 경우의 수 조건 후보들을 수학적 수식 없이 즉각 구현해 내는 특급 조커들을 다룹니다.
        </p>
      </div>

      {/* 균일한 높이의 얇은 분리 장막 선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 mb-12" />

      {/* Grid comparison */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          1. 4대 경우의 수 라이브러리 한눈에 대조하기
        </h2>
        <div className="overflow-hidden border border-slate-200 dark:border-zinc-850 rounded-xl my-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800">
                <th className="px-4 py-3 font-bold text-[13.5px]">함수 예시</th>
                <th className="px-4 py-3 font-bold text-[13.5px]">수학 기호</th>
                <th className="px-4 py-3 font-bold text-[13.5px]">순서 고려 여부</th>
                <th className="px-4 py-3 font-bold text-[13.5px]">중복 선택 허용</th>
              </tr>
            </thead>
            <tbody className="text-[13.5px]">
              <tr className="border-b border-slate-200/60 dark:border-zinc-800/40">
                <td className="px-4 py-3 font-mono text-indigo-600 dark:text-indigo-400 font-bold">permutations(arr, r)</td>
                <td className="px-4 py-3"><sub>n</sub>P<sub>r</sub> (순열)</td>
                <td className="px-4 py-3 text-emerald-500 font-bold">유 (순서 있음)</td>
                <td className="px-4 py-3 text-red-500 font-bold">무 (중복 불가)</td>
              </tr>
              <tr className="border-b border-slate-200/60 dark:border-zinc-800/40">
                <td className="px-4 py-3 font-mono text-indigo-600 dark:text-indigo-400 font-bold">combinations(arr, r)</td>
                <td className="px-4 py-3"><sub>n</sub>C<sub>r</sub> (조합)</td>
                <td className="px-4 py-3 text-red-500 font-bold">무 (순서 없음)</td>
                <td className="px-4 py-3 text-red-500 font-bold">무 (중복 불가)</td>
              </tr>
              <tr className="border-b border-slate-200/60 dark:border-zinc-800/40">
                <td className="px-4 py-3 font-mono text-indigo-600 dark:text-indigo-400 font-bold">product(arr, repeat=r)</td>
                <td className="px-4 py-3"><sub>n</sub>Π<sub>r</sub> (중복순열)</td>
                <td className="px-4 py-3 text-emerald-500 font-bold">유 (순서 있음)</td>
                <td className="px-4 py-3 text-emerald-500 font-bold">유 (중복 가능)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-indigo-600 dark:text-indigo-400 font-bold">combinations_with_replacement(arr, r)</td>
                <td className="px-4 py-3"><sub>n</sub>H<sub>r</sub> (중복조합)</td>
                <td className="px-4 py-3 text-red-500 font-bold">무 (순서 없음)</td>
                <td className="px-4 py-3 text-emerald-500 font-bold">유 (중복 가능)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Subsections with Code Viewers */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          2. permutations (순열) — 순서 지키며 뽑기
        </h2>
        <CodeViewer isDarkMode={isDarkMode} code={codePermutations} />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          3. combinations (조합) — 순서 상관없이 묶기 (최고 빈출! 🌟)
        </h2>
        <CodeViewer isDarkMode={isDarkMode} code={codeCombinations} />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          4. product (중복 순열) & 중복 조합
        </h2>
        <CodeViewer isDarkMode={isDarkMode} code={codeProduct} />
        <div className="text-[14.5px] text-slate-600 dark:text-zinc-300 font-medium">
          <p>중복 조합(`combinations_with_replacement`) 코드 예시입니다:</p>
        </div>
        <CodeViewer isDarkMode={isDarkMode} code={codeReplacement} />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Quiz */}
      <section>
        <QuizPanel 
          question="Q5-4. 여러 카드 중에서 일부 카드를 선택하는 경우의 수 중, '선택한 카드들의 구성 품목만 중요할 뿐, 카드들이 나열된 순서는 전혀 고려하지 않는' 조합 연산을 의미하는 파이썬 내장 라이브러리 메서드는 무엇일까요?"
          options={quizOptions}
        />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Bottom Tip Callout */}
      <Callout type="success" title="실전 코딩테스트 응용 팁 & 추천 문제">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>itertools의 정적 튜플 반환 주의</strong>: itertools의 모든 결과 묶음은 내부적으로 가벼운 <strong>튜플(Tuple) 형태</strong>로 반환됩니다. 만약 문제에서 리스트 형태 수정을 원한다면 <MathBadge>list(comb)</MathBadge> 처럼 형변환을 거치거나, 결과 확인 시 주의가 필요합니다.
          </li>
          <li>
            <strong>추천 기출문제</strong>: 프로그래머스 -{' '}
            <a
              href="https://school.programmers.co.kr/learn/courses/30/lessons/12977"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 underline underline-offset-2 transition-colors font-semibold"
            >
              [소수 만들기]
            </a>{' '}
            (조합 combinations를 활용해 3장의 합을 판별하는 최고 정석 입문)
          </li>
        </ul>
      </Callout>
    </div>
  );
}
