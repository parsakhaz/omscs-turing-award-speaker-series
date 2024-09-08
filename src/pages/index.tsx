/* eslint-disable @next/next/next-script-for-ga */
import Head from 'next/head';
import SpeakerCards from '../components/SpeakerCards';
import AdvisorCards from '../components/AdvisorCards';
import speakersData from '../data/speakersData.json';
import advisorsData from '../data/advisorsData.json';
import React from 'react';
import ScrollToTop from 'react-scroll-to-top';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

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

	const sortedSpeakersData = rawSpeakersData.sort(sortSpeakersByDate);

	const { scrollYProgress } = useScroll();
	const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

	return (
		<div className='relative overflow-hidden'>
			{/* Geometric background */}
			<motion.div
				className='absolute inset-0 z-0 opacity-10'
				style={{
					backgroundImage: "url('/geometric-pattern.svg')",
					y: backgroundY,
				}}
			/>

			<div className='relative z-10'>
				{/* Banners from 2023 version */}
				{/* <div className="absolute top-0 left-0 z-20 w-full">
					<p className='justify-center text-center py-2 px-2 ibm-plex-mono text-slate-800 bg-[#7b9cb71f]'>
						<Link href='/share'>
							We hosted 5 Turing Laureates and 1 Nobel Laureate! <span className='font-bold floating-text'>Click me</span> to share recordings with a friend.
						</Link>
					</p>

					<p className='justify-center text-center py-1 px-2 ibm-plex-mono text-white bg-slate-800'>
						The 2024 OMSCS Turing Award Series, hosted by <a href='https://www.linkedin.com/in/parsas/' className='italic underline' target='_blank'>Parsa Khazaeepoul</a> and <a href='https://www.linkedin.com/in/zackaxel/' className='italic underline' target='_blank'>Zach Axel</a>, has <span className='font-bold'>concluded.</span>
					</p>
				</div> */}

				{/* Updated header with 3D elements */}
				<header className='min-h-screen flex flex-col relative'>
					<div className='fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg md:relative md:bg-transparent md:backdrop-filter-none'>
						<div className='text-center py-4 md:mb-16 md:pt-64'>
							<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className='text-lg py-2 font-light mb-2 text-gray-600'>
								ACM A.M.
							</motion.div>
							<motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className='text-4xl md:text-6xl font-bold mb-2 md:mb-4 relative'>
								<span className='relative z-10'>Turing Award Speaker Series</span>
								<motion.span 
									className='absolute inset-0 text-[#a4925a] opacity-50 hidden md:inline-block' 
									animate={{ x: [0, 5, 0], y: [0, 5, 0] }} 
									transition={{ repeat: Infinity, duration: 5 }}
									style={{ zIndex: -1 }}
								>
									Turing Award Speaker Series
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
						<h2 className='text-2xl md:text-3xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#a4925a] to-[#d4af37]'>About the Turing Award Speaker Series</h2>

						<p className='ibm-plex-mono mb-6 md:mb-8 text-sm md:text-base'>
							The Turing Award Speaker Series is an annual event that brings together the brightest minds in computer science. Named after Alan Turing, the father of computer
							science, this series features talks from Turing Award winners, sharing their groundbreaking research and insights into the future of technology.
						</p>
						{/* Navigation buttons */}
						<div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-5'>
							<a href='#speakerCards' className='outline-[#a4925a] outline px-4 py-2 italic hover:bg-[#a4925a] hover:text-white transition-colors duration-300 text-center'>
								RSVP NOW
							</a>
							<a href='#contact' className='outline-[#a4925a] outline px-4 py-2 italic hover:bg-[#a4925a] hover:text-white transition-colors duration-300 text-center'>
								CONTACT US
							</a>
							<a href='#faq' className='outline-[#a4925a] outline px-4 py-2 italic hover:bg-[#a4925a] hover:text-white transition-colors duration-300 text-center'>
								FAQ
							</a>
						</div>
					</motion.div>
				</header>

				{/* Speaker Cards */}
				<section id='speakerCards' className='mx-auto px-8 my-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
					{sortedSpeakersData.map((speaker, index) => (
						<SpeakerCards key={index} {...speaker} />
					))}
				</section>

				{/* Updated FAQ with glassmorphism */}
				<section id='faq' className='my-24 px-4'>
					<div className='max-w-4xl mx-auto bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg p-8'>
						<h2 className='text-3xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#a4925a] to-[#d4af37]'>Frequently Asked Questions</h2>
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
					<div className='max-w-6xl mx-auto'>
						<h2 className='text-3xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#a4925a] to-[#d4af37]'>Speaker Series Advisors</h2>
						<p className='ibm-plex-mono mt-4 text-gray-800'> These are the people who helped make this event possible.</p>
						<div id='programAdvisors' className='my-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
							{advisorsData.map((advisor, index) => (
								<motion.div key={index} whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
									<AdvisorCards {...advisor} />
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Contact Information Section */}
				<section id='contact' className='my-24 px-8'>
					<div className='max-w-6xl mx-auto'>
						<h2 className='text-3xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#a4925a] to-[#d4af37]'>Who are we?</h2>
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
										<Image src='/team-photos/zack.jpg' layout='fill' alt='Zack Axel' className='rounded-t' />
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
										<Image src='/team-photos/parsa.jpg' layout='fill' alt='Parsa Khazaeepoul' className='rounded-t' />
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
					<p className='ibm-plex-mono'>
						© 2024 Turing Award Speaker Series. All rights reserved. Launched in partnership with the Association for Computing Machinery at Georgia Tech. Website built by Parsa
						Khazaeepoul.
					</p>
				</footer>
			</div>
			<ScrollToTop smooth id='scrollToTop' />
		</div>
	);
}
