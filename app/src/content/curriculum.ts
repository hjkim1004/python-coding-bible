import type { ComponentType } from 'react';

import Io from './lessons/Io';
import Numbers from './lessons/Numbers';
import Lists from './lessons/Lists';
import Strings from './lessons/Strings';
import DictSet from './lessons/DictSet';
import Loops from './lessons/Loops';
import Functions from './lessons/Functions';

import Collections from './lessons/Collections';
import Heapq from './lessons/Heapq';
import Itertools from './lessons/Itertools';
import Bisect from './lessons/Bisect';
import MathLib from './lessons/MathLib';
import Functools from './lessons/Functools';

import Greedy from './lessons/Greedy';
import Simulation from './lessons/Simulation';
import DfsBfs from './lessons/DfsBfs';
import Sorting from './lessons/Sorting';
import BinarySearch from './lessons/BinarySearch';
import Dp from './lessons/Dp';
import ShortestPath from './lessons/ShortestPath';
import GraphTheory from './lessons/GraphTheory';

import SolveGymSuit from './lessons/SolveGymSuit';
import SolveBfsDfs from './lessons/SolveBfsDfs';
import SolveBigNumber from './lessons/SolveBigNumber';
import SolveHideAndSeek from './lessons/SolveHideAndSeek';

export interface LessonMeta {
  id: string;
  no: string;
  title: string;
  blurb: string;
  page: ComponentType;
}

export interface Part {
  id: string;
  title: string;
  blurb: string;
  lessons: LessonMeta[];
}

export const PARTS: Part[] = [
  {
    id: 'part1',
    title: '1부 · 통과하는 문법',
    blurb: '파이썬 전부가 아니라, 시험장에서 쓰는 것만. 대신 왜 그런지까지.',
    lessons: [
      { id: 'p1-io', no: '1-1', title: '입력과 출력', blurb: '시간을 잃지 않는 법', page: Io },
      { id: 'p1-number', no: '1-2', title: '수와 나눗셈', blurb: '음수 나눗셈과 실수의 오차', page: Numbers },
      { id: 'p1-list', no: '1-3', title: '리스트', blurb: '편리함 뒤에 숨은 복잡도', page: Lists },
      { id: 'p1-string', no: '1-4', title: '문자열', blurb: '불변이 만드는 함정', page: Strings },
      { id: 'p1-dict', no: '1-5', title: '딕셔너리와 집합', blurb: 'O(1)을 사는 값', page: DictSet },
      { id: 'p1-loop', no: '1-6', title: '반복과 조건', blurb: '이중 루프를 빠져나오는 법', page: Loops },
      { id: 'p1-function', no: '1-7', title: '함수와 정렬 키', blurb: '기준을 세우는 lambda', page: Functions },
    ],
  },
  {
    id: 'part2',
    title: '2부 · 여섯 개의 표준 도구',
    blurb: '직접 만들면 O(N)인 일을 O(1)·O(log N)으로 바꿔 주는 여섯 가지.',
    lessons: [
      { id: 'p2-collections', no: '2-1', title: 'collections', blurb: 'deque · Counter · defaultdict', page: Collections },
      { id: 'p2-heapq', no: '2-2', title: 'heapq', blurb: '가장 작은 것을 계속 꺼내기', page: Heapq },
      { id: 'p2-itertools', no: '2-3', title: 'itertools', blurb: '순열 · 조합 · 곱집합', page: Itertools },
      { id: 'p2-bisect', no: '2-4', title: 'bisect', blurb: '정렬된 배열에 던지는 질문', page: Bisect },
      { id: 'p2-math', no: '2-5', title: 'math', blurb: '약수 · 소수 · 세는 계산', page: MathLib },
      { id: 'p2-functools', no: '2-6', title: 'functools', blurb: '캐시와 비교 함수', page: Functools },
    ],
  },
  {
    id: 'part3',
    title: '3부 · 알고리즘',
    blurb: '문제의 말투에서 어떤 도구를 꺼낼지 알아보는 법, 그리고 각 도구의 함정.',
    lessons: [
      { id: 'p3-greedy', no: '3-1', title: '그리디', blurb: '정당성이 절반이다', page: Greedy },
      { id: 'p3-simulation', no: '3-2', title: '구현과 시뮬레이션', blurb: '실수의 자리를 없앤다', page: Simulation },
      { id: 'p3-dfsbfs', no: '3-3', title: 'DFS와 BFS', blurb: '그래프 탐색의 뼈대', page: DfsBfs },
      { id: 'p3-sort', no: '3-4', title: '정렬', blurb: '기준이 곧 답이다', page: Sorting },
      { id: 'p3-binary', no: '3-5', title: '이진 탐색', blurb: '답 자체를 탐색한다', page: BinarySearch },
      { id: 'p3-dp', no: '3-6', title: '다이나믹 프로그래밍', blurb: '무엇을 기억할지 정한다', page: Dp },
      { id: 'p3-path', no: '3-7', title: '최단 경로', blurb: '다익스트라와 플로이드', page: ShortestPath },
      { id: 'p3-graph', no: '3-8', title: '그래프 이론', blurb: '무리·순서·최소 연결', page: GraphTheory },
    ],
  },
  {
    id: 'part4',
    title: '4부 · 기출 해설',
    blurb: '앞의 세 부에서 익힌 것을 실제 문제 위에서 확인합니다. 틀리는 풀이부터 봅니다.',
    lessons: [
      { id: 'p4-gym', no: '4-1', title: '체육복', blurb: '프로그래머스 · 그리디', page: SolveGymSuit },
      { id: 'p4-1260', no: '4-2', title: 'DFS와 BFS', blurb: '백준 1260 · 탐색', page: SolveBfsDfs },
      { id: 'p4-bignum', no: '4-3', title: '가장 큰 수', blurb: '프로그래머스 · 정렬', page: SolveBigNumber },
      { id: 'p4-hide', no: '4-4', title: '숨바꼭질', blurb: '백준 1697 · BFS', page: SolveHideAndSeek },
    ],
  },
];

export const ALL_LESSONS: LessonMeta[] = PARTS.flatMap((part) => part.lessons);

export function partOf(lessonId: string): Part | undefined {
  return PARTS.find((part) => part.lessons.some((lesson) => lesson.id === lessonId));
}
