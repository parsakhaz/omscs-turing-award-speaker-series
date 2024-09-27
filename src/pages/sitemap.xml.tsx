import { GetServerSideProps } from 'next';
import speakersData from '../data/speakersData2024.json';
import advisorsData from '../data/advisorsData2024.json';

const Sitemap = () => {};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = 'https://turing.rsvp';

  const staticPages = [
    '',
    '/speakers',
    '/advisors',
    '/faq',
    '/contact',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((page) => {
          return `
            <url>
              <loc>${baseUrl}${page}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.7</priority>
            </url>
          `;
        })
        .join('')}
      ${speakersData
        .map((speaker) => {
          return `
            <url>
              <loc>${baseUrl}/speaker/${speaker.slug}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>0.8</priority>
            </url>
          `;
        })
        .join('')}
      ${advisorsData
        .map((advisor) => {
          return `
            <url>
              <loc>${baseUrl}/advisor/${advisor.slug}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.6</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;