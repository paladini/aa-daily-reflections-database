#!/usr/bin/env python3
"""
AA Daily Reflections - Basic Usage Examples

This script demonstrates basic operations with the AA Daily Reflections database.
Supports English, Spanish, French, and Brazilian Portuguese.
"""

import sqlite3
import json
from datetime import datetime, timedelta
import random

class ReflectionsDB:
    """Simple class to interact with the reflections database."""
    
    # Language mappings
    LANGUAGES = {
        'english': 'English',
        'spanish': 'Español', 
        'french': 'Français',
        'pt-BR': 'Português (Brasil)'
    }
    
    def __init__(self, db_path='../../data/reflections.db'):
        self.db_path = db_path
    
    def get_connection(self):
        """Get database connection."""
        return sqlite3.connect(self.db_path)
    
    def get_today_reflection(self, language='english'):
        """Get today's reflection in specified language."""
        today = datetime.now().strftime('%Y-%m-%d')
        
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT date, title, quote, text, content 
                FROM reflections 
                WHERE date = ? AND language = ?
            """, (today, language))
            
            result = cursor.fetchone()
            if result:
                return {
                    'date': result[0],
                    'title': result[1],
                    'quote': result[2],
                    'text': result[3],
                    'reference': result[4]
                }
            return None
    
    def get_random_reflection(self, language='english'):
        """Get a random reflection in specified language."""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT date, title, quote, text, content 
                FROM reflections 
                WHERE language = ? 
                ORDER BY RANDOM() 
                LIMIT 1
            """, (language,))
            
            result = cursor.fetchone()
            return {
                'date': result[0],
                'title': result[1],
                'quote': result[2],
                'text': result[3],
                'reference': result[4]
            }
    
    def search_reflections(self, keyword, language='english'):
        """Search reflections by keyword."""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT date, title, quote, text, content 
                FROM reflections 
                WHERE language = ? AND (
                    title LIKE ? OR 
                    quote LIKE ? OR 
                    text LIKE ?
                )
                ORDER BY date
            """, (language, f'%{keyword}%', f'%{keyword}%', f'%{keyword}%'))
            
            results = cursor.fetchall()
            return [{
                'date': row[0],
                'title': row[1],
                'quote': row[2],
                'text': row[3],
                'reference': row[4]
            } for row in results]
    
    def get_month_reflections(self, month, language='english'):
        """Get all reflections for a specific month (1-12)."""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT date, title, quote, text, content 
                FROM reflections 
                WHERE language = ? AND strftime('%m', date) = ?
                ORDER BY date
            """, (language, f'{month:02d}'))
            
            results = cursor.fetchall()
            return [{
                'date': row[0],
                'title': row[1],
                'quote': row[2],
                'text': row[3],
                'reference': row[4]
            } for row in results]
    
    def get_statistics(self):
        """Get database statistics."""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            
            # Total reflections
            cursor.execute("SELECT COUNT(*) FROM reflections")
            total = cursor.fetchone()[0]
            
            # By language
            cursor.execute("""
                SELECT language, COUNT(*) 
                FROM reflections 
                GROUP BY language
            """)
            by_language = dict(cursor.fetchall())
            
            # Average text length
            cursor.execute("""
                SELECT language, AVG(LENGTH(text)) 
                FROM reflections 
                GROUP BY language
            """)
            avg_length = {row[0]: round(row[1], 2) for row in cursor.fetchall()}
            
            return {
                'total_reflections': total,
                'by_language': by_language,
                'average_text_length': avg_length
            }

def print_reflection(reflection, show_full_text=True):
    """Pretty print a reflection with enhanced formatting."""
    if not reflection:
        print("❌ No reflection found.")
        return
    
    # Parse date for better formatting
    date_obj = datetime.strptime(reflection['date'], '%Y-%m-%d')
    formatted_date = date_obj.strftime('%B %d, %Y')  # e.g., "January 15, 2025"
    day_of_week = date_obj.strftime('%A')  # e.g., "Monday"
    
    print(f"\n┌{'─' * 78}┐")
    print(f"│ � {day_of_week}, {formatted_date:<65} │")
    print(f"├{'─' * 78}┤")
    print(f"│ 📖 {reflection['title']:<73} │")
    print(f"├{'─' * 78}┤")
    
    # Format quote with proper wrapping
    quote_lines = wrap_text(f"💭 {reflection['quote']}", 76)
    for line in quote_lines:
        print(f"│ {line:<76} │")
    
    if show_full_text:
        print(f"├{'─' * 78}┤")
        
        # Format reflection text with proper wrapping
        text_lines = wrap_text(f"🔍 {reflection['text']}", 76)
        for line in text_lines:
            print(f"│ {line:<76} │")
    
    print(f"├{'─' * 78}┤")
    print(f"│ 📚 {reflection['reference']:<73} │")
    print(f"└{'─' * 78}┘")

