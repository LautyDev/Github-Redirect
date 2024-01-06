<h1 align="center">Github Redirect</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/LautyDev/Github-Redirect?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/LautyDev/Github-Redirect?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/LautyDev/Github-Redirect?color=56BEB8">
</p>

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0;
  <a href="#eyes-demo">Try it</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-setup">Setting it up</a> &#xa0; | &#xa0;
  <a href="https://github.com/LautyDev" target="_blank">Author</a>
</p>

<br>

## :dart: About

This project consists of a web server that redirects requests to a GitHub profile or to specific repositories. When the path is "/", it redirects to the GitHub profile. For other paths, it attempts to access information from a repository through the GitHub API. If the repository exists, it redirects to its URL; otherwise, it displays a custom error page.

## :eyes: Demo

https://gh.lauty.dev/

## :white_check_mark: Requirements

- [Git](https://git-scm.com)
- [Node](https://nodejs.org/en/)
- [PNPM](https://pnpm.io/)

## :checkered_flag: Setup

```bash
# Clone this project
$ git clone https://github.com/LautyDev/Github-Redirect

# Access
$ cd Github-Redirect

# Install dependencies
$ pnpm i

# Run the project
$ pnpm start

# The server will initialize in the <http://localhost:3002>
```

Made with :heart: by <a href="https://github.com/LautyDev" target="_blank">LautyDev</a>

&#xa0;

<a href="#top">Back to top</a>
