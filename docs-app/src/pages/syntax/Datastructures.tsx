import CodeViewer from '../../components/ui/CodeViewer';
import Callout from '../../components/ui/Callout';
import MathBadge from '../../components/ui/MathBadge';
import QuizPanel from '../../components/ui/QuizPanel';

interface DatastructuresProps {
  isDarkMode: boolean;
}

export default function Datastructures({ isDarkMode }: DatastructuresProps) {
  const codeExample1 = `
# 리스트 컴프리헨션(List Comprehension)으로 2차원 격자판 뼈대 구축하기 (정석!)
n, m = 3, 4
board = [[0] * m for _ in range(n)]
print("지도:", board) # [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
`;

  const codeExample2 = `
original = "Apple,Banana,Orange"
fruits = original.split(",") # ['Apple', 'Banana', 'Orange']

# ✨ 파이썬 고유 치트키: 문자열 슬라이싱으로 뒤집기
reversed_word = original[::-1] # 'egnaro,ananaB,elppA'
`;

  const codeExample3 = `
# 1. 사전(Dictionary) 활용
student_scores = {"Kim": 90, "Lee": 85}
print(student_scores.get("Lee", 0)) # 85 (Key가 없으면 기본값 0 반환, 안전함!)

# 2. 집합(Set) 활용
set_a = {1, 2, 3, 3, 3} # 중복이 자동으로 제거됨 -> {1, 2, 3}
set_b = {3, 4, 5}

# 집합 연산 기호 활용
print(set_a & set_b) # {3} (교집합)
print(set_a | set_b) # {1, 2, 3, 4, 5} (합집합)
`;

  const quizOptions = [
    {
      text: "N이 10만일 때, 리스트에서 'in' 키워드를 사용하여 원소 찾기",
      isCorrect: false,
      explanation: "리스트의 'in' 연산자는 순차 탐색을 하므로 O(N)의 시간 복잡도를 가져, 반복 횟수가 많을 시 시간 초과 오답 판정을 받습니다."
    },
    {
      text: "N이 10만일 때, 집합(Set)에서 'in' 키워드를 사용하여 원소 찾기",
      isCorrect: true,
      explanation: "정답입니다! 집합(Set)은 내부적으로 해시 테이블로 구현되어 데이터 존재 여부(in) 조회의 평균 시간 복잡도가 O(1)입니다. 크기가 큰 탐색 문제는 리스트 대신 집합을 써야 통과합니다."
    },
    {
      text: "리스트의 특정 인덱스에 데이터를 삽입하는 list.insert(idx, value) 사용하기",
      isCorrect: false,
      explanation: "insert()는 삽입 후 모든 원소를 한 칸씩 뒤로 밀어야 하므로 O(N)의 시간이 소요되어 성능 저하의 주범이 됩니다."
    },
    {
      text: "리스트 내의 특정 데이터를 지우는 list.remove(value) 사용하기",
      isCorrect: false,
      explanation: "remove() 역시 원소를 검색(O(N))하고 삭제 후 빈칸을 채워 당기므로 O(N)이 소요됩니다."
    }
  ];

  return (
    <div className="animate-fadeIn">
      {/* 👑 OPEN PREMIUM TYPOGRAPHY HEADER (밤티 상자 전면 철거!) */}
      <div className="mb-8">
        <div className="text-[12px] font-extrabold tracking-widest text-indigo-500 uppercase mb-2">
          PART 1. 파이썬 필수 문법
        </div>
        <h1 className="text-3.5xl font-black tracking-tight text-slate-950 dark:text-white leading-none mb-4">
          Lesson 2. 주요 자료구조 📦
        </h1>
        <p className="text-[15px] text-slate-500 dark:text-zinc-400 font-semibold leading-relaxed">
          파이썬 코딩 테스트의 핵심 축을 담당하는 리스트, 문자열, 그리고 탐색 치트키인 해시 구조(사전/집합)의 시간 복잡도와 실전 제어술을 학습합니다.
        </p>
      </div>

      {/* 균일한 높이의 얇은 분리 장막 선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 mb-12" />

      {/* Section 1 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          1. 리스트 (List) — 파이썬의 동적 배열
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            파이썬의 리스트는 내부적으로 동적 배열(Dynamic Array)로 설계되어 공간이 차면 자동으로 확장됩니다.  
            하지만 <strong>특정 연산의 숨겨진 시간 복잡도</strong>를 모르고 쓰면 대참사가 일어납니다.
          </p>
        </div>

        {/* Complexity Table */}
        <div className="overflow-hidden border border-slate-200 dark:border-zinc-850 rounded-xl my-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800">
                <th className="px-4 py-3 font-bold text-[13.5px]">연산</th>
                <th className="px-4 py-3 font-bold text-[13.5px]">예시 코드</th>
                <th className="px-4 py-3 font-bold text-[13.5px]">시간 복잡도</th>
                <th className="px-4 py-3 font-bold text-[13.5px]">설명</th>
              </tr>
            </thead>
            <tbody className="text-[13.5px]">
              <tr className="border-b border-slate-200/60 dark:border-zinc-800/40">
                <td className="px-4 py-3 font-semibold text-slate-800 dark:text-zinc-200">맨 뒤 삽입</td>
                <td className="px-4 py-3 font-mono">list.append(x)</td>
                <td className="px-4 py-3"><MathBadge>O(1)</MathBadge></td>
                <td className="px-4 py-3 text-slate-500">지연 없이 가장 최적화되어 있고 안전함</td>
              </tr>
              <tr className="border-b border-slate-200/60 dark:border-zinc-800/40">
                <td className="px-4 py-3 font-semibold text-slate-800 dark:text-zinc-200">특정 위치 삽입</td>
                <td className="px-4 py-3 font-mono">list.insert(idx, x)</td>
                <td className="px-4 py-3"><MathBadge>O(N)</MathBadge></td>
                <td className="px-4 py-3 text-slate-500">삽입 지점 뒤의 원소를 밀어야 해서 대단히 느림</td>
              </tr>
              <tr className="border-b border-slate-200/60 dark:border-zinc-800/40">
                <td className="px-4 py-3 font-semibold text-slate-800 dark:text-zinc-200">특정 위치 삭제</td>
                <td className="px-4 py-3 font-mono">list.pop(idx)</td>
                <td className="px-4 py-3"><MathBadge>O(N)</MathBadge></td>
                <td className="px-4 py-3 text-slate-500">원소를 빼낸 뒤 뒤쪽 데이터를 당기므로 느림</td>
              </tr>
              <tr className="border-b border-slate-200/60 dark:border-zinc-800/40">
                <td className="px-4 py-3 font-semibold text-slate-800 dark:text-zinc-200">정렬</td>
                <td className="px-4 py-3 font-mono">list.sort()</td>
                <td className="px-4 py-3"><MathBadge>O(N log N)</MathBadge></td>
                <td className="px-4 py-3 text-slate-500">Timsort 하이브리드 엔진으로 최고 속도 보장</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-slate-800 dark:text-zinc-200">포함 탐색</td>
                <td className="px-4 py-3 font-mono">x in list</td>
                <td className="px-4 py-3"><MathBadge>O(N)</MathBadge></td>
                <td className="px-4 py-3 text-slate-500">원소 유무 판단을 위해 무식하게 선형 스캔함</td>
              </tr>
            </tbody>
          </table>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeExample1} />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 2 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          2. 문자열 (String) — 불변 객체
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            파이썬에서 문자열은 <strong>불변(Immutable)</strong> 속성을 갖습니다. 슬라이싱 기믹을 이해하면 문자열 처리 문제를 압도적으로 단축할 수 있습니다.
          </p>
        </div>

        <CodeViewer isDarkMode={isDarkMode} code={codeExample2} />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Section 3 */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
          3. 사전 (Dictionary) & 집합 (Set) — O(1) 해시 테이블
        </h2>
        <div className="space-y-3 text-[14.5px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
          <p>
            중복 원소 제거, 키-값 일치 검색, 특정 값 존재 유무 판별이 빈번할 때는 무조건 리스트 대신 해시를 써야 합니다.
          </p>
        </div>

        <Callout type="warning" title="리스트와 집합의 속도 10만 배 격차">
          <p className="mb-2">10만 개의 무작위 숫자가 담긴 배열에서 내가 원하는 1만 개의 키가 존재하는지 찾는 시나리오가 있다면:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>리스트(<code>in list</code>)</strong>: 1만 × 10만 = <strong>10억 번 연산 (시간 초과 탈락 🛑)</strong>
            </li>
            <li>
              <strong>집합(<code>in set</code>)</strong>: 1만 × 1 = <strong>1만 번 연산 (0.001초 통과 ✨)</strong>
            </li>
          </ul>
        </Callout>

        <CodeViewer isDarkMode={isDarkMode} code={codeExample3} />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Quiz */}
      <section>
        <QuizPanel 
          question="Q2. 다음 자료구조 및 관련 기법 중, 시간 복잡도가 O(1)이 아니며 데이터의 개수가 증가함에 따라 선형적으로 탐색 연산 시간이 늘어나는 것은 무엇일까요?"
          options={quizOptions}
        />
      </section>

      {/* 칼같이 맞아떨어지는 my-12 구분선 */}
      <hr className="border-slate-200/60 dark:border-zinc-800/40 my-12" />

      {/* Bottom Tip Callout */}
      <Callout type="success" title="실전 코딩테스트 응용 팁 & 추천 문제">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>중복 일괄 세척법</strong>: 리스트 내의 중복 요소를 제거하려면 <MathBadge>list(set(my_list))</MathBadge> 공식을 사용하여 단 한 줄에 O(N)으로 완벽 세척하세요!
          </li>
          <li>
            <strong>추천 기출문제</strong>: 프로그래머스 -{' '}
            <a
              href="https://school.programmers.co.kr/learn/courses/30/lessons/42576"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 underline underline-offset-2 transition-colors font-semibold"
            >
              [완주하지 못한 선수]
            </a>
            ,{' '}
            <a
              href="https://school.programmers.co.kr/learn/courses/30/lessons/1845"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 underline underline-offset-2 transition-colors font-semibold"
            >
              [폰켓몬]
            </a>
          </li>
        </ul>
      </Callout>
    </div>
  );
}
