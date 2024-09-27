import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Image from 'next/legacy/image';
import advisorsData from '../../data/advisorsData2024.json';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { NextSeo, BreadcrumbJsonLd } from 'next-seo';
import { JsonLd } from 'react-schemaorg';
import { Person, WithContext } from 'schema-dts';
import SidebarGallery from '../../components/SidebarGallery';
import speakersData2024 from '../../data/speakersData2024.json';
import advisorsData2024 from '../../data/advisorsData2024.json';
import Link from 'next/link';
import { FaChevronLeft, FaShare } from 'react-icons/fa';

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = advisorsData.map((advisor) => ({
		params: { slug: advisor.slug },
	}));

	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const advisor = advisorsData.find((a) => a.slug === params?.slug);
	return { props: { advisor } };
};

const AdvisorPage = ({ advisor }: { advisor: any }) => {
	const structuredData: WithContext<Person> = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: advisor.name,
		description: advisor.description,
		image: advisor.speakerPhoto,
		jobTitle: advisor.distinction,
		url: `https://turing.rsvp/advisor/${advisor.slug}`,
		sameAs: [advisor.biographyLink],
	};

	return (
		<>
			<NextSeo
				title={`${advisor.name} - Turing Advisor`}
				description={advisor.description}
				openGraph={{
					title: `${advisor.name} - Turing Advisor`,
					description: advisor.description,
					images: [{ url: advisor.speakerPhoto, alt: advisor.name }],
					type: 'profile',
					url: `https://turing.rsvp/advisor/${advisor.slug}`,
				}}
				twitter={{
					cardType: 'summary_large_image',
				}}
			/>
			<BreadcrumbJsonLd
				itemListElements={[
					{
						position: 1,
						name: 'Home',
						item: 'https://turing.rsvp',
					},
					{
						position: 2,
						name: 'Advisors',
						item: 'https://turing.rsvp/advisors',
					},
					{
						position: 3,
						name: advisor.name,
						item: `https://turing.rsvp/advisor/${advisor.slug}`,
					},
				]}
			/>
			<JsonLd<WithContext<Person>> item={structuredData} />
			<Head>
				<link rel='canonical' href={`https://turing.rsvp/advisor/${advisor.slug}`} />
			</Head>
			<div className="container mx-auto px-4 py-8 relative z-10 flex flex-col items-center">
				<article className="w-full max-w-4xl">
					<div className='bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg p-4 md:p-8 shadow-lg'>
						<div className='flex justify-between items-center mb-4 md:mb-6'>
							<div className='flex items-center'>
								<Link href="/" className='text-[#013057] hover:text-[#a4925a] transition-colors duration-300 mr-4'>
									<FaChevronLeft size={24} />
								</Link>
								<h1 className='text-3xl md:text-4xl font-bold text-[#a4925a]'>{advisor.name}</h1>
							</div>
							<Link href="/share" className='text-[#013057] hover:text-[#a4925a] transition-colors duration-300 flex flex-col items-center'>
								<FaShare size={24} />
								<span className='text-[8px] uppercase mt-1 text-black font-bold tracking-widest'>SHARE</span>
							</Link>
						</div>
						<div className='mb-6 md:mb-8 relative w-32 h-32 md:w-48 md:h-48 mx-auto'>
							<Image src={advisor.speakerPhoto} layout='fill' objectFit='cover' alt={`Portrait of ${advisor.name}`} className='rounded-full' />
						</div>
						<p className='mb-3 md:mb-4 text-lg md:text-xl font-semibold text-gray-700 text-center'>{advisor.distinction}</p>
						<p className='mb-4 md:mb-6 ibm-plex-mono text-sm md:text-base text-gray-800 text-center'>{advisor.description}</p>
						<div className='text-center'>
							<a
								href={advisor.biographyLink}
								className='text-[#013057] underline hover:text-[#a4925a] transition-colors duration-300 text-sm md:text-base'
								target='_blank'
								rel='noopener noreferrer'
							>
								Full Biography
							</a>
						</div>

						{/* Render markdown biography */}
						<section className='mt-8 md:mt-12'>
							<h2 className='text-2xl md:text-3xl font-semibold mb-3 md:mb-4 text-[#a4925a] text-center'>Biography</h2>
							<ReactMarkdown remarkPlugins={[remarkGfm]} className='prose prose-sm md:prose-base prose-blue max-w-none ibm-plex-mono text-gray-800'>
								{advisor.markdownBiography}
							</ReactMarkdown>
						</section>

						{/* Render markdown timeline */}
						<section className='mt-8 md:mt-12'>
							<h2 className='text-2xl md:text-3xl font-semibold mb-3 md:mb-4 text-[#a4925a] text-center'>Career Timeline</h2>
							<ReactMarkdown remarkPlugins={[remarkGfm]} className='prose prose-sm md:prose-base prose-blue max-w-none ibm-plex-mono text-gray-800'>
								{advisor.markdownTimeline}
							</ReactMarkdown>
						</section>
					</div>
				</article>
				<aside className="hidden lg:block mt-8">
					<SidebarGallery
						currentSpeaker={advisor.name}
						speakers={speakersData2024}
						advisors={advisorsData2024}
					/>
				</aside>
			</div>
		</>
	);
};

export default AdvisorPage;
