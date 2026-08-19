/** 본문 속 코드 조각 — 이름·연산자·복잡도를 문장 안에서 또렷하게 세운다. */
export default function Term({ children }: { children: string }) {
  return <code className="term">{children}</code>;
}
