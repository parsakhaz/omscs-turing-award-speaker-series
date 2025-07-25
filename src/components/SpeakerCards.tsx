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
	year?: number;
	// include other props as needed
}

const SpeakerBio = ({ name, dateTime, description, rsvpLink, turingAwardWinner, speakerPhoto, turingLink, talkTitle, isoDate, recordingLink, slug, year }: SpeakerBioProps) => {
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
			className="group bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
			onClick={() => router.push(`/speaker/${slug}`)}
		>
			{/* Header with photo and basic info */}
			<div className="relative p-6 pb-4">
				{/* Year badge */}
				{year && (
					<div className="absolute top-4 right-4 bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">
						{year}
					</div>
				)}
				
				<div className="flex items-start space-x-4">
					<div className="w-20 h-20 relative flex-shrink-0">
						<Image 
							src={speakerPhoto} 
							layout="fill" 
							objectFit="cover" 
							alt={name}
							className="rounded-xl"
						/>
					</div>
					<div className="flex-1 min-w-0">
						<h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
							{name}
						</h3>
						<p className="text-sm text-slate-600 font-medium mb-2">
							{dateTime}
						</p>
						{turingAwardWinner && (
							<div className="flex items-center space-x-2">
								<div className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-semibold">
									Turing Award
								</div>
								{turingLink && (
									<a 
										target="_blank" 
										rel="noreferrer" 
										className="text-blue-600 hover:text-blue-800 text-xs font-medium" 
										href={turingLink} 
										onClick={(e) => e.stopPropagation()}
									>
										View →
									</a>
								)}
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="px-6 pb-6">
				{talkTitle && (
					<div className="mb-4">
						<h4 className="text-base font-medium text-slate-800 mb-1">
							{talkTitle}
						</h4>
						{isClient && timeUntil !== null && (
							<span className={`text-sm font-semibold ${
								timeUntil > 0 ? 'text-green-600' : 
								timeUntil > -5400000 ? 'text-red-600' : 'text-slate-500'
							}`}>
								{getTimeStatus()}
							</span>
						)}
					</div>
				)}
				
				<p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
					{description}
				</p>
			</div>

			{/* Action button */}
			{isClient && timeUntil !== null && (
				<div className="px-6 pb-6">
					<a
						href={isUpcoming ? rsvpLink : recordingLink}
						target="_blank"
						rel="noreferrer"
						className={`block w-full text-center py-3 px-4 rounded-lg font-medium transition-all duration-200 text-sm ${
							isUpcoming && timeUntil > 0
								? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
								: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
						}`}
						onClick={(e) => e.stopPropagation()}
					>
						{isUpcoming && timeUntil > 0 ? 'RSVP Now' : 'Watch Recording'}
					</a>
				</div>
			)}
		</div>
	);
};

export default SpeakerBio;
