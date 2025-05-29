import { cacheInterval, githubUser } from '.';

// The cached repositories
export const cachedRepos: string[] = [];

// The function to start the timer
export async function startTimer() {
	await checkRepos();

	setInterval(async () => await checkRepos(), 1000 * 60 * cacheInterval);
}

async function checkRepos() {
	const url = `https://api.github.com/users/${githubUser}/repos?per_page=100`;

	// Get public repositories from the GitHub API
	const response = await fetch(url).catch(() => null);

	if (!response) return;

	// Parse the response as a JSON object
	const repositories = (await response.json()) as { name: string }[];

	// Update cache with current repository names
	const repoNames = repositories.map((repo) => repo.name);
	cachedRepos.length = 0; // Clear current cache
	cachedRepos.push(...repoNames); // Add new repositories
}
