// External imports
import express, { Response } from "express";
import http from "http";
import cors from "cors";
import colors from "colors";
import helmet from "helmet";
import { cachedRepos, startTimer } from "./cache";

// App
const app = express();
const server = http.createServer(app);

// App settings
app.set("port", process.env.PORT || 3002);

// Middlewares
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://github.com"],
      },
    },
  })
);

// Your Github user
export const githubUser = "LautyDev";

// The interval in minutes to check for new repositories
export const cacheInterval = 30;

// Routes
app.get("/", async (_req, res) => {
  res.redirect(`https://github.com/${githubUser}`);
});

app.get("*", async (req, res) => {
  let successful = false;

  for (const repo of cachedRepos) {
    if (req.url.slice(1).toLowerCase() === repo.toLowerCase()) {
      successful = true;

      console.log("redirecting to ", `https://github.com/${githubUser}/${repo}`)
      res.redirect(`https://github.com/${githubUser}/${repo}`)
    }
  }

  if (!successful) {
    sendError(
      res,
      "Repository not found",
      "The requested repository does not exist. The repository may have been deleted, or the URL may be incorrect. Be sure to check and try again, keep in mind that the repository might be in private mode.",
      "https://www.dynamicic.com/wp-content/uploads/2012/12/404-banner.jpg"
    );
  }
});

function sendError(res: Response, title: string, description: string, image: string) {
  res.set("Content-Type", "text/html; charset=utf-8");
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="${title}">
      <meta name="twitter:description" content="${description}">
      <meta name="twitter:image" content="${image}">

      <meta property="og:title" content="${title}">
      <meta property="og:description" content="${description}">
      <meta property="og:image" content="${image}">
      <meta property="theme-color" content="#dd0026">
      <title>${title}</title>
    </head>
    <body style="background-color: black">
      <script>
          window.location.href = 'https://github.com/${githubUser}';
      </script>
    </body>
    </html>
  `);
}

// Start server
server.listen(app.get("port"), async () => {
  await startTimer();

  console.log(
    `${colors.blue("[SERVER]")} Server listening on port ${colors.yellow(
      app.get("port")
    )}`
  );
});
