import { useRouter } from 'next/router';
import Link from 'next/link';
import ChevronLeft from '../icons/ChevronLeft';

export default function BackButton({ isRouterBack }) {
  const { back } = useRouter();

  // if: "first" page: render a Next.js Link
  // else: use browser history back
  return isRouterBack ? (
    <ChevronLeft aria-label="Back" onClick={back} />
  ) : (
    <Link href="/" aria-label="Back">
      <ChevronLeft />
    </Link>
  );
}
