# 파이썬 코딩테스트

> 코딩테스트를 통과하는 데 필요한 파이썬만, 이유까지 함께.
>
> **https://me.twinklelabs.kr/python-coding-bible/**

문법서는 이미 많다. 이 책은 시험장에서 쓰는 것만 골라 담되 외우라고 하지 않는다 —
왜 그 코드가 시간 초과를 피하는지, 왜 그 선택이 손해가 아닌지까지 적었다.
전부 37강이고, 실린 코드는 모두 실행해 답을 맞춰 본 것이다.
**파이썬이 처음이어도 된다** — 0부가 `print` 부터 시작해 1부를 읽을 만큼만 데려다 놓는다.

## 무엇이 들어 있나

| 부 | 내용 | 강 |
|---|---|---|
| 0부 · 파이썬 첫걸음 | print와 들여쓰기 · 변수와 자료형 · 입력받기 · 조건 · 반복 · 담아 두기 · 함수와 import | 7 |
| 1부 · 통과하는 문법 | 입출력 · 수 · 리스트 · 문자열 · 딕셔너리와 집합 · 반복 · 함수와 정렬 키 | 7 |
| 2부 · 여섯 개의 표준 도구 | collections · heapq · itertools · bisect · math · functools | 6 |
| 3부 · 알고리즘 | 그리디 · 구현 · DFS/BFS · 정렬 · 이진 탐색 · DP · 최단 경로 · 그래프 이론 | 8 |
| 4부 · 기출 해설 | 체육복 · 완주하지 못한 선수 · 기능개발 · 가장 큰 수 · 타겟 넘버 · 게임 맵 최단거리 · 네트워크 · 입국심사 · 등굣길 | 9 |

4부의 문제는 전부 **프로그래머스**다. 백준은 2026-04-28에 서비스를 종료했다가
인수 후 재개를 앞둔 상태라, 링크가 언제 살아 있을지 알 수 없어 싣지 않았다.

강마다 자가진단 문제가 하나씩 붙어 있고, 틀린 선택지에도 **왜 틀렸는지**가 적혀 있다.
읽은 강은 체크할 수 있으며 진도는 브라우저에 남는다.

## 띄우기

```bash
npm install --prefix app
```

```bash
npm run dev --prefix app
```

`http://localhost:3000` — 레슨마다 주소가 있다(`#/p3-dfsbfs`). 링크로 바로 열린다.

## 만듦새

| 항목 | 값 |
|---|---|
| 스택 | Vite + React 18 + TypeScript. **런타임 의존은 react / react-dom 둘뿐** |
| 디자인 | Aurora Ledger — `src/styles/tokens.css`의 CSS 변수만 부른다. 값을 클래스에 직접 쓰지 않는다 |
| 라우팅 | 해시 라우터 직접 구현 — 서버가 없는 GitHub Pages에서 새로고침해도 404가 나지 않는다 |
| 하이라이트 | 파이썬 전용 토크나이저 직접 구현(`src/lib/highlight.ts`) — 색은 디자인 토큰이 정한다 |
| 크기 | 첫 화면 gzip 53KB (강은 읽을 때 하나씩, 각 2~3KB) |
| 검사 | `npm test` 책의 파이썬 · `npm run lint` ESLint |

문법 강조 라이브러리 하나가 950KB였고 색은 그 라이브러리의 테마가 정했다.
이 책에 실리는 코드는 파이썬 한 종류뿐이라, 필요한 만큼만 직접 나눴다.

강은 읽을 때 받아 온다. 한 강을 여는 사람이 나머지 29강의 본문까지 내려받을
이유가 없다. 다음 강은 화면을 다 그린 뒤 한가할 때 미리 받아 두므로,
«다음 강» 을 눌렀을 때 기다리는 일은 없다.

## 구조

```text
python-codingtest/
├── app/
│   ├── index.html
│   ├── scripts/check_book_code.py  책에 실린 파이썬을 검사한다
│   └── src/
│       ├── App.tsx                 상태와 조립만 (92줄)
│       ├── components/
│       │   ├── Sidebar · TopBar · Pager · Progress    껍데기
│       │   └── Lesson · Code · Note · Quiz · Table · Term   글의 부품
│       ├── content/
│       │   ├── curriculum.ts       목차 데이터 (여기 한 곳만 고치면 강이 늘어난다)
│       │   ├── Intro.tsx · NotFound.tsx
│       │   └── lessons/            37개 강 — 강마다 따로 구워져 읽을 때 받아 온다
│       ├── lib/                    해시 라우터 · 진도 · 테마 · 탭 제목 · 하이라이터
│       └── styles/                 tokens.css (Aurora Ledger) · app.css
└── .github/workflows/deploy.yml    검사 → 빌드 → GitHub Pages
```

## 배포

`.github/workflows/deploy.yml`이 `main` 푸시마다 `app/`을 굽고 Pages로 내보낸다.
Vite의 `base`가 `'./'`라 저장소 이름이 무엇이든 하위 경로에서 그대로 열린다.

읽는 곳 — **https://me.twinklelabs.kr/python-coding-bible/**

## 책의 코드는 기계가 검사한다

```bash
npm test --prefix app
```

`<Code>` 블록을 전부 뽑아 문법을 보고, 스스로 도는 것은 실행해 예외가 없는지 본다.
`# =>` 로 답을 적어 둔 줄은 **실제 출력과 대조**한다 — 0부의 예제와 4부의 기출 풀이 40줄이
여기에 해당한다. 답 뒤에 빈칸 두 칸을 두면 그 뒤는 사람에게 하는 말로 보고 대조에서 뺀다.
블록은 한 강 안에서 읽는 순서대로 같은 이름 공간에서 도므로, 앞 블록의 함수를
뒷 블록이 그대로 쓸 수 있다.

배포 워크플로가 이 검사를 먼저 돌린다. **코드가 거짓말을 하면 배포되지 않는다.**

## 강을 하나 더 쓰려면

1. `src/content/lessons/`에 `.tsx` 하나를 만든다 — `Lesson` · `Section` · `Code` · `Note` · `Quiz`를 쓴다.
2. `src/content/curriculum.ts`에 한 줄 더한다.
3. 답을 단언하고 싶은 print 에는 `# =>` 를 붙인다. 나머지는 검사기가 알아서 한다.

목차·진도·이동·주소는 전부 여기서 따라온다. 손댈 곳은 이 두 군데뿐이다.

---

*Shine by Yourself. Beautifully Complete.* © 2026 Twinkle Labs
