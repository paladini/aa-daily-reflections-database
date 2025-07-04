import React from 'react';
import LanguageSelector from './LanguageSelector';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../utils/translations';

const Header = () => {
  const { language } = useApp();
  const t = useTranslation(language);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1>{t.title}</h1>
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default Header;
