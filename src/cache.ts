import { cacheInterval, GITHUB_USER } from './constants';

export const cachedRepos = new Map<string, string>();

export async function startTimer() {
	await checkRepos();

	setInterval(async () => await checkRepos(), 1000 * 60 * cacheInterval);
}

async function checkRepos() {
	const url = `https://api.github.com/users/${encodeURIComponent(GITHUB_USER)}/repos?per_page=100`;

	const response = await fetch(url).catch(() => null);

	if (!response) return;

	const repositories = (await response.json()) as { name: string }[];

	cachedRepos.clear();
	repositories.forEach((repo) => {
		cachedRepos.set(repo.name.toLowerCase(), repo.name);
	});
}
