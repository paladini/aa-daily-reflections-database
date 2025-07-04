import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useApp } from '../context/AppContext';
import { getReflection } from '../services/reflectionService';
import useUrlState from '../hooks/useUrlState';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import ReflectionCard from '../components/ReflectionCard';
import { useTranslation } from '../utils/translations';

const ReflectionPage = () => {
  const { 
    language, 
    selectedDate, 
    reflection, 
    loading, 
    error, 
    setReflection, 
    setLoading, 
    setError 
  } = useApp();
  
  const t = useTranslation(language);
  const { getCanonicalUrl } = useUrlState();

  // Carrega reflexão quando idioma ou data mudam
  useEffect(() => {
    const loadReflection = async () => {
      try {
        console.log('ReflectionPage - Loading reflection for:', { language, selectedDate });
        setLoading(true);
        setError(null);
        
        const reflectionData = await getReflection(language, selectedDate);
        console.log('ReflectionPage - Reflection loaded:', reflectionData);
        setReflection(reflectionData);
      } catch (err) {
        console.error('Erro ao carregar reflexão:', err);
        setError(err.message || 'Erro ao carregar reflexão');
        setReflection(null);
      } finally {
        setLoading(false);
      }
    };

    loadReflection();
  }, [language, selectedDate]); // Removido as funções setter das dependências

  // Gera metadados para SEO
  const getMetadata = () => {
    const baseTitle = t.title;
    
    if (!reflection) {
      return {
        title: baseTitle,
        description: 'Reflexões diárias de Alcoólicos Anônimos em múltiplos idiomas',
      };
    }

    // Formatação de data multilíngue
    const [year, month, day] = selectedDate.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    
    const dateFormats = {
      'pt-br': { day: '2-digit', month: 'long', year: 'numeric' },
      'en': { year: 'numeric', month: 'long', day: '2-digit' },
      'fr': { day: '2-digit', month: 'long', year: 'numeric' },
      'es': { day: '2-digit', month: 'long', year: 'numeric' },
    };
    
    const locales = {
      'pt-br': 'pt-BR',
      'en': 'en-US',
      'fr': 'fr-FR',
      'es': 'es-ES',
    };
    
    const formattedDate = dateObj.toLocaleDateString(
      locales[language] || 'pt-BR',
      dateFormats[language] || dateFormats['pt-br']
    );

    const title = `${reflection.title} - ${formattedDate} | ${baseTitle}`;
    const description = reflection.quote || 
      reflection.text.substring(0, 150) + '...';

    return { title, description, formattedDate };
  };

  const { title, description } = getMetadata();

  // Gerar URLs alternativas para hreflang
  const getAlternateUrls = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    return Object.keys({
      'pt-br': 'pt-BR',
      'en': 'en',
      'fr': 'fr',
      'es': 'es'
    }).map(lang => ({
      lang: lang === 'pt-br' ? 'pt-BR' : lang,
      url: `${baseUrl}?date=${selectedDate}&lang=${lang}`
    }));
  };

  return (
    <>
      <Helmet>
        {/* Meta tags básicas */}
        <html lang={language === 'pt-br' ? 'pt-BR' : language} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={`reflexões diárias, alcoólicos anônimos, AA, ${language === 'pt-br' ? 'espiritualidade, sobriedade' : language === 'en' ? 'spirituality, sobriety' : language === 'fr' ? 'spiritualité, sobriété' : 'espiritualidad, sobriedad'}`} />
        
        {/* Hreflang para SEO multilíngue */}
        {getAlternateUrls().map(({ lang, url }) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="canonical" href={getCanonicalUrl()} />
        
        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={getCanonicalUrl()} />
        <meta property="og:locale" content={language === 'pt-br' ? 'pt_BR' : language === 'en' ? 'en_US' : language === 'fr' ? 'fr_FR' : 'es_ES'} />
        <meta property="og:site_name" content={t.title} />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        
        {/* Dados estruturados aprimorados */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": reflection?.title || title,
            "description": description,
            "datePublished": selectedDate,
            "dateModified": selectedDate,
            "inLanguage": language === 'pt-br' ? 'pt-BR' : language,
            "author": {
              "@type": "Organization",
              "name": "Alcoólicos Anônimos",
              "url": "https://www.aa.org"
            },
            "publisher": {
              "@type": "Organization",
              "name": t.title,
              "url": window.location.origin
            },
            "creator": {
              "@type": "Person",
              "name": "Fernando Paladini",
              "url": "https://github.com/paladini"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": getCanonicalUrl()
            },
            "articleSection": "Reflexões Diárias",
            "keywords": language === 'pt-br' ? 
              ["reflexões diárias", "alcoólicos anônimos", "espiritualidade", "sobriedade"] :
              language === 'en' ?
              ["daily reflections", "alcoholics anonymous", "spirituality", "sobriety"] :
              language === 'fr' ?
              ["réflexions quotidiennes", "alcooliques anonymes", "spiritualité", "sobriété"] :
              ["reflexiones diarias", "alcohólicos anónimos", "espiritualidad", "sobriedad"]
          })}
        </script>
      </Helmet>

      <div className="app">
        <Header />
        
        <main className="container">
          <div className="main-content">
            <Navigation />
            <ReflectionCard 
              reflection={reflection} 
              loading={loading} 
              error={error} 
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default ReflectionPage;
