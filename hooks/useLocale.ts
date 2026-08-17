import { useMemo } from 'react';
import useLocalState from '~/hooks/useLocalState';
import useMedia from '~/hooks/useMedia';

const useLocale = () => {
  const systemPreferredLocale = useMedia('(prefers-language: en)')
    ? ('en' as const)
    : ('es' as const);

  const [userPreferredLocale, setUserPreferredLocale] = useLocalState<'en' | 'es' | null>(
    'locale',
    null
  );

  const initialLocale =
    typeof window !== 'undefined'
      ? (window.__INITIAL_LOCALE as 'en' | 'es' | undefined)
      : undefined;

  return useMemo(() => {
    return {
      systemPreferredLocale,
      userPreferredLocale,
      locale: userPreferredLocale || initialLocale || systemPreferredLocale || 'es',
      setLocale: setUserPreferredLocale
    };
  }, [systemPreferredLocale, userPreferredLocale, initialLocale, setUserPreferredLocale]);
};

export default useLocale;
