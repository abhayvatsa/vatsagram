import { useState, useEffect } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import { initialize, logPageView } from '../lib/analytics'
import globalStyles from '../styles/globals.css'
import reset from '../styles/reset.css'
import colors from '../styles/colors.css'
import typography from '../styles/typography.css'
import { description, author, appleIcon } from '../config'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initialize()
    //logPageView() // Initial page view: router.replace() makes this not necessary
    Router.events.on('routeChangeComplete', logPageView)
  }, [])

  const [initialHistoryLength] = useState(
    process.browser ? window.history.length : 0
  )

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
  )
}
