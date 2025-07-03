# 📊 AA Daily Reflections Data

This folder contains the complete year of Alcoholics Anonymous daily reflections in 3 different formats and 4 languages.

## 📥 Direct Downloads

### 🗄️ SQLite Database
- [`reflections.db`](reflections.db) - Complete database with all reflections (366 KB)

### 📄 JSON Files

#### By Language
- [`daily_reflections_english.json`](daily_reflections_english.json) - English reflections
- [`daily_reflections_french.json`](daily_reflections_french.json) - French reflections  
- [`daily_reflections_spanish.json`](daily_reflections_spanish.json) - Spanish reflections
- [`daily_reflections_brazilian-portuguese.json`](daily_reflections_brazilian-portuguese.json) - Brazilian Portuguese reflections

### 📊 CSV Spreadsheets

#### By Language
- [`daily_reflections_english.csv`](daily_reflections_english.csv) - English spreadsheet
- [`daily_reflections_french.csv`](daily_reflections_french.csv) - French spreadsheet
- [`daily_reflections_spanish.csv`](daily_reflections_spanish.csv) - Spanish spreadsheet
- [`daily_reflections_brazilian-portuguese.csv`](daily_reflections_brazilian-portuguese.csv) - Brazilian Portuguese spreadsheet

#### Combined File
- [`daily_reflections_all_languages.csv`](daily_reflections_all_languages.csv) - **All languages in one file**

## 📋 Data Structure

Each reflection contains the following fields:

```json
{
  "date": "2025-01-01",
  "language": "english", 
  "title": "REFLECTION TITLE",
  "quote": "Inspirational quote of the day...",
  "text": "Complete daily reflection text...",
  "content": "Source reference (e.g., ALCOHOLICS ANONYMOUS, p. 25)"
}
```

### CSV Fields
- **Date**: Date in YYYY-MM-DD format
- **Language**: Language (english, french, spanish, pt-BR)
- **Title**: Reflection title
- **Quote**: Inspirational quote/phrase
- **Text**: Complete reflection text
- **Content**: Bibliographic reference

## 🗃️ SQLite Database

### Table Schema
```sql
CREATE TABLE reflections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    language TEXT NOT NULL,
    title TEXT,
    quote TEXT,
    text TEXT,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(date, language)
);
```

### Useful Queries
```sql
-- Today's reflection in English
SELECT * FROM reflections 
WHERE date = date('now') AND language = 'english';

-- Search by keyword
SELECT * FROM reflections 
WHERE text LIKE '%hope%' OR title LIKE '%hope%';

-- Random reflection
SELECT * FROM reflections 
ORDER BY RANDOM() LIMIT 1;
```

## 📊 Statistics

| Language | Coverage | JSON Size | CSV Size |
|----------|----------|-----------|----------|
| English  | Complete year (365 days) | ~245 KB   | ~195 KB  |
| French   | Complete year (365 days) | ~265 KB   | ~215 KB  |
| Spanish  | Complete year (365 days) | ~255 KB   | ~205 KB  |
| **Total** | **3 complete years** | **~765 KB** | **~615 KB** |

## 🔍 How to Use

1. **For web/mobile apps**: Use SQLite database
2. **For data analysis**: Use CSV files
3. **For simple integration**: Use JSON files
4. **To process all languages**: Use combined CSV

## ⚡ Quick Access

### Python
```python
import json
with open('daily_reflections_english.json') as f:
    reflections = json.load(f)
```

### JavaScript
```javascript
const fs = require('fs');
const reflections = JSON.parse(fs.readFileSync('daily_reflections_english.json'));
```

### PHP
```php
$reflections = json_decode(file_get_contents('daily_reflections_english.json'), true);
```

### SQLite (any language)
```sql
.open reflections.db
SELECT * FROM reflections LIMIT 5;
```

---

📖 **[See complete code examples](../examples/)**
