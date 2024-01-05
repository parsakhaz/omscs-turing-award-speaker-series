import React from 'react';
import Image from 'next/image';

interface SpeakerBioProps {
	name: string;
	distinction: string;
	description: string;

	speakerPhoto: string;
	biographyLink: string;
  }

  const SpeakerBio = ({ 
	name, 
	distinction, 
	description, 

	speakerPhoto, 
	biographyLink
  }: SpeakerBioProps) => {

		return (
			<div className='card drop-shadow-md rounded-sm bg-base-100 shadow-xl flex flex-col outline outline-[#a4925a]'>
				<div className='flex-1 p-4'>
					<div className='flex'>
						<div className='w-24 h-24 relative'>
							{' '}
							<Image src={speakerPhoto} layout='fill' objectFit='cover' alt='Speaker' className='rounded' />
						</div>
						<div className='px-4'>
							<h3 className='text-2xl font-semibold'>{name}</h3>
							<p className='mt-1'>{distinction}</p>
							<p className='mt-1'>
								<a target='_blank' rel='noreferrer' className='text-blue-500' href={biographyLink}>
									Biography
								</a>
							</p>
						</div>
					</div>
					<p className='mt-2 text-[0.8rem]'>{description}</p>
				</div>
			</div>
		);
};

export default SpeakerBio;
