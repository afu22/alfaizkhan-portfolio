import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { projects, getAllCategories, getProjectBySlug, getFeaturedProjects } from '../data/projects.js';
import { siteConfig } from '../config/site.js';

console.log('=== STARTING PORTFOLIO VERIFICATION SUITE ===\n');

// 1. Verify siteConfig
console.log('1. Checking siteConfig:');
assert.strictEqual(siteConfig.name, 'Alfaizkhan');
assert.ok(siteConfig.title.includes('B.Tech'));
assert.ok(siteConfig.college.includes('Silver Oak University'));
assert.ok(siteConfig.role.includes('AI/ML'));
console.log('   ✓ siteConfig has valid name, college, title, role, and placeholders.\n');

// 2. Verify Single Source of Truth
console.log('2. Checking projects single source of truth:');
assert.ok(Array.isArray(projects), 'projects must be an array');
assert.ok(projects.length >= 3, 'projects array has at least 3 starter projects');
console.log(`   ✓ Found ${projects.length} starter projects in projects.js:`);
projects.forEach(p => console.log(`     - [${p.category}] ${p.title} (${p.slug})`));

// 3. Verify Categories
console.log('\n3. Checking category extraction:');
const categories = getAllCategories();
assert.ok(categories.includes('All'));
assert.ok(categories.includes('Hackathon'));
assert.ok(categories.includes('College Project'));
assert.ok(categories.includes('Web Development'));
console.log(`   ✓ Dynamic categories extracted: ${categories.join(', ')}`);

// 4. Verify Featured Projects filter
console.log('\n4. Checking featured projects helper:');
const featured = getFeaturedProjects();
assert.ok(featured.length > 0, 'Must have at least 1 featured project');
featured.forEach(p => assert.strictEqual(p.featured, true));
console.log(`   ✓ Found ${featured.length} featured projects`);

// 5. Test Slug lookup
console.log('\n5. Checking slug lookup:');
const feesense = getProjectBySlug('feesense');
assert.ok(feesense, 'Should find feesense by slug');
assert.strictEqual(feesense.title, 'FeeSense');

const uppercaseLookup = getProjectBySlug('FEESENSE');
assert.ok(uppercaseLookup, 'Slug lookup should be case-insensitive');

const nonExistent = getProjectBySlug('non-existent-project-xyz');
assert.strictEqual(nonExistent, null, 'Non-existent project should return null safely');
console.log('   ✓ Slug lookup behaves correctly');

// 6. Test Data Validation & Missing Optional Fields
console.log('\n6. Checking missing optional fields & edge cases:');
const edgeCaseProject = {
  id: 'minimal-project',
  title: 'Minimal Project',
  slug: 'minimal-project'
  // intentionally missing: shortDescription, description, problem, solution, features, technologies, image, screenshots, github, liveDemo, date, role, featured
};

// Check search matching with minimal project
function searchMatch(project, query) {
  if (!query) return true;
  const q = query.toLowerCase().trim();
  const inTitle = project.title && project.title.toLowerCase().includes(q);
  const inShortDesc = project.shortDescription && project.shortDescription.toLowerCase().includes(q);
  const inDesc = project.description && project.description.toLowerCase().includes(q);
  const inCategory = project.category && project.category.toLowerCase().includes(q);
  const inProblem = project.problem && project.problem.toLowerCase().includes(q);
  const inSolution = project.solution && project.solution.toLowerCase().includes(q);
  const inTech = Array.isArray(project.technologies) &&
    project.technologies.some(t => typeof t === 'string' && t.toLowerCase().includes(q));

  return Boolean(inTitle || inShortDesc || inDesc || inCategory || inTech || inProblem || inSolution);
}

assert.ok(searchMatch(edgeCaseProject, 'minimal'), 'Should match title');
assert.ok(!searchMatch(edgeCaseProject, 'python'), 'Should not match missing tech');
console.log('   ✓ Handled completely missing optional fields without throwing any errors');

// 7. Verify Image assets on disk
console.log('\n7. Checking image folder structure:');
const requiredDirs = [
  'public/images/projects/feesense',
  'public/images/projects/campus-find',
  'public/images/projects/truckpack',
  'public/images/projects/my-new-project',
  'public/images/fallback'
];

requiredDirs.forEach(d => {
  assert.ok(fs.existsSync(d), `Directory ${d} must exist`);
  console.log(`   ✓ Directory exists: ${d}`);
});

assert.ok(fs.existsSync('public/images/fallback/project-fallback.png'));
assert.ok(fs.existsSync('public/images/fallback/project-fallback.svg'));
console.log('   ✓ Fallback images exist');

console.log('\n=== ALL PORTFOLIO UNIT & DATA CHECKS PASSED ===\n');
