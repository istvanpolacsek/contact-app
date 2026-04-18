import { useContext } from 'react';
import { TranslationsContext } from '../..';

function useTranslations() {
  return useContext(TranslationsContext);
}

export default useTranslations;
