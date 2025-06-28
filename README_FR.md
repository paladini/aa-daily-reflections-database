# 📖 Base de Données de Réflexions Quotidiennes AA

**Année complète de Réflexions Quotidiennes des Alcooliques Anonymes en 3 langues**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Languages](https://img.shields.io/badge/Languages-3-blue.svg)]()

## 🚀 Téléchargement Rapide

Choisissez votre format et langue préférés :

### 📊 Toutes les Langues Combinées
- **CSV**: [daily_reflections_all_languages.csv](data/daily_reflections_2025_all_languages.csv)
- **SQLite**: [reflections.db](data/reflections.db)

### 📄 Langues Individuelles
| Langue | JSON | CSV |
|--------|------|-----|
| 🇺🇸 **English** | [JSON](data/english/daily_reflections_english.json) | [CSV](data/english/daily_reflections_english.csv) |
| 🇪🇸 **Español** | [JSON](data/spanish/daily_reflections_spanish.json) | [CSV](data/spanish/daily_reflections_spanish.csv) |
| 🇫🇷 **Français** | [JSON](data/french/daily_reflections_french.json) | [CSV](data/french/daily_reflections_french.csv) |

## 📋 Ce qui est Inclus

- **Couverture annuelle complète** : Les 365 jours de réflexions quotidiennes AA
- **Multilingue** : Disponible en anglais, espagnol et français
- **Données complètes** : Titre, citation, texte de réflexion et référence source
- **Formats multiples** : Base de données SQLite, fichiers JSON et feuilles de calcul CSV
- **Prêt à utiliser** : Parfait pour les applications, sites web ou projets personnels

## 📊 Structure des Données

Chaque réflexion contient :

```json
{
  "date": "2025-01-01",
  "language": "french",
  "title": "JE SUIS UN MIRACLE",
  "quote": "Le fait central de nos vies aujourd'hui...",
  "text": "C'est vraiment un fait dans ma vie aujourd'hui...",
  "content": "ALCOOLIQUES ANONYMES, p. 25"
}
```

**📁 Pour plus de détails sur les formats de données, voir [data/README.md](data/README.md)**

## 💻 Exemples de Code

**📝 Exemples prêts à exécuter dans plusieurs langages : [examples/README.md](examples/README.md)**

### Démarrage Rapide

#### Python
```python
import sqlite3

conn = sqlite3.connect('data/reflections.db')
cursor = conn.cursor()

# Obtenir la réflexion d'aujourd'hui
cursor.execute("""
    SELECT title, quote, text FROM reflections 
    WHERE date = date('now') AND language = 'french'
""")
reflection = cursor.fetchone()
print(f"Aujourd'hui : {reflection[0]}")
```

#### JavaScript
```javascript
const fs = require('fs');

// Charger les réflexions en français
const reflections = JSON.parse(
    fs.readFileSync('data/french/daily_reflections_french.json', 'utf8')
);

// Obtenir la date d'aujourd'hui
const today = new Date().toISOString().split('T')[0];
const todayReflection = reflections.find(r => r.date === today);

console.log(`Aujourd'hui : ${todayReflection.title}`);
```

## 🌍 Langues Disponibles

| Langue | Code | Nom Natif | Couverture |
|--------|------|-----------|------------|
| Anglais | `en` | English     | Année complète (365 jours) |
| Français | `fr` | Français    | Année complète (365 jours) |
| Espagnol | `es` | Español     | Année complète (365 jours) |

## 🤝 Contribuer

Vous avez trouvé une erreur ou voulez aider ? Consultez nos [directives de contribution](CONTRIBUTING.md)

## 📜 Licence

Licence MIT - Libre d'utilisation à des fins éducatives et de rétablissement.

**Important** : Il s'agit d'une compilation non officielle. Le contenu original appartient à Alcoholics Anonymous World Services, Inc.

---

<div align="center">

**"Un jour à la fois"** 🌟  
*Dédié à la communauté mondiale de rétablissement*

</div>
