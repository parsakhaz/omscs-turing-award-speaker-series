import Head from 'next/head';
import Link from 'next/link';
import { NextSeo, BreadcrumbJsonLd } from 'next-seo';
import { motion } from 'framer-motion';
import Script from 'next/script';

export default function Press() {
	return (
		<>
			<NextSeo
				title='Press & Attribution'
				description='Guidelines for using Turing Minds content. Learn how to properly attribute biographies, talk summaries, recordings, and other original content from the Turing Minds speaker series.'
				canonical='https://www.turing.rsvp/press'
				openGraph={{
					url: 'https://www.turing.rsvp/press',
					title: 'Press & Attribution | Turing Minds',
					description: 'Guidelines for using Turing Minds content. Learn how to properly attribute biographies, talk summaries, recordings, and other original content.',
				}}
			/>
			<BreadcrumbJsonLd
				itemListElements={[
					{ position: 1, name: 'Home', item: 'https://www.turing.rsvp' },
					{ position: 2, name: 'Press & Attribution', item: 'https://www.turing.rsvp/press' },
				]}
			/>
			<Head>
				<Script
					src='https://www.googletagmanager.com/gtag/js?id=G-Y1G13WPJKZ'
					strategy='afterInteractive'
				/>
				<Script id='google-analytics' strategy='afterInteractive'>
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-Y1G13WPJKZ');
					`}
				</Script>
			</Head>

			<div className='min-h-screen bg-gradient-to-b from-slate-50 to-white font-[Sora]'>
				{/* Header */}
				<div className='max-w-4xl mx-auto px-6 pt-12 pb-8'>
					<Link href='/' className='text-slate-500 hover:text-slate-700 text-sm font-light transition-colors'>
						&larr; Back to Homepage
					</Link>
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className='text-4xl md:text-5xl font-light text-[#013057] tracking-tight mt-8 mb-4'
					>
						Press & Attribution
					</motion.h1>
					<p className='text-slate-600 font-light text-lg leading-relaxed max-w-2xl'>
						Guidelines for referencing, citing, and sharing content from the Turing Minds speaker series.
					</p>
				</div>

				<div className='max-w-4xl mx-auto px-6 space-y-8 pb-24'>
					{/* Press Coverage */}
					<motion.section
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.05 }}
						className='bg-white rounded-xl p-8 shadow-lg border border-slate-100'
					>
						<h2 className='text-2xl font-medium mb-6 text-slate-900'>Press Coverage</h2>
						<div className='space-y-4'>
							<a
								href='https://research.gatech.edu/groundbreaking-speaker-series-will-welcome-its-15th-turing-award-winner-its-last-guest'
								target='_blank'
								rel='noopener noreferrer'
								className='flex items-start gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group'
							>
								<span className='text-[#a4925a] mt-1 text-lg'>&#9679;</span>
								<div>
									<p className='text-slate-800 font-medium group-hover:text-[#013057] transition-colors'>Georgia Tech Research News</p>
									<p className='text-slate-600 font-light text-sm mt-1'>
										&ldquo;Groundbreaking Speaker Series Will Welcome Its 15th Turing Award Winner as Its Last Guest&rdquo;
									</p>
								</div>
							</a>
							<a
								href='https://www.cc.gatech.edu/news/online-series-offers-unique-opportunity-hear-turing-award-winners'
								target='_blank'
								rel='noopener noreferrer'
								className='flex items-start gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group'
							>
								<span className='text-[#a4925a] mt-1 text-lg'>&#9679;</span>
								<div>
									<p className='text-slate-800 font-medium group-hover:text-[#013057] transition-colors'>Georgia Tech College of Computing</p>
									<p className='text-slate-600 font-light text-sm mt-1'>
										&ldquo;Online Series Offers Unique Opportunity to Hear Turing Award Winners&rdquo;
									</p>
								</div>
							</a>
							<a
								href='https://www.atlantajewishtimes.com/ga-tech-students-lead-speaker-series/'
								target='_blank'
								rel='noopener noreferrer'
								className='flex items-start gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group'
							>
								<span className='text-[#a4925a] mt-1 text-lg'>&#9679;</span>
								<div>
									<p className='text-slate-800 font-medium group-hover:text-[#013057] transition-colors'>Atlanta Jewish Times</p>
									<p className='text-slate-600 font-light text-sm mt-1'>
										&ldquo;GA Tech Students Lead Speaker Series&rdquo;
									</p>
								</div>
							</a>
						</div>
					</motion.section>

					{/* Content Ownership */}
					<motion.section
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className='bg-white rounded-xl p-8 shadow-lg border border-slate-100'
					>
						<h2 className='text-2xl font-medium mb-4 text-slate-900'>Original Content</h2>
						<p className='text-slate-700 leading-relaxed font-light mb-4'>
							All original content published on <strong className='font-medium'>turing.rsvp</strong> is produced by Turing Minds. This includes:
						</p>
						<ul className='space-y-2 text-slate-700 font-light'>
							<li className='flex items-start gap-2'>
								<span className='text-[#a4925a] mt-1'>&#9679;</span>
								Speaker biographies and career timelines
							</li>
							<li className='flex items-start gap-2'>
								<span className='text-[#a4925a] mt-1'>&#9679;</span>
								Talk summaries, key takeaways, and notable quotes
							</li>
							<li className='flex items-start gap-2'>
								<span className='text-[#a4925a] mt-1'>&#9679;</span>
								Question of the Day content and speaker responses
							</li>
							<li className='flex items-start gap-2'>
								<span className='text-[#a4925a] mt-1'>&#9679;</span>
								Event recordings published on the Turing Minds YouTube channel
							</li>
							<li className='flex items-start gap-2'>
								<span className='text-[#a4925a] mt-1'>&#9679;</span>
								Speaker photographs taken or commissioned by Turing Minds
							</li>
						</ul>
					</motion.section>

					{/* Attribution Requirements */}
					<motion.section
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className='bg-white rounded-xl p-8 shadow-lg border border-slate-100'
					>
						<h2 className='text-2xl font-medium mb-4 text-slate-900'>Attribution Requirements</h2>
						<p className='text-slate-700 leading-relaxed font-light mb-6'>
							We welcome others to reference and share our content. If you use any material from this website, we ask that you:
						</p>
						<div className='space-y-4'>
							<div className='flex items-start gap-4 p-4 bg-slate-50 rounded-lg'>
								<span className='text-[#013057] font-semibold text-lg min-w-[28px]'>1.</span>
								<div>
									<p className='text-slate-800 font-medium'>Credit Turing Minds</p>
									<p className='text-slate-600 font-light text-sm mt-1'>
										Include &ldquo;Turing Minds&rdquo; or &ldquo;Turing Minds (www.turing.rsvp)&rdquo; as the source.
									</p>
								</div>
							</div>
							<div className='flex items-start gap-4 p-4 bg-slate-50 rounded-lg'>
								<span className='text-[#013057] font-semibold text-lg min-w-[28px]'>2.</span>
								<div>
									<p className='text-slate-800 font-medium'>Link to the original source</p>
									<p className='text-slate-600 font-light text-sm mt-1'>
										Include a hyperlink to the specific speaker page or YouTube recording you are referencing.
									</p>
								</div>
							</div>
							<div className='flex items-start gap-4 p-4 bg-slate-50 rounded-lg'>
								<span className='text-[#013057] font-semibold text-lg min-w-[28px]'>3.</span>
								<div>
									<p className='text-slate-800 font-medium'>Do not misrepresent the content</p>
									<p className='text-slate-600 font-light text-sm mt-1'>
										Do not present Turing Minds content as your own original work. Do not alter quotes or misattribute statements.
									</p>
								</div>
							</div>
						</div>
					</motion.section>

					{/* How to Cite */}
					<motion.section
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className='bg-white rounded-xl p-8 shadow-lg border border-slate-100'
					>
						<h2 className='text-2xl font-medium mb-4 text-slate-900'>How to Cite</h2>
						<p className='text-slate-700 leading-relaxed font-light mb-6'>
							Here are recommended citation formats depending on the context:
						</p>

						<div className='space-y-6'>
							<div>
								<h3 className='text-sm font-medium text-[#013057] uppercase tracking-wider mb-2'>Web or Blog</h3>
								<div className='bg-slate-50 rounded-lg p-4 font-mono text-sm text-slate-700 leading-relaxed'>
									Source: Turing Minds (www.turing.rsvp/speaker/speaker-name)
								</div>
							</div>

							<div>
								<h3 className='text-sm font-medium text-[#013057] uppercase tracking-wider mb-2'>Academic or Paper</h3>
								<div className='bg-slate-50 rounded-lg p-4 font-mono text-sm text-slate-700 leading-relaxed'>
									Turing Minds Speaker Series. &ldquo;[Speaker Name]: [Talk Title].&rdquo; Turing Minds, [Year]. https://www.turing.rsvp/speaker/[speaker-slug]
								</div>
							</div>

							<div>
								<h3 className='text-sm font-medium text-[#013057] uppercase tracking-wider mb-2'>Social Media</h3>
								<div className='bg-slate-50 rounded-lg p-4 font-mono text-sm text-slate-700 leading-relaxed'>
									Via Turing Minds (turing.rsvp)
								</div>
							</div>

							<div>
								<h3 className='text-sm font-medium text-[#013057] uppercase tracking-wider mb-2'>YouTube Recording</h3>
								<div className='bg-slate-50 rounded-lg p-4 font-mono text-sm text-slate-700 leading-relaxed'>
									Recording by Turing Minds. Watch at: [link to YouTube recording]
								</div>
							</div>
						</div>
					</motion.section>

					{/* Media & Press */}
					<motion.section
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className='bg-white rounded-xl p-8 shadow-lg border border-slate-100'
					>
						<h2 className='text-2xl font-medium mb-4 text-slate-900'>Media & Press</h2>
						<p className='text-slate-700 leading-relaxed font-light mb-4'>
							We welcome press coverage and media references to the Turing Minds speaker series. Journalists and media outlets may quote from and reference our content with proper attribution as described above.
						</p>
						<p className='text-slate-700 leading-relaxed font-light mb-4'>
							For extended use of our content, interview requests, media partnerships, or high-resolution assets, please reach out to us directly.
						</p>
						<p className='text-slate-500 font-light text-sm italic'>
							Turing Minds™ is an independent company and is not affiliated with the Association for Computing Machinery (ACM) or the A.M. Turing Award.
						</p>
					</motion.section>

					{/* Contact */}
					<motion.section
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.5 }}
						className='bg-white rounded-xl p-8 shadow-lg border border-slate-100 text-center'
					>
						<h2 className='text-2xl font-medium mb-3 text-slate-900'>Questions?</h2>
						<p className='text-slate-700 font-light mb-4'>
							For permission requests, media inquiries, or questions about content usage:
						</p>
						<a
							href='mailto:TuringMindsOfficial@gmail.com'
							className='inline-block text-[#013057] hover:text-[#a4925a] font-medium text-lg transition-colors'
						>
							TuringMindsOfficial@gmail.com
						</a>
					</motion.section>
				</div>

				{/* Footer */}
				<footer className='mb-16 text-center px-6'>
					<div className='max-w-4xl mx-auto'>
						<div className='h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-8'></div>
						<p className='text-slate-600 font-light tracking-wide'>&copy; 2026 Turing Minds. All rights reserved.</p>
						<p className='text-slate-600 font-light tracking-wide text-sm'>Turing Minds™ is an independent company and is not affiliated with the Association for Computing Machinery (ACM) or the A.M. Turing Award.</p>
					</div>
				</footer>
			</div>
		</>
	);
}
