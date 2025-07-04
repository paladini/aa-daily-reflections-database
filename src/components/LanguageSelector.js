import React from 'react';
import { Globe } from 'react-feather';
import { useApp, LANGUAGES } from '../context/AppContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useApp();

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="language-selector">
      <Globe size={20} color="#005A9C" />
      <select value={language} onChange={handleLanguageChange}>
        {Object.entries(LANGUAGES).map(([code, info]) => (
          <option key={code} value={code}>
            {info.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
