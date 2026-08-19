import { useEffect, useState } from 'react';

/**
 * 해시 라우터.
 * GitHub Pages 는 서버가 없으므로 경로형 URL 은 새로고침에서 404 가 된다.
 * 해시라면 어느 호스팅에서도 그대로 열리고, 레슨마다 공유 가능한 주소가 생긴다.
 */
export function readRoute(): string {
  const raw = window.location.hash.replace(/^#\/?/, '');
  return raw ? decodeURIComponent(raw) : '';
}

export function useHashRoute(): string {
  const [route, setRoute] = useState<string>(readRoute);

  useEffect(() => {
    const onChange = () => setRoute(readRoute());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}

export function hrefFor(id: string): string {
  return id ? `#/${id}` : '#/';
}
