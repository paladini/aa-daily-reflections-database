#!/usr/bin/env node
/**
 * AA Daily Reflections - JavaScript/Node.js Usage Examples
 * 
 * This script demonstrates basic operations with the AA Daily Reflections database using Node.js.
 * Supports English, Spanish, French, and Brazilian Portuguese.
 * Dependencies: sqlite3
 * Install with: npm install sqlite3
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class ReflectionsDB {
    constructor(dbPath = '../../data/reflections.db') {
        this.dbPath = path.resolve(__dirname, dbPath);
        this.languages = {
            'english': '🇺🇸 English',
            'spanish': '🇪🇸 Español',
            'french': '🇫🇷 Français',
            'pt-BR': '🇧🇷 Português (Brasil)'
        };
    }

    async getTodayReflection(language = 'english') {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(this.dbPath);
            const today = new Date().toISOString().split('T')[0];
            
            db.get(`
                SELECT date, title, quote, text, content 
                FROM reflections 
                WHERE date = ? AND language = ?
            `, [today, language], (err, row) => {
                db.close();
                if (err) reject(err);
                else resolve(row ? {
                    date: row.date,
                    title: row.title,
                    quote: row.quote,
                    text: row.text,
                    reference: row.content
                } : null);
            });
        });
    }

    async getRandomReflection(language = 'english') {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(this.dbPath);
            
            db.get(`
                SELECT date, title, quote, text, content 
                FROM reflections 
                WHERE language = ? 
                ORDER BY RANDOM() 
                LIMIT 1
            `, [language], (err, row) => {
                db.close();
                if (err) reject(err);
                else resolve({
                    date: row.date,
                    title: row.title,
                    quote: row.quote,
                    text: row.text,
                    reference: row.content
                });
            });
        });
    }

    async searchReflections(keyword, language = 'english') {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(this.dbPath);
            const searchTerm = `%${keyword}%`;
            
            db.all(`
                SELECT date, title, quote, text, content 
                FROM reflections 
                WHERE language = ? AND (
                    title LIKE ? OR 
                    quote LIKE ? OR 
                    text LIKE ?
                )
                ORDER BY date
            `, [language, searchTerm, searchTerm, searchTerm], (err, rows) => {
                db.close();
                if (err) reject(err);
                else resolve(rows.map(row => ({
                    date: row.date,
                    title: row.title,
                    quote: row.quote,
                    text: row.text,
                    reference: row.content
                })));
            });
        });
    }

    async getMultilingualReflection(date) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(this.dbPath);
            
            db.all(`
                SELECT language, date, title, quote, text, content 
                FROM reflections 
                WHERE date = ?
                ORDER BY language
            `, [date], (err, rows) => {
                db.close();
                if (err) reject(err);
                else {
                    const result = {};
                    rows.forEach(row => {
                        result[row.language] = {
                            date: row.date,
                            title: row.title,
                            quote: row.quote,
                            text: row.text,
                            reference: row.content
                        };
                    });
                    resolve(result);
                }
            });
        });
    }

    async getStatistics() {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(this.dbPath);
            
            db.get('SELECT COUNT(*) as total FROM reflections', (err, totalRow) => {
                if (err) {
                    db.close();
                    reject(err);
                    return;
                }
                
                db.all(`
                    SELECT language, COUNT(*) as count 
                    FROM reflections 
                    GROUP BY language
                `, (err, langRows) => {
                    db.close();
                    if (err) reject(err);
                    else {
                        const byLanguage = {};
                        langRows.forEach(row => {
                            byLanguage[row.language] = row.count;
                        });
                        
                        resolve({
                            total_reflections: totalRow.total,
                            by_language: byLanguage
                        });
                    }
                });
            });
        });
    }
}

function printReflection(reflection, showFullText = true) {
    if (!reflection) {
        console.log('❌ No reflection found.');
        return;
    }

    const date = new Date(reflection.date);
    const formattedDate = date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    console.log(`\n┌${'─'.repeat(78)}┐`);
    console.log(`│ 📅 ${formattedDate.padEnd(73)} │`);
    console.log(`├${'─'.repeat(78)}┤`);
    console.log(`│ 📖 ${reflection.title.padEnd(73)} │`);
    console.log(`├${'─'.repeat(78)}┤`);
    
    // Format quote
    const quoteLines = wrapText(`💭 ${reflection.quote}`, 76);
    quoteLines.forEach(line => {
        console.log(`│ ${line.padEnd(76)} │`);
    });

    if (showFullText) {
        console.log(`├${'─'.repeat(78)}┤`);
        const textLines = wrapText(`🔍 ${reflection.text}`, 76);
        textLines.forEach(line => {
            console.log(`│ ${line.padEnd(76)} │`);
        });
    }

    console.log(`├${'─'.repeat(78)}┤`);
    console.log(`│ 📚 ${reflection.reference.padEnd(73)} │`);
    console.log(`└${'─'.repeat(78)}┘`);
}

function wrapText(text, width) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = [];
    let currentLength = 0;

    for (const word of words) {
        if (currentLength + word.length + currentLine.length <= width) {
            currentLine.push(word);
            currentLength += word.length;
        } else {
            if (currentLine.length > 0) {
                lines.push(currentLine.join(' '));
            }
            currentLine = [word];
            currentLength = word.length;
        }
    }

    if (currentLine.length > 0) {
        lines.push(currentLine.join(' '));
    }

    return lines;
}

function printMultilingualReflection(reflections, date) {
    console.log(`\n${'═'.repeat(100)}`);
    console.log(`${'🌟 DAILY REFLECTIONS - AA 🌟'.padStart(58).padEnd(100)}`);
    console.log(`${'═'.repeat(100)}`);
    
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    console.log(`${formattedDate.padStart(57).padEnd(100)}`);
    console.log(`${'═'.repeat(100)}`);

    const languages = {
        'english': '🇺🇸 ENGLISH',
        'spanish': '🇪🇸 ESPAÑOL',
        'french': '🇫🇷 FRANÇAIS',
        'pt-BR': '🇧🇷 PORTUGUÊS (BRASIL)'
    };

    const languageKeys = Object.keys(languages);
    Object.entries(languages).forEach(([langCode, langDisplay], index) => {
        if (reflections[langCode]) {
            const reflection = reflections[langCode];
            console.log(`\n${langDisplay.padStart(58).padEnd(100)}`);
            console.log(`${'─'.repeat(100)}`);
            
            console.log(`📖 ${reflection.title}`);
            console.log();
            
            // Quote in a box
            const quoteLines = wrapText(reflection.quote, 90);
            console.log('┌' + '─'.repeat(92) + '┐');
            quoteLines.forEach(line => {
                console.log(`│ ${line.padEnd(90)} │`);
            });
            console.log('└' + '─'.repeat(92) + '┘');
            console.log();
            
            // Reflection text
            const textLines = wrapText(reflection.text, 95);
            textLines.forEach(line => {
                console.log(`   ${line}`);
            });
            
            console.log(`\n📚 ${reflection.reference}`);
            
            if (index < languageKeys.length - 1) {
                console.log(`\n${'·'.repeat(100)}`);
            }
        }
    });
    
    console.log(`\n${'═'.repeat(100)}`);
}

async function main() {
    console.log('🌟 AA Daily Reflections Database - JavaScript Examples\n');
    
    const db = new ReflectionsDB();
    
    try {
        // Example 1: Today's reflection
        console.log('1️⃣  Today\'s Reflection (English):');
        const todayReflection = await db.getTodayReflection('english');
        printReflection(todayReflection);
        
        // Example 2: Multilingual comparison
        console.log('\n2️⃣  Multilingual Daily Comparison (January 1st):');
        const multilingualReflections = await db.getMultilingualReflection('2025-01-01');
        printMultilingualReflection(multilingualReflections, '2025-01-01');
        
        // Example 3: Random reflection in Portuguese
        console.log('\n3️⃣  Random Reflection (Brazilian Portuguese):');
        const randomReflection = await db.getRandomReflection('pt-BR');
        printReflection(randomReflection);
        
        // Example 4: Search in English
        console.log('\n4️⃣  Search Results for \'serenity\':');
        const searchResults = await db.searchReflections('serenity', 'english');
        console.log(`Found ${searchResults.length} reflections containing 'serenity':`);
        searchResults.slice(0, 2).forEach((reflection, index) => {
            console.log(`\n   Result ${index + 1}:`);
            printReflection(reflection, false);
        });
        
        // Example 5: Search in Portuguese
        console.log('\n5️⃣  Search Results for \'Deus\' (Portuguese):');
        const searchResultsPt = await db.searchReflections('Deus', 'pt-BR');
        console.log(`Found ${searchResultsPt.length} reflections containing 'Deus':`);
        searchResultsPt.slice(0, 1).forEach((reflection, index) => {
            console.log(`\n   Resultado ${index + 1}:`);
            printReflection(reflection, false);
        });
        
        // Example 6: Statistics
        console.log('\n6️⃣  Database Statistics:');
        const stats = await db.getStatistics();
        console.log(`┌${'─'.repeat(48)}┐`);
        console.log(`│ ${'📊 DATABASE STATISTICS'.padStart(30).padEnd(46)} │`);
        console.log(`├${'─'.repeat(48)}┤`);
        console.log(`│ Total Reflections: ${stats.total_reflections.toString().padStart(28)} │`);
        console.log(`├${'─'.repeat(48)}┤`);
        Object.entries(stats.by_language).forEach(([lang, count]) => {
            const langDisplay = db.languages[lang] || lang.charAt(0).toUpperCase() + lang.slice(1);
            console.log(`│ ${langDisplay.padStart(15)}: ${count.toString().padStart(28)} │`);
        });
        console.log(`└${'─'.repeat(48)}┘`);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        console.log('Make sure the database file exists at \'../../data/reflections.db\'');
        console.log('And install sqlite3 with: npm install sqlite3');
    }
}

// Run if this file is executed directly
if (require.main === module) {
    main();
}

module.exports = { ReflectionsDB, printReflection, printMultilingualReflection };
