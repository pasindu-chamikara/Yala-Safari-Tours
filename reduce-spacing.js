const fs = require('fs');
const path = require('path');

const replacements = [
  { regex: /\bpy-32\b/g, replacement: 'py-16' },
  { regex: /\bpy-24\b/g, replacement: 'py-12' },
  { regex: /\bpy-20\b/g, replacement: 'py-10' },
  { regex: /\bmb-32\b/g, replacement: 'mb-16' },
  { regex: /\bmb-24\b/g, replacement: 'mb-12' },
  { regex: /\bmb-20\b/g, replacement: 'mb-10' },
  { regex: /\bmt-32\b/g, replacement: 'mt-16' },
  { regex: /\bmt-24\b/g, replacement: 'mt-12' },
  { regex: /\bmt-20\b/g, replacement: 'mt-10' },
  { regex: /\bgap-16\b/g, replacement: 'gap-8' },
  { regex: /h-\[70vh\]/g, replacement: 'h-[50vh]' },
  { regex: /h-\[60vh\]/g, replacement: 'h-[40vh]' },
  { regex: /min-h-\[600px\]/g, replacement: 'min-h-[400px]' },
  { regex: /min-h-\[500px\]/g, replacement: 'min-h-[350px]' }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const rule of replacements) {
        content = content.replace(rule.regex, rule.replacement);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(path.join(__dirname, 'src/app/(public)'));
console.log('Spacing reduced.');
