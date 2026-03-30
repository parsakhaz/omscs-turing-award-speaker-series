import Link from 'next/link';
import Head from 'next/head';

export default function Custom404() {
	return (
		<>
			<Head>
				<title>Page Not Found | Turing Minds</title>
				<meta name='robots' content='noindex' />
			</Head>
			<div className='min-h-screen flex flex-col items-center justify-center px-6'>
				<h1 className='text-6xl font-light text-slate-900 mb-4'>404</h1>
				<p className='text-xl text-slate-600 font-light mb-8'>This page doesn&apos;t exist.</p>
				<div className='flex gap-4'>
					<Link href='/' className='bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors'>
						View Speakers
					</Link>
					<Link href='/2023' className='border-2 border-slate-200 text-slate-700 px-6 py-3 rounded-lg font-medium hover:border-slate-300 hover:bg-slate-50 transition-colors'>
						2023 Archive
					</Link>
				</div>
			</div>
		</>
	);
}
