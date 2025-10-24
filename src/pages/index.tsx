/* eslint-disable @next/next/next-script-for-ga */
import Head from 'next/head';
import SpeakerCards from '../components/SpeakerCards';
import AdvisorCards from '../components/AdvisorCards';
import speakersData2024 from '../data/speakersData2024.json';
import speakersData2025 from '../data/speakersData2025.json';
import speakersData2023 from '../data/speakersData.json';
import advisorsData from '../data/advisorsData2024.json';
import React, { useMemo, useState } from 'react';
import ScrollToTop from 'react-scroll-to-top';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { JsonLd } from 'react-schemaorg';
import { WebSite, WithContext, FAQPage } from 'schema-dts';
import { NextSeo } from 'next-seo';
import { BreadcrumbJsonLd } from 'next-seo';
import { FaInfoCircle } from 'react-icons/fa';
import Script from 'next/script';
import InfiniteSpeakerScroll from '../components/InfiniteSpeakerScroll';

// Wrap components that don't need frequent updates in React.memo
const MemoizedSpeakerCards = React.memo(SpeakerCards);
const MemoizedAdvisorCards = React.memo(AdvisorCards);

export default function Home() {
	const [selectedYear, setSelectedYear] = useState<'all' | 2023 | 2024>('all');
	
	// Combine speakers from multiple years and add year info
	const combinedSpeakersData = [
		...speakersData2025.map(speaker => ({ ...speaker, year: 2025 })),
		...speakersData2024.map(speaker => ({ ...speaker, year: 2024 })),
		...speakersData2023.map(speaker => ({ ...speaker, year: 2023 }))
	];

	const totalSpeakersCount = 20; // Override to show correct total
	const speakersCountByYear: Record<number, number> = {
		2025: speakersData2025.length,
		2024: 8, // Override to show correct count
		2023: speakersData2023.length,
	};

	const totalTuringWinnersCount = combinedSpeakersData.filter((s: { turingAwardWinner?: boolean }) => s.turingAwardWinner).length;
	
	// Filter speakers based on selected year (2025 always included in 'all')
	const filteredSpeakersData = selectedYear === 'all' 
		? combinedSpeakersData 
		: combinedSpeakersData.filter(speaker => speaker.year === selectedYear || speaker.year === 2025);
	
	const rawSpeakersData = filteredSpeakersData;
	// Function to sort by ISO date (newest first, with upcoming events prioritized)
	const sortSpeakersByDate = (a: { isoDate: string }, b: { isoDate: string }) => {
		const dateA = new Date(a.isoDate);
		const dateB = new Date(b.isoDate);
		const now = new Date();

		// Subtract 1.5 hours from the current time to get the threshold
		const threshold = new Date(now.getTime() - 1.5 * 60 * 60 * 1000);

		// Check if either date is in the past (more than 1.5 hours ago)
		const isPastA = dateA < threshold;
		const isPastB = dateB < threshold;

		// If one is past and the other isn't, sort the past one to the bottom
		if (isPastA && !isPastB) return 1;
		if (!isPastA && isPastB) return -1;

		// If both are past or both are not past, sort reverse chronologically (newest first)
		return dateB.getTime() - dateA.getTime();
	};

	const sortedSpeakersData = useMemo(() => {
		return rawSpeakersData.sort(sortSpeakersByDate);
	}, [rawSpeakersData]);

	const scrollToSection = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView();
		}
	};

	const structuredData: WithContext<WebSite> = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'Turing Minds Speaker Series',
		description: 'Annual event featuring talks from Turing Award winners on computer science and technology.',
		url: 'https://turing.rsvp',
	};

	const faqStructuredData: WithContext<FAQPage> = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: 'What is the Turing Award?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'The Turing Award is often referred to as the "Nobel Prize of Computing." It is an annual award given by the Association for Computing Machinery (ACM) to an individual for contributions of lasting and major technical importance to the computer field.',
				},
			},
			{
				'@type': 'Question',
				name: 'How can I attend the speaker series?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Attendance is available through our online RSVP system. Event registration links are published on this website in advance of each talk. We recommend monitoring our platform regularly or following our updates to ensure you don\'t miss registration opportunities for upcoming speakers.',
				},
			},
			{
				'@type': 'Question',
				name: 'Are the talks recorded?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Recording availability is determined at each speaker\'s discretion. When permitted, recordings are published on our website following the event. We strongly encourage live attendance to take full advantage of interactive Q&A sessions and the opportunity to engage directly with our distinguished speakers.',
				},
			},
			{
				'@type': 'Question',
				name: 'Is there a cost to attend?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'All Turing Minds events are free and open to the public. Our mission is to make these exceptional learning opportunities accessible to everyone interested in computer science and technology.',
				},
			},
			{
				'@type': 'Question',
				name: 'How can I suggest a speaker for future series?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'We welcome suggestions for future speakers and value input from our community. Please send your recommendations to TuringMindsOfficial@gmail.com. We review all suggestions and appreciate your engagement in helping us continue to bring exceptional speakers to our platform.',
				},
			},
		],
	};

	return (
		<div className='relative'>
			<Head>
				<title>Turing Minds - Premier Global Platform for Computing Luminaries</title>
				<meta
					name='description'
					content='Annual speaker series featuring Turing Award winners. Sponsored by AI2 Incubator and organized in partnership with Georgia Tech, bringing insights from distinguished computer scientists to a global audience.'
				/>
				<meta property='og:title' content='Turing Minds - Premier Global Platform for Computing Luminaries' />
				<meta
					property='og:description'
					content='Annual speaker series featuring Turing Award winners. Sponsored by AI2 Incubator and organized in partnership with Georgia Tech, bringing insights from distinguished computer scientists to a global audience.'
				/>
				<meta property='og:image' content='https://turing.rsvp/og-banner.png' />
				<meta property='og:url' content='https://turing.rsvp' />
				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:site' content='@ParsaKhaz' />
				<meta name='twitter:creator' content='@ParsaKhaz' />

				{/* Google Tag Manager */}
				<script
					dangerouslySetInnerHTML={{
						__html: `
						(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
						new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
						j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
						'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
						})(window,document,'script','dataLayer','GTM-WJ9G6M53');
						`,
					}}
				/>
				{/* End Google Tag Manager */}
			</Head>
			
			{/* Google Analytics 4 */}
			<Script async src='https://www.googletagmanager.com/gtag/js?id=G-Y1G13WPJKZ'></Script>
			<Script
				id='google-analytics'
				dangerouslySetInnerHTML={{
					__html: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-Y1G13WPJKZ');
						`,
				}}
			/>
			{/* End Google Analytics 4 */}

			<NextSeo
				title='Turing Minds - Premier Global Platform for Computing Luminaries'
				description='Annual speaker series featuring Turing Award winners. Sponsored by AI2 Incubator and organized in partnership with Georgia Tech, bringing insights from distinguished computer scientists to a global audience.'
				canonical='https://turing.rsvp'
				openGraph={{
					url: 'https://turing.rsvp',
					title: 'Turing Minds - Premier Global Platform for Computing Luminaries',
					description: 'Annual speaker series featuring Turing Award winners. Sponsored by AI2 Incubator and organized in partnership with Georgia Tech, bringing insights from distinguished computer scientists to a global audience.',
					images: [
						{
							url: 'https://turing.rsvp/og-banner.png',
							width: 1686,
							height: 1121,
							alt: 'Turing Minds - Premier Global Platform for Computing Luminaries',
						},
					],
					site_name: 'Turing Minds',
				}}
				twitter={{
					handle: '@ParsaKhaz',
					site: '@ParsaKhaz',
					cardType: 'summary_large_image',
				}}
			/>

			{/* Google Tag Manager (noscript) */}
			<noscript>
				<iframe src='https://www.googletagmanager.com/ns.html?id=GTM-WJ9G6M53' height='0' width='0' className='hidden'></iframe>
			</noscript>
			{/* End Google Tag Manager (noscript) */}

			{/* Credibility Header */}
			<div className='fixed top-0 left-0 right-0 z-[9999] bg-slate-50/95 backdrop-blur-md border-b border-slate-200/60 px-3 md:px-6 py-3 shadow-sm'>
				<div className='max-w-7xl mx-auto'>
					{/* Desktop Layout */}
					<div className='hidden md:flex items-center justify-between text-[11px] tracking-wide font-medium text-slate-600'>
						<div className='flex items-center space-x-6'>
							<a 
								href='https://www.atlantajewishtimes.com/ga-tech-students-lead-speaker-series/'
								target='_blank'
								rel='noopener noreferrer'
								className='flex items-center space-x-1 hover:text-slate-900 transition-colors'
							>
								<span className='text-amber-600'>●</span>
								<span>Featured in Atlantic Jewish Times</span>
							</a>
							<a 
								href='https://www.cc.gatech.edu/news/online-series-offers-unique-opportunity-hear-turing-award-winners'
								target='_blank'
								rel='noopener noreferrer'
								className='flex items-center space-x-1 hover:text-slate-900 transition-colors'
							>
								<span className='text-blue-600'>●</span>
								<span>Georgia Tech Computing News</span>
							</a>
						</div>
						<div className='flex items-center space-x-2 text-slate-700'>
							<span>Sponsored by</span>
							<a
								href='https://www.ai2incubator.com/'
								className='font-semibold text-slate-900 hover:text-blue-700 transition-colors duration-200'
								target='_blank'
								rel='noopener noreferrer'
							>
								AI2 Incubator
							</a>
						</div>
					</div>
					{/* Mobile Layout */}
					<div className='md:hidden text-center text-[10px] tracking-wide font-medium text-slate-600'>
						<div className='flex items-center justify-center space-x-3'>
							<a 
								href='https://www.cc.gatech.edu/news/online-series-offers-unique-opportunity-hear-turing-award-winners'
								target='_blank'
								rel='noopener noreferrer'
								className='hover:text-slate-900 transition-colors'
							>
								GT Computing
							</a>
							<span className='text-slate-400'>•</span>
							<a 
								href='https://www.atlantajewishtimes.com/ga-tech-students-lead-speaker-series/'
								target='_blank'
								rel='noopener noreferrer'
								className='hover:text-slate-900 transition-colors'
							>
								Atlantic Jewish Times
							</a>
							<span className='text-slate-400'>•</span>
							<a
								href='https://www.ai2incubator.com/'
								className='font-semibold text-slate-900'
								target='_blank'
								rel='noopener noreferrer'
							>
								AI2 Incubator
							</a>
						</div>
					</div>
				</div>
			</div>

			<div className='relative z-10'>
				{/* Updated header with 3D elements */}
				<header className='min-h-screen flex flex-col relative'>
					<div className='fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl md:relative md:bg-transparent md:backdrop-filter-none mt-12'>
						<div className='text-center py-8 md:mb-20 md:pt-72'>
							<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className='text-sm font-medium tracking-[0.2em] uppercase mb-6 text-slate-500'>
								ACM Turing Award Series
							</motion.div>
							<motion.h1
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								className='text-5xl md:text-7xl font-light mb-4 md:mb-6 relative tracking-tight'
							>
								<span className='relative z-10 text-slate-900'>Turing</span>{' '}
								<span className='relative z-10 text-slate-700 font-extralight'>Minds</span>
							</motion.h1>
							<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className='text-sm md:text-base py-2 font-medium text-slate-600 mb-4 tracking-wide'>
								<span className='inline-flex items-center space-x-2'>
									<span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold'>{totalSpeakersCount} Speakers</span>
									<span className='bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold'>{totalTuringWinnersCount} Turing Winners</span>
								</span>
							</motion.div>
							<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className='text-lg md:text-xl py-3 md:py-4 font-light text-slate-500 tracking-wide'>
								Latest Series
							</motion.div>
						</div>
					</div>

					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.7, duration: 0.8 }}
						className='w-full justify-center max-w-5xl mx-auto bg-white/80 backdrop-blur-2xl rounded-2xl p-8 md:p-12 mt-48 md:mt-20 md:static shadow-xl border border-slate-200/50'
					>
						<h2 className='text-3xl md:text-4xl font-light mb-8 text-slate-900 tracking-tight'>About Turing Minds</h2>

						<p className='text-slate-700 mb-6 text-base md:text-lg leading-relaxed font-light max-w-4xl'>
							Turing Minds is the premier global platform for computing luminaries, having forged strategic relationships with 13 Turing Award winners and several Nobel laureates. Initially started in their garage as students at Georgia Tech, co-founders Zachary Axel and Parsa Khazaeepoul launched Turing Minds, ultimately developing, guiding, and executing the overarching product strategy.
						</p>
						<p className='text-slate-700 mb-6 text-base md:text-lg leading-relaxed font-light max-w-4xl'>
							Under their charismatic and technically gifted leadership, the co-founders crafted and fine tuned go-to-market strategy and scale up plan that expanded laureate participation from 5 to 13 Turing Award winners between pilot year and penultimate years, respectively. They also pioneered and defined new paradigms, and approaches in partnership strategy and the art and science of creative deal making, taking influence from the likes of strategic partnerships guru Dan&apos;l Lewin of Apple and NeXT. Key achievements under their leadership include:
						</p>
						<ul className='text-slate-700 mb-10 text-base md:text-lg leading-relaxed font-light max-w-4xl list-disc list-inside space-y-2'>
							<li>Spearheaded a strategic partnership with Computer History Museum, and reporting directly to the former CEO.</li>
							<li>Secured institutional buy in from Georgia Tech senior leadership incl. Emeritus Dean(creator of OMSCS), Director of CoC Communications, department chairs of Physics, MechE, and CS, and PR and marketing teams, effectively aligning institutional strategy and program expansion to 15,000+ students in 105 countries.</li>
							<li>Developed a pioneering sponsorship strategy and secured prestigious AI2 Incubator sponsorship, ultimately securing resources and buy-in from AI2 CFO.</li>
							<li>And recruited a genius senior Deep Learning/LLM engineer on an H-1B visa located near company HQ, strengthening the founding technical team and accelerating development capacity.</li>
						</ul>
						{/* Updated navigation buttons */}
						<div className='flex flex-col sm:flex-row gap-4 md:gap-6'>
							<Link href='#speakerCards' className='bg-slate-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-slate-800 transition-all duration-200 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'>
								View Speakers
							</Link>
							<Link href='#contact' className='border-2 border-slate-200 text-slate-700 px-8 py-3 rounded-lg font-medium hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 text-center'>
								Contact Us
							</Link>
							<Link href='#faq' className='border-2 border-slate-200 text-slate-700 px-8 py-3 rounded-lg font-medium hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 text-center'>
								FAQ
							</Link>
							<Link href='/share' className='border-2 border-slate-200 text-slate-700 px-8 py-3 rounded-lg font-medium hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 text-center'>Share</Link>
						</div>
					</motion.div>
				</header>

				<section className="max-w-full overflow-hidden my-20">
					<div className="max-w-6xl mx-auto px-8 mb-12">
						<h2 className="text-4xl font-light mb-4 text-slate-900 text-center tracking-tight">Distinguished Speakers</h2>
						<p className="text-slate-600 text-center text-lg font-light max-w-2xl mx-auto mb-8">
							Meet the Turing Award winners who have shaped the future of computing
						</p>
						
						{/* Year Filter */}
						<div className="flex justify-center mb-8">
							<div className="bg-slate-100 rounded-lg p-1 flex gap-1">
								<button
									onClick={() => setSelectedYear('all')}
									className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
										selectedYear === 'all'
											? 'bg-white text-slate-900 shadow-sm'
											: 'text-slate-600 hover:text-slate-900'
									}`}
								>
									All Years ({totalSpeakersCount})
								</button>
								<button
									onClick={() => setSelectedYear(2024)}
									className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
										selectedYear === 2024
											? 'bg-white text-slate-900 shadow-sm'
											: 'text-slate-600 hover:text-slate-900'
									}`}
								>
									2024 ({speakersCountByYear[2024]})
								</button>
								<button
									onClick={() => setSelectedYear(2023)}
									className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
										selectedYear === 2023
											? 'bg-white text-slate-900 shadow-sm'
											: 'text-slate-600 hover:text-slate-900'
									}`}
								>
									2023 ({speakersCountByYear[2023]})
								</button>
							</div>
						</div>
					</div>
					<InfiniteSpeakerScroll 
						speakers={sortedSpeakersData}
					/>
				</section>

				{/* Speaker Cards */}
				<section id='speakerCards' className='mx-auto px-6 md:px-8 my-20 max-w-7xl'>
					<div className='col-span-full mb-8 flex items-center justify-center text-slate-500 py-4 bg-slate-50 rounded-lg'>
						<FaInfoCircle className='mr-3 text-blue-500' />
						<span className='text-sm font-medium'>Click on any speaker card to view their detailed biography and achievements</span>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						{sortedSpeakersData.map((speaker, index) => (
							<MemoizedSpeakerCards key={index} {...speaker} />
						))}
					</div>
				</section>


				{/* FAQ Section */}
				<section id='faq' className='my-32 px-6 md:px-8'>
					<div className='max-w-4xl mx-auto'>
						<div className='text-center mb-16'>
							<h2 className='text-4xl font-light mb-4 text-slate-900 tracking-tight'>Frequently Asked Questions</h2>
							<p className='text-slate-600 text-lg font-light'>Everything you need to know about the Turing Minds speaker series</p>
						</div>
						<div className='space-y-8'>
							<div className='bg-white rounded-xl p-8 shadow-lg border border-slate-100'>
								<h3 className='text-xl font-medium mb-4 text-slate-900'>What is the Turing Award?</h3>
								<p className='text-slate-700 leading-relaxed font-light'>
									The Turing Award is often referred to as the &quot;Nobel Prize of Computing.&quot; It is an annual award given by the Association for Computing Machinery (ACM) to
									an individual for contributions of lasting and major technical importance to the computer field.
								</p>
							</div>
							<div className='bg-white rounded-xl p-8 shadow-lg border border-slate-100'>
								<h3 className='text-xl font-medium mb-4 text-slate-900'>How can I attend the speaker series?</h3>
								<p className='text-slate-700 leading-relaxed font-light'>Attendance is available through our online RSVP system. Event registration links are published on this website in advance of each talk. We recommend monitoring our platform regularly or following our updates to ensure you don&apos;t miss registration opportunities for upcoming speakers.</p>
							</div>
							<div className='bg-white rounded-xl p-8 shadow-lg border border-slate-100'>
								<h3 className='text-xl font-medium mb-4 text-slate-900'>Are the talks recorded?</h3>
								<p className='text-slate-700 leading-relaxed font-light'>
									Recording availability is determined at each speaker&apos;s discretion. When permitted, recordings are published on our website following the event. We strongly encourage live attendance to take full advantage of interactive Q&A sessions and the opportunity to engage directly with our distinguished speakers.
								</p>
							</div>
							<div className='bg-white rounded-xl p-8 shadow-lg border border-slate-100'>
								<h3 className='text-xl font-medium mb-4 text-slate-900'>Is there a cost to attend?</h3>
								<p className='text-slate-700 leading-relaxed font-light'>All Turing Minds events are free and open to the public. Our mission is to make these exceptional learning opportunities accessible to everyone interested in computer science and technology.</p>
							</div>
							<div className='bg-white rounded-xl p-8 shadow-lg border border-slate-100'>
								<h3 className='text-xl font-medium mb-4 text-slate-900'>How can I suggest a speaker for future series?</h3>
								<p className='text-slate-700 leading-relaxed font-light'>
									We welcome suggestions for future speakers and value input from our community. Please send your recommendations to TuringMindsOfficial@gmail.com. We review all suggestions and appreciate your engagement in helping us continue to bring exceptional speakers to our platform.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Program Advisors */}
				<section className='my-32 px-6 md:px-8'>
					<div className='max-w-6xl mx-auto'>
						<div className='text-center mb-16'>
							<h2 className='text-4xl font-light mb-4 text-slate-900 tracking-tight'>Series Advisors</h2>
							<p className='text-slate-600 text-lg font-light max-w-2xl mx-auto'>
								The distinguished educators and leaders who helped make this initiative possible
							</p>
						</div>
						<div className='mb-8 flex items-center justify-center text-slate-500 py-4 bg-slate-50 rounded-lg'>
							<FaInfoCircle className='mr-3 text-blue-500' />
							<span className='text-sm font-medium'>Click on any advisor card to view their detailed biography and achievements</span>
						</div>
						<div id='programAdvisors' className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							{advisorsData.map((advisor, index) => (
								<MemoizedAdvisorCards key={index} {...advisor} />
							))}
						</div>
					</div>
				</section>

				{/* Contact Information Section */}
				<section className='my-32 px-6 md:px-8'>
					<div className='max-w-6xl mx-auto'>
						<div className='text-center mb-16'>
							<h2 className='text-4xl font-light mb-4 text-slate-900 tracking-tight'>Leadership</h2>
							<p className='text-slate-600 text-lg font-light max-w-3xl mx-auto leading-relaxed'>
								Turing Minds was founded by Parsa Khazaeepoul and Zack Axel, who have organized talks with multiple Turing Award winners and other leading computer scientists. Through dedicated outreach, they have created a platform connecting audiences with influential figures in computing.
							</p>
						</div>
						
						<div className='bg-slate-50 rounded-2xl p-8 mb-12'>
							<p className='text-slate-700 text-center font-medium mb-2'>Ready to connect?</p>
							<p className='text-slate-600 text-center text-sm'>For inquiries about partnerships, speaking opportunities, or collaboration, reach out below.</p>
						</div>

						<div className='flex flex-col lg:flex-row gap-8 justify-center items-center'>
							{/* Card for Zack Axel */}
							<div className='bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-100 w-80 hover:shadow-2xl transition-shadow duration-300'>
								<div className='w-full h-72 relative'>
									<Image src='/team-photos/zack.jpg' layout='fill' alt='Zack Axel' className='object-cover' loading='lazy' sizes='320px' />
								</div>
								<div id='contact' className='text-center p-6'>
									<a href='https://www.linkedin.com/in/zackaxel/' target='_blank' className='flex items-center justify-center font-semibold text-xl text-slate-900 hover:text-blue-600 transition-colors mb-1'>
										Zack Axel <Image src='/linkedin.svg' className='ml-2' width={24} height={24} alt='LinkedIn' />
									</a>
									<p className='text-slate-500 text-sm font-medium'>Co-Founder</p>
								</div>
							</div>

							{/* Card for Parsa Khazaeepoul */}
							<div className='bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-100 w-80 hover:shadow-2xl transition-shadow duration-300'>
								<div className='w-full h-72 relative'>
									<Image src='/team-photos/parsa.jpg' layout='fill' alt='Parsa Khazaeepoul' className='object-cover' loading='lazy' sizes='320px' />
								</div>
								<div className='text-center p-6'>
									<a href='https://www.linkedin.com/in/parsas/' target='_blank' className='flex items-center justify-center font-semibold text-xl text-slate-900 hover:text-blue-600 transition-colors mb-1'>
										Parsa Khazaeepoul <Image src='/linkedin.svg' className='ml-2' width={24} height={24} alt='LinkedIn' />
									</a>
									<p className='text-slate-500 text-sm font-medium'>Co-Founder</p>
								</div>
							</div>
						</div>

						{/* Shared Contact Email */}
						<div className='mt-12 text-center'>
							<div className='bg-white rounded-xl p-8 shadow-lg border border-slate-100 max-w-md mx-auto'>
								<h3 className='text-lg font-medium mb-3 text-slate-900'>Contact the Team</h3>
								<a href='mailto:TuringMindsOfficial@gmail.com' className='text-blue-600 hover:text-blue-700 transition-colors font-medium text-lg'>
									TuringMindsOfficial@gmail.com
								</a>
							</div>
						</div>
					</div>
				</section>

				{/* Footer */}
				<footer className='mt-32 mb-16 text-center px-6'>
					<div className='max-w-4xl mx-auto'>
						<div className='h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-8'></div>
						<p className='text-slate-500 font-light tracking-wide'>© 2025 Turing Minds. All rights reserved.</p>
					</div>
				</footer>
			</div>
			<ScrollToTop />
			<JsonLd<WebSite> item={structuredData} />
			<JsonLd<FAQPage> item={faqStructuredData} />
			<BreadcrumbJsonLd
				itemListElements={[
					{
						position: 1,
						name: 'Home',
						item: 'https://turing.rsvp',
					},
				]}
			/>
		</div>
	);
}
