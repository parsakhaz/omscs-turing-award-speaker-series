import Head from 'next/head';
import SpeakerCards from '../components/SpeakerCards';
import speakersData from '../data/speakersData.json';

export default function Home() {
	return (
		<>
			<img src='/gatech-banner.png' alt='Georgia Tech Banner' />
			<div className='container mx-auto px-4 pt-6 md:px-16 xl:px-32'>
				<Head>
					<title>Turing Award Speaker Series</title>
				</Head>

				<div className='bg-gray-100 px-5 rounded-sm'>
					<div className='flex flex-col'>
						<header className='text-start my-6'>
							<h1 className='text-[#a4925a] text-4xl md:text-6xl font-bold leading-tight'>Turing Award Speaker Series</h1>
							<p className='mt-4 text-lg md:text-xl leading-relaxed'>
								Join us in exploring insights from some of the world&apos;s most distinguished computer scientists, recipients of the prestigious Turing Award.
							</p>
						</header>

						{/* Turing Award Introduction */}
						<section className='my-4'>
							<h2 className='text-[#a4925a] text-2xl md:text-3xl font-semibold'>What is the Turing Award?</h2>
							<p className='mt-2 leading-relaxed'>
								The Turing Award, often referred to as the &apos;Nobel Prize of Computing,&apos; is an annual award given by the Association for Computing Machinery (ACM) to
								individuals for their contributions of lasting and major technical importance to the computing field.
							</p>
						</section>
					</div>
				</div>

				<section className='my-12 grid grid-cols-1 md:grid-cols-2 gap-4'>
					{speakersData.map((speaker, index) => (
						<SpeakerCards key={index} {...speaker} />
					))}
				</section>

				{/* Contact Information Section */}
				<section className='my-12'>
					<h2 className='text-[#a4925a] text-3xl font-semibold'>Contact Information</h2>
					<div className='mt-4'>
						<p>If you have any inquiries or need further information, please don&apos;t hesitate to contact us</p>
						<ul className='list-disc pl-6'>
							<li className=''>
								<a href='mailto:zaxel3@gatech.edu' className='btn bg-[#013057] mt-4 text-white hover:text-blue-600 p-4 text-center text-[0.7rem]'>
									Zack Axel (Speaker Series Administrator)
								</a>
							</li>
							<li className=''>
								<a href='mailto:pkhazaeepoul3@gatech.edu' className='btn bg-[#013057] mt-4 text-white hover:text-blue-600 p-4 text-center text-[0.7rem]'>
									Parsa Khazaeepoul (Website and Events Page Administrator)
								</a>
							</li>
							{/* Add more officers if necessary */}
						</ul>
					</div>
				</section>

				{/* Footer */}
				<footer className='my-12 text-center text-sm'>
					<p>© 2023 Georgia Tech OMSCS. All rights reserved.</p>
				</footer>
			</div>
		</>
	);
}
