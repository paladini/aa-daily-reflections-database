import { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

/**
 * Custom hook to synchronize state with URL parameters
 */
const useUrlState = () => {
  const { language, selectedDate, setLanguage, setSelectedDate } = useApp();
  const initialized = useRef(false);

  // Synchronize initial state with URL only once on initialization
  useEffect(() => {
    if (!initialized.current) {
      const urlParams = new URLSearchParams(window.location.search);
      const urlDate = urlParams.get('date');
      const urlLang = urlParams.get('lang');

      console.log('Inicializando URL state:', { urlDate, urlLang, selectedDate, language });

      if (urlDate) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (dateRegex.test(urlDate) && urlDate !== selectedDate) {
          console.log('Updating date from URL:', urlDate);
          setSelectedDate(urlDate);
        }
      }

      if (urlLang) {
        const supportedLanguages = ['pt-br', 'en', 'fr', 'es'];
        if (supportedLanguages.includes(urlLang) && urlLang !== language) {
          console.log('Updating language from URL:', urlLang);
          setLanguage(urlLang);
        }
      }

      initialized.current = true;
    }
  }, [setLanguage, setSelectedDate, selectedDate, language]);

  // Update URL when state changes, but only after initialization
  useEffect(() => {
    if (initialized.current) {
      const currentParams = new URLSearchParams(window.location.search);
      const currentDate = currentParams.get('date');
      const currentLang = currentParams.get('lang');

      if (currentDate !== selectedDate || currentLang !== language) {
        console.log('Updating URL:', { selectedDate, language });
        
        const newParams = new URLSearchParams();
        newParams.set('date', selectedDate);
        newParams.set('lang', language);
        
        const newUrl = `${window.location.pathname}?${newParams.toString()}`;
        window.history.replaceState({}, '', newUrl);
      }
    }
  }, [selectedDate, language]);

  // Function to generate canonical URL
  const getCanonicalUrl = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?date=${selectedDate}&lang=${language}`;
  };

  // Function to generate shareable URL
  const getShareableUrl = () => {
    return getCanonicalUrl();
  };

  return {
    getCanonicalUrl,
    getShareableUrl,
  };
};

export default useUrlState;
