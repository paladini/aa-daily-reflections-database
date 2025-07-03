package main

import (
	"database/sql"
	"fmt"
	"log"
	"path/filepath"
	"strings"
	"time"

	_ "github.com/mattn/go-sqlite3"
)

// Reflection represents a daily reflection
type Reflection struct {
	Date      string `json:"date"`
	Title     string `json:"title"`
	Quote     string `json:"quote"`
	Text      string `json:"text"`
	Reference string `json:"reference"`
}

// ReflectionsDB handles database operations
type ReflectionsDB struct {
	dbPath    string
	languages map[string]string
}

// NewReflectionsDB creates a new database handler
func NewReflectionsDB(dbPath string) *ReflectionsDB {
	if dbPath == "" {
		dbPath = "../../data/reflections.db"
	}
	absPath, _ := filepath.Abs(dbPath)
	
	languages := map[string]string{
		"english": "🇺🇸 English",
		"spanish": "🇪🇸 Español",
		"french":  "🇫🇷 Français",
		"pt-BR":   "🇧🇷 Português (Brasil)",
	}
	
	return &ReflectionsDB{
		dbPath:    absPath,
		languages: languages,
	}
}

func (db *ReflectionsDB) getConnection() (*sql.DB, error) {
	return sql.Open("sqlite3", db.dbPath)
}

// GetTodayReflection gets today's reflection in specified language
func (db *ReflectionsDB) GetTodayReflection(language string) (*Reflection, error) {
	if language == "" {
		language = "english"
	}
	
	conn, err := db.getConnection()
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	today := time.Now().Format("2006-01-02")
	
	query := `
		SELECT date, title, quote, text, content 
		FROM reflections 
		WHERE date = ? AND language = ?
	`
	
	row := conn.QueryRow(query, today, language)
	
	var reflection Reflection
	err = row.Scan(&reflection.Date, &reflection.Title, &reflection.Quote, 
		&reflection.Text, &reflection.Reference)
	
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	
	return &reflection, nil
}

// GetRandomReflection gets a random reflection in specified language
func (db *ReflectionsDB) GetRandomReflection(language string) (*Reflection, error) {
	if language == "" {
		language = "english"
	}
	
	conn, err := db.getConnection()
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	query := `
		SELECT date, title, quote, text, content 
		FROM reflections 
		WHERE language = ? 
		ORDER BY RANDOM() 
		LIMIT 1
	`
	
	row := conn.QueryRow(query, language)
	
	var reflection Reflection
	err = row.Scan(&reflection.Date, &reflection.Title, &reflection.Quote, 
		&reflection.Text, &reflection.Reference)
	
	if err != nil {
		return nil, err
	}
	
	return &reflection, nil
}

// SearchReflections searches for reflections containing a keyword
func (db *ReflectionsDB) SearchReflections(keyword, language string) ([]Reflection, error) {
	if language == "" {
		language = "english"
	}
	
	conn, err := db.getConnection()
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	searchTerm := "%" + keyword + "%"
	query := `
		SELECT date, title, quote, text, content 
		FROM reflections 
		WHERE language = ? AND (
			title LIKE ? OR 
			quote LIKE ? OR 
			text LIKE ?
		)
		ORDER BY date
	`
	
	rows, err := conn.Query(query, language, searchTerm, searchTerm, searchTerm)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var reflections []Reflection
	for rows.Next() {
		var reflection Reflection
		err := rows.Scan(&reflection.Date, &reflection.Title, &reflection.Quote, 
			&reflection.Text, &reflection.Reference)
		if err != nil {
			return nil, err
		}
		reflections = append(reflections, reflection)
	}
	
	return reflections, nil
}

// GetMultilingualReflection gets the same reflection in all languages
func (db *ReflectionsDB) GetMultilingualReflection(date string) (map[string]Reflection, error) {
	conn, err := db.getConnection()
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	query := `
		SELECT language, date, title, quote, text, content 
		FROM reflections 
		WHERE date = ?
		ORDER BY language
	`
	
	rows, err := conn.Query(query, date)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	reflections := make(map[string]Reflection)
	for rows.Next() {
		var lang string
		var reflection Reflection
		err := rows.Scan(&lang, &reflection.Date, &reflection.Title, 
			&reflection.Quote, &reflection.Text, &reflection.Reference)
		if err != nil {
			return nil, err
		}
		reflections[lang] = reflection
	}
	
	return reflections, nil
}

