const fs = require('fs');
const path = require('path');

const copyDataFiles = () => {
  const sourceDir = path.join(__dirname, '..', 'data');
  const destDir = path.join(__dirname, '..', 'public', 'data');
  
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  // List of JSON files to be copied
  const jsonFiles = [
    'daily_reflections_brazilian-portuguese.json',
    'daily_reflections_english.json',
    'daily_reflections_french.json',
    'daily_reflections_spanish.json'
  ];
  
  console.log('Copying data files...');
  
  jsonFiles.forEach(filename => {
    const sourceFile = path.join(sourceDir, filename);
    const destFile = path.join(destDir, filename);
    
    if (fs.existsSync(sourceFile)) {
      fs.copyFileSync(sourceFile, destFile);
      console.log(`✓ ${filename} copied`);
    } else {
      console.warn(`⚠ File not found: ${filename}`);
    }
  });
  
  console.log('Data copy completed!');
};

// Execute if called directly
if (require.main === module) {
  copyDataFiles();
}

module.exports = { copyDataFiles };
