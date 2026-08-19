/**
 * 아주 작은 파이썬 하이라이터.
 *
 * 라이브러리를 하나 붙이면 번들이 수백 KB 늘고, 색은 그 라이브러리의 테마가 정한다.
 * 이 책에 실리는 코드는 파이썬 한 종류뿐이므로, 필요한 만큼만 직접 나눈다 —
 * 색은 tokens.css 의 의미 토큰이 정하고, 다크/라이트가 저절로 따라온다.
 */

export type TokenKind = 'plain' | 'comment' | 'string' | 'number' | 'keyword' | 'builtin' | 'name';

export interface Token {
  text: string;
  kind: TokenKind;
}

const KEYWORDS = new Set([
  'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del',
  'elif', 'else', 'except', 'False', 'finally', 'for', 'from', 'global', 'if', 'import',
  'in', 'is', 'lambda', 'None', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return',
  'True', 'try', 'while', 'with', 'yield',
]);

const BUILTINS = new Set([
  'abs', 'all', 'any', 'bin', 'bool', 'chr', 'dict', 'divmod', 'enumerate', 'filter',
  'float', 'format', 'frozenset', 'input', 'int', 'isinstance', 'iter', 'len', 'list',
  'map', 'max', 'min', 'next', 'open', 'ord', 'pow', 'print', 'range', 'reversed',
  'round', 'set', 'setattr', 'sorted', 'str', 'sum', 'tuple', 'type', 'zip',
]);

const PATTERN = new RegExp(
  [
    '(#[^\\n]*)',                                            // 주석
    '("""[\\s\\S]*?"""|\'\'\'[\\s\\S]*?\'\'\')',             // 삼중 따옴표
    '([frbFRB]{0,2}"(?:\\\\.|[^"\\\\\\n])*"|[frbFRB]{0,2}\'(?:\\\\.|[^\'\\\\\\n])*\')', // 문자열
    '(\\b\\d[\\d_]*\\.?\\d*(?:[eE][+-]?\\d+)?\\b)',          // 수
    '([A-Za-z_]\\w*)',                                       // 이름
  ].join('|'),
  'g',
);

export function tokenizePython(source: string): Token[] {
  const tokens: Token[] = [];
  let cursor = 0;

  const push = (text: string, kind: TokenKind) => {
    if (text) tokens.push({ text, kind });
  };

  for (const match of source.matchAll(PATTERN)) {
    const index = match.index ?? 0;
    push(source.slice(cursor, index), 'plain');
    cursor = index + match[0].length;

    const [, comment, tripleString, string, number, word] = match;

    if (comment !== undefined) push(comment, 'comment');
    else if (tripleString !== undefined) push(tripleString, 'string');
    else if (string !== undefined) push(string, 'string');
    else if (number !== undefined) push(number, 'number');
    else if (word !== undefined) {
      if (KEYWORDS.has(word)) push(word, 'keyword');
      else if (BUILTINS.has(word)) push(word, 'builtin');
      else if (source[cursor] === '(') push(word, 'name');
      else push(word, 'plain');
    }
  }

  push(source.slice(cursor), 'plain');
  return tokens;
}
