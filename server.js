import http from 'http';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5173;
const DIST_DIR = path.join(__dirname, 'dist');
const DATA_DIR = path.join(__dirname, 'data');
const CONFIG_DIR = path.join(__dirname, 'config');
const PUBLIC_DIR = path.join(__dirname, 'public');

const PROJECTS_JSON = path.join(DATA_DIR, 'projects.json');
const CONFIG_JSON = path.join(CONFIG_DIR, 'site-config.json');
const PRIVACY_JSON = path.join(CONFIG_DIR, 'privacy.json');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

// Helper: Read JSON file safely
function readJson(file, fallback = null) {
  try {
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, 'utf8'));
    }
  } catch (e) {
    console.error(`Error reading ${file}:`, e);
  }
  return fallback;
}

// Helper: Write JSON file safely
function writeJson(file, data) {
  try {
    const dir = path.dirname(file);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (e) {
    console.error(`Error writing ${file}:`, e);
    return false;
  }
}

// Helper: Sync projects list to data/projects.json, public/data/projects.json, dist/data/projects.json and data/projects.js
function syncProjectsList(list) {
  writeJson(PROJECTS_JSON, list);
  writeJson(path.join(PUBLIC_DIR, 'data', 'projects.json'), list);
  writeJson(path.join(DIST_DIR, 'data', 'projects.json'), list);

  // Sync to data/projects.js ES module source of truth
  try {
    const jsSource = `// ==============================================================================
// SINGLE SOURCE OF TRUTH FOR ALL PROJECTS — ALFAIZKHAN PORTFOLIO
// Auto-synchronized from Admin Suite
// ==============================================================================

export const projects = ${JSON.stringify(list, null, 2)};

export const getAllCategories = () => {
  const predefined = [
    'All',
    'Web Development',
    'College Project',
    'Hackathon',
    'Python',
    'AI/ML',
    'C/C++',
    'Database',
    'Other'
  ];
  const fromData = projects.map(p => p.category).filter(Boolean);
  return Array.from(new Set([...predefined, ...fromData]));
};

export const getProjectBySlug = (slug) => {
  if (!slug) return null;
  const clean = String(slug).trim().toLowerCase();
  return projects.find(p => (p.slug && p.slug.toLowerCase() === clean) || (p.id && p.id.toLowerCase() === clean)) || null;
};

export const getFeaturedProjects = () => {
  return projects.filter(p => Boolean(p.featured));
};

export default projects;
`;
    fs.writeFileSync(path.join(DATA_DIR, 'projects.js'), jsSource, 'utf8');
  } catch (err) {
    console.error('Error syncing projects.js:', err);
  }
}

// Helper: Sync site config to config/site-config.json, dist, and config/site.js
function syncSiteConfig(config) {
  writeJson(CONFIG_JSON, config);
  writeJson(path.join(PUBLIC_DIR, 'config', 'site-config.json'), config);
  writeJson(path.join(DIST_DIR, 'config', 'site-config.json'), config);

  try {
    const jsSource = `// Auto-synchronized site configuration\nexport const siteConfig = ${JSON.stringify(config, null, 2)};\nexport default siteConfig;\n`;
    fs.writeFileSync(path.join(CONFIG_DIR, 'site.js'), jsSource, 'utf8');
  } catch (err) {
    console.error('Error syncing site.js:', err);
  }
}

// Helper: Sync privacy settings
function syncPrivacySettings(privacy) {
  writeJson(PRIVACY_JSON, privacy);
  writeJson(path.join(PUBLIC_DIR, 'config', 'privacy.json'), privacy);
  writeJson(path.join(DIST_DIR, 'config', 'privacy.json'), privacy);
}

// Helper: Read request body
function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 5 * 1024 * 1024) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  // CORS Headers for seamless local admin interaction
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Strip query string and decode URL
  let parsedUrl = req.url.split('?')[0];
  try {
    parsedUrl = decodeURIComponent(parsedUrl);
  } catch (e) {}

  // ==========================================
  // REST API ENDPOINTS FOR ADMIN DYNAMIC DATA
  // ==========================================
  if (parsedUrl.startsWith('/api/')) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // 1. Projects API
    if (parsedUrl === '/api/projects') {
      if (req.method === 'GET') {
        const data = readJson(PROJECTS_JSON);
        if (data) return res.end(JSON.stringify(data));
        return res.end(JSON.stringify([]));
      }

      if (req.method === 'POST') {
        const newProj = await parseRequestBody(req);
        let list = readJson(PROJECTS_JSON, []);
        list = [newProj, ...list.filter(p => (p.id !== newProj.id && p.slug !== newProj.slug))];
        syncProjectsList(list);
        return res.end(JSON.stringify({ success: true, project: newProj }));
      }
    }

    if (parsedUrl.startsWith('/api/projects/')) {
      const id = parsedUrl.replace('/api/projects/', '');
      let list = readJson(PROJECTS_JSON, []);

      if (req.method === 'PUT') {
        const update = await parseRequestBody(req);
        list = list.map(p => (p.id === id || p.slug === id ? { ...p, ...update } : p));
        syncProjectsList(list);
        return res.end(JSON.stringify({ success: true }));
      }

      if (req.method === 'DELETE') {
        list = list.filter(p => p.id !== id && p.slug !== id);
        syncProjectsList(list);
        return res.end(JSON.stringify({ success: true }));
      }
    }

    // 2. Site Config API
    if (parsedUrl === '/api/site-config') {
      if (req.method === 'GET') {
        const data = readJson(CONFIG_JSON, {});
        return res.end(JSON.stringify(data));
      }
      if (req.method === 'POST') {
        const update = await parseRequestBody(req);
        syncSiteConfig(update);
        return res.end(JSON.stringify({ success: true, config: update }));
      }
    }

    // 3. Privacy Settings API
    if (parsedUrl === '/api/privacy') {
      if (req.method === 'GET') {
        const data = readJson(PRIVACY_JSON, {});
        return res.end(JSON.stringify(data));
      }
      if (req.method === 'POST') {
        const update = await parseRequestBody(req);
        syncPrivacySettings(update);
        return res.end(JSON.stringify({ success: true, privacy: update }));
      }
    }

    res.writeHead(404);
    return res.end(JSON.stringify({ error: 'Endpoint not found' }));
  }

  // ==========================================
  // STATIC FILE SERVING & SPA ROUTING
  // ==========================================
  let filePath = path.join(DIST_DIR, parsedUrl);

  // Security check
  if (!filePath.startsWith(DIST_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache'
      });
      fs.createReadStream(filePath).pipe(res);
    } else {
      // For SPA routing (e.g. /projects/feesense or /admin), serve dist/index.html
      const indexPath = path.join(DIST_DIR, 'index.html');
      fs.readFile(indexPath, (readErr, content) => {
        if (readErr) {
          res.writeHead(500);
          res.end('Build not found. Please run npm run build first.');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(content);
      });
    }
  });
});

function getLocalIp() {
  try {
    const nets = os.networkInterfaces();
    for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
        if (net.family === 'IPv4' && !net.internal) {
          return net.address;
        }
      }
    }
  } catch (e) {}
  return null;
}

server.listen(PORT, () => {
  const localIp = getLocalIp();
  console.log(`\n======================================================`);
  console.log(`  ALFAIZKHAN PORTFOLIO & ADMIN SYSTEM IS RUNNING!`);
  console.log(`  Public Website (This PC): http://localhost:${PORT}`);
  if (localIp) {
    console.log(`  Public Website (Network): http://${localIp}:${PORT}`);
  }
  console.log(`  Private Admin Portal:     http://localhost:${PORT}/admin`);
  console.log(`======================================================\n`);
});
