import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to allow iframe embedding
  app.use((req, res, next) => {
    // Remove X-Frame-Options header to allow embedding
    res.removeHeader("X-Frame-Options");
    
    // Set Content-Security-Policy to allow framing from anywhere
    // Note: frame-ancestors * allows embedding on any site
    res.setHeader("Content-Security-Policy", "frame-ancestors *");
    
    // Allow CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    
    next();
  });

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files from dist folder in production
    app.use(express.static(path.resolve(__dirname, "dist"), {
      setHeaders: (res) => {
        res.removeHeader("X-Frame-Options");
        res.setHeader("Content-Security-Policy", "frame-ancestors *");
        res.setHeader("Access-Control-Allow-Origin", "*");
      }
    }));

    // SPA fallback for any other routes
    app.get("*", (req, res) => {
      res.removeHeader("X-Frame-Options");
      res.setHeader("Content-Security-Policy", "frame-ancestors *");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