// GetStatistics returns database statistics
func (db *ReflectionsDB) GetStatistics() (map[string]interface{}, error) {
	conn, err := db.getConnection()
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	// Total count
	var total int
	err = conn.QueryRow("SELECT COUNT(*) FROM reflections").Scan(&total)
	if err != nil {
		return nil, err
	}

	// By language
	rows, err := conn.Query(`
		SELECT language, COUNT(*) 
		FROM reflections 
		GROUP BY language
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	byLanguage := make(map[string]int)
	for rows.Next() {
		var lang string
		var count int
		err := rows.Scan(&lang, &count)
		if err != nil {
			return nil, err
		}
		byLanguage[lang] = count
	}

	return map[string]interface{}{
		"total_reflections": total,
		"by_language":      byLanguage,
	}, nil
}

func printReflection(reflection *Reflection, showFullText bool) {
	if reflection == nil {
		fmt.Println("❌ No reflection found.")
		return
	}

	date, _ := time.Parse("2006-01-02", reflection.Date)
	formattedDate := date.Format("Monday, January 2, 2006")

	fmt.Printf("\n┌%s┐\n", strings.Repeat("─", 78))
	fmt.Printf("│ 📅 %-73s │\n", formattedDate)
	fmt.Printf("├%s┤\n", strings.Repeat("─", 78))
	fmt.Printf("│ 📖 %-73s │\n", reflection.Title)
	fmt.Printf("├%s┤\n", strings.Repeat("─", 78))

	// Format quote
	quoteLines := wrapText("💭 "+reflection.Quote, 76)
	for _, line := range quoteLines {
		fmt.Printf("│ %-76s │\n", line)
	}

	if showFullText {
		fmt.Printf("├%s┤\n", strings.Repeat("─", 78))
		textLines := wrapText("🔍 "+reflection.Text, 76)
		for _, line := range textLines {
			fmt.Printf("│ %-76s │\n", line)
		}
	}

	fmt.Printf("├%s┤\n", strings.Repeat("─", 78))
	fmt.Printf("│ 📚 %-73s │\n", reflection.Reference)
	fmt.Printf("└%s┘\n", strings.Repeat("─", 78))
}

func wrapText(text string, width int) []string {
	words := strings.Fields(text)
	var lines []string
	var currentLine []string
	currentLength := 0

	for _, word := range words {
		wordLength := len(word)
		if currentLength+wordLength+len(currentLine) <= width {
			currentLine = append(currentLine, word)
			currentLength += wordLength
		} else {
			if len(currentLine) > 0 {
				lines = append(lines, strings.Join(currentLine, " "))
			}
			currentLine = []string{word}
			currentLength = wordLength
		}
	}

	if len(currentLine) > 0 {
		lines = append(lines, strings.Join(currentLine, " "))
	}

	return lines
}

func printMultilingualReflection(reflections map[string]Reflection, date string) {
	fmt.Printf("\n%s\n", strings.Repeat("═", 100))
	fmt.Printf("%s\n", center("🌟 DAILY REFLECTIONS - AA 🌟", 100))
	fmt.Printf("%s\n", strings.Repeat("═", 100))

	dateObj, _ := time.Parse("2006-01-02", date)
	formattedDate := dateObj.Format("Monday, January 2, 2006")
	fmt.Printf("%s\n", center(formattedDate, 100))
	fmt.Printf("%s\n", strings.Repeat("═", 100))

	languages := map[string]string{
		"english": "🇺🇸 ENGLISH",
		"spanish": "🇪🇸 ESPAÑOL",
		"french":  "🇫🇷 FRANÇAIS",
		"pt-BR":   "🇧🇷 PORTUGUÊS (BRASIL)",
	}

	languageOrder := []string{"english", "spanish", "french", "pt-BR"}
	for i, langCode := range languageOrder {
		if reflection, exists := reflections[langCode]; exists {
			langDisplay := languages[langCode]
			fmt.Printf("\n%s\n", center(langDisplay, 100))
			fmt.Printf("%s\n", strings.Repeat("─", 100))

			fmt.Printf("📖 %s\n\n", reflection.Title)

			// Quote in a box
			quoteLines := wrapText(reflection.Quote, 90)
			fmt.Printf("┌%s┐\n", strings.Repeat("─", 92))
			for _, line := range quoteLines {
				fmt.Printf("│ %-90s │\n", line)
			}
			fmt.Printf("└%s┘\n\n", strings.Repeat("─", 92))

			// Reflection text
			textLines := wrapText(reflection.Text, 95)
			for _, line := range textLines {
				fmt.Printf("   %s\n", line)
			}

			fmt.Printf("\n📚 %s\n", reflection.Reference)

			if i < len(languageOrder)-1 {
				fmt.Printf("\n%s\n", strings.Repeat("·", 100))
			}
		}
	}

	fmt.Printf("\n%s\n", strings.Repeat("═", 100))
}

func center(text string, width int) string {
	if len(text) >= width {
		return text
	}
	padding := (width - len(text)) / 2
	return strings.Repeat(" ", padding) + text + strings.Repeat(" ", width-padding-len(text))
}

func main() {
	fmt.Println("🌟 AA Daily Reflections Database - Go Examples\n")

	db := NewReflectionsDB("../../data/reflections.db")

	// Example 1: Today's reflection
	fmt.Println("1️⃣  Today's Reflection (English):")
	todayReflection, err := db.GetTodayReflection("english")
	if err != nil {
		log.Printf("Error getting today's reflection: %v", err)
	} else {
		printReflection(todayReflection, true)
	}

	// Example 2: Multilingual comparison
	fmt.Println("\n2️⃣  Multilingual Daily Comparison (January 1st):")
	multilingualReflections, err := db.GetMultilingualReflection("2025-01-01")
	if err != nil {
		log.Printf("Error getting multilingual reflections: %v", err)
	} else {
		printMultilingualReflection(multilingualReflections, "2025-01-01")
	}

	// Example 3: Random reflection in Portuguese
	fmt.Println("\n3️⃣  Random Reflection (Brazilian Portuguese):")
	randomReflection, err := db.GetRandomReflection("pt-BR")
	if err != nil {
		log.Printf("Error getting random reflection: %v", err)
	} else {
		printReflection(randomReflection, true)
	}

	// Example 4: Search in English
	fmt.Println("\n4️⃣  Search Results for 'peace':")
	searchResults, err := db.SearchReflections("peace", "english")
	if err != nil {
		log.Printf("Error searching reflections: %v", err)
	} else {
		fmt.Printf("Found %d reflections containing 'peace':\n", len(searchResults))
		for i, reflection := range searchResults {
			if i >= 2 {
				break
			}
			fmt.Printf("\n   Result %d:\n", i+1)
			printReflection(&reflection, false)
		}
	}

	// Example 5: Search in Portuguese
	fmt.Println("\n5️⃣  Search Results for 'Deus' (Portuguese):")
	searchResultsPt, err := db.SearchReflections("Deus", "pt-BR")
	if err != nil {
		log.Printf("Error searching Portuguese reflections: %v", err)
	} else {
		fmt.Printf("Found %d reflections containing 'Deus':\n", len(searchResultsPt))
		for i, reflection := range searchResultsPt {
			if i >= 1 {
				break
			}
			fmt.Printf("\n   Resultado %d:\n", i+1)
			printReflection(&reflection, false)
		}
	}

	// Example 6: Statistics
	fmt.Println("\n6️⃣  Database Statistics:")
	stats, err := db.GetStatistics()
	if err != nil {
		log.Printf("Error getting statistics: %v", err)
	} else {
		fmt.Printf("┌%s┐\n", strings.Repeat("─", 48))
		fmt.Printf("│ %s │\n", center("📊 DATABASE STATISTICS", 46))
		fmt.Printf("├%s┤\n", strings.Repeat("─", 48))
		fmt.Printf("│ Total Reflections: %28d │\n", stats["total_reflections"])
		fmt.Printf("├%s┤\n", strings.Repeat("─", 48))

		if byLanguage, ok := stats["by_language"].(map[string]int); ok {
			for lang, count := range byLanguage {
				langDisplay := db.languages[lang]
				if langDisplay == "" {
					langDisplay = strings.Title(lang)
				}
				fmt.Printf("│ %15s: %28d │\n", langDisplay, count)
			}
		}
		fmt.Printf("└%s┘\n", strings.Repeat("─", 48))
	}
}
