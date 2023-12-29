import Head from 'next/head';
import SpeakerCards from '../components/SpeakerCards';
import speakersData from '../data/speakersData.json';
import React from 'react';
import ScrollToTop from "react-scroll-to-top";

export default function Home() {
	return (
		<>
			{/* <img src='/gatech-banner.png' alt='Georgia Tech Banner' /> */}

			<div className='container mx-auto px-4 pt-6 md:px-16 xl:px-32'>
				<Head>
					<title>Turing Award Speaker Series</title>
				</Head>

				{/* Turing Award Speaker Series Header */}
				<div className='bg-zinc-100 md:bg-[#668cab1f] px-5 rounded-sm h-[90vh] md:outline md:outline-[#a4925a]'>
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

				<section id='speakerCards' className='my-12 grid grid-cols-1 md:grid-cols-2 gap-4'>
					{speakersData.map((speaker, index) => (
						<SpeakerCards key={index} {...speaker} />
					))}
				</section>

				{/* FAQ Section */}
				<section id='faq' className='my-12'>
					<h2 className='text-[#a4925a] text-3xl font-semibold'>Frequently Asked Questions</h2>
					<div className='mt-4 space-y-6'>
						<div className='space-y-2'>
							<p className='italic ibm-plex-mono'>Where will the event take place?</p>
							<p className='ibm-plex-mono'>The event will be held online via Teams.</p>
						</div>

						<div className='space-y-2'>
							<p className='italic ibm-plex-mono'>Is this a recurring event?</p>
							<p className='ibm-plex-mono'>For now, this is a one time event. If we have enough interest, we may be able to make this recurring.</p>
						</div>

						<div className='space-y-2'>
							<p className='italic ibm-plex-mono'>How much does it cost to attend?</p>
							<p className='ibm-plex-mono'>The event is free to attend.</p>
						</div>

						<div className='space-y-2'>
							<p className='italic ibm-plex-mono'>Do I need to RSVP?</p>
							<p className='ibm-plex-mono'>Yes, you need to RSVP in order to receive the Teams link.</p>
						</div>

						<div className='space-y-2'>
							<p className='italic ibm-plex-mono'>How do I RSVP?</p>
							<p className='ibm-plex-mono'>You can RSVP by clicking the RSVP buttons for each individual event. Or through our lu.ma calendar <a className="text-blue-800" href="https://lu.ma/omscs/">here</a>.</p>
						</div>

						</div>
				</section>

				{/* Contact Information Section */}
				<section id='contact' className='my-12'>
					<h2 className='text-[#a4925a] text-3xl font-semibold'>Contact Information</h2>
					<div className='mt-4'>
						<p>If you have any inquiries or need further information, please don&apos;t hesitate to contact us</p>
						<ul className='list-disc space-x-4'>
							<a href='mailto:zaxel3@gatech.edu' className='btn bg-[#013057] mt-4 text-white hover:text-blue-600 p-4 text-center text-[0.7rem]'>
								Zack Axel (Speaker Series Administrator)
							</a>

							<a href='mailto:pkhazaeepoul3@gatech.edu' className='btn bg-[#013057] mt-4 text-white hover:text-blue-600 p-4 text-center text-[0.7rem]'>
								Parsa Khazaeepoul (Website and Events Page Administrator)
							</a>

							{/* Add more officers if necessary */}
						</ul>
					</div>
				</section>

				{/* Footer */}
				{/* <footer className='my-12 text-center text-sm'>
					<p>© 2023 Georgia Tech OMSCS. All rights reserved.</p>
				</footer> */}
			</div>
			<ScrollToTop smooth />
		</>
	);
}
