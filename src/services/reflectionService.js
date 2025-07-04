import { LANGUAGES } from '../context/AppContext';

// Cache em memória para os dados
const dataCache = {};

/**
 * Busca e cacheia os dados de um idioma específico
 * @param {string} lang - Código do idioma
 * @returns {Promise<Array>} Array com todas as reflexões do idioma
 */
const loadLanguageData = async (lang) => {
  if (dataCache[lang]) {
    return dataCache[lang];
  }

  const languageInfo = LANGUAGES[lang];
  if (!languageInfo) {
    throw new Error(`Idioma não suportado: ${lang}`);
  }

  try {
    // Carrega o arquivo JSON do diretório public/data
    const response = await fetch(`/data/${languageInfo.file}`);
    
    if (!response.ok) {
      throw new Error(`Erro ao carregar dados: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Dados carregados para ${lang}:`, data.length, 'reflexões');
    dataCache[lang] = data;
    return data;
  } catch (error) {
    console.error(`Erro ao carregar dados do idioma ${lang}:`, error);
    throw error;
  }
};

/**
 * Busca uma reflexão específica por idioma e data
 * @param {string} lang - Código do idioma
 * @param {string} date - Data no formato 'YYYY-MM-DD'
 * @returns {Promise<Object|null>} Objeto da reflexão ou null se não encontrar
 */
export const getReflection = async (lang, date) => {
  try {
    console.log(`Buscando reflexão para idioma: ${lang}, data: ${date}`);
    
    const data = await loadLanguageData(lang);
    console.log(`Dados carregados para ${lang}:`, data ? data.length : 'null', 'itens');
    
    // Procura a reflexão pela data
    const reflection = data.find(item => item.date === date);
    console.log(`Reflexão encontrada:`, reflection ? 'sim' : 'não');
    
    return reflection || null;
  } catch (error) {
    console.error('Erro ao buscar reflexão:', error);
    throw error;
  }
};

/**
 * Busca reflexões de um mês específico
 * @param {string} lang - Código do idioma
 * @param {string} year - Ano (YYYY)
 * @param {string} month - Mês (MM)
 * @returns {Promise<Array>} Array com reflexões do mês
 */
export const getReflectionsByMonth = async (lang, year, month) => {
  try {
    const data = await loadLanguageData(lang);
    
    const yearMonth = `${year}-${month.padStart(2, '0')}`;
    const monthReflections = data.filter(item => 
      item.date.startsWith(yearMonth)
    );
    
    return monthReflections;
  } catch (error) {
    console.error('Erro ao buscar reflexões do mês:', error);
    throw error;
  }
};

/**
 * Pré-carrega dados de um idioma (para melhor performance)
 * @param {string} lang - Código do idioma
 * @returns {Promise<void>}
 */
export const preloadLanguageData = async (lang) => {
  try {
    await loadLanguageData(lang);
  } catch (error) {
    console.error(`Erro ao pré-carregar dados do idioma ${lang}:`, error);
  }
};

/**
 * Limpa o cache (útil para desenvolvimento)
 */
export const clearCache = () => {
  Object.keys(dataCache).forEach(key => {
    delete dataCache[key];
  });
};

/**
 * Verifica se os dados de um idioma estão em cache
 * @param {string} lang - Código do idioma
 * @returns {boolean}
 */
export const isLanguageCached = (lang) => {
  return !!dataCache[lang];
};
