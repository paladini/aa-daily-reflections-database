#!/usr/bin/env php
<?php
/**
 * AA Daily Reflections - PHP Usage Examples
 * 
 * This script demonstrates basic operations with the AA Daily Reflections database using PHP.
 * Supports English, Spanish, French, and Brazilian Portuguese.
 * Requires: PHP with SQLite3 extension
 */

class ReflectionsDB {
    private $dbPath;
    private $languages = [
        'english' => '🇺🇸 English',
        'spanish' => '🇪🇸 Español',
        'french' => '🇫🇷 Français',
        'pt-BR' => '🇧🇷 Português (Brasil)'
    ];
    
    public function __construct($dbPath = '../../data/reflections.db') {
        $this->dbPath = realpath(__DIR__ . '/' . $dbPath);
        if (!$this->dbPath || !file_exists($this->dbPath)) {
            throw new Exception("Database file not found: $dbPath");
        }
    }
    
    private function getConnection() {
        return new SQLite3($this->dbPath, SQLITE3_OPEN_READONLY);
    }
    
    public function getTodayReflection($language = 'english') {
        $db = $this->getConnection();
        $today = date('Y-m-d');
        
        $stmt = $db->prepare('
            SELECT date, title, quote, text, content 
            FROM reflections 
            WHERE date = ? AND language = ?
        ');
        $stmt->bindValue(1, $today, SQLITE3_TEXT);
        $stmt->bindValue(2, $language, SQLITE3_TEXT);
        
        $result = $stmt->execute();
        $row = $result->fetchArray(SQLITE3_ASSOC);
        $db->close();
        
        return $row ? [
            'date' => $row['date'],
            'title' => $row['title'],
            'quote' => $row['quote'],
            'text' => $row['text'],
            'reference' => $row['content']
        ] : null;
    }
    
    public function getRandomReflection($language = 'english') {
        $db = $this->getConnection();
        
        $stmt = $db->prepare('
            SELECT date, title, quote, text, content 
            FROM reflections 
            WHERE language = ? 
            ORDER BY RANDOM() 
            LIMIT 1
        ');
        $stmt->bindValue(1, $language, SQLITE3_TEXT);
        
        $result = $stmt->execute();
        $row = $result->fetchArray(SQLITE3_ASSOC);
        $db->close();
        
        return [
            'date' => $row['date'],
            'title' => $row['title'],
            'quote' => $row['quote'],
            'text' => $row['text'],
            'reference' => $row['content']
        ];
    }
    
    public function searchReflections($keyword, $language = 'english') {
        $db = $this->getConnection();
        $searchTerm = "%$keyword%";
        
        $stmt = $db->prepare('
            SELECT date, title, quote, text, content 
            FROM reflections 
            WHERE language = ? AND (
                title LIKE ? OR 
                quote LIKE ? OR 
                text LIKE ?
            )
            ORDER BY date
        ');
        $stmt->bindValue(1, $language, SQLITE3_TEXT);
        $stmt->bindValue(2, $searchTerm, SQLITE3_TEXT);
        $stmt->bindValue(3, $searchTerm, SQLITE3_TEXT);
        $stmt->bindValue(4, $searchTerm, SQLITE3_TEXT);
        
        $result = $stmt->execute();
        $reflections = [];
        
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $reflections[] = [
                'date' => $row['date'],
                'title' => $row['title'],
                'quote' => $row['quote'],
                'text' => $row['text'],
                'reference' => $row['content']
            ];
        }
        
        $db->close();
        return $reflections;
    }
    
    public function getMultilingualReflection($date) {
        $db = $this->getConnection();
        
        $stmt = $db->prepare('
            SELECT language, date, title, quote, text, content 
            FROM reflections 
            WHERE date = ?
            ORDER BY language
        ');
        $stmt->bindValue(1, $date, SQLITE3_TEXT);
        
        $result = $stmt->execute();
        $reflections = [];
        
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $reflections[$row['language']] = [
                'date' => $row['date'],
                'title' => $row['title'],
                'quote' => $row['quote'],
                'text' => $row['text'],
                'reference' => $row['content']
            ];
        }
        
        $db->close();
        return $reflections;
    }
    
    public function getStatistics() {
        $db = $this->getConnection();
        
        // Total count
        $totalResult = $db->query('SELECT COUNT(*) as total FROM reflections');
        $total = $totalResult->fetchArray(SQLITE3_ASSOC)['total'];
        
        // By language
        $langResult = $db->query('
            SELECT language, COUNT(*) as count 
            FROM reflections 
            GROUP BY language
        ');
        
        $byLanguage = [];
        while ($row = $langResult->fetchArray(SQLITE3_ASSOC)) {
            $byLanguage[$row['language']] = $row['count'];
        }
        
        $db->close();
        
        return [
            'total_reflections' => $total,
            'by_language' => $byLanguage
        ];
    }
}

function printReflection($reflection, $showFullText = true) {
    if (!$reflection) {
        echo "❌ No reflection found.\n";
        return;
    }
    
    $date = new DateTime($reflection['date']);
    $formattedDate = $date->format('l, F j, Y');
    
    echo "\n┌" . str_repeat('─', 78) . "┐\n";
    echo "│ 📅 " . str_pad($formattedDate, 73) . " │\n";
    echo "├" . str_repeat('─', 78) . "┤\n";
    echo "│ 📖 " . str_pad($reflection['title'], 73) . " │\n";
    echo "├" . str_repeat('─', 78) . "┤\n";
    
    // Format quote
    $quoteLines = wrapText("💭 " . $reflection['quote'], 76);
    foreach ($quoteLines as $line) {
        echo "│ " . str_pad($line, 76) . " │\n";
    }
    
    if ($showFullText) {
        echo "├" . str_repeat('─', 78) . "┤\n";
        $textLines = wrapText("🔍 " . $reflection['text'], 76);
        foreach ($textLines as $line) {
            echo "│ " . str_pad($line, 76) . " │\n";
        }
    }
    
    echo "├" . str_repeat('─', 78) . "┤\n";
    echo "│ 📚 " . str_pad($reflection['reference'], 73) . " │\n";
    echo "└" . str_repeat('─', 78) . "┘\n";
}

function wrapText($text, $width) {
    $words = explode(' ', $text);
    $lines = [];
    $currentLine = [];
    $currentLength = 0;
    
    foreach ($words as $word) {
        $wordLength = strlen($word);
        if ($currentLength + $wordLength + count($currentLine) <= $width) {
            $currentLine[] = $word;
            $currentLength += $wordLength;
        } else {
            if (!empty($currentLine)) {
                $lines[] = implode(' ', $currentLine);
            }
            $currentLine = [$word];
            $currentLength = $wordLength;
        }
    }
    
    if (!empty($currentLine)) {
        $lines[] = implode(' ', $currentLine);
    }
    
    return $lines;
}

function printMultilingualReflection($reflections, $date) {
    echo "\n" . str_repeat('═', 100) . "\n";
    echo str_pad('🌟 DAILY REFLECTIONS - AA 🌟', 100, ' ', STR_PAD_BOTH) . "\n";
    echo str_repeat('═', 100) . "\n";
    
    $dateObj = new DateTime($date);
    $formattedDate = $dateObj->format('l, F j, Y');
    echo str_pad($formattedDate, 100, ' ', STR_PAD_BOTH) . "\n";
    echo str_repeat('═', 100) . "\n";
    
    $languages = [
        'english' => '🇺🇸 ENGLISH',
        'spanish' => '🇪🇸 ESPAÑOL',
        'french' => '🇫🇷 FRANÇAIS',
        'pt-BR' => '🇧🇷 PORTUGUÊS (BRASIL)'
    ];
    
    $languageKeys = array_keys($languages);
    $index = 0;
    foreach ($languages as $langCode => $langDisplay) {
        if (isset($reflections[$langCode])) {
            $reflection = $reflections[$langCode];
            echo "\n" . str_pad($langDisplay, 100, ' ', STR_PAD_BOTH) . "\n";
            echo str_repeat('─', 100) . "\n";
            
            echo "📖 " . $reflection['title'] . "\n\n";
            
            // Quote in a box
            $quoteLines = wrapText($reflection['quote'], 90);
            echo "┌" . str_repeat('─', 92) . "┐\n";
            foreach ($quoteLines as $line) {
                echo "│ " . str_pad($line, 90) . " │\n";
            }
            echo "└" . str_repeat('─', 92) . "┘\n\n";
            
            // Reflection text
            $textLines = wrapText($reflection['text'], 95);
            foreach ($textLines as $line) {
                echo "   $line\n";
            }
            
            echo "\n📚 " . $reflection['reference'] . "\n";
            
            if ($index < count($languageKeys) - 1) {
                echo "\n" . str_repeat('·', 100) . "\n";
            }
        }
        $index++;
    }
    $languageKeys = array_keys($languages);
    foreach ($languages as $langCode => $langDisplay) {
        if (isset($reflections[$langCode])) {
            $reflection = $reflections[$langCode];
            echo "\n" . str_pad($langDisplay, 100, ' ', STR_PAD_BOTH) . "\n";
            echo str_repeat('─', 100) . "\n";
            
            echo "📖 " . $reflection['title'] . "\n\n";
            
            // Quote in a box
            $quoteLines = wrapText($reflection['quote'], 90);
            echo "┌" . str_repeat('─', 92) . "┐\n";
            foreach ($quoteLines as $line) {
                echo "│ " . str_pad($line, 90) . " │\n";
            }
            echo "└" . str_repeat('─', 92) . "┘\n\n";
            
            // Reflection text
            $textLines = wrapText($reflection['text'], 95);
            foreach ($textLines as $line) {
                echo "   $line\n";
            }
            
            echo "\n📚 " . $reflection['reference'] . "\n";
            
            if ($langCode !== end($languageKeys)) {
                echo "\n" . str_repeat('·', 100) . "\n";
            }
        }
    }
    
    echo "\n" . str_repeat('═', 100) . "\n";
}

function main() {
    echo "🌟 AA Daily Reflections Database - PHP Examples\n\n";
    
    try {
        $db = new ReflectionsDB();
        
        // Example 1: Today's reflection
        echo "1️⃣  Today's Reflection (English):\n";
        $todayReflection = $db->getTodayReflection('english');
        printReflection($todayReflection);
        
        // Example 2: Multilingual comparison
        echo "\n2️⃣  Multilingual Daily Comparison (January 1st):\n";
        $multilingualReflections = $db->getMultilingualReflection('2025-01-01');
        printMultilingualReflection($multilingualReflections, '2025-01-01');
        
        // Example 3: Random reflection in Portuguese
        echo "\n3️⃣  Random Reflection (Brazilian Portuguese):\n";
        $randomReflection = $db->getRandomReflection('pt-BR');
        printReflection($randomReflection);
        
        // Example 4: Search in English
        echo "\n4️⃣  Search Results for 'gratitude':\n";
        $searchResults = $db->searchReflections('gratitude', 'english');
        echo "Found " . count($searchResults) . " reflections containing 'gratitude':\n";
        foreach (array_slice($searchResults, 0, 2) as $index => $reflection) {
            echo "\n   Result " . ($index + 1) . ":\n";
            printReflection($reflection, false);
        }
        
        // Example 5: Search in Portuguese
        echo "\n5️⃣  Search Results for 'Deus' (Portuguese):\n";
        $searchResultsPt = $db->searchReflections('Deus', 'pt-BR');
        echo "Found " . count($searchResultsPt) . " reflections containing 'Deus':\n";
        foreach (array_slice($searchResultsPt, 0, 1) as $index => $reflection) {
            echo "\n   Resultado " . ($index + 1) . ":\n";
            printReflection($reflection, false);
        }
        
        // Example 6: Statistics
        echo "\n6️⃣  Database Statistics:\n";
        $stats = $db->getStatistics();
        echo "┌" . str_repeat('─', 48) . "┐\n";
        echo "│ " . str_pad('📊 DATABASE STATISTICS', 46, ' ', STR_PAD_BOTH) . " │\n";
        echo "├" . str_repeat('─', 48) . "┤\n";
        echo "│ Total Reflections: " . str_pad($stats['total_reflections'], 28, ' ', STR_PAD_LEFT) . " │\n";
        echo "├" . str_repeat('─', 48) . "┤\n";
        
        $languages = [
            'english' => 'English',
            'spanish' => 'Español',
            'french' => 'Français',
            'pt-BR' => 'Português'
        ];
        
        foreach ($stats['by_language'] as $lang => $count) {
            $langDisplay = $languages[$lang] ?? ucfirst($lang);
            echo "│ " . str_pad($langDisplay, 15, ' ', STR_PAD_LEFT) . ": " . str_pad($count, 28, ' ', STR_PAD_LEFT) . " │\n";
        }
        echo "└" . str_repeat('─', 48) . "┘\n";
        
    } catch (Exception $e) {
        echo "❌ Error: " . $e->getMessage() . "\n";
        echo "Make sure the database file exists at '../../data/reflections.db'\n";
        echo "And PHP has SQLite3 extension enabled\n";
    }
}

// Run if this file is executed directly
if (php_sapi_name() === 'cli' && basename(__FILE__) == basename($_SERVER['PHP_SELF'])) {
    main();
}
?>
