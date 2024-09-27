/* eslint-disable @next/next/next-script-for-ga */
import Head from 'next/head';
import SpeakerCards from '../components/SpeakerCards';
import AdvisorCards from '../components/AdvisorCards';
import speakersData from '../data/speakersData2024.json';
import advisorsData from '../data/advisorsData2024.json';
import React, { useMemo } from 'react';
import ScrollToTop from 'react-scroll-to-top';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { JsonLd } from 'react-schemaorg';
import { WebSite, WithContext, FAQPage } from 'schema-dts';
import { NextSeo } from 'next-seo';
import { BreadcrumbJsonLd } from 'next-seo';
import { FaInfoCircle } from 'react-icons/fa';

// Wrap components that don't need frequent updates in React.memo
const MemoizedSpeakerCards = React.memo(SpeakerCards);
const MemoizedAdvisorCards = React.memo(AdvisorCards);

export default function Home() {
	const rawSpeakersData = speakersData;
	// Function to sort by ISO date
	const sortSpeakersByDate = (a: { isoDate: string }, b: { isoDate: string }) => {
		const dateA = new Date(a.isoDate);
		const dateB = new Date(b.isoDate);
		const now = new Date();

		// Check if either date is in the past
		const isPastA = dateA < now;
		const isPastB = dateB < now;

		// If both dates are either in the past or in the future, sort them normally
		if ((isPastA && isPastB) || (!isPastA && !isPastB)) {
			return dateA.getTime() - dateB.getTime();
		}

		// If one of them is in the past, sort it to appear last
		if (isPastA) return 1;
		if (isPastB) return -1;

		// In case both dates are equal (unlikely, but good to handle)
		return 0;
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
				<title>Turing Minds Speaker Series</title>
				<meta
					name='description'
					content='Join us for the Turing Minds Speaker Series, featuring talks from Turing Award winners on groundbreaking research and the future of technology. Hosted by Parsa Khazaeepoul and Zack Axel.'
				/>
				<meta property='og:title' content='Turing Minds Speaker Series' />
				<meta
					property='og:description'
					content='Join us for the Turing Minds Speaker Series, featuring talks from Turing Award winners on groundbreaking research and the future of technology. Hosted by Parsa Khazaeepoul and Zack Axel.'
				/>
				<meta property='og:image' content='https://turing.rsvp/og-banner.png' />
				<meta property='og:url' content='https://turing.rsvp' />
				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:site' content='@ParsaKhaz' />
				<meta name='twitter:creator' content='@ParsaKhaz' />
			</Head>

			<NextSeo
				title='Turing Minds Speaker Series'
				description='Join us for the Turing Minds Speaker Series, featuring talks from Turing Award winners on groundbreaking research and the future of technology. Hosted by Parsa Khazaeepoul and Zack Axel.'
				canonical='https://turing.rsvp'
				openGraph={{
					url: 'https://turing.rsvp',
					title: 'Turing Minds Speaker Series',
					description: 'Annual event featuring talks from Turing Award winners on computer science and technology. Hosted by Parsa Khazaeepoul and Zack Axel.',
					images: [
						{
							url: 'https://turing.rsvp/og-banner.png',
							width: 1686,
							height: 1121,
							alt: 'Turing Minds Speaker Series',
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

			{/* Sponsor banner moved to the top of the page, outside of other containers */}
			<div className='fixed top-0 left-0 right-0 z-[9999] bg-slate-800 text-white px-2'>
				<p className='text-center text-sm font-sans'>
					<a
						href='https://www.ai2incubator.com/'
						className='italic underline hover:text-[#a4925a] font-medium tracking-wide ibm-plex-mono'
						target='_blank'
						rel='noopener noreferrer'
					>
						Sponsored by AI2 Incubator
					</a>
				</p>
			</div>

			<div className='relative z-10'>
				{/* Updated header with 3D elements */}
				<header className='min-h-screen flex flex-col relative'>
					<div className='fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg md:relative md:bg-transparent md:backdrop-filter-none'>
						<div className='text-center py-4 md:mb-16 md:pt-64'>
							<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className='text-lg py-2 font-light mb-2 text-gray-600'>
								ACM A.M.
							</motion.div>
							<motion.h1
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								className='text-4xl md:text-6xl font-bold mb-2 md:mb-4 relative'
							>
								<span className='relative z-10'>Turing Minds</span>
								<motion.span
									className='absolute inset-0 text-[#a4925a] opacity-50 hidden md:inline-block'
									animate={{ x: [0, 5, 0], y: [0, 5, 0] }}
									transition={{ repeat: Infinity, duration: 5 }}
									style={{ zIndex: -1 }}
								>
									Turing Minds
								</motion.span>
							</motion.h1>
							<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className='text-xl md:text-2xl py-2 md:py-4 font-light text-gray-600'>
								Fall, 2024
							</motion.div>
						</div>
					</div>

					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.7, duration: 0.8 }}
						className='w-full justify-center max-w-4xl mx-auto bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg p-4 md:p-8 md:pl-24 mt-48 md:mt-16 md:static'
					>
						<h2 className='text-2xl md:text-3xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#a4925a] to-[#d4af37]'>About Turing Minds</h2>

						<p className='ibm-plex-mono mb-6 md:mb-8 text-sm md:text-base'>
							Turing Minds is an annual event that brings together the brightest minds in computer science. Named after Alan Turing, the father of computer science, this series
							features talks from Turing Award winners, sharing their groundbreaking research and insights into the future of technology.
						</p>
						{/* Updated navigation buttons */}
						<div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-5'>
							<Link href='#speakerCards' className='outline-[#a4925a] outline px-4 py-2 italic hover:bg-[#a4925a] hover:text-white transition-colors duration-300 text-center'>
								RSVP NOW
							</Link>
							<Link href='#contact' className='outline-[#a4925a] outline px-4 py-2 italic hover:bg-[#a4925a] hover:text-white transition-colors duration-300 text-center'>
								CONTACT US
							</Link>
							<Link href='#faq' className='outline-[#a4925a] outline px-4 py-2 italic hover:bg-[#a4925a] hover:text-white transition-colors duration-300 text-center'>
								FAQ
							</Link>
						</div>
					</motion.div>
				</header>

				{/* Speaker Cards */}
				<section id='speakerCards' className='mx-auto px-8 my-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div className='col-span-full mb-4 flex items-center justify-center text-gray-600 py-2'>
						<FaInfoCircle className='mr-2' />
						<span className='text-sm'>Click on a speaker card to view their detailed biography</span>
					</div>
					{sortedSpeakersData.map((speaker, index) => (
						<MemoizedSpeakerCards key={index} {...speaker} />
					))}
				</section>

				{/* Updated FAQ with simpler design */}
				<section id='faq' className='my-24 px-4'>
					<div className='max-w-4xl mx-auto bg-white rounded-lg p-8'>
						<h2 className='text-3xl font-semibold mb-6 text-[#a4925a]'>Frequently Asked Questions</h2>
						<div className='space-y-6'>
							<div>
								<h3 className='text-xl font-semibold mb-2 text-gray-900'>What is the Turing Award?</h3>
								<p className='ibm-plex-mono text-gray-800'>
									The Turing Award is often referred to as the &quot;Nobel Prize of Computing.&quot; It is an annual award given by the Association for Computing Machinery (ACM) to
									an individual for contributions of lasting and major technical importance to the computer field.
								</p>
							</div>
							<div>
								<h3 className='text-xl font-semibold mb-2 text-gray-900'>How can I attend the speaker series?</h3>
								<p className='ibm-plex-mono text-gray-800'>By RSVPing on our website when we release the event RSVPs.</p>
							</div>
							<div>
								<h3 className='text-xl font-semibold mb-2 text-gray-900'>Are the talks recorded?</h3>
								<p className='ibm-plex-mono text-gray-800'>
									At the speakers discretion, some talks are recorded and will be made available on our website after the event. However, we encourage live attendance for the
									opportunity to participate in Q&A sessions.
								</p>
							</div>
							<div>
								<h3 className='text-xl font-semibold mb-2 text-gray-900'>Is there a cost to attend?</h3>
								<p className='ibm-plex-mono text-gray-800'>The event is free for all.</p>
							</div>
							<div>
								<h3 className='text-xl font-semibold mb-2 text-gray-900'>How can I suggest a speaker for future series?</h3>
								<p className='ibm-plex-mono text-gray-800'>
									We welcome suggestions for future speakers. Please send your recommendations to our hosts whos&apos; emails can be found below.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Program Advisors */}
				<section className='my-24 px-8'>
					<div className='max-w-6xl mx-auto '>
						<h2 className='text-3xl font-semibold mb-6 text-[#a4925a]'>Speaker Series Advisors</h2>
						<p className='ibm-plex-mono mt-4 text-gray-800'> These are the people who helped make this event possible.</p>
						<div className='col-span-full mb-4 flex items-center justify-center text-gray-600 py-2'>
							<FaInfoCircle className='mr-2' />
							<span className='text-sm'>Click on an advisor card to view their detailed biography</span>
						</div>
						<div id='programAdvisors' className='my-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
							{advisorsData.map((advisor, index) => (
								<MemoizedAdvisorCards key={index} {...advisor} />
							))}
						</div>
					</div>
				</section>

				{/* Contact Information Section */}
				<section id='contact' className='my-24 px-8'>
					<div className='max-w-6xl mx-auto'>
						<h2 className='text-3xl font-semibold mb-6 text-[#a4925a]'>Who are we?</h2>
						<div className='mt-4 ibm-plex-mono text-gray-800'>
							<p className='pb-1'>
								We are two Online Master&apos;s in Computer Science students at Georgia Tech. If you have any inquiries or need further information, please don&apos;t hesitate to
								contact us!
							</p>
							<div className='py-2'>
								<p className='italic ibm-plex-mono text-white font-bold bg-slate-800 underline py-2 px-2 w-full'>Connect with our LinkedIn accounts below</p>
							</div>
							<div className='flex flex-col sm:flex-row gap-8'>
								{/* Card for Zack Axel */}
								<div className='bg-white rounded overflow-hidden shadow-lg  w-[15rem] h-[20rem]'>
									<div className='w-full h-64 relative'>
										<Image src='/team-photos/zack.jpg' layout='fill' alt='Zack Axel' className='rounded-t' loading='lazy' sizes='(max-width: 240px) 100vw, 240px' />
									</div>
									<div className='text-center py-1'>
										<a href='https://www.linkedin.com/in/zackaxel/' target='_blank' className='flex text-center justify-center font-bold underline text-lg hover:text-blue-600'>
											Zack Axel <Image src='/linkedin.svg' className='pl-1' width={20} height={20} alt='LinkedIn' />
										</a>
										<p className='text-lg mb-2 hover:text-blue-600'>
											<a href='mailto:zaxel3@gatech.edu' className='text-sm  mb-2 hover:text-blue-600'>
												zaxel3@gatech.edu
											</a>
										</p>
									</div>
								</div>

								{/* Card for Parsa Khazaeepoul */}
								<div className='bg-white rounded overflow-hidden shadow-lg w-[15rem] h-[20rem]'>
									<div className='w-full h-64 relative'>
										<Image src='/team-photos/parsa.jpg' layout='fill' alt='Parsa Khazaeepoul' className='rounded-t' loading='lazy' sizes='(max-width: 240px) 100vw, 240px' />
									</div>
									<div className='text-center py-1'>
										<a href='https://www.linkedin.com/in/parsas/' target='_blank' className='flex text-center justify-center font-bold underline text-lg hover:text-blue-600'>
											Parsa Khazaeepoul <Image src='/linkedin.svg' className='pl-1' width={20} height={20} alt='LinkedIn' />
										</a>
										<p className='text-lg mb-2 hover:text-blue-600'>
											<a href='mailto:pkhazaeepoul3@gatech.edu' className='text-sm mb-2 hover:text-blue-600'>
												pkhazaeepoul3@gatech.edu
											</a>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Footer */}
				<footer className='my-12 text-center text-sm px-16'>
					<p className='ibm-plex-mono'>© 2024 Turing Award Speaker Series. All rights reserved.</p>
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
