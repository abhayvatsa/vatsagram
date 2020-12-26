import ReactGA, { EventArgs } from 'react-ga'
import { gaTrackingId, domainName } from '../config'

const isProduction = (() => {
  const regex = new RegExp(domainName + '$') // ensure domain name includes top-level domain
  const hostname = process.browser ? window?.location?.hostname : ''
  return regex.test(hostname)
})()

export function initialize() {
  if (isProduction) ReactGA.initialize(gaTrackingId)
}

export function logPageView(pathname = window.location.pathname) {
  if (isProduction) ReactGA.pageview(pathname)
}

export function logEvent(_args: EventArgs) {}

export function logException() {}
