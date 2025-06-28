# AA Daily Reflections - Usage Examples

This directory contains practical examples of how to use the AA Daily Reflections database in different programming languages.

## 📂 Available Examples

### 🐍 Python (`basic_usage.py`)
Complete Python example with enhanced formatting and multilingual display.

**Requirements:**
- Python 3.6+
- No additional packages needed (uses built-in `sqlite3`)

**Run:**
```bash
python basic_usage.py
```

### 🟨 JavaScript/Node.js (`basic_usage.js`)
Full-featured Node.js example with async/await patterns.

**Requirements:**
- Node.js 12+
- sqlite3 package

**Setup & Run:**
```bash
npm install
npm start
```

### 🐘 PHP (`basic_usage.php`)
PHP example compatible with most PHP installations.

**Requirements:**
- PHP 7.0+
- SQLite3 extension enabled

**Run:**
```bash
php basic_usage.php
```

### 🐹 Go (`basic_usage.go`)
Go example with proper error handling and struct definitions.

**Requirements:**
- Go 1.19+
- go-sqlite3 driver

**Setup & Run:**
```bash
go mod tidy
go run basic_usage.go
```

## 🌟 Features Demonstrated

All examples showcase the following operations:

### 1. **Today's Reflection**
Get the current day's reflection in any language.

### 2. **Multilingual Display** 
Beautiful side-by-side comparison of the same reflection in English, Spanish, and French with enhanced formatting including:
- Bordered text boxes
- Proper text wrapping
- Unicode flags and emojis
- Centered headers

### 3. **Random Reflection**
Retrieve a random reflection for inspiration.

### 4. **Search Functionality**
Search across titles, quotes, and reflection text.

### 5. **Database Statistics**
Get counts by language and other metrics.

## 🎨 Enhanced Pretty Printing

All examples feature:
- **Unicode borders** and decorative elements
- **Text wrapping** for readability
- **Multi-language support** with flag emojis
- **Formatted dates** in local format
- **Structured layout** for easy reading

## 🔧 Database Schema

The examples work with the following SQLite schema:

```sql
CREATE TABLE reflections (
    id INTEGER PRIMARY KEY,
    date TEXT NOT NULL,
    language TEXT NOT NULL,
    title TEXT NOT NULL,
    quote TEXT NOT NULL,
    text TEXT NOT NULL,
    content TEXT NOT NULL,
    UNIQUE(date, language)
);
```

## 📊 Sample Output

When you run any of the examples, you'll see beautifully formatted output like:

```
🌟 AA Daily Reflections Database - [Language] Examples

1️⃣  Today's Reflection (English):

┌──────────────────────────────────────────────────────────────────────────────┐
│ 📅 Friday, June 27, 2025                                                     │
├──────────────────────────────────────────────────────────────────────────────┤
│ 📖 Daily Reflection Title                                                     │
├──────────────────────────────────────────────────────────────────────────────┤
│ 💭 "Inspirational quote from the reflection..."                               │
├──────────────────────────────────────────────────────────────────────────────┤
│ 🔍 The full reflection text with proper wrapping and formatting...            │
├──────────────────────────────────────────────────────────────────────────────┤
│ 📚 Source reference                                                           │
└──────────────────────────────────────────────────────────────────────────────┘

2️⃣  Multilingual Daily Comparison (January 1st):

════════════════════════════════════════════════════════════════════════════════════════════════════
                                      🌟 DAILY REFLECTIONS - AA 🌟                                      
════════════════════════════════════════════════════════════════════════════════════════════════════
                                        Friday, January 1, 2025                                        
════════════════════════════════════════════════════════════════════════════════════════════════════

                                              🇺🇸 ENGLISH                                              
────────────────────────────────────────────────────────────────────────────────────────────────────
📖 New Beginnings

┌────────────────────────────────────────────────────────────────────────────────────────────┐
│ "Today is the first day of the rest of my life."                                              │
└────────────────────────────────────────────────────────────────────────────────────────────┘

   The reflection text appears here with proper formatting and wrapping...

📚 Alcoholics Anonymous, p. 123

········································································································

                                             🇪🇸 ESPAÑOL                                              
────────────────────────────────────────────────────────────────────────────────────────────────────
📖 Nuevos Comienzos

┌────────────────────────────────────────────────────────────────────────────────────────────┐
│ "Hoy es el primer día del resto de mi vida."                                                  │
└────────────────────────────────────────────────────────────────────────────────────────────┘

   El texto de reflexión aparece aquí con formato apropiado...

📚 Alcohólicos Anónimos, p. 123

········································································································

                                             🇫🇷 FRANÇAIS                                             
────────────────────────────────────────────────────────────────────────────────────────────────────
📖 Nouveaux Commencements

┌────────────────────────────────────────────────────────────────────────────────────────────┐
│ "Aujourd'hui est le premier jour du reste de ma vie."                                        │
└────────────────────────────────────────────────────────────────────────────────────────────┘

   Le texte de réflexion apparaît ici avec un formatage approprié...

📚 Alcooliques Anonymes, p. 123

════════════════════════════════════════════════════════════════════════════════════════════════════
```

## 💡 Usage Tips

1. **Combine languages**: Use the multilingual display to compare translations
2. **Build daily apps**: Perfect foundation for daily reflection applications
3. **Search functionality**: Great for topical study or research
4. **Mobile-friendly**: Text wrapping ensures readability on different screen sizes
5. **Extensible**: Easy to modify for specific needs or additional features

## 🚀 Next Steps

These examples provide a solid foundation for building:
- Daily reflection mobile apps
- Web applications
- CLI tools
- Desktop applications
- Automated email/messaging systems
- Study tools and concordances

## 📝 License

All examples are provided under the MIT License, same as the main project.
