import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  schemaData?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Memories - Relive Your College Fest Moments | Retro Photo Gallery",
  description = "Memories is a vintage-inspired web app for storing and browsing college fest photos. Discover polaroid-style memories, upcoming events, and relive your golden college moments.",
  keywords = "college fest photos, vintage photo gallery, polaroid memories, student events, college moments, retro photo album",
  image = "https://lovable.dev/opengraph-image-p98pqg.png",
  url = "https://memories-app.lovable.app/",
  type = "website",
  schemaData
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="Memories - Vintage college fest photo gallery" />
      <meta property="og:site_name" content="Memories - College Fest Gallery" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:image:alt" content="Memories vintage photo gallery interface" />
      
      {/* Structured Data */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;