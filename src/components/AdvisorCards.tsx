import React from 'react';
import Image from 'next/legacy/image';
import Link from 'next/link';
import advisorsData from '../data/advisorsData2024.json';
import { useRouter } from 'next/router';

interface AdvisorBioProps {
	name: string;
	distinction: string;
	description: string;
	speakerPhoto: string;
	biographyLink: string;
	slug: string;
}

const AdvisorBio = ({ name, distinction, description, speakerPhoto, biographyLink, slug }: AdvisorBioProps) => {
	const router = useRouter();

	return (
		<div
			className="group bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
			onClick={() => router.push(`/advisor/${slug}`)}
		>
			{/* Header with photo and basic info */}
			<div className="p-6 pb-4">
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
						<p className="text-sm text-slate-600 font-medium mb-3 leading-relaxed">
							{distinction}
						</p>
						<a 
							href={biographyLink} 
							target="_blank" 
							rel="noreferrer" 
							className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium" 
							onClick={(e) => e.stopPropagation()}
						>
							View Biography →
						</a>
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="px-6 pb-6">
				<p className="text-sm text-slate-600 leading-relaxed">
					{description}
				</p>
			</div>
		</div>
	);
};

export default AdvisorBio;
