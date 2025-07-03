#!/usr/bin/env python3
"""
Update SQLite Database with Portuguese Brazilian data

This script updates the reflections.db SQLite database to include the new
Brazilian Portuguese translations from the CSV file.
"""

import sqlite3
import csv
import os

def create_table_if_not_exists(cursor):
    """Create the reflections table if it doesn't exist."""
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS reflections (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            language TEXT NOT NULL,
            title TEXT NOT NULL,
            quote TEXT NOT NULL,
            text TEXT NOT NULL,
            content TEXT NOT NULL,
            UNIQUE(date, language)
        )
    ''')

def clear_portuguese_data(cursor):
    """Clear existing Portuguese data to avoid duplicates."""
    cursor.execute("DELETE FROM reflections WHERE language = 'pt-BR'")
    print("Cleared existing Portuguese data from database.")

def import_csv_to_sqlite(csv_file, db_file):
    """Import CSV data to SQLite database."""
    
    if not os.path.exists(csv_file):
        print(f"❌ Error: CSV file not found: {csv_file}")
        return False
    
    try:
        # Connect to database
        conn = sqlite3.connect(db_file)
        cursor = conn.cursor()
        
        # Create table if needed
        create_table_if_not_exists(cursor)
        
        # Clear existing Portuguese data
        clear_portuguese_data(cursor)
        
        # Read CSV and insert data
        with open(csv_file, 'r', encoding='utf-8') as file:
            csv_reader = csv.DictReader(file)
            
            pt_br_count = 0
            total_count = 0
            
            for row in csv_reader:
                total_count += 1
                
                # Only process pt-BR entries
                if row['Language'] == 'pt-BR':
                    try:
                        cursor.execute('''
                            INSERT OR REPLACE INTO reflections 
                            (date, language, title, quote, text, content)
                            VALUES (?, ?, ?, ?, ?, ?)
                        ''', (
                            row['Date'],
                            row['Language'],
                            row['Title'],
                            row['Quote'],
                            row['Reflection Text'],
                            row['Reference']
                        ))
                        pt_br_count += 1
                    except Exception as e:
                        print(f"❌ Error inserting row {total_count}: {e}")
                        print(f"   Row data: {row}")
        
        # Commit changes
        conn.commit()
        
        # Verify the data was inserted
        cursor.execute("SELECT COUNT(*) FROM reflections WHERE language = 'pt-BR'")
        final_count = cursor.fetchone()[0]
        
        print(f"✅ Successfully imported {pt_br_count} Portuguese reflections")
        print(f"   Verified {final_count} Portuguese entries in database")
        
        # Show statistics
        cursor.execute("SELECT language, COUNT(*) FROM reflections GROUP BY language")
        stats = cursor.fetchall()
        
        print("\n📊 Database Statistics:")
        print("┌" + "─" * 30 + "┐")
        print("│" + " Language Statistics".center(28) + " │")
        print("├" + "─" * 30 + "┤")
        
        for lang, count in stats:
            lang_display = {
                'english': '🇺🇸 English',
                'spanish': '🇪🇸 Spanish',
                'french': '🇫🇷 French',
                'pt-BR': '🇧🇷 Portuguese (BR)'
            }.get(lang, lang)
            
            print(f"│ {lang_display:<15}: {count:>8} │")
        
        print("└" + "─" * 30 + "┘")
        
        conn.close()
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def main():
    """Main function."""
    print("🔄 Updating SQLite database with Portuguese Brazilian data...\n")
    
    # File paths
    csv_file = 'data/daily_reflections_all_languages_new.csv'
    db_file = 'data/reflections.db'
    
    # Check if files exist
    if not os.path.exists(db_file):
        print(f"❌ Database file not found: {db_file}")
        print("Creating new database...")
    
    # Import data
    success = import_csv_to_sqlite(csv_file, db_file)
    
    if success:
        print("\n✅ Database update completed successfully!")
        print(f"   Database location: {os.path.abspath(db_file)}")
    else:
        print("\n❌ Database update failed!")

if __name__ == "__main__":
    main()
