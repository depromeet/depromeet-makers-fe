/** @type {import('next').NextConfig} */
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  staticPageGenerationTimeout: 1000,
};

export default withSentryConfig(nextConfig, {
  org: 'sentry',
  project: 'depromeet',
  authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN,
  silent: false,
  unstable_sentryWebpackPluginOptions: {
    errorHandler: (err) => {
      console.warn(`Sentry CLI Plugin Error: ${err.message}`);
    },
  },
});
