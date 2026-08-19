import { useCallback, useEffect, useState } from 'react';

const KEY = 'bible.completed.v1';

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === 'string') : [];
  } catch {
    // 저장소가 막혀 있거나 값이 깨졌어도 학습은 계속되어야 한다
    return [];
  }
}

export function useProgress() {
  const [done, setDone] = useState<string[]>(read);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(done));
    } catch {
      /* 저장 실패는 화면을 막을 이유가 되지 않는다 */
    }
  }, [done]);

  const toggle = useCallback((id: string) => {
    setDone((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const isDone = useCallback((id: string) => done.includes(id), [done]);

  return { done, toggle, isDone };
}
