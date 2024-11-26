import { SitemapStream } from 'sitemap';
import { createWriteStream } from 'fs';

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/calculator', changefreq: 'weekly', priority: 0.8 },
  { url: '/about', changefreq: 'monthly', priority: 0.5 },
];

const sitemapPath = './public/sitemap.xml';

// Create the stream to write the sitemap
const writeStream = createWriteStream(sitemapPath);
const sitemap = new SitemapStream({ hostname: 'https://duocompensatie.nl' });

// Pipe the sitemap stream to the write stream
sitemap.pipe(writeStream);

// Write links to the sitemap
links.forEach((link) => sitemap.write(link));

// Close the stream
sitemap.end();

writeStream.on('finish', () => {
  console.log('Sitemap created successfully:', sitemapPath);
});

writeStream.on('error', (err) => {
  console.error('Error writing sitemap:', err);
});
