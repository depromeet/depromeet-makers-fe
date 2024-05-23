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
    </Head>
  );
};
