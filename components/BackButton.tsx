import { useRouter } from 'next/router'
import Link from 'next/link'
import ChevronLeft from '../icons/ChevronLeft'

const BackButton = function ({ isRouterBack }) {
  const { back } = useRouter()

  // if: "first" page: render a Next.js Link
  // else: use browser history back
  return isRouterBack ? (
    <ChevronLeft aria-label="Back" onClick={back} />
  ) : (
    <Link href="/">
      <a aria-label="Back">
        <ChevronLeft />
      </a>
    </Link>
  )
}

export default BackButton
