import React from 'react';
import Image from "next/legacy/image";
import Link from 'next/link';
import advisorsData from '../data/advisorsData2024.json';
import { useRouter } from 'next/router';

interface AdvisorBioProps {
	name: string;
	distinction: string;
	description: string;
	speakerPhoto: string;
	biographyLink: string;
}

const AdvisorBio = ({
	name,
	distinction,
	description,
	speakerPhoto,
	biographyLink,
}: AdvisorBioProps) => {
	const advisorIndex = advisorsData.findIndex((advisor: any) => advisor.name === name);
	const router = useRouter();

	return (
		<div 
			className='card drop-shadow-md rounded-sm bg-base-100 shadow-xl flex flex-col outline outline-[#a4925a]'
			onClick={() => router.push(`/advisor/${advisorIndex}`)}
			style={{ cursor: 'pointer' }}
		>
			<div className='flex'>
				<div className='w-24 h-24 relative'>
					<Image src={speakerPhoto} layout='fill' objectFit='cover' alt='Advisor' className='rounded' />
				</div>
				<div className='px-4'>
					<h3 className='text-2xl font-semibold'>{name}</h3>
					<p className='mt-1'>{distinction}</p>
					<p className='mt-1'>
						<a 
							href={biographyLink} 
							target='_blank' 
							rel='noreferrer' 
							className='text-blue-500'
							onClick={(e) => e.stopPropagation()}
						>
							Biography
						</a>
					</p>
				</div>
			</div>
			<p className='mt-2 text-[0.95rem]'>{description}</p>
		</div>
	);
};

export default AdvisorBio;
