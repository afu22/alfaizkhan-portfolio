const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..', '..');
const portfolioDir = path.resolve(__dirname, '..');
const distDir = path.join(portfolioDir, 'dist');

console.log('Root Directory:     ', rootDir);
console.log('Portfolio Directory:', portfolioDir);
console.log('Dist Directory:     ', distDir);

// 1. Create DIST Zip (Ready for instant drag-and-drop on Netlify / Cloudflare / Vercel / GitHub Pages)
const distZip = path.join(rootDir, 'Alfaizkhan-Portfolio-DIST-ReadyToDeploy.zip');
if (fs.existsSync(distZip)) fs.unlinkSync(distZip);

console.log('\n[1/2] Creating DIST zip archive...');
execSync(`tar.exe -a -c -f "${distZip}" *`, { cwd: distDir, stdio: 'inherit' });
console.log('✓ Created:', distZip);
console.log('  Size:', (fs.statSync(distZip).size / 1024).toFixed(2), 'KB');

// 2. Create Full Project Source Code Zip (Complete codebase excluding node_modules and .git)
const fullZip = path.join(rootDir, 'Alfaizkhan-Portfolio-Complete-Source.zip');
if (fs.existsSync(fullZip)) fs.unlinkSync(fullZip);

console.log('\n[2/2] Creating Full Project Source Code zip archive (excluding node_modules)...');
// Using tar with exclude
execSync(`tar.exe -a -c -f "${fullZip}" --exclude="node_modules" --exclude=".git" --exclude="*.zip" *`, {
  cwd: portfolioDir,
  stdio: 'inherit'
});
console.log('✓ Created:', fullZip);
console.log('  Size:', (fs.statSync(fullZip).size / (1024 * 1024)).toFixed(2), 'MB');

console.log('\n======================================================');
console.log('  BOTH ZIP FILES CREATED SUCCESSFULLY IN:');
console.log('  ' + rootDir);
console.log('======================================================\n');
