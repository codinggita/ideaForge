import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    const pagePath = `${location.pathname}${location.search}`;
    const history = JSON.parse(sessionStorage.getItem('pageViewHistory') || '[]');
    sessionStorage.setItem(
      'pageViewHistory',
      JSON.stringify([...history.slice(-19), { path: pagePath, at: new Date().toISOString() }])
    );

    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: pagePath,
      });
    }
  }, [location.pathname, location.search]);
}
