import Code from '../../components/Code';
import Lesson, { Section } from '../../components/Lesson';
import Recall from '../../components/Recall';
import Table from '../../components/Table';
import Note from '../../components/Note';
import Quiz from '../../components/Quiz';
import Term from '../../components/Term';

export default function Strings() {
  return (
    <Lesson
      part="1부 · 통과하는 문법"
      title="문자열"
      lede="문자열은 고칠 수 없습니다. 고치는 것처럼 보이는 코드는 사실 매번 새로 만들고 있고, 그것이 시간 초과가 됩니다."
      tags={['1-4', '불변', 'join']}
    >
      <Recall from="p0-variable">
        <p>
          0-2에서 글자끼리의 <Term>+</Term>는 덧셈이 아니라
          <strong>이어 붙이기</strong>라는 것을 봤습니다 —
          <Term>'7' + '1'</Term>은 <Term>'71'</Term>이었습니다.
        </p>
        <p>
          여기서는 그 이어 붙이기가 <strong>10만 번 반복될 때</strong> 무슨 일이
          벌어지는지를 봅니다. 한 번은 아무 일도 아니지만, 쌓이면 알고리즘보다
          오래 걸립니다.
        </p>
      </Recall>

      <Section no={1} title="+= 로 문자열을 쌓지 않는다">
        <p>
          파이썬 문자열은 <strong>불변</strong>입니다. <Term>s += 'a'</Term>는 기존 문자열을
          늘리는 것이 아니라, 길이가 하나 더 긴 문자열을 <strong>새로 만들어</strong> 통째로
          복사한 뒤 이름을 옮겨 붙이는 일입니다. N번 반복하면 복사 비용이 쌓여 O(N²)이 됩니다.
        </p>

        <Code label="쌓기의 두 방법">{`
# ❌ 반복마다 문자열 전체를 새로 만든다 — N이 커지면 무너진다
s = ''
for i in range(100_000):
    s += str(i)

# ✅ 조각을 리스트에 모았다가 마지막에 한 번 잇는다
parts = []
for i in range(100_000):
    parts.append(str(i))
s = ''.join(parts)
`}</Code>

        <Note tone="success" title="join 은 «사이에 낄 것».join(조각들)">
          <p>
            <Term>''.join(parts)</Term>는 붙여 쓰기,
            <Term>' '.join(parts)</Term>는 공백으로 잇기,
            <Term>'\\n'.join(parts)</Term>는 줄바꿈으로 잇기입니다.
            조각이 문자열이 아니면 <Term>' '.join(map(str, arr))</Term>처럼 먼저 바꿔야 합니다.
          </p>
        </Note>
      </Section>

      <Section no={2} title="자르고 찾고 바꾸기">
        <p>
          <Term>split()</Term>은 0-3에서 입력을 자를 때 이미 썼습니다.
          여기서는 그 <Term>split</Term>이 <strong>인자를 주고 안 주고에 따라
          다르게 동작한다</strong>는 것까지 봅니다.
        </p>

        <Code label="시험장에서 쓰는 것만">{`
s = '  Hello, World  '

print(s.strip())            # 'Hello, World'  — 양끝 공백 제거
print(s.rstrip())           # 오른쪽만 (개행 제거에 쓴다)
print(s.strip().lower())    # 'hello, world'
print(s.strip().upper())

t = 'a,b,,c'
print(t.split(','))         # ['a', 'b', '', 'c']  — 구분자를 주면 빈 칸도 남는다
print('a b  c'.split())     # ['a', 'b', 'c']      — 인자가 없으면 공백을 묶어서 자른다

print(t.replace(',', '-'))  # 'a-b--c'
print(t.find('b'))          # 2   — 없으면 -1
print(t.index('b'))         # 2   — 없으면 ValueError
print('abc'.startswith('a'), 'abc'.endswith('c'))
print('abc'.count('a'))
`}</Code>

        <Note tone="warn" title="split() 과 split(' ') 은 다릅니다">
          <p>
            인자 없는 <Term>split()</Term>은 연속된 공백을 하나로 보고, 앞뒤 공백도 무시합니다.
            <Term>split(' ')</Term>은 공백 하나하나를 구분자로 봐서
            <Term>'a  b'.split(' ')</Term>이 <Term>['a', '', 'b']</Term>가 됩니다.
            입력 파싱에는 <strong>거의 언제나 인자 없는 <Term>split()</Term></strong>이 맞습니다.
          </p>
        </Note>
      </Section>

      <Section no={3} title="문자와 숫자를 오가기">
        <p>
          알파벳을 인덱스로 바꾸는 일은 매우 자주 나옵니다. <Term>ord</Term>는 문자를 코드로,
          <Term>chr</Term>은 코드를 문자로 바꿉니다.
        </p>

        <Code label="문자 ↔ 숫자">{`
print(ord('A'), ord('a'), ord('0'))   # 65 97 48
print(chr(65), chr(97))               # A a

# 'a'~'z' 를 0~25 로
idx = ord('c') - ord('a')             # 2

# 알파벳 개수 세기 — 26칸 배열
counts = [0] * 26
for ch in 'banana':
    counts[ord(ch) - ord('a')] += 1

# 카이사르 암호처럼 돌리기
def shift(ch, k):
    return chr((ord(ch) - ord('a') + k) % 26 + ord('a'))

print(shift('z', 1))                  # a
`}</Code>

        <p>
          판별 함수도 알아 두면 조건문이 짧아집니다 — <Term>isdigit()</Term>,
          <Term>isalpha()</Term>, <Term>isalnum()</Term>, <Term>isupper()</Term>,
          <Term>islower()</Term>.
        </p>
      </Section>

      <Section no={4} title="뒤집기와 회문">
        <Code label="한 줄로 끝나는 것들">{`
s = 'level'

print(s[::-1])                 # 뒤집기
print(s == s[::-1])            # 회문인가

# 공백과 대소문자를 무시한 회문
raw = 'A man a plan a canal Panama'
clean = ''.join(ch.lower() for ch in raw if ch.isalnum())
print(clean == clean[::-1])    # True

# 가장 흔한 실수: reversed() 는 문자열이 아니라 반복자를 준다
print(''.join(reversed(s)))    # 'level'
`}</Code>
      </Section>

      <Section no={5} title="문자열 메서드 한눈에">
        <p>
          문자열은 <strong>불변</strong>이므로 아래 메서드는 하나도 원본을 고치지 않습니다.
          전부 <strong>새 문자열이나 새 값을 돌려줍니다</strong> —
          그래서 <Term>s.strip()</Term>만 쓰고 <Term>s</Term>를 다시 보면 그대로입니다.
        </p>

        <Table
          head={['메서드', '하는 일', '돌려주는 값']}
          rows={[
            ["s.strip() · lstrip() · rstrip()", '양끝 · 왼쪽 · 오른쪽 공백 제거', '새 문자열'],
            ["s.split() · split(',')", '공백 기준 · 구분자 기준으로 자른다', '리스트'],
            ["'-'.join(arr)", '사이에 끼워 이어 붙인다', '새 문자열'],
            ["s.replace(a, b)", 'a를 b로 모두 바꾼다', '새 문자열'],
            ["s.find(x)", 'x의 첫 자리', '인덱스 (없으면 -1)'],
            ["s.index(x)", 'x의 첫 자리', '인덱스 (없으면 오류)'],
            ["s.count(x)", 'x가 몇 번 나오나', '개수'],
            ["s.startswith(x) · endswith(x)", '그것으로 시작·끝나나', 'True / False'],
            ["s.upper() · lower()", '대문자 · 소문자로', '새 문자열'],
            ["s.zfill(n) · rjust(n) · ljust(n)", '길이 n에 맞춰 채운다', '새 문자열'],
          ]}
        />

        <Table
          head={['판별', '언제 참인가', '메모']}
          rows={[
            ['s.isdigit()', '전부 숫자', "'12'는 참, '1.2'는 거짓"],
            ['s.isalpha()', '전부 글자', '한글도 참'],
            ['s.isalnum()', '전부 글자 또는 숫자', '공백이 있으면 거짓'],
            ['s.isupper() · islower()', '전부 대문자 · 소문자', '숫자만 있으면 거짓'],
            ['s.isspace()', '전부 공백', '빈 문자열은 거짓'],
          ]}
        />

        <Note tone="warn" title="빈 문자열에서는 대체로 거짓입니다">
          <p>
            <Term>''.isdigit()</Term>은 <Term>False</Term>입니다.
            입력을 검사하는 코드에서 <strong>«비었을 때»를 따로 처리</strong>하지 않으면
            엉뚱한 갈래로 빠집니다.
          </p>
        </Note>
      </Section>

      <Quiz
        question="10만 개의 문자를 하나씩 이어 붙여 한 줄로 출력하려 합니다. 시간 초과를 피하는 방법은?"
        choices={[
          {
            text: "리스트에 모았다가 ''.join() 으로 한 번에 잇는다",
            right: true,
            why: '문자열은 불변이라 += 는 매번 전체를 복사합니다. 조각을 리스트에 append 하는 것은 O(1) 이고, 마지막 join 한 번이 전체를 한 번만 훑으므로 전체가 O(N) 이 됩니다.',
          },
          {
            text: 's += ch 를 쓰되 미리 s 를 큰 문자열로 만들어 둔다',
            why: '미리 만들어 두어도 += 는 여전히 새 문자열을 만듭니다. 파이썬 문자열에는 «자리를 미리 잡아 둔다»는 개념이 없습니다.',
          },
          {
            text: 'print 를 문자마다 호출해 즉시 내보낸다',
            why: '문자열 복사는 피하지만 출력 호출이 10만 번 일어나 오히려 더 느려집니다. 출력도 모아서 한 번에 내보내는 것이 원칙입니다.',
          },
          {
            text: '문자열 대신 리스트에 담고 그대로 print 한다',
            why: "print(arr) 는 대괄호와 따옴표까지 함께 찍습니다. 출력 형식이 달라 오답이 됩니다 — join 이나 print(*arr) 가 필요합니다.",
          },
        ]}
      />
    </Lesson>
  );
}
