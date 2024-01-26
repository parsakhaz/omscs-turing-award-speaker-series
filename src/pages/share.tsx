import React, { useState, useEffect } from 'react';
import JSConfetti from 'js-confetti';

export default function SharePage() {
	const [confetti, setConfetti] = useState<JSConfetti | null>(null);
	const [shareSuccessful, setShareSuccessful] = useState(false);

	useEffect(() => {
		import('js-confetti').then((module) => {
			const JSConfetti = module.default;
			setConfetti(new JSConfetti());
		});
	}, []);

	const handleShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: 'Turing RSVP',
					url: 'https://www.turing.rsvp/',
				});
				console.log('Content shared successfully');
				confetti && confetti.addConfetti();
				setShareSuccessful(true);
				setTimeout(() => setShareSuccessful(false), 3000); // Reset after 3 seconds
			} catch (error) {
				console.error('Error in sharing:', error);
			}
		} else {
			console.log('Web Share API not supported');
		}
	};

	return (
		<>
			{shareSuccessful && <p className='text-white top-10 left-10 absolute text-xl mt-4 ibm-plex-mono py-2 px-2 bg-black'>Thank you for sharing!</p>}
			<div className='flex flex-col justify-center items-center h-screen bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-700'>
				<div className='text-center py-4 px-4'>
					<button
						onClick={handleShare}
						className='bg-white text-indigo-500 text-xl md:text-3xl ibm-plex-mono font-semibold py-2 px-4 rounded-lg hover:bg-[#a4925a] hover:text-white transition duration-300'
					>
						Share Turing Award Speaker Series
					</button>
				</div>
			</div>
		</>
	);
}
