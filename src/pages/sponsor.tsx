import Head from 'next/head';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import { FaInfoCircle } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import JSConfetti from 'js-confetti';

export default function Sponsor() {
    const [confetti, setConfetti] = useState<JSConfetti | null>(null);
    const [contactClicked, setContactClicked] = useState(false);

    useEffect(() => {
        import('js-confetti').then((module) => {
            const JSConfetti = module.default;
            setConfetti(new JSConfetti());
        });
    }, []);

    const handleContactClick = () => {
        if (confetti) {
            confetti.addConfetti();
        }
        setContactClicked(true);
        setTimeout(() => setContactClicked(false), 3000); // Reset after 3 seconds
    };

    const sponsorTiers = [
        {
            name: 'Platinum Sponsor',
            amount: '$10,000+',
            benefits: [
                'Prominent logo placement on all event materials and our website',
                'Dedicated section on the website highlighting your support',
                'Recognition during event introductions and thank-yous',
                'Opportunity to provide a guest speaker for the series',
                'Everything in below tiers'
            ]
        },
        {
            name: 'Gold Sponsor',
            amount: '$5,000+',
            benefits: [
                'Logo on event materials and website sponsor page',
                'Mention in event communications and social media',
                'Opportunity to provide a guest speaker for the series',
                'Everything in below tiers'
            ]
        },
        {
            name: 'Silver Sponsor',
            amount: '$1,000+',
            benefits: [
                'Logo on the website sponsor page',
                'Acknowledgment in event emails and newsletters',
                'Inclusion in post-event press releases',
                'Opportunity to provide a guest speaker for the series',
                'Everything in below tiers'
            ]
        },
        {
            name: 'Bronze Sponsor',
            amount: '$500+',
            benefits: [
                'Logo on the website sponsor page',
                'Mention in event thank-you communications'
            ]
        }
    ];

    return (
        <div className='relative'>
            <Head>
                <title>Sponsorship Packages | Turing Minds Speaker Series</title>
                <meta
                    name='description'
                    content='Explore sponsorship opportunities for the Turing Minds Speaker Series. Support groundbreaking research and the future of technology.'
                />
            </Head>

            <NextSeo
                title='Sponsorship Packages | Turing Minds Speaker Series'
                description='Explore sponsorship opportunities for the Turing Minds Speaker Series. Support groundbreaking research and the future of technology.'
                canonical='https://turing.rsvp/sponsor'
                openGraph={{
                    url: 'https://turing.rsvp/sponsor',
                    title: 'Sponsorship Packages | Turing Minds Speaker Series',
                    description: 'Explore sponsorship opportunities for the Turing Minds Speaker Series. Support groundbreaking research and the future of technology.',
                    site_name: 'Turing Minds',
                }}
            />

            <div className='relative z-10'>
                <header className='min-h-screen flex flex-col relative'>
                    <div className='fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg md:relative md:bg-transparent md:backdrop-filter-none'>
                        <div className='text-center py-4 md:mb-16 md:pt-64'>
                            <Link href="/" className="absolute top-4 left-4 text-[#a4925a] hover:text-[#d4af37]">
                                ← Back to Homepage
                            </Link>
                            <motion.h1
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className='text-4xl md:text-6xl font-bold mb-2 md:mb-4 relative'
                            >
                                <span className='relative z-10'>Sponsorship Packages</span>
                            </motion.h1>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className='w-full justify-center max-w-4xl mx-auto bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg p-4 md:p-8 md:pl-24 mt-48 md:mt-16 md:static'
                    >
                        <h2 className='text-2xl md:text-3xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#a4925a] to-[#d4af37]'>Sponsorships and Visibility</h2>

                        <p className='ibm-plex-mono mb-6 md:mb-8 text-sm md:text-base'>
                            We are excited to announce that <a href="https://www.ai2incubator.com/" className="text-blue-600 hover:underline">AI2 Incubator</a> is a platinum sponsor for the Turing Minds Speaker Series. To further support our initiative and enhance collaboration, we offer the following sponsorship tiers:
                        </p>
                    </motion.div>
                </header>

                <section className='my-24 px-8'>
                    <div className='max-w-6xl mx-auto'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                            {sponsorTiers.map((tier, index) => (
                                <div key={index} className='bg-white rounded-lg shadow-lg p-6'>
                                    <h3 className='text-2xl font-semibold mb-4 text-[#a4925a]'>{tier.name}</h3>
                                    <p className='text-xl font-bold mb-4'>{tier.amount} in direct or indirect support</p>
                                    <ul className='list-disc pl-5 space-y-2'>
                                        {tier.benefits.map((benefit, benefitIndex) => (
                                            <li key={benefitIndex} className='ibm-plex-mono text-gray-700'>{benefit}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className='my-24 px-8'>
                    <div className='max-w-4xl mx-auto bg-white rounded-lg p-8'>
                        <h2 className='text-3xl font-semibold mb-6 text-[#a4925a]'>Become a Sponsor</h2>
                        <p className='ibm-plex-mono text-gray-800 mb-4'>
                            Interested in becoming a sponsor? We&apos;d love to hear from you! Please contact us for more information on how you can support the Turing Minds Speaker Series.
                        </p>
                        <Link href='/#contact' onClick={handleContactClick} className='outline-[#a4925a] outline px-4 py-2 italic hover:bg-[#a4925a] hover:text-white transition-colors duration-300 inline-block mt-4'>
                            Contact Us
                        </Link>
                        {contactClicked && <p className='text-[#a4925a] mt-4 ibm-plex-mono'>Thank you for your interest!</p>}
                    </div>
                </section>

                <footer className='my-12 text-center text-sm px-16'>
                    <p className='ibm-plex-mono'>© 2024 Turing Award Speaker Series. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}
