import { useEffect } from 'react';

const SITE = '파이썬 코딩테스트';

/**
 * 탭 제목을 지금 읽는 강으로 바꾼다.
 * 탭을 여러 개 띄우거나 북마크했을 때, 제목이 같으면 어느 것이 무엇인지 알 수 없다.
 */
export function useDocumentTitle(lessonTitle?: string) {
  useEffect(() => {
    document.title = lessonTitle ? `${lessonTitle} — ${SITE}` : `${SITE} — Twinkle Labs`;
  }, [lessonTitle]);
}
