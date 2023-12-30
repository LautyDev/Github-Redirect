// External imports
import express from "express";
import http from "http";
import cors from "cors";
import axios from "axios";
import colors from "colors";
import helmet from "helmet";

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
const githubUser = "LautyDev";

// Routes
app.get("/", async (_req, res) => {
  res.redirect(`https://github.com/${githubUser}`);
});

app.get("*", async (req, res) => {
  try {
    const result = await axios.get(
      `https://api.github.com/repos/${githubUser}${req.url}`
    );

    const validUrlRegex = /^https:\/\/github\.com\/[\w-]+\/[\w-]+$/;
    const htmlUrl = result.data.html_url;

    if (validUrlRegex.test(htmlUrl)) res.redirect(htmlUrl);
    else console.log("The fetched URL is invalid.");
  } catch (error: any) {
    function sendError(title: string, description: string, image: string) {
      res.set("Content-Type", "text/html; charset=utf-8");
      res.send(`<!DOCTYPE html>
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
        </html>`);
    }

    if (error.response.status === 403) {
      sendError(
        "Too Many Requests",
        "The temporary limit of allowed requests has been reached. Please wait before taking further action.",
        "https://http.cat/429.jpg"
      );
    } else {
      sendError(
        "Repository not found",
        "The requested page does not exist. The repository may have been deleted, or the URL may be incorrect. Be sure to check and try again, keeping in mind that the repository might be in private mode.",
        "https://www.dynamicic.com/wp-content/uploads/2012/12/404-banner.jpg"
      );
    }
  }
});

// Start server
server.listen(app.get("port"), (): void => {
  console.log(
    `${colors.blue("[SERVER]")} Server listening on port ${colors.yellow(
      app.get("port")
    )}`
  );
});
