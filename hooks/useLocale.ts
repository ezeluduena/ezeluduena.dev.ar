import { useMemo } from 'react';
import useLocalState from '~/hooks/useLocalState';
import useMedia from '~/hooks/useMedia';


const useLocale = () => {
    const systemPreferredLocale = useMedia('(prefers-language: es)')
        ? ('es' as const)
        : ('en' as const);

    const [userPreferredLocale, setUserPreferredLocale] = useLocalState<'en' | 'es' | null>(
        'locale',
        null
    );

    return useMemo(() => {
        return {
            systemPreferredLocale,
            userPreferredLocale,
            locale: userPreferredLocale || systemPreferredLocale,
            setLocale: setUserPreferredLocale
        };
    }, [systemPreferredLocale, userPreferredLocale, setUserPreferredLocale]);
};

export default useLocale;