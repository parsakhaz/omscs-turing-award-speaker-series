import Head from 'next/head';

export default function Home() {
	return (
		<div className='container mx-auto px-4'>
			<Head>
				<title>Turing Award Speaker Series</title>
			</Head>

			<header className='text-center my-12'>
				<h1 className='text-4xl md:text-6xl font-bold leading-tight'>Turing Award Speaker Series</h1>
				<p className='mt-4 text-lg md:text-xl leading-relaxed'>
					Join us in exploring insights from some of the world&apos;s most distinguished computer scientists, recipients of the prestigious Turing Award.
				</p>
			</header>

			{/* Turing Award Introduction */}
			<section className='my-8'>
				<h2 className='text-2xl md:text-3xl font-semibold'>What is the Turing Award?</h2>
				<p className='mt-2 leading-relaxed'>
					The Turing Award, often referred to as the &apos;Nobel Prize of Computing,&apos; is an annual award given by the Association for Computing Machinery (ACM) to individuals for their
					contributions of lasting and major technical importance to the computing field.
				</p>
			</section>

			{/* Speaker Bios Section */}
			<section className='my-12 grid grid-cols-1 md:grid-cols-2 gap-4'>
				{/* <!-- Dr. Moshe Vardi --> */}
				<div className='card bg-base-100 shadow-xl p-4'>
					<h3 className='text-2xl font-semibold'>Dr. Moshe Vardi</h3>
					<p className='mt-2'>Date & Time: January 17th, 12pm EST.</p>
					<p className='mt-2'>
						Dr. Moshe Y. Vardi is a University Professor and the George Distinguished Service Professor in Computational Engineering at Rice University, known for his significant
						contributions in logic and computation.
					</p>
					<a href='https://example.com/rsvp-moshe-vardi' className='mt-4 text-blue-600 hover:text-blue-800'>
						RSVP to Dr. Vardi&apos;s Talk
					</a>
				</div>

				{/* <!-- Dr. Leslie Lamport --> */}
				<div className='card bg-base-100 shadow-xl p-4'>
					<h3 className='text-2xl font-semibold'>Dr. Leslie Lamport</h3>
					<p className='mt-2'>Date & Time: January 24th, 12pm EST.</p>
					<p className='mt-2'>Dr. Leslie Lamport, a Turing Award recipient, is renowned for his pioneering work in distributed systems and as the creator of LaTeX.</p>
					<a href='https://example.com/rsvp-leslie-lamport' className='mt-4 text-blue-600 hover:text-blue-800'>
						RSVP to Dr. Lamport&apos;s Talk
					</a>
				</div>

				{/* <!-- Dr. Noel Capon --> */}
				<div className='card bg-base-100 shadow-xl p-4'>
					<h3 className='text-2xl font-semibold'>Dr. Noel Capon</h3>
					<p className='mt-2'>Date & Time: January 31st, 9am EST.</p>
					<p className='mt-2'>
						Dr. Noel Capon is the R.C. Kopf Professor of International Marketing at Columbia Business School, known for his extensive work in marketing, sales, and strategic
						account management.
					</p>
					<a href='https://example.com/rsvp-noel-capon' className='mt-4 text-blue-600 hover:text-blue-800'>
						RSVP to Dr. Capon&apos;s Talk
					</a>
				</div>

				{/* <!-- Dr. Barbara Liskov --> */}
				<div className='card bg-base-100 shadow-xl p-4'>
					<h3 className='text-2xl font-semibold'>Dr. Barbara Liskov</h3>
					<p className='mt-2'>Date & Time: February 7th, 1pm EST.</p>
					<p className='mt-2'>
						Dr. Barbara Liskov is an Institute Professor at MIT and a Turing Award recipient, known for her work in programming languages and systems, including data abstraction,
						polymorphism, and distributed computing.
					</p>
					<a href='https://example.com/rsvp-barbara-liskov' className='mt-4 text-blue-600 hover:text-blue-800'>
						RSVP to Dr. Liskov&apos;s Talk
					</a>
				</div>

				{/* <!-- Dr. Nir Shavit --> */}
				<div className='card bg-base-100 shadow-xl p-4'>
					<h3 className='text-2xl font-semibold'>Dr. Nir Shavit</h3>
					<p className='mt-2'>Date & Time: February 14th, 9am EST.</p>
					<p className='mt-2'>
						Dr. Nir Shavit is a Professor at MIT, a member of the Computer Science and Artificial Intelligence Laboratory, known for his work in multi-core computation.
					</p>
					<a href='https://example.com/rsvp-nir-shavit' className='mt-4 text-blue-600 hover:text-blue-800'>
						RSVP to Dr. Shavit&apos;s Talk
					</a>
				</div>

				{/* <!-- Dr. Assaf Schuster --> */}
				<div className='card bg-base-100 shadow-xl p-4'>
					<h3 className='text-2xl font-semibold'>Dr. Assaf Schuster</h3>
					<p className='mt-2'>Date & Time: February 28th, 9am EST.</p>
					<p className='mt-2'>
						Dr. Assaf Schuster is a Professor at the Technion - Israel Institute of Technology, specializing in distributed and database systems, data streams, and cloud computing.
					</p>
					<a href='https://example.com/rsvp-assaf-schuster' className='mt-4 text-blue-600 hover:text-blue-800'>
						RSVP to Dr. Schuster&apos;s Talk
					</a>
				</div>

				{/* <!-- Dr. Jack Dongarra --> */}
				<div className='card bg-base-100 shadow-xl p-4'>
					<h3 className='text-2xl font-semibold'>Dr. Jack Dongarra</h3>
					<p className='mt-2'>Date & Time: March 13th, 12pm EST.</p>
					<p className='mt-2'>
						Dr. Jack Dongarra is a Distinguished Professor at the University of Tennessee, known for his expertise in numerical algorithms, parallel computing, and
						advanced-computer architectures.
					</p>
					<a href='https://example.com/rsvp-jack-dongarra' className='mt-4 text-blue-600 hover:text-blue-800'>
						RSVP to Dr. Dongarra&apos;s Talk
					</a>
				</div>

				{/* <!-- Dr. Jeffrey Ullman --> */}
				<div className='card bg-base-100 shadow-xl p-4'>
					<h3 className='text-2xl font-semibold'>Dr. Jeffrey Ullman</h3>
					<p className='mt-2'>Date & Time: TBD.</p>
					<p className='mt-2'>
						Dr. Jeffrey Ullman is a Professor Emeritus at Stanford University and a Turing Award recipient, known for his contributions to database theory, database systems, and
						formal language theory.
					</p>
					<a href='https://example.com/rsvp-jeffrey-ullman' className='mt-4 text-blue-600 hover:text-blue-800'>
						RSVP to Dr. Ullman&apos;s Talk
					</a>
				</div>

				{/* <!-- Dr. Edward Feigenbaum --> */}
				<div className='card bg-base-100 shadow-xl p-4'>
					<h3 className='text-2xl font-semibold'>Dr. Edward Feigenbaum</h3>
					<p className='mt-2'>Date & Time: TBD.</p>
					<p className='mt-2'>
						Dr. Edward Feigenbaum is a pioneer in artificial intelligence, known as the &apos;father of expert systems,&apos; and a joint winner of the 1994 ACM Turing Award.
					</p>
					<a href='https://example.com/rsvp-edward-feigenbaum' className='mt-4 text-blue-600 hover:text-blue-800'>
						RSVP to Dr. Feigenbaum&apos;s Talk
					</a>
				</div>
			</section>

			{/* Contact Information Section */}
			<section className='my-12'>
				<h2 className='text-3xl font-semibold'>Contact Information</h2>
				<div className='mt-4'>
					<p>If you have any inquiries or need further information, please don&apos;t hesitate to contact us:</p>
					<ul className='list-disc pl-6 mt-2'>
						<li>
							Zack Axel (Event Coordinator) -{' '}
							<a href='mailto:zaxel3@gatech.edu' className='text-blue-600 hover:text-blue-800'>
								zaxel3@gatech.edu
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
	);
}
