# 📖 Banco de Dados de Reflexões Diárias de AA

**Ano completo de Reflexões Diárias de Alcoólicos Anônimos em Inglês, Espanhol, Francês e Português Brasileiro**

*365 meditações diárias e reflexões espirituais de AA disponíveis em múltiplos formatos (SQLite, JSON, CSV) para aplicativos de recuperação, comunidades multilíngues e prática espiritual pessoal.*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Languages](https://img.shields.io/badge/Languages-4-blue.svg)]()

**📖 Leia isto em outros idiomas:** [🇺🇸 English](README.md) | [🇪🇸 Español](README_ES.md) | [🇫🇷 Français](README_FR.md)

## 🚀 Download Rápido

Escolha seu formato e idioma preferido:

### 📊 Todos os Idiomas Combinados
- **CSV**: [daily_reflections_all_languages.csv](data/daily_reflections_all_languages.csv)
- **SQLite**: [reflections.db](data/reflections.db)

### 📄 Idiomas Individuais
| Idioma | JSON | CSV |
|--------|------|-----|
| 🇺🇸 **English** | [JSON](data/daily_reflections_english.json) | [CSV](data/daily_reflections_english.csv) |
| 🇪🇸 **Español** | [JSON](data/daily_reflections_spanish.json) | [CSV](data/daily_reflections_spanish.csv) |
| 🇫🇷 **Français** | [JSON](data/daily_reflections_french.json) | [CSV](data/daily_reflections_french.csv) |
| 🇧🇷 **Português** | [JSON](data/daily_reflections_brazilian-portuguese.json) | [CSV](data/daily_reflections_brazilian-portuguese.csv) |

## 📋 O que está Incluído

- **Cobertura de ano completo**: Todos os 365 dias de reflexões diárias de AA
- **Multilíngue**: Disponível em Inglês, Espanhol, Francês e Português Brasileiro
- **Dados completos**: Título, citação, texto da reflexão e referência da fonte
- **Múltiplos formatos**: Banco de dados SQLite, arquivos JSON e planilhas CSV
- **Pronto para usar**: Perfeito para aplicativos, sites ou projetos pessoais

## 📊 Estrutura dos Dados

Cada reflexão contém:

```json
{
  "date": "2025-01-01",
  "language": "pt-BR",
  "title": "EU SOU UM MILAGRE",
  "quote": "O fato central de nossas vidas hoje...",
  "text": "Este é verdadeiramente um fato em minha vida hoje...",
  "content": "ALCOÓLICOS ANÔNIMOS, p. 25"
}
```

**📁 Para mais detalhes sobre formatos de dados, veja [data/README.md](data/README.md)**

## 🎯 Casos de Uso

### 📱 Desenvolvedores de Aplicativos
- **Apps de recuperação**: Integre reflexões diárias
- **Apps de meditação**: Adicione conteúdo espiritual
- **Lembretes diários**: Sistema de notificações

### 🌐 Desenvolvedores Web
- **Sites de recuperação**: Widgets de reflexão diária
- **Blogs espirituais**: Conteúdo automatizado
- **APIs**: Dados prontos para endpoints

### 🏢 Organizações
- **Grupos de AA**: Material para reuniões
- **Clínicas de recuperação**: Recursos terapêuticos
- **Igrejas**: Conteúdo devocional

### 👨‍💻 Pesquisadores
- **Análise de texto**: Corpus multilíngue
- **Estudos de recuperação**: Dados estruturados
- **Linguística**: Comparação entre idiomas

## 🚀 Início Rápido

### 📊 Usar CSV (Planilha)
```bash
# Baixar arquivo CSV
curl -O https://raw.githubusercontent.com/usuario/aa-daily-reflections-database/main/data/daily_reflections_brazilian-portuguese.csv

# Abrir no Excel, Google Sheets, ou LibreOffice
```

### 🗄️ Usar SQLite (Banco de Dados)
```bash
# Baixar banco de dados
curl -O https://raw.githubusercontent.com/usuario/aa-daily-reflections-database/main/data/reflections.db

# Consultar com SQLite
sqlite3 reflections.db "SELECT * FROM reflections WHERE language='pt-BR' AND date='2025-01-01';"
```

### 📄 Usar JSON (Programação)
```python
# Python example
import json
import requests

# Carregar dados em português
url = "https://raw.githubusercontent.com/usuario/aa-daily-reflections-database/main/data/daily_reflections_brazilian-portuguese.json"
response = requests.get(url)
reflections = response.json()

# Encontrar reflexão de hoje
today = "2025-01-01"
today_reflection = next(r for r in reflections if r["date"] == today)
print(f"{today_reflection['title']}: {today_reflection['text']}")
```

## 💡 Exemplos de Código

Visite a pasta [`examples/`](examples/) para ver exemplos completos em:

- **🐍 Python**: Exemplo básico com SQLite
- **🟨 JavaScript/Node.js**: App com async/await
- **🐘 PHP**: Integração web
- **🐹 Go**: Aplicação de alta performance

## 📊 Estatísticas dos Dados

- **Total de reflexões**: 365 por idioma
- **Idiomas**: 4 (Inglês, Espanhol, Francês, Português BR)
- **Formatos de arquivo**: 3 (SQLite, JSON, CSV)
- **Tamanho do banco**: ~366 KB
- **Codificação**: UTF-8
- **Estrutura**: Consistente entre idiomas

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:

1. **Fork** o repositório
2. **Clone** seu fork
3. **Crie** uma branch para sua feature
4. **Commit** suas mudanças
5. **Push** para a branch
6. **Abra** um Pull Request

### 🌐 Adicionando Novos Idiomas

Para adicionar suporte a um novo idioma:

1. Crie arquivos JSON e CSV seguindo a estrutura existente
2. Atualize o banco SQLite
3. Adicione exemplos na pasta `examples/`
4. Atualize a documentação

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🔗 Links Úteis

- **Alcoólicos Anônimos**: [aa.org](https://www.aa.org)
- **AA Brasil**: [alcoolicosanonimos.org.br](https://www.alcoolicosanonimos.org.br)
- **Documentação SQLite**: [sqlite.org](https://www.sqlite.org)
- **Formato JSON**: [json.org](https://www.json.org)

## ❓ Perguntas Frequentes

**P: Posso usar isto comercialmente?**
R: Sim, a licença MIT permite uso comercial.

**P: Como adiciono um novo idioma?**
R: Siga o formato existente e abra um PR.

**P: Os dados são atualizados?**
R: Este é um conjunto estático de reflexões diárias clássicas.

**P: Posso modificar o conteúdo?**
R: Sim, mas mantenha a atribuição original.

---

⭐ **Se este projeto te ajudou, considere dar uma estrela!**

📧 **Dúvidas?** Abra uma [issue](https://github.com/usuario/aa-daily-reflections-database/issues)
