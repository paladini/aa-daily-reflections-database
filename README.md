# ­ƒôû AA Daily Reflections Database

<img alt="Harness Score L0" src="https://paladini.github.io/harness-score/maturity/badge-l0.svg" height="20">
**Complete year of Alcoholics Anonymous Daily Reflections in English, Spanish, French, and Brazilian Portuguese**

*365 daily meditations and spiritual reflections from AA available in multiple formats (SQLite, JSON, CSV) for recovery apps, multilingual communities, and personal spiritual practice.*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Languages](https://img.shields.io/badge/Languages-4-blue.svg)]()

**­ƒôû Read this in other languages:** [­ƒç¬­ƒç© Espa├▒ol](README_ES.md) | [­ƒç½­ƒçÀ Fran├ºais](README_FR.md) | [­ƒçº­ƒçÀ Portugu├¬s](README_PT.md)

## ­ƒîÉ Live Portal

**[­ƒôû Access the Live Portal](https://paladini.github.io/aa-daily-reflections-database)**

Browse and read daily reflections in a beautiful, multilingual web interface with:
- ­ƒîì **4 languages**: English, Spanish, French, Brazilian Portuguese
- ­ƒôà **Easy navigation**: Previous/Next day, date picker, "Today" button
- ­ƒô▒ **Responsive design**: Works perfectly on mobile and desktop
- ­ƒöù **Shareable URLs**: Every reflection has a unique, shareable link
- ­ƒöì **SEO optimized**: Each reflection is searchable and indexable

---

## ­ƒæ¿ÔÇì­ƒÆ╗ Created by Fernando Paladini

This database and portal were **compiled, developed, and maintained** by [Fernando Paladini](https://github.com/paladini).

- **­ƒôè Data Compilation**: Carefully collected and structured from official AA sources
- **­ƒîÉ Multilingual Translation**: Sourced authentic translations in 4 languages  
- **­ƒÆ╗ Portal Development**: Built a modern React-based web portal
- **­ƒöº Technical Implementation**: Database design, API structure, and deployment
- **­ƒôê SEO Optimization**: Multilingual SEO with hreflang, structured data, and sitemaps

*If this project helps your recovery journey or development work, consider [Ô¡É starring the repository](https://github.com/paladini/aa-daily-reflections-database) or [Ôÿò supporting the project](https://github.com/sponsors/paladini).*

## ­ƒÜÇ Quick Download

Choose your preferred format and language:

### ­ƒôè All Languages Combined
- **CSV**: [daily_reflections_all_languages.csv](data/daily_reflections_2025_all_languages.csv)
- **SQLite**: [reflections.db](data/reflections.db)

### ­ƒôä Individual Languages
| Language | JSON | CSV |
|----------|------|-----|
| ­ƒç║­ƒç© **English** | [JSON](data/daily_reflections_english.json) | [CSV](data/daily_reflections_english.csv) |
| ­ƒç¬­ƒç© **Espa├▒ol** | [JSON](data/daily_reflections_spanish.json) | [CSV](data/daily_reflections_spanish.csv) |
| ­ƒç½­ƒçÀ **Fran├ºais** | [JSON](data/daily_reflections_french.json) | [CSV](data/daily_reflections_french.csv) |
| ­ƒçº­ƒçÀ **Portugu├¬s** | [JSON](data/daily_reflections_brazilian-portuguese.json) | [CSV](data/daily_reflections_brazilian-portuguese.csv) |

## ­ƒôï What's Included

- **Complete year coverage**: All 365 days of AA daily reflections
- **Multilingual**: Available in English, Spanish, French, and Brazilian Portuguese
- **Complete data**: Title, quote, reflection text, and source reference
- **Multiple formats**: SQLite database, JSON files, and CSV spreadsheets
- **Ready to use**: Perfect for apps, websites, or personal projects

## ­ƒôè Data Structure

Each reflection contains:

```json
{
  "date": "2025-01-01",
  "language": "english",
  "title": "I AM A MIRACLE",
  "quote": "The central fact of our lives today...",
  "text": "This truly is a fact in my life today...",
  "content": "ALCOHOLICS ANONYMOUS, p. 25"
}
```

**­ƒôü For more details about data formats, see [data/README.md](data/README.md)**

## ­ƒÆ╗ Code Examples

**­ƒôØ Ready-to-run examples in multiple languages: [examples/README.md](examples/README.md)**

### Quick Start

#### Python
```python
import sqlite3

conn = sqlite3.connect('data/reflections.db')
cursor = conn.cursor()

# Get today's reflection
cursor.execute("""
    SELECT title, quote, text FROM reflections 
    WHERE date = date('now') AND language = 'english'
""")
reflection = cursor.fetchone()
print(f"Today: {reflection[0]}")
```

#### JavaScript
```javascript
const fs = require('fs');

// Load English reflections
const reflections = JSON.parse(
    fs.readFileSync('data/english/daily_reflections_english.json', 'utf8')
);

// Get today's date
const today = new Date().toISOString().split('T')[0];
const todayReflection = reflections.find(r => r.date === today);

console.log(`Today: ${todayReflection.title}`);
```

## ­ƒÜÇ Getting Started

### Option 1: SQLite Database
```python
import sqlite3

conn = sqlite3.connect('data/reflections.db')
cursor = conn.cursor()

# Get today's reflection
cursor.execute("""
    SELECT title, quote, text FROM reflections 
    WHERE date = date('now') AND language = 'english'
""")
reflection = cursor.fetchone()
print(f"Today: {reflection[0]}")
```

### Option 2: JSON Files
```javascript
const fs = require('fs');
const reflections = JSON.parse(
    fs.readFileSync('data/english/daily_reflections_english.json', 'utf8')
);

const today = new Date().toISOString().split('T')[0];
const todayReflection = reflections.find(r => r.date === today);
console.log(`Today: ${todayReflection.title}`);
```

### Option 3: CSV Files  
```python
import pandas as pd

# Load all languages
df = pd.read_csv('data/daily_reflections_2025_all_languages.csv')

# Filter by language and date
english_reflections = df[df['language'] == 'english']
```

## ­ƒîì Available Languages

| Language | Code | Native Name | Coverage |
|----------|------|-------------|----------|
| English  | `en` | English     | Complete year (365 days) |
| French   | `fr` | Fran├ºais    | Complete year (365 days) |
| Spanish  | `es` | Espa├▒ol     | Complete year (365 days) |
| Brazilian Portuguese  | `pt-BR` | Portugu├¬s do Brasil     | Complete year (365 days) |

## ­ƒñØ Contributing

Found an error or want to help? See our [contributing guidelines](CONTRIBUTING.md)

## ­ƒô£ License

MIT License - Free to use for educational and recovery purposes.

**Important**: This is an unofficial compilation. Original content belongs to Alcoholics Anonymous World Services, Inc.

## ­ƒÖÅ Acknowledgments

- **Alcoholics Anonymous World Services, Inc.** for the original daily reflections content
- **AA communities worldwide** who provided translations and cultural adaptations
- **Recovery community** for inspiration and feedback

## ­ƒô¼ Contact & Support

**Fernando Paladini** - Project Creator & Maintainer
- ­ƒîÉ Website: [paladini.dev](https://paladini.dev)
- ­ƒôº Email: fnpaladini+aa+database@gmail.com
- ­ƒÉÖ GitHub: [@paladini](https://github.com/paladini)

### Support This Project
If this database helps your recovery journey or development work:
- Ô¡É [Star this repository](https://github.com/paladini/aa-daily-reflections-database)
- ­ƒÉø [Report issues](https://github.com/paladini/aa-daily-reflections-database/issues)
- ­ƒÆí [Suggest improvements](https://github.com/paladini/aa-daily-reflections-database/discussions)
- Ôÿò [Buy me a coffee](https://github.com/sponsors/paladini)

---

<div align="center">

**"One day at a time"** ­ƒîƒ  
*Dedicated to the recovery community worldwide*

**Created with ÔØñ´©Å by [Fernando Paladini](https://github.com/paladini)**

</div>
