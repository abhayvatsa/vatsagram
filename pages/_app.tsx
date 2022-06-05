import { useState, useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import router from 'next/router';
import { initialize, logPageView } from '../lib/analytics';
import globalStyles from '../styles/globals';
import reset from '../styles/reset';
import colors from '../styles/colors';
import typography from '../styles/typography';
import { description, author, appleIcon } from '../config';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initialize();
    //logPageView() // Initial page view: router.replace() makes this not necessary
    router.events.on('routeChangeComplete', logPageView);
    router.replace(router.asPath); // This is a hack, because history isn't updating properly
  }, []);

  const [initialHistoryLength] = useState(
    process.browser ? window.history.length : 0
  );

  return (
    <>
      <style jsx global>
        {reset}
      </style>
      <style jsx global>
        {colors}
      </style>
      <style jsx global>
        {typography}
      </style>
      <style jsx global>
        {globalStyles}
      </style>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes={appleIcon.size}
          href={appleIcon.href}
        />
        <title>Vatsagram</title>
        <meta name="viewport" content="width=device-width" />
        <meta name="description" content={description} />
        <meta name="author" content={author} />
      </Head>
      <Component initialHistoryLength={initialHistoryLength} {...pageProps} />
    </>
  );
}
