import { createContext } from 'react';
import { Translations } from '../types/Translations';

export const LocalizationContext = createContext({} as Translations);
export const L10nContext = LocalizationContext;
