/**
 * SpeakerCards Component
 *
 * This component renders a grid of speaker cards for the Turing Speaker Series.
 *
 * Features:
 * - Displays speaker information including name, photo, date, and description
 * - Shows RSVP button for upcoming talks or Watch Recording for past events
 * - Highlights Turing Award winners
 * - Responsive grid layout
 * - Calculates time until the event
 *
 * Props:
 * - speakers: An array of speaker objects containing details like name, slug, speakerPhoto, etc.
 *
 * Usage:
 * <SpeakerCards speakers={speakersData} />
 */

import React from 'react';
import Image from 'next/legacy/image';
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
	slug: string;
	// include other props as needed
}

const SpeakerBio = ({ name, dateTime, description, rsvpLink, turingAwardWinner, speakerPhoto, turingLink, talkTitle, isoDate, recordingLink, slug }: SpeakerBioProps) => {
	const [isClient, setIsClient] = React.useState(false);
	const [timeUntil, setTimeUntil] = React.useState<number | null>(null);
	const router = useRouter();

	React.useEffect(() => {
		setIsClient(true);
		const updateTimeUntil = () => {
			const now = new Date();
			const talkDate = new Date(isoDate);
			const timeDiff = talkDate.getTime() - now.getTime();
			setTimeUntil(timeDiff);
		};
		updateTimeUntil();
		const timer = setInterval(updateTimeUntil, 60000); // Update every minute
		return () => clearInterval(timer);
	}, [isoDate]);

	const getTimeStatus = () => {
		if (timeUntil === null) return '';
		if (timeUntil > 0) {
			const hours = Math.ceil(timeUntil / (1000 * 60 * 60));
			if (hours > 24) {
				const days = Math.ceil(hours / 24);
				return `starts in ${days} day${days > 1 ? 's' : ''}`;
			}
			return `starts in ${hours} hour${hours > 1 ? 's' : ''}`;
		}
		if (timeUntil > -5400000) { // Within 1.5 hours after start time
			return 'IS LIVE NOW';
		}
		return 'has concluded';
	};

	const isUpcoming = timeUntil !== null && timeUntil > -5400000; // Consider upcoming until 1.5 hours after start

	return (
		<div
			className={`card drop-shadow-md rounded-sm bg-base-100 shadow-xl flex flex-col outline ${turingAwardWinner ? 'outline-[#a4925a]' : 'outline-[#013057]'} p-6`}
			onClick={() => router.push(`/speaker/${slug}`)}
			style={{ cursor: 'pointer' }}
		>
			<div className='flex-1'>
				<div className='flex'>
					<div className='w-24 h-24 relative'>
						<Image src={speakerPhoto} layout='fill' objectFit='cover' alt='Speaker' className='rounded' />
					</div>
					<div className='px-6'>
						<h3 className='text-2xl font-semibold'>{name}</h3>
						<p className='mt-2'>{dateTime}</p>
						{turingAwardWinner && (
							<p className='mt-2'>
								<a target='_blank' rel='noreferrer' className='text-blue-500 underline ibm-plex-mono' href={turingLink} onClick={(e) => e.stopPropagation()}>
									Turing Award Recipient
								</a>
							</p>
						)}
					</div>
				</div>
				<p className='mt-4 text-[1.1rem] italic'>
					&apos;{talkTitle}&apos;
					{isClient && timeUntil !== null && (
						<span className='font-bold text-blue-500'> {getTimeStatus()}</span>
					)}
				</p>
				<p className='mt-4 text-[1rem]'>{description}</p>
			</div>
			{isClient && timeUntil !== null && (
				<a
					href={isUpcoming ? rsvpLink : recordingLink}
					target='_blank'
					rel='noreferrer'
					className={
						isUpcoming
							? 'floating-text bg-[#013057] mt-6 font-bold text-white hover:text-slate-500 p-4 text-center text-[1.2rem]'
							: 'floating-text bg-[#7b9cb71f] mt-6 font-bold text-[#013057] hover:text-slate-500 p-4 text-center text-[1.2rem]'
					}
					onClick={(e) => e.stopPropagation()}
				>
					{isUpcoming && timeUntil > 0 ? 'RSVP NOW' : 'WATCH NOW'}
				</a>
			)}
		</div>
	);
};

export default SpeakerBio;
