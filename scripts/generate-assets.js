import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPng(width, height, r1, g1, b1, r2, g2, b2) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  function calculateCrc(buf) {
    let table = [];
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) {
        c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      }
      table[n] = c;
    }
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
    }
    return (c ^ 0xffffffff) >>> 0;
  }

  function createChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.concat([typeBuf, data]);
    const crc = calculateCrc(crcBuf);
    const crcOut = Buffer.alloc(4);
    crcOut.writeUInt32BE(crc, 0);
    return Buffer.concat([len, typeBuf, data, crcOut]);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // RGB
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const rowSize = 1 + width * 3;
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter byte
    const tY = y / height;

    for (let x = 0; x < width; x++) {
      const tX = x / width;
      const t = (tX + tY) / 2;

      // Subtle cyber grid lines every 40px
      const isGrid = (x % 40 === 0) || (y % 40 === 0);
      const gridAdd = isGrid ? 25 : 0;

      const r = Math.min(255, Math.floor(r1 + (r2 - r1) * t) + gridAdd);
      const g = Math.min(255, Math.floor(g1 + (g2 - g1) * t) + gridAdd);
      const b = Math.min(255, Math.floor(b1 + (b2 - b1) * t) + gridAdd);

      const px = rowOffset + 1 + x * 3;
      rawData[px] = r;
      rawData[px + 1] = g;
      rawData[px + 2] = b;
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const ihdrChunk = createChunk('IHDR', ihdr);
  const idatChunk = createChunk('IDAT', compressed);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createSvg(title, category, tech, accentColor = '#38bdf8') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0c1222"/>
      <stop offset="50%" stop-color="#111827"/>
      <stop offset="100%" stop-color="#070a12"/>
    </linearGradient>
    <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#6366f1" stop-opacity="0.8"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="800" height="450" fill="url(#bg)"/>
  <rect width="800" height="450" fill="url(#grid)"/>
  <circle cx="700" cy="80" r="180" fill="${accentColor}" opacity="0.08" filter="blur(60px)"/>
  <circle cx="100" cy="380" r="160" fill="#6366f1" opacity="0.06" filter="blur(60px)"/>

  <!-- Window Frame -->
  <rect x="50" y="40" width="700" height="370" rx="14" fill="#0d1424" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <circle cx="78" cy="68" r="6" fill="#ef4444" opacity="0.8"/>
  <circle cx="98" cy="68" r="6" fill="#f59e0b" opacity="0.8"/>
  <circle cx="118" cy="68" r="6" fill="#10b981" opacity="0.8"/>
  <line x1="50" y1="92" x2="750" y2="92" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>

  <!-- Category Tag -->
  <rect x="80" y="125" width="130" height="28" rx="14" fill="rgba(56,189,248,0.12)" stroke="rgba(56,189,248,0.3)" stroke-width="1"/>
  <text x="145" y="143" fill="#38bdf8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" text-anchor="middle" letter-spacing="1">${category.toUpperCase()}</text>

  <!-- Title -->
  <text x="80" y="210" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="38" font-weight="800" letter-spacing="-0.5">${title}</text>

  <!-- Decorative Graphic Lines -->
  <rect x="80" y="235" width="280" height="4" rx="2" fill="url(#glow)"/>
  <text x="80" y="275" fill="#94a3b8" font-family="ui-monospace, 'JetBrains Mono', monospace" font-size="14">~/alfaizkhan/projects/${title.toLowerCase().replace(/\\s+/g, '-')}</text>

  <!-- Tech tags -->
  <g transform="translate(80, 320)">
    <rect x="0" y="0" width="600" height="40" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)"/>
    <text x="16" y="25" fill="#cbd5e1" font-family="ui-monospace, 'JetBrains Mono', monospace" font-size="13">Stack: ${tech}</text>
  </g>
</svg>`;
}

const dirs = [
  'public/images/projects/feesense',
  'public/images/projects/campus-find',
  'public/images/projects/truckpack',
  'public/images/projects/my-new-project',
  'public/images/fallback'
];

dirs.forEach(d => {
  const full = path.resolve(process.cwd(), d);
  if (!fs.existsSync(full)) {
    fs.mkdirSync(full, { recursive: true });
  }
});

// Write fallback images
fs.writeFileSync('public/images/fallback/project-fallback.png', createPng(800, 450, 15, 23, 42, 30, 41, 59));
fs.writeFileSync('public/images/fallback/project-fallback.svg', createSvg('Developer Project', 'PORTFOLIO', 'Code & Architecture', '#38bdf8'));

// FeeSense
fs.writeFileSync('public/images/projects/feesense/thumbnail.png', createPng(800, 450, 16, 24, 40, 6, 78, 120));
fs.writeFileSync('public/images/projects/feesense/screenshot-1.png', createPng(800, 450, 10, 20, 35, 14, 116, 144));
fs.writeFileSync('public/images/projects/feesense/screenshot-2.png', createPng(800, 450, 12, 18, 32, 30, 58, 138));
fs.writeFileSync('public/images/projects/feesense/thumbnail.svg', createSvg('FeeSense', 'Hackathon', 'React · TypeScript · Tailwind · Node · Recharts', '#06b6d4'));

// Campus Find
fs.writeFileSync('public/images/projects/campus-find/thumbnail.png', createPng(800, 450, 18, 20, 38, 79, 70, 229));
fs.writeFileSync('public/images/projects/campus-find/screenshot-1.png', createPng(800, 450, 15, 25, 45, 99, 102, 241));
fs.writeFileSync('public/images/projects/campus-find/screenshot-2.png', createPng(800, 450, 12, 22, 40, 124, 58, 237));
fs.writeFileSync('public/images/projects/campus-find/thumbnail.svg', createSvg('Campus Find', 'College Project', 'React · Node.js · Express · MySQL · JWT', '#818cf8'));

// TruckPack
fs.writeFileSync('public/images/projects/truckpack/thumbnail.png', createPng(800, 450, 15, 28, 35, 16, 185, 129));
fs.writeFileSync('public/images/projects/truckpack/screenshot-1.png', createPng(800, 450, 12, 25, 30, 5, 150, 105));
fs.writeFileSync('public/images/projects/truckpack/screenshot-2.png', createPng(800, 450, 18, 32, 40, 20, 184, 166));
fs.writeFileSync('public/images/projects/truckpack/thumbnail.svg', createSvg('TruckPack', 'Web Development', 'JavaScript · Node.js · Express · MySQL · Leaflet', '#10b981'));

// My New Project (Template)
fs.writeFileSync('public/images/projects/my-new-project/thumbnail.png', createPng(800, 450, 20, 25, 40, 168, 85, 247));
fs.writeFileSync('public/images/projects/my-new-project/screenshot-1.png', createPng(800, 450, 18, 22, 38, 147, 51, 234));
fs.writeFileSync('public/images/projects/my-new-project/thumbnail.svg', createSvg('My New Project', 'Template', 'HTML · CSS · JavaScript', '#c084fc'));

console.log('Project images created successfully!');
