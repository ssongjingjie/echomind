import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import compression from 'compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DIST_DIR = join(__dirname, 'dist');

// Enable gzip compression
app.use(compression());

// Cache static assets aggressively
app.use('/assets', express.static(join(DIST_DIR, 'assets'), {
  maxAge: '1y',
  immutable: true,
}));

// Serve other static files
app.use(express.static(DIST_DIR, {
  maxAge: '1h',
}));

// SPA fallback: all routes -> index.html
app.get('*', (req, res) => {
  res.sendFile(join(DIST_DIR, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n  🧠 EchoMind — AI人格成长教练`);
  console.log(`  ────────────────────────────`);
  console.log(`  ➜  Local:   http://localhost:${PORT}`);
  console.log(`  ➜  Domain:  http://workingai.com.cn`);
  console.log(`  ➜  Env:     production\n`);
});