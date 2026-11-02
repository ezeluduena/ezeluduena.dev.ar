import { useMemo, useSyncExternalStore } from 'react';
import useLocalState from '~/hooks/useLocalState';
import useMedia from '~/hooks/useMedia';

const subscribe = () => () => {};

const getInitialLocale = () => window.__INITIAL_LOCALE;
const getServerInitialLocale = () => undefined;

const useLocale = () => {
  const systemPreferredLocale = useMedia('(prefers-language: en)')
    ? ('en' as const)
    : ('es' as const);

  const [userPreferredLocale, setUserPreferredLocale] = useLocalState<'en' | 'es' | null>(
    'locale',
    null
  );

  // The no-flash script exposes the detected locale on window. Reading it
  // through useSyncExternalStore keeps the first client render aligned with
  // the server-rendered HTML (which always uses the default locale), and
  // updates to the detected locale after hydration.
  const initialLocale = useSyncExternalStore(subscribe, getInitialLocale, getServerInitialLocale);

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
