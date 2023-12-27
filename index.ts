// External imports
import express, { Request, Response } from "express";
import http from "http";
import cors from "cors";
import axios from "axios";
var colors = require("colors");

// App
const app = express();
const server = http.createServer(app);

// App settings
app.set("port", process.env.PORT || 3002);
app.use(cors());

// Your Github profile
const githubProfile = "https://github.com/LautyDev";

// Routes
app.get("/", async (req: Request, res: Response) => {
  res.redirect(`${githubProfile}`);
});

app.get("*", async (req: Request, res: Response) => {
  try {
    const result = await axios.get(
      `https://api.github.com/repos/LautyDev${req.url}`
    );

    res.redirect(result.data.html_url);
  } catch (error) {
    const ogTitleError = "Repository not found";
    const ogDescriptionError =
      "The requested page does not exist. The repository may have been deleted, or the URL may be incorrect. Be sure to check and try again, keeping in mind that the repository might be in private mode.";
    const ogImageError =
      "https://www.dynamicic.com/wp-content/uploads/2012/12/404-banner.jpg";

    res.set("Content-Type", "text/html");
    res.send(`<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${ogTitleError}">
        <meta name="twitter:description" content="${ogDescriptionError}">
        <meta name="twitter:image" content="${ogImageError}">

        <meta property="og:title" content="${ogTitleError}">
        <meta property="og:description" content="${ogDescriptionError}">
        <meta property="og:image" content="${ogImageError}">
        <meta property="theme-color" content="#dd0026">
        <title>${ogTitleError}</title>
      </head>
      <body style="background-color: black">
        <script>
            window.location.href = '${githubProfile}';
        </script>
      </body>
      </html>`);
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
