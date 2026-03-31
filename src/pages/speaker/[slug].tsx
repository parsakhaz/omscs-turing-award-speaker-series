import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Image from 'next/legacy/image';
import speakersData2023 from '../../data/speakersData.json';
import speakersData2024 from '../../data/speakersData2024.json';
import speakersData2025 from '../../data/speakersData2025.json';
import speakersData2026 from '../../data/speakersData2026.json';
import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { NextSeo, BreadcrumbJsonLd } from 'next-seo';
import { JsonLd } from 'react-schemaorg';
import { Event, Person, WithContext } from 'schema-dts';
import { FaShare, FaChevronLeft } from 'react-icons/fa';
import SidebarGallery from '../../components/SidebarGallery';
import advisorsData2024 from '../../data/advisorsData2024.json';
import Script from 'next/script';

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = [...speakersData2026, ...speakersData2025, ...speakersData2024, ...speakersData2023].map((speaker) => ({
		params: { slug: speaker.slug },
	}));

	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const allSpeakers = [...speakersData2026, ...speakersData2025, ...speakersData2024, ...speakersData2023];
	const speaker = allSpeakers.find((s) => s.slug === params?.slug);
	return { props: { speaker } };
};

const SpeakerPage = ({ speaker }: { speaker: any }) => {
	const [daysUntil, setDaysUntil] = React.useState<number | null>(null);
	const [countdown, setCountdown] = React.useState('');
	const [showJoinNow, setShowJoinNow] = React.useState(false);
	const [showWatchNow, setShowWatchNow] = React.useState(false);
	const [showRSVP, setShowRSVP] = React.useState(true);
	const [showTalkConcluded, setShowTalkConcluded] = React.useState(false);

	React.useEffect(() => {
		const updateCountdown = () => {
			const now = new Date();
			const talkDate = new Date(speaker.isoDate);
			const linkReleaseDate = new Date(talkDate.getTime() - 24 * 60 * 60 * 1000); // 1 day before talk
			const timeDiff = talkDate.getTime() - now.getTime();

			const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
			const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

			if (timeDiff > 0) {
				setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
			} else {
				setCountdown('');
			}

			const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
			setDaysUntil(daysDiff);

			const hoursDiff = timeDiff / (1000 * 60 * 60);

			const hasRecording = speaker.recordingLink && speaker.recordingLink.length > 0;
			setShowJoinNow(Math.abs(hoursDiff) <= 1 && !hasRecording);
			setShowWatchNow(hoursDiff < -1 && hasRecording);
			setShowRSVP(hoursDiff > 1);
			setShowTalkConcluded(hoursDiff < -1 && !hasRecording);
		};

		updateCountdown();
		const intervalId = setInterval(updateCountdown, 1000);

		return () => clearInterval(intervalId);
	}, [speaker.isoDate]);

	const allSpeakers = [...speakersData2026, ...speakersData2025, ...speakersData2024, ...speakersData2023];
	const otherSpeakers = allSpeakers.filter((s) => s.slug !== speaker.slug);

	const personStructuredData: WithContext<Person> = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: speaker.name,
		description: speaker.description,
		image: speaker.speakerPhoto,
		url: `https://www.turing.rsvp/speaker/${speaker.slug}`,
	};

	const eventStructuredData: WithContext<Event> = {
		'@context': 'https://schema.org',
		'@type': 'Event',
		name: `${speaker.name} - Turing Speaker Series`,
		description: speaker.description,
		image: speaker.speakerPhoto,
		startDate: speaker.isoDate,
		endDate: speaker.isoDate,
		location: {
			'@type': 'Place',
			name: 'Online Event',
			url: speaker.rsvpLink,
		},
		performer: {
			'@type': 'Person',
			name: speaker.name,
			image: speaker.speakerPhoto,
			// ... other fields ...
		},
		organizer: {
			'@type': 'Organization',
			name: 'Turing',
			url: 'https://www.turing.rsvp',
		},
	};

	return (
		<div className='flex justify-center'>
			<NextSeo
				title={`${speaker.name} | Biography, Career & Awards - Turing Minds`}
				description={speaker.description}
				openGraph={{
					title: `${speaker.name} | Biography, Career & Awards - Turing Minds`,
					description: speaker.description,
					images: [{ url: speaker.speakerPhoto, alt: speaker.name }],
					type: 'website',
					url: `https://www.turing.rsvp/speaker/${speaker.slug}`,
				}}
				twitter={{
					cardType: 'summary_large_image',
				}}
			/>
			<BreadcrumbJsonLd
				itemListElements={[
					{
						position: 1,
						name: 'Home',
						item: 'https://www.turing.rsvp',
					},
					{
						position: 2,
						name: speaker.name,
						item: `https://www.turing.rsvp/speaker/${speaker.slug}`,
					},
				]}
			/>
			<JsonLd<WithContext<Person>> item={personStructuredData} />
			<JsonLd<WithContext<Event>> item={eventStructuredData} />
			<Head>
				<link rel='canonical' href={`https://www.turing.rsvp/speaker/${speaker.slug}`} />
			</Head>
			{/* Google Analytics 4 */}
			<Script src="https://www.googletagmanager.com/gtag/js?id=G-Y1G13WPJKZ" strategy="afterInteractive" />
			<Script id="google-analytics" strategy="afterInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', 'G-Y1G13WPJKZ');
				`}
			</Script>
			{/* End Google Analytics 4 */}
			<div className='container mx-auto px-4 py-8 relative z-10'>
				<article className='max-w-4xl mx-auto'>
					<div className='bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg p-4 md:p-8 shadow-lg'>
						<div className='flex justify-between items-center mb-4 md:mb-6'>
							<div className='flex items-center'>
								<Link href='/' className='text-[#013057] hover:text-[#a4925a] transition-colors duration-300 mr-4'>
									<FaChevronLeft size={24} />
								</Link>
								<h1 className='text-3xl md:text-4xl font-bold text-[#013057]'>{speaker.name}</h1>
							</div>
							<Link href='/share' className='text-[#013057] hover:text-[#a4925a] transition-colors duration-300 flex flex-col items-center'>
								<FaShare size={24} />
								<span className='text-[8px] uppercase mt-1 text-black font-bold tracking-widest'>SHARE</span>
							</Link>
						</div>
						<div className='mb-6 md:mb-8 relative w-32 h-32 md:w-48 md:h-48 mx-auto'>
							<Image src={speaker.speakerPhoto} layout='fill' objectFit='cover' alt={`Portrait of ${speaker.name}`} className='rounded-full' />
						</div>
						<p className='mb-3 md:mb-4 text-lg md:text-xl font-semibold text-gray-700'>{speaker.dateTime}</p>
						<p className='mb-4 md:mb-6 text-sm md:text-base text-gray-800'>{speaker.description}</p>
						{speaker.turingAwardWinner && (
							<p className='mb-4'>
								<a
									href={speaker.turingLink}
									className='text-[#013057] underline hover:text-[#a4925a] transition-colors duration-300 text-sm md:text-base'
									target='_blank'
									rel='noopener noreferrer'
								>
									Turing Award Recipient
								</a>
							</p>
						)}
						{daysUntil !== null && (
							<div className='mt-6 p-6 rounded-lg bg-gray-100 shadow-md'>
								<div className='text-center mb-3'>
									{showJoinNow && (
										<a
											href='https://linktr.ee/omscs'
											className='bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors duration-300 font-bold text-center inline-block'
											target='_blank'
											rel='noopener noreferrer'
										>
											Click to Join Speaker Session
										</a>
									)}
									{showWatchNow && (
										<a
											href={speaker.recordingLink}
											className='bg-[#013057] text-white px-6 py-3 rounded text-lg font-bold hover:bg-[#a4925a] transition-colors duration-300 inline-block mx-auto'
											target='_blank'
											rel='noopener noreferrer'
										>
											Watch Recording
										</a>
									)}
								</div>
								<p className='text-gray-700 font-semibold mb-3 text-center'>
									{showJoinNow && 'Join the speaker session now!'}
									{showWatchNow && 'Watch the recording of the talk.'}
									{showRSVP && 'RSVP for the upcoming talk.'}
									{showTalkConcluded && 'This talk has concluded. A recording may be available soon.'}
								</p>
								<div className='text-center'>
									{showRSVP && (
										<a
											href={speaker.rsvpLink}
											className='bg-[#013057] text-white px-6 py-3 rounded text-l font-bold hover:bg-[#a4925a] transition-colors duration-300 inline-block mx-auto'
											target='_blank'
											rel='noopener noreferrer'
										>
											RSVP Now
										</a>
									)}
								</div>
								{!showJoinNow && !showWatchNow && !showTalkConcluded && (
									<div className='text-center'>
										<p className='text-gray-600 italic mb-2 mt-2'>The link to the speaker session will be available 1 hour before the event.</p>
										{countdown && <p className='text-gray-800 font-bold text-lg'>Time until link release: {countdown}</p>}
									</div>
								)}
							</div>
						)}

						{/* Question of the Day */}
						{speaker.questionOfTheDay && (
							<section className='mt-8 md:mt-12 p-6 rounded-lg bg-gradient-to-br from-[#013057]/5 to-[#a4925a]/10 border border-[#a4925a]/20'>
								<h2 className='text-xl md:text-2xl font-bold mb-3 text-[#013057]'>Question of the Day</h2>
								<p className='text-base md:text-lg text-gray-800 font-medium italic'>&ldquo;{speaker.questionOfTheDay}&rdquo;</p>
								{speaker.questionAnswer && (
									<div className='mt-4 pt-4 border-t border-[#a4925a]/20'>
										<p className='text-sm md:text-base text-gray-700'><span className='font-semibold text-[#013057]'>Insight:</span> {speaker.questionAnswer}</p>
									</div>
								)}
							</section>
						)}

						{/* Talk Highlights */}
						{speaker.talkSummary && (
							<section className='mt-8 md:mt-12'>
								<h2 className='text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-[#013057]'>Talk Highlights{speaker.talkTitle ? `: ${speaker.talkTitle}` : ''}</h2>

								{/* YouTube Embed */}
								{speaker.recordingLink && speaker.recordingLink.includes('youtu') && (
									<div className='relative w-full mb-6' style={{ paddingBottom: '56.25%' }}>
										<iframe
											className='absolute top-0 left-0 w-full h-full rounded-lg'
											src={`https://www.youtube.com/embed/${speaker.recordingLink.match(/(?:youtu\.be\/|v=)([^&?#]+)/)?.[1] || ''}`}
											title={`${speaker.name} - ${speaker.talkTitle || 'Turing Minds Talk'}`}
											allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
											allowFullScreen
										/>
									</div>
								)}

								<p className='font-sora text-sm md:text-base text-gray-800 mb-6'>{speaker.talkSummary}</p>

								{/* Key Takeaways */}
								{speaker.talkTakeaways && speaker.talkTakeaways.length > 0 && (
									<div className='mb-6'>
										<h3 className='text-xl font-bold mb-3 text-gray-700'>Key Takeaways</h3>
										<ul className='space-y-2'>
											{speaker.talkTakeaways.map((takeaway: string, i: number) => (
												<li key={i} className='font-sora text-sm md:text-base text-gray-800 pl-4 border-l-2 border-[#a4925a]'>
													{takeaway}
												</li>
											))}
										</ul>
									</div>
								)}

								{/* Notable Quotes */}
								{speaker.talkQuotes && speaker.talkQuotes.length > 0 && (
									<div>
										<h3 className='text-xl font-bold mb-3 text-gray-700'>Notable Quotes</h3>
										<div className='space-y-4'>
											{speaker.talkQuotes.map((quote: string, i: number) => (
												<blockquote key={i} className='font-sora text-sm md:text-base text-gray-700 italic pl-4 border-l-4 border-[#a4925a] bg-gray-50 py-3 pr-4 rounded-r'>
													&ldquo;{quote}&rdquo;
													<footer className='text-xs mt-1 text-gray-500 not-italic'>-- {speaker.name}, Turing Minds Speaker Series</footer>
												</blockquote>
											))}
										</div>
									</div>
								)}
							</section>
						)}

						{/* Render markdown biography - progressive disclosure, still crawlable */}
						{speaker.markdownBiography && (
							<details className='mt-6 md:mt-8 group' open>
								<summary className='text-2xl md:text-3xl font-bold mb-2 md:mb-3 text-[#013057] cursor-pointer list-none'>
									Biography <span className='text-base text-gray-400 group-open:hidden'>+</span><span className='text-base text-gray-400 hidden group-open:inline'>&minus;</span>
								</summary>
								<ReactMarkdown remarkPlugins={[remarkGfm]} className='prose prose-sm md:prose-base prose-blue max-w-none text-gray-800 prose-headings:mt-4 prose-headings:mb-2 prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5'>
									{speaker.markdownBiography}
								</ReactMarkdown>
							</details>
						)}

						{/* Render markdown timeline - progressive disclosure, still crawlable */}
						{speaker.markdownTimeline && (
							<details className='mt-6 md:mt-8 group' open>
								<summary className='text-2xl md:text-3xl font-bold mb-2 md:mb-3 text-[#013057] cursor-pointer list-none'>
									Career Timeline <span className='text-base text-gray-400 group-open:hidden'>+</span><span className='text-base text-gray-400 hidden group-open:inline'>&minus;</span>
								</summary>
								<ReactMarkdown remarkPlugins={[remarkGfm]} className='prose prose-sm md:prose-base prose-blue max-w-none text-gray-800 prose-headings:mt-4 prose-headings:mb-2 prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5'>
									{speaker.markdownTimeline}
								</ReactMarkdown>
							</details>
						)}

						<p className='text-xs text-gray-400 mt-6'>
							Content produced by Turing Minds. <Link href='/press' className='underline hover:text-gray-600 transition-colors'>Usage guidelines</Link>.
						</p>

						{/* Other Speakers - Internal Linking */}
						<section className='mt-12 md:mt-16 border-t border-gray-200 pt-8'>
							<h2 className='text-2xl md:text-3xl font-bold mb-6 text-[#013057]'>Other Turing Minds Speakers</h2>
							<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
								{otherSpeakers.map((s) => (
									<Link key={s.slug} href={`/speaker/${s.slug}`} className='flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors'>
										<div className='relative w-16 h-16 md:w-20 md:h-20 mb-2'>
											<Image src={s.speakerPhoto} layout='fill' objectFit='cover' alt={s.name} className='rounded-full' />
										</div>
										<span className='text-sm font-medium text-gray-800 text-center'>{s.name}</span>
									</Link>
								))}
							</div>
						</section>
					</div>
				</article>
				<SidebarGallery currentSpeaker={speaker.name} speakers={[...speakersData2024, ...speakersData2025]} advisors={advisorsData2024} />
			</div>
		</div>
	);
};

export default SpeakerPage;
