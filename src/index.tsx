import { cors } from '@elysiajs/cors';
import { Html, html } from '@elysiajs/html';
import { Elysia } from 'elysia';
import { cachedRepos, startTimer } from './cache';
import { ErrorPage } from './components/ErrorPage';
import { GITHUB_USER } from './constants';

const app = new Elysia()
	.use(cors())
	.use(html())
	.get('/', () => {
		return new Response(undefined, {
			status: 302,
			headers: {
				Location: `https://github.com/${encodeURIComponent(GITHUB_USER)}`
			}
		});
	})
	.get('*', ({ request }) => {
		const path = new URL(request.url).pathname.slice(1).toLowerCase();
		const repo = cachedRepos.get(path);

		if (repo) {
			return new Response(undefined, {
				status: 302,
				headers: {
					Location: `https://github.com/${encodeURIComponent(GITHUB_USER)}/${encodeURIComponent(repo)}`
				}
			});
		} else {
			return (
				<ErrorPage
					title='Repository not found'
					description='The requested repository does not exist. The repository may have been deleted, or the URL may be incorrect. Be sure to check and try again, keep in mind that the repository might be in private mode.'
					image='https://www.dynamicic.com/wp-content/uploads/2012/12/404-banner.jpg'
				/>
			);
		}
	})
	.listen(process.env['PORT'] || 5000);

console.log(`Server is running at ${app.server?.hostname}:${app.server?.port}`);

// Start the cache timer
await startTimer();
