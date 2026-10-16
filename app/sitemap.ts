import type { MetadataRoute } from 'next';
import { siteUrl } from './site';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/waitlist', '/privacy'].map((path) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency: 'monthly',
  }));
}
