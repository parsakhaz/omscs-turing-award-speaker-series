import React from 'react';
import Image from 'next/image';

interface SpeakerBioProps {
	name: string;
	dateTime: string;
	description: string;
	rsvpLink: string;
	turingAwardWinner: boolean;
	speakerPhoto: string;
	turingLink?: string; // Allow string
	// include other props as needed
  }

  const SpeakerBio = ({ 
	name, 
	dateTime, 
	description, 
	rsvpLink, 
	turingAwardWinner, 
	speakerPhoto, 
	turingLink
  }: SpeakerBioProps) => {
	if (turingAwardWinner) {
		return (
			<div className='card drop-shadow-md rounded-sm bg-base-100 shadow-xl flex flex-col outline outline-[#a4925a]'>
				<div className='flex-1 p-4'>
					<div className='flex'>
						<div className='w-24 h-24 relative'>
							{' '}
							{/* Set the width and height using Tailwind */}
							<Image src={speakerPhoto} layout='fill' objectFit='cover' alt='Speaker' className='rounded' />
						</div>
						<div className='px-4'>
							<h3 className='text-2xl font-semibold'>{name}</h3>
							<p className='mt-1'>{dateTime}</p>
							<p className='mt-1'>
								<a target='_blank' rel='noreferrer' className='text-blue-500' href={turingLink}>
									Turing Award Recipient
								</a>
							</p>
						</div>
					</div>
					<p className='mt-2 text-[0.8rem]'>{description}</p>
				</div>

				<a target='_blank' rel='noreferrer' href={rsvpLink} className=' bg-[#013057] mt-4 font-bold text-white  hover:text-slate-500 p-4 text-center text-[1.2rem]'>
					RSVP NOW
				</a>
			</div>
		);
	}
	return (
		<div className='card drop-shadow-md rounded-sm bg-base-100 shadow-xl flex flex-col outline outline-[#013057]'>
			<div className='flex-1 p-4'>
				<div className='flex'>
					<div className='w-24 h-24 relative'>
						{' '}
						{/* Set the width and height using Tailwind */}
						<Image src={speakerPhoto} layout='fill' objectFit='cover' alt='Speaker' className='rounded' />
					</div>
					<div className='px-4'>
						<h3 className='text-2xl font-semibold'>{name}</h3>
						<p className='mt-2'>{dateTime}</p>
					</div>
				</div>
				<p className='mt-2 text-[0.8rem]'>{description}</p>
			</div>

			<a target='_blank' rel='noreferrer' href={rsvpLink} className=' bg-[#013057] mt-4 font-bold text-white  hover:text-slate-500 p-4 text-center text-[1.2rem]'>
				RSVP NOW
			</a>
		</div>
	);
};

export default SpeakerBio;
