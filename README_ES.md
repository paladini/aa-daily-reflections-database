# 📖 Base de Datos de Reflexiones Diarias de AA

**Año completo de Reflexiones Diarias de Alcohólicos Anónimos en 3 idiomas**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Languages](https://img.shields.io/badge/Languages-3-blue.svg)]()

## 🚀 Descarga Rápida

Elige tu formato e idioma preferido:

### 📊 Todos los Idiomas Combinados
- **CSV**: [daily_reflections_all_languages.csv](data/daily_reflections_2025_all_languages.csv)
- **SQLite**: [reflections.db](data/reflections.db)

### 📄 Idiomas Individuales
| Idioma | JSON | CSV |
|--------|------|-----|
| 🇺🇸 **English** | [JSON](data/english/daily_reflections_english.json) | [CSV](data/english/daily_reflections_english.csv) |
| 🇪🇸 **Español** | [JSON](data/spanish/daily_reflections_spanish.json) | [CSV](data/spanish/daily_reflections_spanish.csv) |
| 🇫🇷 **Français** | [JSON](data/french/daily_reflections_french.json) | [CSV](data/french/daily_reflections_french.csv) |

## 📋 Qué Incluye

- **Cobertura anual completa**: Los 365 días de reflexiones diarias de AA
- **Multiidioma**: Disponible en inglés, español y francés
- **Datos completos**: Título, cita, texto de reflexión y referencia de fuente
- **Múltiples formatos**: Base de datos SQLite, archivos JSON y hojas de cálculo CSV
- **Listo para usar**: Perfecto para aplicaciones, sitios web o proyectos personales

## 📊 Estructura de Datos

Cada reflexión contiene:

```json
{
  "date": "2025-01-01",
  "language": "spanish",
  "title": "SOY UN MILAGRO",
  "quote": "El hecho central de nuestras vidas hoy...",
  "text": "Esto es verdaderamente un hecho en mi vida hoy...",
  "content": "ALCOHÓLICOS ANÓNIMOS, p. 25"
}
```

**📁 Para más detalles sobre formatos de datos, ver [data/README.md](data/README.md)**

## 💻 Ejemplos de Código

**📝 Ejemplos listos para ejecutar en múltiples lenguajes: [examples/README.md](examples/README.md)**

### Inicio Rápido

#### Python
```python
import sqlite3

conn = sqlite3.connect('data/reflections.db')
cursor = conn.cursor()

# Obtener reflexión de hoy
cursor.execute("""
    SELECT title, quote, text FROM reflections 
    WHERE date = date('now') AND language = 'spanish'
""")
reflection = cursor.fetchone()
print(f"Hoy: {reflection[0]}")
```

#### JavaScript
```javascript
const fs = require('fs');

// Cargar reflexiones en español
const reflections = JSON.parse(
    fs.readFileSync('data/spanish/daily_reflections_spanish.json', 'utf8')
);

// Obtener fecha de hoy
const today = new Date().toISOString().split('T')[0];
const todayReflection = reflections.find(r => r.date === today);

console.log(`Hoy: ${todayReflection.title}`);
```

## 🌍 Idiomas Disponibles

| Idioma | Código | Nombre Nativo | Cobertura |
|--------|--------|---------------|-----------|
| Inglés | `en` | English     | Año completo (365 días) |
| Francés | `fr` | Français    | Año completo (365 días) |
| Español | `es` | Español     | Año completo (365 días) |

## 🤝 Contribuir

¿Encontraste un error o quieres ayudar? Ve nuestras [pautas de contribución](CONTRIBUTING.md)

## 📜 Licencia

Licencia MIT - Libre para usar con fines educativos y de recuperación.

**Importante**: Esta es una compilación no oficial. El contenido original pertenece a Alcoholics Anonymous World Services, Inc.

---

<div align="center">

**"Un día a la vez"** 🌟  
*Dedicado a la comunidad de recuperación mundial*

</div>
