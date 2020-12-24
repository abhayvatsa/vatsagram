import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <style jsx>{`
        main {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
      `}</style>
      <main>
        <h2>Not Found</h2>
        <p>Sorry, there is nothing at this URL.</p>
        <p>
          <Link href="/">
            <a aria-label="Back to Home">Go back home</a>
          </Link>
        </p>
      </main>
    </>
  )
}
