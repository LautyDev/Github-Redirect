import axios from "axios";
import { cacheInterval, githubUser } from ".";

export const cachedRepos: string[] = [];

export async function startTimer() {
    await checkRepos();

    setInterval(async () => {
        await checkRepos();
    }, 1000 * 60 * cacheInterval);
}

async function checkRepos() {
    const url = `https://api.github.com/users/${githubUser}/repos?per_page=100`;

    // Get public repositories from the GitHub API
    const response = await axios.get(url);

    // Remove unexistent repositories from the cache
    response.data.filter((repo: { name: string }) => {
        !cachedRepos.includes(repo.name)
    }).forEach((repo: { name: any; }) => {
        delete cachedRepos[cachedRepos.indexOf(repo.name)];
    });

    // Push new repositories to the cache
    response.data.forEach((repo: { name: string }) => {
        if (!cachedRepos.includes(repo.name)) {
            cachedRepos.push(repo.name);
        }
    });
}