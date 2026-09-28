import assert from 'assert';
import fs from 'fs';
import { projects, getAllCategories, getProjectBySlug, getFeaturedProjects } from '../data/projects.js';

console.log('=== TESTING TEMPORARY PROJECT ADDITION ===\n');

// 1. Confirm test project is present in projects list
const testProj = projects.find(p => p.slug === 'test-portfolio-project');
assert.ok(testProj, 'Test project must appear in projects array');
console.log('✓ 1. Test project card data appears in projects.js');

// 2. Confirm image exists on disk
assert.ok(testProj.image, 'Image field must be defined');
const imgPath = 'public' + testProj.image;
assert.ok(fs.existsSync(imgPath), `Project image must exist at ${imgPath}`);
console.log(`✓ 2. Image appears and exists on disk at: ${imgPath}`);

// 3. Confirm project detail opens via slug
const detail = getProjectBySlug('test-portfolio-project');
assert.ok(detail, 'Project detail must resolve via slug');
assert.strictEqual(detail.title, 'Test Portfolio Project');
assert.strictEqual(detail.role, 'AI/ML Researcher');
console.log('✓ 3. Project detail resolves automatically without manual page creation');

// 4. Confirm search finds it
const searchTerms = ['Test Portfolio', 'Python', 'PyTorch', 'temporary'];
searchTerms.forEach(term => {
  const q = term.toLowerCase();
  const matched = projects.filter(p => {
    const hay = `${p.title} ${p.shortDescription} ${p.description} ${(p.technologies || []).join(' ')} ${p.category}`.toLowerCase();
    return hay.includes(q);
  });
  assert.ok(matched.some(p => p.slug === 'test-portfolio-project'), `Search term "${term}" must find test project`);
  console.log(`✓ 4. Search query "${term}" successfully finds the test project`);
});

// 5. Confirm category filter finds it
const aimlProjects = projects.filter(p => p.category.toLowerCase() === 'ai/ml');
assert.ok(aimlProjects.some(p => p.slug === 'test-portfolio-project'), 'Category filter AI/ML must find test project');
console.log('✓ 5. Category filter "AI/ML" automatically finds the test project');

// 6. Confirm GitHub button works when URL exists
assert.ok(testProj.github && testProj.github.length > 0, 'GitHub URL exists');
assert.strictEqual(testProj.github, 'https://github.com/alfaizkhan/test-portfolio-project');
console.log(`✓ 6. GitHub button URL is present: ${testProj.github}`);

// 7. Confirm Live Demo button works when URL exists
assert.ok(testProj.liveDemo && testProj.liveDemo.length > 0, 'Live Demo URL exists');
assert.strictEqual(testProj.liveDemo, 'https://test-portfolio-demo.example.com');
console.log(`✓ 7. Live Demo button URL is present: ${testProj.liveDemo}`);

// 8. Confirm Featured Projects works
const featured = getFeaturedProjects();
assert.ok(featured.some(p => p.slug === 'test-portfolio-project'), 'Featured projects must include test project');
console.log('✓ 8. Featured projects on homepage automatically includes test project');

console.log('\n=== ALL ADD PROJECT TESTS PASSED WITH 100% SUCCESS ===\n');
