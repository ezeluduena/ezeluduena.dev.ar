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

    return useMemo(() => {
        return {
            systemPreferredLocale,
            userPreferredLocale,
            locale: userPreferredLocale || systemPreferredLocale || 'es',
            setLocale: setUserPreferredLocale
        };
    }, [systemPreferredLocale, userPreferredLocale, setUserPreferredLocale]);
};

export default useLocale;