def wrap_text(text, width):
    """Wrap text to specified width while preserving formatting."""
    words = text.split()
    lines = []
    current_line = []
    current_length = 0
    
    for word in words:
        word_length = len(word)
        if current_length + word_length + len(current_line) <= width:
            current_line.append(word)
            current_length += word_length
        else:
            if current_line:
                lines.append(' '.join(current_line))
            current_line = [word]
            current_length = word_length
    
    if current_line:
        lines.append(' '.join(current_line))
    
    return lines

def create_daily_display(reflections_dict, date_str):
    """Create a beautiful multilingual daily display."""
    print(f"\n{'═' * 100}")
    print(f"{'🌟 DAILY REFLECTIONS - AA 🌟':^100}")
    print(f"{'═' * 100}")
    
    date_obj = datetime.strptime(date_str, '%Y-%m-%d')
    formatted_date = date_obj.strftime('%A, %B %d, %Y')
    print(f"{formatted_date:^100}")
    print(f"{'═' * 100}")
    
    languages = {
        'english': '🇺🇸 ENGLISH',
        'spanish': '🇪🇸 ESPAÑOL', 
        'french': '🇫🇷 FRANÇAIS',
        'pt-BR': '🇧🇷 PORTUGUÊS (BRASIL)'
    }
    
    lang_keys = list(languages.keys())
    for i, (lang_code, lang_display) in enumerate(languages.items()):
        if lang_code in reflections_dict and reflections_dict[lang_code]:
            reflection = reflections_dict[lang_code]
            print(f"\n{lang_display:^100}")
            print(f"{'─' * 100}")
            
            # Title
            print(f"📖 {reflection['title']}")
            print()
            
            # Quote in a box
            quote_lines = wrap_text(reflection['quote'], 90)
            print("┌" + "─" * 92 + "┐")
            for line in quote_lines:
                print(f"│ {line:<90} │")
            print("└" + "─" * 92 + "┘")
            print()
            
            # Reflection text
            text_lines = wrap_text(reflection['text'], 95)
            for line in text_lines:
                print(f"   {line}")
            
            print(f"\n📚 {reflection['reference']}")
            
            if i < len(lang_keys) - 1:  # Don't add separator after the last language
                print(f"\n{'·' * 100}")
    
    print(f"\n{'═' * 100}")

def compare_translations(db, date_str):
    """Compare the same reflection across all languages."""
    languages = ['english', 'spanish', 'french', 'pt-BR']
    reflections = {}
    
    for lang in languages:
        with db.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT date, title, quote, text, content 
                FROM reflections 
                WHERE date = ? AND language = ?
            """, (date_str, lang))
            
            result = cursor.fetchone()
            if result:
                reflections[lang] = {
                    'date': result[0],
                    'title': result[1],
                    'quote': result[2],
                    'text': result[3],
                    'reference': result[4]
                }
    
    if reflections:
        create_daily_display(reflections, date_str)
    else:
        print(f"❌ No reflections found for {date_str}")

def main():
    """Main demonstration function."""
    print("🌟 AA Daily Reflections Database - Basic Usage Examples\n")
    
    # Initialize database connection
    db = ReflectionsDB()
    
    try:
        # Example 1: Get today's reflection
        print("1️⃣  Today's Reflection (English):")
        today_reflection = db.get_today_reflection('english')
        print_reflection(today_reflection)
        
        # Example 2: Compare same day across all languages
        print("\n2️⃣  Multilingual Daily Comparison (January 1st):")
        compare_translations(db, '2025-01-01')
        
        # Example 3: Get a random reflection
        print("\n3️⃣  Random Reflection (Brazilian Portuguese):")
        random_reflection = db.get_random_reflection('pt-BR')
        print_reflection(random_reflection)
        
        # Example 4: Search for reflections
        print("\n4️⃣  Search Results for 'hope':")
        search_results = db.search_reflections('hope', 'english')
        print(f"Found {len(search_results)} reflections containing 'hope':")
        for i, reflection in enumerate(search_results[:2], 1):  # Show first 2
            print(f"\n   Result {i}:")
            print_reflection(reflection, show_full_text=False)
        
        # Example 5: Search in Portuguese
        print("\n5️⃣  Search Results for 'Deus' (Portuguese):")
        search_results_pt = db.search_reflections('Deus', 'pt-BR')
        print(f"Found {len(search_results_pt)} reflections containing 'Deus':")
        for i, reflection in enumerate(search_results_pt[:1], 1):  # Show first 1
            print(f"\n   Resultado {i}:")
            print_reflection(reflection, show_full_text=False)
        
        # Example 6: Database statistics
        print("\n6️⃣  Database Statistics:")
        stats = db.get_statistics()
        print(f"┌{'─' * 48}┐")
        print(f"│ {'📊 DATABASE STATISTICS':^46} │")
        print(f"├{'─' * 48}┤")
        print(f"│ Total Reflections: {stats['total_reflections']:>28} │")
        print(f"├{'─' * 48}┤")
        for lang, count in stats['by_language'].items():
            lang_display = db.LANGUAGES.get(lang, lang.title())
            print(f"│ {lang_display:>15}: {count:>28} │")
        print(f"└{'─' * 48}┘")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        print("Make sure the database file exists at '../data/reflections.db'")

if __name__ == "__main__":
    main()
