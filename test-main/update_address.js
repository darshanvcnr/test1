const fs = require('fs');
const path = require('path');

const dir = __dirname;
const exts = ['.js', '.html', '.txt'];
const oldAddress = /1st Floor, MG Rd, Jyothi Nagar,\s*Nelamangala, Bangalore, Karnataka - 562123/g;
const newAddress = '1st Floor, MG Rd, Jyothi Nagar, Nelamangala, Bangalore, Karnataka - 562123';

function updateFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = content.replace(oldAddress, newAddress);
    if (content !== updated) {
        fs.writeFileSync(filePath, updated, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

function walk(dirPath) {
    fs.readdirSync(dirPath).forEach(file => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (exts.includes(path.extname(fullPath))) {
            updateFile(fullPath);
        }
    });
}

walk(dir);