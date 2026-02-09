/**
 * Build content.json from Decap CMS Markdown files.
 * Run: npm run build:content (or node scripts/build-content.js)
 * Output: content.json at project root for the site to fetch.
 */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const ROOT = path.join(__dirname, '..');

function readCollection(dir) {
  const fullPath = path.join(ROOT, dir);
  if (!fs.existsSync(fullPath)) return [];
  const files = fs.readdirSync(fullPath).filter((f) => f.endsWith('.md'));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(fullPath, file), 'utf8');
      const { data } = matter(raw);
      return data;
    })
    .filter((d) => d && typeof d === 'object');
}

const services = readCollection('content/services');
const portfolio = readCollection('content/portfolio');
const testimonials = readCollection('content/testimonials');

const content = { services, portfolio, testimonials };
const outPath = path.join(ROOT, 'content.json');
fs.writeFileSync(outPath, JSON.stringify(content, null, 2), 'utf8');
console.log('Built content.json:', { services: services.length, portfolio: portfolio.length, testimonials: testimonials.length });
