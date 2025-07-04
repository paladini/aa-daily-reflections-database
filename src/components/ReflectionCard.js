import React from 'react';
import { format } from 'date-fns';
import { ptBR, enUS, fr, es } from 'date-fns/locale';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../utils/translations';

const LOCALE_MAP = {
  'pt-br': ptBR,
  'en': enUS,
  'fr': fr,
  'es': es,
};

const ReflectionCard = ({ reflection, loading, error }) => {
  const { language, selectedDate } = useApp();
  const t = useTranslation(language);

  if (loading) {
    return (
      <div className="reflection-card">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>{t.loading}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="reflection-card">
        <div className="error">
          <h3>{t.errorTitle}</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!reflection) {
    return (
      <div className="reflection-card">
        <div className="error">
          <h3>{t.notFoundTitle}</h3>
          <p>{t.notFoundMessage}</p>
        </div>
      </div>
    );
  }

  const locale = LOCALE_MAP[language] || ptBR;
  
  // Use the reflection's date to avoid timezone issues
  const reflectionDate = reflection.date;
  const [year, month, day] = reflectionDate.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day); // month - 1 because Date uses 0-based months
  const formattedDate = format(dateObj, 'dd \'de\' MMMM', { locale });

  console.log('ReflectionCard - selectedDate:', selectedDate);
  console.log('ReflectionCard - reflection.date:', reflection?.date);
  console.log('ReflectionCard - reflection.title:', reflection?.title);
  console.log('ReflectionCard - formattedDate:', formattedDate);

  return (
    <div className="reflection-card">
      <h2>{reflection.title}</h2>
      <p className="reflection-date">{formattedDate}</p>
      
      {reflection.quote && (
        <blockquote className="reflection-quote">
          "{reflection.quote}"
        </blockquote>
      )}
      
      <div className="reflection-text">
        {reflection.text.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      
      {reflection.content && (
        <div className="reflection-source">
          — {reflection.content}
        </div>
      )}
    </div>
  );
};

export default ReflectionCard;
