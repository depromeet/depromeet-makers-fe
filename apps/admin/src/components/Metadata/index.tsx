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
      <meta
        property="og:image"
        content="https://github.com/depromeet/depromeet-makers-fe/assets/49177223/02bd3b72-7d4b-45a8-ac7d-76bfabd3b9a9"
      />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="디프만" />
    </Head>
  );
};
