const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'https://paladini.github.io/aa-daily-reflections-database';
const LANGUAGES = ['pt-br', 'en', 'fr', 'es'];
const DATA_DIR = path.join(__dirname, '..', 'data');
const OUTPUT_FILE = path.join(__dirname, '..', 'public', 'sitemap.xml');

// Function to load reflection data for a language
const loadReflectionData = (lang) => {
  const fileMap = {
    'pt-br': 'daily_reflections_brazilian-portuguese.json',
    'en': 'daily_reflections_english.json',
    'fr': 'daily_reflections_french.json',
    'es': 'daily_reflections_spanish.json',
  };

  const filePath = path.join(DATA_DIR, fileMap[lang]);
  
  if (!fs.existsSync(filePath)) {
    console.warn(`Arquivo não encontrado: ${filePath}`);
    return [];
  }

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return data;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return [];
  }
};

// Function to generate URLs based on real data
const generateUrls = () => {
  const urls = [];
  
  // Add main URL
  urls.push({
    url: BASE_URL,
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: '1.0'
  });

  // Generate URLs for each language based on real data
  LANGUAGES.forEach(lang => {
    const reflections = loadReflectionData(lang);
    
    reflections.forEach(reflection => {
      if (reflection.date) {
        urls.push({
          url: `${BASE_URL}?date=${reflection.date}&lang=${lang}`,
          lastmod: new Date().toISOString(),
          changefreq: 'yearly',
          priority: '0.8'
        });
      }
    });
  });
  
  return urls;
};

// Função para gerar XML do sitemap
const generateSitemapXml = (urls) => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  
  urls.forEach(urlObj => {
    xml += '  <url>\n';
    xml += `    <loc>${urlObj.url}</loc>\n`;
    xml += `    <lastmod>${urlObj.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${urlObj.changefreq}</changefreq>\n`;
    xml += `    <priority>${urlObj.priority}</priority>\n`;
    
    // Adicionar links alternativos para SEO multilíngue
    if (urlObj.alternates) {
      urlObj.alternates.forEach(alt => {
        xml += `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />\n`;
      });
    }
    
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  return xml;
};

// Função principal
const generateSitemap = () => {
  try {
    console.log('Gerando sitemap baseado nos dados reais...');
    
    const urls = generateUrls();
    const xml = generateSitemapXml(urls);
    
    // Cria diretório public se não existir
    const publicDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // Escreve o arquivo
    fs.writeFileSync(OUTPUT_FILE, xml, 'utf8');
    
    console.log(`Sitemap gerado com sucesso!`);
    console.log(`Arquivo: ${OUTPUT_FILE}`);
    console.log(`URLs geradas: ${urls.length}`);
    
    // Estatísticas por idioma
    LANGUAGES.forEach(lang => {
      const reflections = loadReflectionData(lang);
      console.log(`${lang}: ${reflections.length} reflexões`);
    });
    
  } catch (error) {
    console.error('Erro ao gerar sitemap:', error);
    process.exit(1);
  }
};

// Executa se chamado diretamente
if (require.main === module) {
  generateSitemap();
}

module.exports = { generateSitemap };
