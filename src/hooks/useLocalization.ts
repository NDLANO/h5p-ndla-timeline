import { useContext } from 'react';
import { L10nContext } from '../contexts/LocalizationContext';
import { TranslationKey } from '../types/TranslationKey';

export const useLocalization = (translationKey: TranslationKey): string => {
  const translations = useContext(L10nContext);

  return (
    translations?.[translationKey] ?? `Missing translation: ${translationKey}`
  );
};

export const useL10n = useLocalization;
