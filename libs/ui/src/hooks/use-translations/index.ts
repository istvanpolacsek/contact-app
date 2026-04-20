import { useContext } from 'react';
import { TranslationsContext } from '../../providers';

function useTranslations() {
  return useContext(TranslationsContext);
}

export default useTranslations;
