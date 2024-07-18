import Link from 'next/link';
import { Redirect } from 'next';

const Banner = () => {
  return (
    <div className="relative h-[350px] w-full  px-4 md:h-[605px] md:px-6 lg:px-8 xl:px-10 2xl:px-0">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <a
          href="https://dub.sh/together-ai"
          target="_blank"
          rel="noreferrer"
          className="mb-5 cursor-pointer rounded-2xl border border-black px-4 py-1 text-sm text-slate-600 transition duration-300 ease-in-out hover:text-slate-700 sm:text-base"
        >
          <span className="font-bold">A</span>rtificial{' '}
          <span className="font-bold">V</span>irtual{' '}
          <span className="font-bold">A</span>sistant{' '}
        </a>
        <h1 className="text-dark inline-block  from-white to-white/50  text-center text-5xl font-bold	 leading-0.5 lg:leading-25 tracking-wide lg:text-7xl">
          Your AI-Powered <br className="hidden lg:inline-block" />
          Virtual Assistant
        </h1>
        <p className="font-muted mt-8 text-center tracking-wide">
          AVA seamlessly converts your voice notes into{' '}
          <span className="">
            organized <br className="hidden lg:inline-block" />
            summaries
          </span>{' '}
          and <span className="">clear action items</span> using AI.
        </p>
     
      </div>
      {/* background gradient */}
      <div className="absolute bottom-0 left-0 right-0 top-0 z-[-1] hidden h-full w-full grid-cols-3 md:grid">
        <BackgroundGradient />
        <BackgroundGradient />
        <BackgroundGradient />
      </div>
    </div>
  );
};

function BackgroundGradient() {
  return (
    <div
      className="h-full w-full rounded-full"
      style={{
        opacity: '95.4',
        background:
          'radial-gradient(54.14% 54.14% at 50% 50%, #650293 10%, rgba(103, 2, 139, 0.02) 100%)',
        filter: 'blur(177px)',
      }}
    />
  );
}

export default Banner;