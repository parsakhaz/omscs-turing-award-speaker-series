import { GetServerSideProps } from 'next';
import speakersData2023 from '../data/speakersData.json';
import speakersData2024 from '../data/speakersData2024.json';
import speakersData2025 from '../data/speakersData2025.json';
import speakersData2026 from '../data/speakersData2026.json';
import advisorsData from '../data/advisorsData2024.json';

const Sitemap = () => {};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = 'https://www.turing.rsvp';

  const staticPages = [
    { path: '', priority: '1.0', changefreq: 'weekly' },
    { path: '/2023', priority: '0.5', changefreq: 'yearly' },
    { path: '/sponsor', priority: '0.5', changefreq: 'monthly' },
  ];

  const allSpeakers = [...speakersData2026, ...speakersData2025, ...speakersData2024, ...speakersData2023];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((page) => {
          return `
            <url>
              <loc>${baseUrl}${page.path}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>${page.changefreq}</changefreq>
              <priority>${page.priority}</priority>
            </url>
          `;
        })
        .join('')}
      ${allSpeakers
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
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
