const fs = require('fs');
const path = require('path');

// A simple helper to parse Frontmatter (the stuff between --- in CMS files)
function parseMarkdown(fileContent) {
    const result = {};
    const lines = fileContent.split('\n');
    let isFrontmatter = false;
    
    lines.forEach(line => {
        if (line.trim() === '---') {
            isFrontmatter = !isFrontmatter;
            return;
        }
        if (isFrontmatter) {
            const [key, ...val] = line.split(':');
            if (key && val) result[key.trim()] = val.join(':').trim().replace(/^"(.*)"$/, '$1');
        }
    });
    return result;
}

const collections = ['services', 'portfolio', 'testimonials'];
const contentData = {};

collections.forEach(col => {
    const dirPath = path.join(__dirname, 'content', col);
    contentData[col] = [];

    if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));
        files.forEach(file => {
            const fullPath = path.join(dirPath, file);
            const content = fs.readFileSync(fullPath, 'utf8');
            contentData[col].push(parseMarkdown(content));
        });
    }
});

// Write the final JSON file
fs.writeFileSync(path.join(__dirname, 'content.json'), JSON.stringify(contentData, null, 2));
console.log('✅ content.json has been regenerated!');
