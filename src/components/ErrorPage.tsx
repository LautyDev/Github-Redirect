import { Html } from '@elysiajs/html';

// Typed props for the ErrorPage component
interface ErrorPageProps {
	title: string;
	description: string;
	image: string;
	githubUser: string;
}

export function ErrorPage({ title, description, image, githubUser }: ErrorPageProps) {
	return (
		<html lang='en'>
			<head>
				<meta charset='UTF-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:title' content={title} />
				<meta name='twitter:description' content={description} />
				<meta name='twitter:image' content={image} />

				<meta property='og:title' content={title} />
				<meta property='og:description' content={description} />
				<meta property='og:image' content={image} />
				<meta property='theme-color' content='#dd0026' />
				<title>{title}</title>
			</head>
			<body style='background-color: black'>
				<script>{`window.location.href = 'https://github.com/${githubUser}';`}</script>
			</body>
		</html>
	);
}
