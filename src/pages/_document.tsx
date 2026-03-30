import { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<link rel='preconnect' href='https://www.youtube.com' />
				<link rel='preconnect' href='https://www.googletagmanager.com' />
				<link rel='dns-prefetch' href='https://www.youtube.com' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
