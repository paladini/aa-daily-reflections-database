# 📖 AA Daily Reflections Database

**Complete year of Alcoholics Anonymous Daily Reflections in 3 languages**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Languages](https://img.shields.io/badge/Languages-3-blue.svg)]()

**📖 Read this in other languages:** [🇪🇸 Español](README_ES.md) | [🇫🇷 Français](README_FR.md)

## 🚀 Quick Download

Choose your preferred format and language:

### 📊 All Languages Combined
- **CSV**: [daily_reflections_all_languages.csv](data/daily_reflections_2025_all_languages.csv)
- **SQLite**: [reflections.db](data/reflections.db)

### 📄 Individual Languages
| Language | JSON | CSV |
|----------|------|-----|
| 🇺🇸 **English** | [JSON](data/english/daily_reflections_english.json) | [CSV](data/english/daily_reflections_english.csv) |
| 🇪🇸 **Español** | [JSON](data/spanish/daily_reflections_spanish.json) | [CSV](data/spanish/daily_reflections_spanish.csv) |
| 🇫🇷 **Français** | [JSON](data/french/daily_reflections_french.json) | [CSV](data/french/daily_reflections_french.csv) |

## 📋 What's Included

- **Complete year coverage**: All 365 days of AA daily reflections
- **Multilingual**: Available in English, Spanish, and French
- **Complete data**: Title, quote, reflection text, and source reference
- **Multiple formats**: SQLite database, JSON files, and CSV spreadsheets
- **Ready to use**: Perfect for apps, websites, or personal projects

## 📊 Data Structure

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

**📁 For more details about data formats, see [data/README.md](data/README.md)**

## 💻 Code Examples

**📝 Ready-to-run examples in multiple languages: [examples/README.md](examples/README.md)**

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

## 🚀 Getting Started

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

## 🌍 Available Languages

| Language | Code | Native Name | Coverage |
|----------|------|-------------|----------|
| English  | `en` | English     | Complete year (365 days) |
| French   | `fr` | Français    | Complete year (365 days) |
| Spanish  | `es` | Español     | Complete year (365 days) |

## 🤝 Contributing

Found an error or want to help? See our [contributing guidelines](CONTRIBUTING.md)

## 📜 License

MIT License - Free to use for educational and recovery purposes.

**Important**: This is an unofficial compilation. Original content belongs to Alcoholics Anonymous World Services, Inc.

---

<div align="center">

**"One day at a time"** 🌟  
*Dedicated to the recovery community worldwide*

</div>
