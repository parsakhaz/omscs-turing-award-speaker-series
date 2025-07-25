/* eslint-disable @next/next/next-script-for-ga */
import Head from 'next/head';
import SpeakerCards from '../components/SpeakerCards';
import AdvisorCards from '../components/AdvisorCards';
import speakersData2024 from '../data/speakersData2024.json';
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
	
	// Combine speakers from both years and add year info
	const combinedSpeakersData = [
		...speakersData2024.map(speaker => ({ ...speaker, year: 2024 })),
		...speakersData2023.map(speaker => ({ ...speaker, year: 2023 }))
	];
	
	// Filter speakers based on selected year
	const filteredSpeakersData = selectedYear === 'all' 
		? combinedSpeakersData 
		: combinedSpeakersData.filter(speaker => speaker.year === selectedYear);
	
	const rawSpeakersData = filteredSpeakersData;
	// Function to sort by ISO date
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

		// If both are past or both are not past, sort chronologically
		return dateA.getTime() - dateB.getTime();
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
					text: 'By RSVPing on our website when we release the event RSVPs.',
				},
			},
			{
				'@type': 'Question',
				name: 'Are the talks recorded?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'At the speakers discretion, some talks are recorded and will be made available on our website after the event. However, we encourage live attendance for the opportunity to participate in Q&A sessions.',
				},
			},
			{
				'@type': 'Question',
				name: 'Is there a cost to attend?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'The event is free for all.',
				},
			},
			{
				'@type': 'Question',
				name: 'How can I suggest a speaker for future series?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: "We welcome suggestions for future speakers. Please send your recommendations to our hosts whos' emails can be found below.",
				},
			},
		],
	};

	return (
		<div className='relative'>
			<Head>
				<title>Turing Minds - Premier Platform for Computing Luminaries</title>
				<meta
					name='description'
					content='Annual speaker series featuring Turing Award winners. Sponsored by AI2 Incubator and organized in partnership with Georgia Tech, bringing insights from distinguished computer scientists to a global audience.'
				/>
				<meta property='og:title' content='Turing Minds - Premier Platform for Computing Luminaries' />
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
				title='Turing Minds - Premier Platform for Computing Luminaries'
				description='Annual speaker series featuring Turing Award winners. Sponsored by AI2 Incubator and organized in partnership with Georgia Tech, bringing insights from distinguished computer scientists to a global audience.'
				canonical='https://turing.rsvp'
				openGraph={{
					url: 'https://turing.rsvp',
					title: 'Turing Minds - Premier Platform for Computing Luminaries',
					description: 'Annual speaker series featuring Turing Award winners. Sponsored by AI2 Incubator and organized in partnership with Georgia Tech, bringing insights from distinguished computer scientists to a global audience.',
					images: [
						{
							url: 'https://turing.rsvp/og-banner.png',
							width: 1686,
							height: 1121,
							alt: 'Turing Minds - Premier Platform for Computing Luminaries',
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


			<div className='relative z-10'>
				{/* Updated header with 3D elements */}
				<header className='min-h-screen flex flex-col relative'>
					<div className='w-full max-w-6xl mx-auto px-6 py-16 md:py-24'>
						<div className='text-center mb-12'>
							{/* Main Title */}
							<motion.h1
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6 }}
								className='text-6xl md:text-8xl font-light mb-6 relative tracking-tight'
							>
								<span className='text-slate-900'>Turing</span>{' '}
								<span className='text-slate-700 font-extralight'>Minds</span>
							</motion.h1>

							{/* Value Proposition */}
							<motion.p 
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2, duration: 0.6 }}
								className='text-xl md:text-2xl text-slate-600 font-light mb-8 max-w-3xl mx-auto leading-relaxed'
							>
								Premier Speaker Series Featuring Turing Award Winners
							</motion.p>

							{/* Key Stats - Much More Prominent */}
							<motion.div 
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3, duration: 0.6 }}
								className='flex flex-wrap justify-center gap-6 mb-12'
							>
								<div className='bg-blue-50 border border-blue-200 px-6 py-3 rounded-full'>
									<span className='text-blue-900 font-semibold text-lg'>19 Distinguished Speakers</span>
								</div>
								<div className='bg-amber-50 border border-amber-200 px-6 py-3 rounded-full'>
									<span className='text-amber-900 font-semibold text-lg'>11 Turing Award Winners</span>
								</div>
								<div className='bg-slate-50 border border-slate-200 px-6 py-3 rounded-full'>
									<span className='text-slate-700 font-semibold text-lg'>2023-2024</span>
								</div>
							</motion.div>

							{/* Prominent Credibility Cards */}
							<motion.div 
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4, duration: 0.6 }}
								className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-5xl mx-auto'
							>
								<a 
									href='https://www.atlantajewishtimes.com/ga-tech-students-lead-speaker-series/'
									target='_blank'
									rel='noopener noreferrer'
									className='bg-white rounded-xl border border-slate-200 p-6 text-center hover:shadow-lg transition-all duration-200 hover:-translate-y-1'
								>
									<div className='text-amber-600 text-2xl mb-2'>📰</div>
									<div className='text-slate-900 font-semibold text-base mb-1'>Atlantic Jewish Times</div>
									<div className='text-slate-600 text-sm'>65,000+ readers across Southeast</div>
								</a>

								<a 
									href='https://www.cc.gatech.edu/news/online-series-offers-unique-opportunity-hear-turing-award-winners'
									target='_blank'
									rel='noopener noreferrer'
									className='bg-white rounded-xl border border-slate-200 p-6 text-center hover:shadow-lg transition-all duration-200 hover:-translate-y-1'
								>
									<div className='text-blue-600 text-2xl mb-2'>🏫</div>
									<div className='text-slate-900 font-semibold text-base mb-1'>Georgia Tech Computing</div>
									<div className='text-slate-600 text-sm'>#5 ranked CS program</div>
								</a>

								<a 
									href='https://www.ai2incubator.com/'
									target='_blank'
									rel='noopener noreferrer'
									className='bg-white rounded-xl border border-slate-200 p-6 text-center hover:shadow-lg transition-all duration-200 hover:-translate-y-1'
								>
									<div className='text-green-600 text-2xl mb-2'>🚀</div>
									<div className='text-slate-900 font-semibold text-base mb-1'>AI2 Incubator</div>
									<div className='text-slate-600 text-sm'>$200M+ investment portfolio</div>
								</a>
							</motion.div>

							{/* Prominent CTAs */}
							<motion.div 
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.5, duration: 0.6 }}
								className='flex flex-col sm:flex-row gap-4 justify-center'
							>
								<Link 
									href='#speakerCards' 
									className='bg-slate-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
								>
									View All Speakers
								</Link>
								<Link 
									href='#faq' 
									className='border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-slate-400 hover:bg-slate-50 transition-all duration-200'
								>
									Learn More
								</Link>
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

						<p className='text-slate-700 mb-10 text-base md:text-lg leading-relaxed font-light max-w-4xl'>
							Turing Minds is an annual speaker series that has successfully connected global audiences with 19 distinguished computer scientists across 2023 and 2024. We bring together Turing Award winners—the Nobel laureates of computing—to share insights on groundbreaking research and the future of technology. With 11 Turing Award recipients among our speakers, along with other luminaries including a Nobel Prize winner, we&apos;ve created an unparalleled educational platform. Sponsored by AI2 Incubator and with support from leading academic institutions, Turing Minds continues to grow as a premier forum for computing excellence.
						</p>
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
									All Years (19)
								</button>
								<button
									onClick={() => setSelectedYear(2024)}
									className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
										selectedYear === 2024
											? 'bg-white text-slate-900 shadow-sm'
											: 'text-slate-600 hover:text-slate-900'
									}`}
								>
									2024 (8)
								</button>
								<button
									onClick={() => setSelectedYear(2023)}
									className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
										selectedYear === 2023
											? 'bg-white text-slate-900 shadow-sm'
											: 'text-slate-600 hover:text-slate-900'
									}`}
								>
									2023 (11)
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
								<p className='text-slate-700 leading-relaxed font-light'>By RSVPing on our website when we release the event RSVPs.</p>
							</div>
							<div className='bg-white rounded-xl p-8 shadow-lg border border-slate-100'>
								<h3 className='text-xl font-medium mb-4 text-slate-900'>Are the talks recorded?</h3>
								<p className='text-slate-700 leading-relaxed font-light'>
									At the speakers discretion, some talks are recorded and will be made available on our website after the event. However, we encourage live attendance for the
									opportunity to participate in Q&A sessions.
								</p>
							</div>
							<div className='bg-white rounded-xl p-8 shadow-lg border border-slate-100'>
								<h3 className='text-xl font-medium mb-4 text-slate-900'>Is there a cost to attend?</h3>
								<p className='text-slate-700 leading-relaxed font-light'>The event is free for all.</p>
							</div>
							<div className='bg-white rounded-xl p-8 shadow-lg border border-slate-100'>
								<h3 className='text-xl font-medium mb-4 text-slate-900'>How can I suggest a speaker for future series?</h3>
								<p className='text-slate-700 leading-relaxed font-light'>
									We welcome suggestions for future speakers. Please send your recommendations to our hosts whose emails can be found below.
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
							<h2 className='text-4xl font-light mb-4 text-slate-900 tracking-tight'>Our Founders</h2>
							<p className='text-slate-600 text-lg font-light max-w-3xl mx-auto leading-relaxed'>
								Turing Minds was co-founded by Parsa Khazaeepoul and Zack Axel, both Georgia Tech OMSCS students. Through dedicated outreach and community building, they have successfully organized talks with multiple Turing Award winners, creating a valuable educational platform for the computing community.
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
									<a href='https://www.linkedin.com/in/zackaxel/' target='_blank' className='flex items-center justify-center font-semibold text-xl text-slate-900 hover:text-blue-600 transition-colors mb-3'>
										Zack Axel <Image src='/linkedin.svg' className='ml-2' width={24} height={24} alt='LinkedIn' />
									</a>
									<a href='mailto:zaxel3@gatech.edu' className='text-slate-600 hover:text-blue-600 transition-colors font-medium'>
										zaxel3@gatech.edu
									</a>
								</div>
							</div>

							{/* Card for Parsa Khazaeepoul */}
							<div className='bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-100 w-80 hover:shadow-2xl transition-shadow duration-300'>
								<div className='w-full h-72 relative'>
									<Image src='/team-photos/parsa.jpg' layout='fill' alt='Parsa Khazaeepoul' className='object-cover' loading='lazy' sizes='320px' />
								</div>
								<div className='text-center p-6'>
									<a href='https://www.linkedin.com/in/parsas/' target='_blank' className='flex items-center justify-center font-semibold text-xl text-slate-900 hover:text-blue-600 transition-colors mb-3'>
										Parsa Khazaeepoul <Image src='/linkedin.svg' className='ml-2' width={24} height={24} alt='LinkedIn' />
									</a>
									<a href='mailto:pkhazaeepoul3@gatech.edu' className='text-slate-600 hover:text-blue-600 transition-colors font-medium'>
										pkhazaeepoul3@gatech.edu
									</a>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Footer */}
				<footer className='mt-32 mb-16 text-center px-6'>
					<div className='max-w-4xl mx-auto'>
						<div className='h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-8'></div>
						<p className='text-slate-500 font-light tracking-wide'>© 2024 Turing Minds. All rights reserved.</p>
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
