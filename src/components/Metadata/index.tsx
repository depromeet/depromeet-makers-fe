import Head from 'next/head';

interface MetadataProps {
  title?: string;
  description?: string;
}

export const Metadata = ({ title = '디프만 메이커스', description = '디프만 메이커스' }: MetadataProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://makers.depromeet.com/login" />
      <meta property="og:title" content={title} />
      <meta property="og:image" content="/assets/images/og-image.png" />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="디프만" />
    </Head>
  );
};
