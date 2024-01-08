import Head from 'next/head';
import SpeakerCards from '../components/SpeakerCards';
import AdvisorCards from '../components/AdvisorCards';
import speakersData from '../data/speakersData.json';
import advisorsData from '../data/advisorsData.json';
import React from 'react';
import ScrollToTop from 'react-scroll-to-top';
import Image from 'next/image';

export default function Home() {
	return (
		<>
			{/* <img src='/gatech-banner.png' alt='Georgia Tech Banner' /> */}

			<div className='container mx-auto px-4 pt-6 md:px-16 xl:px-32'>
				<Head>
					<title>Turing Award Speaker Series</title>
				</Head>

				{/* Turing Award Speaker Series Header */}
				<div className='bg-zinc-100 md:bg-[#7b9cb71f] px-5 rounded-sm h-[90vh] md:outline md:outline-[#a4925a]'>
					<div className='h-[100vh] flex flex-col justify-center items-center pb-16'>
						{/* Turing Award Speaker Series Header */}
						<header className='flex flex-col text-center max-w-4xl  drop-shadow-[0_0.2px_0.8px_#a4925a]'>
							<div className='flex justify-center py-4 text-4xl md:text-6xl font-bold'>
								<h1 className='animated-gradient-text'>
									Turing Award<div className='pb-3 gradient-text'> Speaker Series</div>
								</h1>
							</div>
							<div>
								<p className='ibm-plex-mono flex justify-center text-sm md:text-base italic max-w-3xl'>
									The Turing Award, often referred to as the &apos;Nobel Prize of Computing,&apos; is an annual award given by the Association for Computing Machinery (ACM) to
									individuals for their contributions of lasting and major technical importance to the computing field.
								</p>
							</div>
							<div className='flex justify-center py-8 space-x-5'>
								<a href='#speakerCards' className='outline-[#a4925a] outline px-3 py-3 italic underline'>
									RSVP NOW
								</a>
								<a href='#faq' className='outline-[#a4925a] outline px-3 py-3 italic'>
									FAQ
								</a>
								<a href='#contact' className='outline-[#a4925a] outline px-3 py-3 italic'>
									CONTACT
								</a>
							</div>
							{/* <p className='text-sm md:text-base italic max-w-2xl'>
								Georgia Tech OMSCS is proud to host a series of talks by Turing Award winners. The talks will be open to the public and will be held online via Zoom.
							</p> */}
						</header>
					</div>
				</div>

				{/* <p className='pt-8 ibm-plex-mono text-sm md:text-base italic '>
					*Turing Award Winners are marked with a <span className='text-[#a4925a] font-bold'>gold</span> border.
				</p> */}
				<section id='speakerCards' className='my-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
					{speakersData.map((speaker, index) => (
						<SpeakerCards key={index} {...speaker} />
					))}
				</section>

				{/* FAQ Section */}
				<section id='faq' className='my-12'>
					<h2 className='text-[#a4925a] text-3xl font-semibold'>Frequently Asked Questions</h2>
					<div className='mt-4 space-y-6'>
						<div className='space-y-2'>
							<p className='italic ibm-plex-mono text-white font-bold bg-slate-800 underline py-2 px-2'>Where will the event take place?</p>
							<p className='ibm-plex-mono'>The event will be held online via Teams.</p>
						</div>

						<div className='space-y-2'>
							<p className='italic ibm-plex-mono text-white font-bold bg-slate-800 underline py-2 px-2'>Is this a recurring event?</p>
							<p className='ibm-plex-mono'>For now, this is a one time event. If we have enough interest, we may be able to make this recurring.</p>
						</div>

						<div className='space-y-2'>
							<p className='italic ibm-plex-mono text-white font-bold bg-slate-800 underline py-2 px-2'>How much does it cost to attend?</p>
							<p className='ibm-plex-mono'>The event is free to attend.</p>
						</div>

						<div className='space-y-2'>
							<p className='italic ibm-plex-mono text-white font-bold bg-slate-800 underline py-2 px-2'>Do I need to RSVP?</p>
							<p className='ibm-plex-mono'>Yes, you need to RSVP in order to receive the Teams link.</p>
						</div>

						<div className='space-y-2'>
							<p className='italic ibm-plex-mono text-white font-bold bg-slate-800 underline py-2 px-2'>How do I RSVP?</p>
							<p className='ibm-plex-mono'>
								You can RSVP by clicking the RSVP buttons for each individual event. Or through our lu.ma calendar{' '}
								<a className='text-blue-800' target='_blank' rel='noreferrer' href='https://lu.ma/omscs/'>
									here
								</a>
								.
							</p>
						</div>

						<div className='space-y-2'>
							<p className='italic ibm-plex-mono text-white font-bold bg-slate-800 underline py-2 px-2'>Do I need to be a Georgia Tech student to attend?</p>
							<p className='ibm-plex-mono'>No, the event is open to the public.</p>
						</div>

						<div className='space-y-2'>
							<p className='italic ibm-plex-mono text-white font-bold bg-slate-800 underline py-2 px-2'>Will the event be recorded?</p>
							<p className='ibm-plex-mono'>Partially, speakers who are okay with it will be recorded and posted on our website.</p>
						</div>

						<div className='space-y-2'>
							<p className='italic ibm-plex-mono text-white font-bold bg-slate-800 underline py-2 px-2'>How long will the event last?</p>
							<p className='ibm-plex-mono'>Each talk will last about an hour.</p>
						</div>

						<div className='space-y-2'>
							<p className='italic ibm-plex-mono text-white font-bold bg-slate-800 underline py-2 px-2'>How do I get in contact with the organizers?</p>
							<p className='ibm-plex-mono'>You can contact us through our email addresses below.</p>
						</div>

						{/* Add more questions if necessary */}
					</div>
				</section>

				{/* Program Advisors */}
				<h2 className='text-[#a4925a] text-3xl font-semibold'>Speaker Series Advisors</h2>
				<p className='ibm-plex-mono mt-4'> These are the people who helped make this event possible.</p>
				<section id='programAdvisors' className='my-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
					{advisorsData.map((advisor, index) => (
						<AdvisorCards key={index} {...advisor} />
					))}
				</section>

				{/* Contact Information Section */}
				<section id='contact' className='my-12'>
					<h2 className='text-[#a4925a] text-3xl font-semibold'>Who are we?</h2>
					<div className='mt-4 ibm-plex-mono'>
						<p className='pb-1'>If you have any inquiries or need further information, please don&apos;t hesitate to contact us</p>
						<div className='py-2'>
							<p className='italic ibm-plex-mono text-white font-bold bg-slate-800 underline py-2 px-2 w-[32rem]'>Connect with our LinkedIn accounts below</p>
						</div>
						<div className='flex flex-col sm:flex-row gap-8'>
							{/* Card for Zack Axel */}
							<div className='bg-white rounded overflow-hidden shadow-lg  w-[15rem] h-[20rem]'>
								<div className='w-full h-64 relative'>
									<Image src='/team-photos/zack.jpg' layout='fill' alt='Zack Axel' className='rounded-t' />
								</div>
								<div className='text-center py-1'>
									<a href='https://www.linkedin.com/in/zackaxel/' target='_blank' className='flex text-center justify-center font-bold underline text-lg hover:text-blue-600'>
										Zack Axel <Image src='/linkedin.svg' className="pl-1" width={20} height={20} alt='LinkedIn' />
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
										Parsa Khazaeepoul <Image src='/linkedin.svg' className="pl-1" width={20} height={20} alt='LinkedIn' />
									</a>
									<p className='text-lg mb-2 hover:text-blue-600'>
										<a href='mailto:pkhazaeepoul3@gatech.edu' className='text-sm mb-2 hover:text-blue-600'>
											pkhazaeepoul3@gatech.edu
										</a>
									</p>
								</div>
							</div>
						</div>

						{/* Add more officers if necessary */}
					</div>
				</section>

				{/* Footer */}
				{/* <footer className='my-12 text-center text-sm'>
					<p>© 2023 Georgia Tech OMSCS. All rights reserved.</p>
				</footer> */}
			</div>
			<ScrollToTop smooth id='scrollToTop' />
		</>
	);
}
