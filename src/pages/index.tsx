/* eslint-disable @next/next/next-script-for-ga */
import Head from 'next/head';
import SpeakerCards from '../components/SpeakerCards';
import AdvisorCards from '../components/AdvisorCards';
import speakersData from '../data/speakersData2024.json';
import advisorsData from '../data/advisorsData2024.json';
import React, { useMemo } from 'react';
import ScrollToTop from 'react-scroll-to-top';
import Image from 'next/image';
import Link from 'next/link';

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

	return (
		<div className='relative'>
			<div className='relative'>
				{/* Updated header with simpler design */}
				<header className='min-h-screen flex flex-col relative'>
					<div className='fixed top-0 left-0 right-0 z-50 bg-white md:relative'>
						<div className='text-center py-4 md:mb-16 md:pt-64'>
							<div className='text-lg py-2 font-light mb-2 text-gray-600'>
								ACM A.M.
							</div>
							<h1 className='text-4xl md:text-6xl font-bold mb-2 md:mb-4'>
								Turing Minds
							</h1>
							<div className='text-xl md:text-2xl py-2 md:py-4 font-light text-gray-600'>
								Fall, 2024
							</div>
						</div>
					</div>

					<div className='w-full justify-center max-w-4xl mx-auto bg-white rounded-lg p-4 md:p-8 md:pl-24 mt-48 md:mt-16 md:static'>
						<h2 className='text-2xl md:text-3xl font-semibold mb-4 text-[#a4925a]'>
							About the Turing Award Speaker Series
						</h2>

						<p className='ibm-plex-mono mb-6 md:mb-8 text-sm md:text-base'>
							The Turing Award Speaker Series is an annual event that brings together the brightest minds in computer science. Named after Alan Turing, the father of computer
							science, this series features talks from Turing Award winners, sharing their groundbreaking research and insights into the future of technology.
						</p>
						{/* Navigation buttons */}
						<div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-5'>
							<button onClick={() => scrollToSection('speakerCards')} className='border border-[#a4925a] px-4 py-2 italic hover:bg-[#a4925a] hover:text-white transition-colors duration-300 text-center'>
								RSVP NOW
							</button>
							<button onClick={() => scrollToSection('contact')} className='border border-[#a4925a] px-4 py-2 italic hover:bg-[#a4925a] hover:text-white transition-colors duration-300 text-center'>
								CONTACT US
							</button>
							<button onClick={() => scrollToSection('faq')} className='border border-[#a4925a] px-4 py-2 italic hover:bg-[#a4925a] hover:text-white transition-colors duration-300 text-center'>
								FAQ
							</button>
						</div>
					</div>
				</header>

				{/* Speaker Cards */}
				<section id='speakerCards' className='mx-auto px-8 my-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
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
					<div className='max-w-6xl mx-auto'>
						<h2 className='text-3xl font-semibold mb-6 text-[#a4925a]'>Speaker Series Advisors</h2>
						<p className='ibm-plex-mono mt-4 text-gray-800'> These are the people who helped make this event possible.</p>
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
										<Image 
											src='/team-photos/zack.jpg' 
											layout='fill' 
											alt='Zack Axel' 
											className='rounded-t'
											loading="lazy"
											sizes="(max-width: 240px) 100vw, 240px"
										/>
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
										<Image 
											src='/team-photos/parsa.jpg' 
											layout='fill' 
											alt='Parsa Khazaeepoul' 
											className='rounded-t'
											loading="lazy"
											sizes="(max-width: 240px) 100vw, 240px"
										/>
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
			<ScrollToTop
				smooth
				top={0}
				component={<div className="fixed bottom-4 right-4 z-[9999] cursor-pointer bg-gray-800 text-white p-2 rounded-full">↑</div>}
			/>
		</div>
		
	);
}
