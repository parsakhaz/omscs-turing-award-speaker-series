import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Image from "next/legacy/image";
import Link from 'next/link';
import speakersData from '../../data/speakersData2024.json';
import React from 'react';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = speakersData.map((speaker, index) => ({
    params: { id: index.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const speaker = speakersData[Number(params?.id)];
  return { props: { speaker } };
};

const SpeakerPage = ({ speaker }: { speaker: any }) => {
  const [daysUntil, setDaysUntil] = React.useState<number | null>(null);

  React.useEffect(() => {
    const getDaysUntil = () => {
      const today = new Date();
      const talkDate = new Date(speaker.isoDate);
      const timeDiff = talkDate.getTime() - today.getTime();
      return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    };
    setDaysUntil(getDaysUntil());
  }, [speaker.isoDate]);

  return (
    <>
      <Head>
        <title>{speaker.name} - Turing Minds Speaker Series</title>
        <meta name="description" content={speaker.description} />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{speaker.name}</h1>
        <div className="mb-4">
          <Image src={speaker.speakerPhoto} width={200} height={200} alt={speaker.name} />
        </div>
        <p className="mb-4">{speaker.dateTime}</p>
        <p className="mb-4">{speaker.description}</p>
        {speaker.turingAwardWinner && (
          <p className="mb-4">
            <a href={speaker.turingLink} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
              Turing Award Recipient
            </a>
          </p>
        )}
        {daysUntil !== null && (
          <a 
            href={daysUntil > 0 ? speaker.rsvpLink : speaker.recordingLink}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            target="_blank"
            rel="noopener noreferrer"
          >
            {daysUntil > 0 ? 'RSVP' : 'Watch Recording'}
          </a>
        )}
      </div>
    </>
  );
};

export default SpeakerPage;