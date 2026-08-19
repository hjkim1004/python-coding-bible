import { useState } from 'react';
import { tokenizePython } from '../lib/highlight';
import { CheckIcon, CopyIcon } from './Icons';

interface CodeProps {
  children: string;
  /** 코드가 무엇인지 한마디 — 파일 이름이 아니라 쓰임을 적는다 */
  label?: string;
}

export default function Code({ children, label = 'python' }: CodeProps) {
  const [copied, setCopied] = useState(false);
  const source = children.replace(/^\n+|\s+$/g, '');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(source);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* 클립보드가 막힌 환경도 있다 — 코드는 여전히 드래그해서 가져갈 수 있다 */
    }
  };

  return (
    <div className="code">
      <div className="code__bar">
        <span className="code__name">{label}</span>
        <button type="button" className="code__copy" onClick={copy} data-done={copied}>
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? '복사했어요' : '복사'}
        </button>
      </div>
      <pre className="code__body">
        <code>
          {tokenizePython(source).map((token, i) =>
            token.kind === 'plain' ? (
              token.text
            ) : (
              <span key={i} className={`tok-${token.kind}`}>
                {token.text}
              </span>
            ),
          )}
        </code>
      </pre>
    </div>
  );
}
