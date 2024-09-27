import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Image from "next/legacy/image";
import Link from 'next/link';
import advisorsData from '../../data/advisorsData2024.json';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = advisorsData.map((advisor, index) => ({
    params: { id: index.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const advisor = advisorsData[Number(params?.id)];
  return { props: { advisor } };
};

const AdvisorPage = ({ advisor }: { advisor: any }) => {
  return (
    <>
      <Head>
        <title>{advisor.name} - Turing Minds Advisor</title>
        <meta name="description" content={advisor.description} />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{advisor.name}</h1>
        <div className="mb-4">
          <Image src={advisor.speakerPhoto} width={200} height={200} alt={advisor.name} />
        </div>
        <p className="mb-4">{advisor.distinction}</p>
        <p className="mb-4">{advisor.description}</p>
        <a href={advisor.biographyLink} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
          Full Biography
        </a>
      </div>
    </>
  );
};

export default AdvisorPage;