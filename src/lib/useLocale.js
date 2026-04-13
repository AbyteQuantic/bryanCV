import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export function useLocale() {
  const { locale } = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // During SSR return 'en' (default). After mount, return actual locale.
  return mounted ? (locale || 'en') : 'en';
}
