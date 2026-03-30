import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { DefaultSeo } from 'next-seo';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<DefaultSeo
				titleTemplate='%s | Turing Minds'
				defaultTitle='Turing Minds - Premier Global Platform for Computing Luminaries'
				description='Annual speaker series featuring Turing Award winners. Bringing insights from distinguished computer scientists to a global audience.'
				openGraph={{
					type: 'website',
					locale: 'en_US',
					url: 'https://www.turing.rsvp',
					siteName: 'Turing Minds',
					images: [{ url: 'https://www.turing.rsvp/og-banner.png', width: 1686, height: 1121, alt: 'Turing Minds' }],
				}}
				twitter={{
					handle: '@ParsaKhaz',
					site: '@ParsaKhaz',
					cardType: 'summary_large_image',
				}}
				additionalLinkTags={[
					{ rel: 'icon', href: '/favicon.ico' },
				]}
			/>
			<Component {...pageProps} />
			<Analytics />
		</>
	);
}
