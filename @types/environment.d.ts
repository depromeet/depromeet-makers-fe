namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_DEPROMEET_GENERATION: string;
    NEXT_PUBLIC_MIXPANEL_ID: string;
    NEXT_PUBLIC_GOOGLE_ANALYTICS: string;
  }
}
