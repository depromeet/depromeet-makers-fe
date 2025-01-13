/** @type {import('next').NextConfig} */
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

export default withSentryConfig(nextConfig, {
  org: 'depromeet',
  project: 'depromeet',
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: false,
});
