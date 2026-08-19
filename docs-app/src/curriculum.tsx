import React from 'react';
import Intro from './pages/Intro';
import Datatypes from './pages/syntax/Datatypes';
import Datastructures from './pages/syntax/Datastructures';
import ControlFlow from './pages/syntax/ControlFlow';
import Functions from './pages/syntax/Functions';
import StandardLibrary from './pages/syntax/StandardLibrary';

// 하위 6대 표준 라이브러리 레슨 컴포넌트 임포트 (클린 코드)
import SysLib from './pages/syntax/libraries/SysLib';
import CollectionsLib from './pages/syntax/libraries/CollectionsLib';
import HeapqLib from './pages/syntax/libraries/HeapqLib';
import ItertoolsLib from './pages/syntax/libraries/ItertoolsLib';
import BisectLib from './pages/syntax/libraries/BisectLib';
import MathLib from './pages/syntax/libraries/MathLib';

// PART 2 알고리즘 레슨 컴포넌트 임포트
import Greedy from './pages/algo/Greedy';
import Implementation from './pages/algo/Implementation';
import DfsBfs from './pages/algo/DfsBfs';
import Sorting from './pages/algo/Sorting';
import BinarySearch from './pages/algo/BinarySearch';
import DynamicProgramming from './pages/algo/DynamicProgramming';
import ShortestPath from './pages/algo/ShortestPath';
import GraphTheory from './pages/algo/GraphTheory';

// PART 3 기출문제 해설 컴포넌트 임포트
import GymSuit from './pages/solve/GymSuit';
import Baekjoon1260 from './pages/solve/Baekjoon1260';

export interface CurriculumItem {
  id: string;
  title: string;
  component: React.ComponentType<{ isDarkMode: boolean }>;
}

export interface CurriculumSection {
  title: string;
  items: CurriculumItem[];
}

export const CURRICULUM: CurriculumSection[] = [
  {
    title: "PART 1. 파이썬 필수 문법 🐍",
    items: [
      { id: "syntax-01", title: "Lesson 1. 기본 자료형 및 연산자", component: Datatypes },
      { id: "syntax-02", title: "Lesson 2. 주요 자료구조", component: Datastructures },
      { id: "syntax-03", title: "Lesson 3. 제어문과 반복문", component: ControlFlow },
      { id: "syntax-04", title: "Lesson 4. 함수와 람다", component: Functions },
      { id: "syntax-05", title: "Lesson 5. 필수 표준 라이브러리 개요", component: StandardLibrary },
      { id: "syntax-05-1", title: "  ├─ sys (빠른 입출력)", component: SysLib },
      { id: "syntax-05-2", title: "  ├─ collections (특수 자료구조)", component: CollectionsLib },
      { id: "syntax-05-3", title: "  ├─ heapq (우선순위 큐)", component: HeapqLib },
      { id: "syntax-05-4", title: "  ├─ itertools (순열과 조합)", component: ItertoolsLib },
      { id: "syntax-05-5", title: "  ├─ bisect (이진 탐색 쿼리)", component: BisectLib },
      { id: "syntax-05-6", title: "  └─ math (초고속 수학 연산)", component: MathLib },
    ]
  },
  {
    title: "PART 2. 핵심 알고리즘 이론 🏆",
    items: [
      { id: "algo-01", title: "Lesson 1. 그리디 (탐욕법)", component: Greedy },
      { id: "algo-02", title: "Lesson 2. 구현 (시뮬레이션)", component: Implementation },
      { id: "algo-03", title: "Lesson 3. DFS/BFS 그래프 탐색", component: DfsBfs },
      { id: "algo-04", title: "Lesson 4. 정렬 (Sorting)", component: Sorting },
      { id: "algo-05", title: "Lesson 5. 이진 탐색 (Binary Search)", component: BinarySearch },
      { id: "algo-06", title: "Lesson 6. 다이나믹 프로그래밍", component: DynamicProgramming },
      { id: "algo-07", title: "Lesson 7. 최단 경로 (Shortest Path)", component: ShortestPath },
      { id: "algo-08", title: "Lesson 8. 기타 그래프 이론", component: GraphTheory },
    ]
  },
  {
    title: "PART 3. 기출문제 상세 해설집 ✨",
    items: [
      { id: "solve-01", title: "Lesson 1. 프로그래머스 - 체육복 (그리디)", component: GymSuit },
      { id: "solve-02", title: "Lesson 2. 백준 1260번 - DFS와 BFS", component: Baekjoon1260 },
    ]
  }
];

export const INTRO_ITEM: CurriculumItem = {
  id: "intro",
  title: "🐍 바이블 소개",
  component: Intro
};
