import { cors } from '@elysiajs/cors';
import { Html, html } from '@elysiajs/html';
import { Elysia } from 'elysia';
import { cachedRepos, startTimer } from './cache';
import { ErrorPage } from './components/ErrorPage';

// Your Github user
export const githubUser = 'LautyDev';

// The interval in minutes to check for new repositories
export const cacheInterval = 30;

const app = new Elysia()
	.use(cors())
	.use(html())
	.get('/', () => {
		return new Response(undefined, {
			status: 302,
			headers: {
				Location: `https://github.com/${githubUser}`
			}
		});
	})
	.get('*', ({ request }) => {
		const path = new URL(request.url).pathname.slice(1).toLowerCase();
		let successful = false;

		for (const repo of cachedRepos) {
			if (path === repo.toLowerCase()) {
				successful = true;

				return new Response(undefined, {
					status: 302,
					headers: {
						Location: `https://github.com/${githubUser}/${repo}`
					}
				});
			}
		}

		if (!successful) {
			const title = 'Repository not found';
			const description =
				'The requested repository does not exist. The repository may have been deleted, or the URL may be incorrect. Be sure to check and try again, keep in mind that the repository might be in private mode.';
			const image = 'https://www.dynamicic.com/wp-content/uploads/2012/12/404-banner.jpg';

			return <ErrorPage title={title} description={description} image={image} githubUser={githubUser} />;
		}
	})
	.listen(process.env['PORT'] || 3002);

console.log(`Server is running at ${app.server?.hostname}:${app.server?.port}`);

// Start the cache timer
await startTimer();
