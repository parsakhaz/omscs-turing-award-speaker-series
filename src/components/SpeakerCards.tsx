import React from 'react';
import Image from "next/legacy/image";
import Link from 'next/link';
import speakersData from '../data/speakersData2024.json';
import { useRouter } from 'next/router';

interface SpeakerBioProps {
	name: string;
	dateTime: string;
	description: string;
	rsvpLink: string;
	recordingLink: string;
	turingAwardWinner: boolean;
	speakerPhoto: string;
	turingLink?: string;
	talkTitle?: string;
	isoDate: string;
	// include other props as needed
}

const SpeakerBio = ({ name, dateTime, description, rsvpLink, turingAwardWinner, speakerPhoto, turingLink, talkTitle, isoDate, recordingLink }: SpeakerBioProps) => {
	const [isClient, setIsClient] = React.useState(false);
	const [daysUntil, setDaysUntil] = React.useState<number | null>(null);
	const router = useRouter();

	React.useEffect(() => {
		setIsClient(true);
		const getDaysUntil = () => {
			const today = new Date();
			const talkDate = new Date(isoDate);
			const timeDiff = talkDate.getTime() - today.getTime();
			return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
		};
		setDaysUntil(getDaysUntil());
	}, [isoDate]);

	const speakerIndex = speakersData.findIndex((speaker: any) => speaker.name === name);

	return (
		<div 
			className={`card drop-shadow-md rounded-sm bg-base-100 shadow-xl flex flex-col outline ${turingAwardWinner ? 'outline-[#a4925a]' : 'outline-[#013057]'}`}
			onClick={() => router.push(`/speaker/${speakerIndex}`)}
			style={{ cursor: 'pointer' }}
		>
			<div className='flex-1 p-4'>
				<div className='flex'>
					<div className='w-24 h-24 relative'>
						<Image src={speakerPhoto} layout='fill' objectFit='cover' alt='Speaker' className='rounded' />
					</div>
					<div className='px-4'>
						<h3 className='text-2xl font-semibold'>{name}</h3>
						<p className='mt-1'>{dateTime}</p>
						{turingAwardWinner && (
							<p className='mt-1'>
								<a 
									target='_blank' 
									rel='noreferrer' 
									className='text-blue-500 underline ibm-plex-mono' 
									href={turingLink}
									onClick={(e) => e.stopPropagation()}
								>
									Turing Award Recipient
								</a>
							</p>
						)}
					</div>
				</div>
				<p className='mt-2 text-[1.1rem] italic'>
					&apos;{talkTitle}&apos;
					{isClient && daysUntil !== null && (
						<span className='font-bold text-blue-500'>
							{daysUntil <= 0 ? ' has concluded.' : ` starts in ${daysUntil} days.`}
						</span>
					)}
				</p>
				<p className='mt-2 text-[1rem]'>{description}</p>
			</div>
			{isClient && daysUntil !== null && (
				<a
					href={daysUntil > 0 ? rsvpLink : recordingLink}
					target='_blank'
					rel='noreferrer'
					className={
						daysUntil > 0
							? 'floating-text bg-[#013057] mt-4 font-bold text-white  hover:text-slate-500 p-4 text-center text-[1.2rem]'
							: 'floating-text bg-[#7b9cb71f] mt-4 font-bold text-[#013057]  hover:text-slate-500 p-4 text-center text-[1.2rem]'
					}
					onClick={(e) => e.stopPropagation()}
				>
					{daysUntil > 0 && !recordingLink.startsWith('https') ? 'RSVP NOW' : 'WATCH NOW'}
				</a>
			)}
		</div>
	);
};

export default SpeakerBio;
