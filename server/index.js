import Koa from 'koa';
import Router from 'koa-router';
import { createServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = new Koa();
const router = new Router();

// Store vite dev server instances
const viteServers = new Map();

// Create vite dev server
async function createViteServer(appName) {
  const root = path.resolve(__dirname, `../packages/${appName}`);
  
  try {
    const server = await createServer({
      root,
      server: {
        middlewareMode: true,
      },
      appType: 'spa',
    });
    return server;
  } catch (e) {
    console.error(`Error creating Vite server for ${appName}:`, e);
    throw e;
  }
}

// Get or create vite server dynamically
async function getViteServer(appName) {
  if (!viteServers.has(appName)) {
    const server = await createViteServer(appName);
    viteServers.set(appName, server);
  }
  return viteServers.get(appName);
}

// Route handler middleware
router.get('/:appName(button-app|card-app)(.*)', async (ctx) => {
  const appName = ctx.params.appName;
  
  try {
    const vite = await getViteServer(appName);
    
    // Use vite middleware to handle request
    await vite.middlewares(ctx.req, ctx.res);
    
    // Prevent Koa from handling the response as Vite middleware will do it
    ctx.respond = false;
  } catch (e) {
    console.error(`Error serving ${appName}:`, e);
    ctx.status = 500;
    ctx.body = 'Internal Server Error';
  }
});

// Home page route
router.get('/', async (ctx) => {
  ctx.body = `
    <html>
      <head>
        <title>Module Federation Demo</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #333; }
          .app-list { display: flex; gap: 20px; margin-top: 20px; }
          .app-card { 
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            flex: 1;
          }
          .app-card h2 { margin-top: 0; }
          a { 
            display: inline-block;
            padding: 10px 20px;
            background: #1677ff;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 10px;
          }
          a:hover { background: #4096ff; }
        </style>
      </head>
      <body>
        <h1>Module Federation Demo</h1>
        <div class="app-list">
          <div class="app-card">
            <h2>Button App</h2>
            <p>A customizable button component with various styles and interactions.</p>
            <a href="/button-app/">Visit App</a>
          </div>
          <div class="app-card">
            <h2>Card App</h2>
            <p>A feature-rich card component supporting titles, cover images, and more.</p>
            <a href="/card-app/">Visit App</a>
          </div>
        </div>
      </body>
    </html>
  `;
});

// Use router middleware
app.use(router.routes());
app.use(router.allowedMethods());

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
  console.log('Available apps:');
  console.log(`- Button App: http://localhost:${port}/button-app/`);
  console.log(`- Card App: http://localhost:${port}/card-app/`);
});
