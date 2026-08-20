#!/usr/bin/env python3
"""
책에 실린 파이썬을 검사한다.

교재의 코드가 틀리면 그것은 오타가 아니라 거짓말이다. 사람이 손으로 돌려 보는
검사는 한 번은 되지만 다음 강에서는 잊힌다. 그래서 기계가 매번 돌린다.

세 가지를 본다.
  1. 모든 블록이 문법에 맞는가.
  2. 스스로 도는 블록이 예외 없이 끝나는가.
  3. `# =>` 로 답을 적어 둔 줄이 실제로 그 값을 내놓는가.

블록은 한 강 안에서 «읽는 순서대로, 같은 이름 공간»에서 돈다 — 앞 블록에서
정의한 함수를 뒷 블록이 쓰는 것은 독자가 실제로 읽는 방식 그대로다.
표준 입력을 읽는 블록은 시험장의 것이므로 실행하지 않고 문법만 본다.
"""

from __future__ import annotations

import io
import re
import sys
import contextlib
from pathlib import Path

LESSONS = Path(__file__).resolve().parent.parent / 'src' / 'content' / 'lessons'

CODE_BLOCK = re.compile(r'<Code[^>]*>\{`\n(.*?)`\}</Code>', re.S)
EXPECT = re.compile(r'#\s*=>\s*(.*?)\s*$')

# 채점 서버의 입력을 읽는 코드는 여기서 돌릴 수 없다
NEEDS_STDIN = ('input()', 'sys.stdin')


class Failure(Exception):
    pass


def unescape(source: str) -> str:
    """JSX 템플릿 문자열 안에서 한 번 더 이스케이프된 것을 되돌린다."""
    return source.replace('\\\\n', '\\n').replace("\\'", "'")


def expectations(source: str) -> list[str]:
    found = []
    for line in source.split('\n'):
        m = EXPECT.search(line)
        if m:
            found.append(m.group(1))
    return found


def check_block(name: str, source: str, namespace: dict) -> str:
    try:
        compiled = compile(source, name, 'exec')
    except SyntaxError as e:
        raise Failure(f'문법 오류 {e.lineno}행: {e.msg}')

    if 'print(' not in source or any(t in source for t in NEEDS_STDIN):
        return 'skip'

    buffer = io.StringIO()
    try:
        with contextlib.redirect_stdout(buffer):
            exec(compiled, namespace)
    except Exception as e:
        raise Failure(f'{type(e).__name__}: {e}')

    wanted = expectations(source)
    if not wanted:
        return 'ran'

    got = buffer.getvalue().rstrip('\n').split('\n') if buffer.getvalue().strip() else []
    if len(got) != len(wanted):
        raise Failure(
            f'`# =>` 를 {len(wanted)}개 적었는데 출력은 {len(got)}줄이다. '
            f'답을 적어 둔 블록에서는 print 한 줄마다 `# =>` 하나여야 한다.\n'
            f'      출력: {got}'
        )

    for i, (a, b) in enumerate(zip(got, wanted), start=1):
        if a != b:
            raise Failure(f'{i}번째 출력이 다르다\n      적어 둔 답: {b}\n      실제 출력  : {a}')

    return 'checked'


def main() -> int:
    files = sorted(LESSONS.glob('*.tsx'))
    if not files:
        print(f'레슨을 찾지 못했다: {LESSONS}', file=sys.stderr)
        return 1

    tally = {'skip': 0, 'ran': 0, 'checked': 0}
    failures: list[tuple[str, str]] = []
    total = 0

    for path in files:
        namespace: dict = {'__name__': '__main__'}
        blocks = CODE_BLOCK.findall(path.read_text())
        for i, raw in enumerate(blocks, start=1):
            name = f'{path.name} 의 {i}번째 코드'
            total += 1          # 통과한 것만 세면 «몇 개를 봤는지»가 틀어진다
            try:
                tally[check_block(name, unescape(raw), namespace)] += 1
            except Failure as e:
                failures.append((name, str(e)))

    print(f'코드 블록 {total}개 — 답까지 대조 {tally["checked"]} · '
          f'실행만 {tally["ran"]} · 문법만 {tally["skip"]}(입력을 읽는 코드)')

    if failures:
        print(f'\n{len(failures)}개가 틀렸다:\n')
        for name, message in failures:
            print(f'  ✗ {name}\n      {message}\n')
        return 1

    print('전부 통과했다.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
