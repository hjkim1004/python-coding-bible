import { useEffect, useState } from 'react';

/**
 * 해시 라우터.
 * GitHub Pages 는 서버가 없으므로 경로형 URL 은 새로고침에서 404 가 된다.
 * 해시라면 어느 호스팅에서도 그대로 열리고, 레슨마다 공유 가능한 주소가 생긴다.
 *
 * 주소는 `#/강-id` 이거나 `#/강-id/절-앵커` 다. 절까지 적으면 그 자리에서 열린다 —
 * 개요에서 절을 누르거나, 남에게 «거기 3절» 을 링크로 줄 때 쓴다.
 */
export interface Route {
  /** 어느 강인가 */
  lesson: string;
  /** 그 안의 어느 절인가 (없으면 맨 위) */
  anchor: string | null;
  /** 주소에 적힌 것 그대로 — 못 찾았을 때 사람에게 보여 준다 */
  raw: string;
}

export function readRoute(): Route {
  const raw = decodeURIComponent(window.location.hash.replace(/^#\/?/, ''));
  const [lesson = '', anchor] = raw.split('/');
  return { lesson, anchor: anchor || null, raw };
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(readRoute);

  useEffect(() => {
    const onChange = () => setRoute(readRoute());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}

export function hrefFor(id: string, anchor?: string): string {
  if (!id) return '#/';
  return anchor ? `#/${id}/${anchor}` : `#/${id}`;
}
