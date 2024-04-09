import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="container mx-auto my-5 flex h-16 flex-col items-center justify-between space-y-3 border-t px-3 pt-4 text-center sm:h-20 sm:flex-row sm:pt-2 md:text-lg">
      <div>
        Powered by{' '}
        <a
          href="https://www.convex.dev"
          target="_blank"
          className="font-bold transition hover:text-black/50"
        >
          Convex,{' '}
        </a>
        <a
          href="https://dub.sh/together-ai"
          target="_blank"
          className="font-bold transition hover:text-black/50"
        >
          Together
        </a>
        , and{' '}
        <a
          href="https://www.replicate.com"
          target="_blank"
          className="font-bold transition hover:text-black/50"
        >
          Replicate
        </a>
      </div>
     
    </footer>
  );
}
