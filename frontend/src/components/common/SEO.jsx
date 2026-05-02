import React from 'react';
import { Helmet } from 'react-helmet-async';

const defaultDescription =
  'IdeaForge is a MERN SaaS workspace for projects, tasks, teams, meetings, reports, search, notifications, and Google productivity integrations.';
const siteUrl = import.meta.env.VITE_PUBLIC_APP_URL || 'https://crmideaforge.onrender.com';

export default function SEO({
  title = 'IdeaForge | MERN SaaS Project Workspace',
  description = defaultDescription,
  path = '/',
}) {
  const url = `${siteUrl}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="IdeaForge" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href={url} />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'IdeaForge',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          description,
          url,
        })}
      </script>
    </Helmet>
  );
}
