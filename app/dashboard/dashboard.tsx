'use client';

import RecordedfileItemCard from '@/components/pages/dashboard/RecordedfileItemCard';
import { api } from '@/convex/_generated/api';
import { usePreloadedQueryWithAuth } from '@/lib/hooks';
import { Preloaded, useAction } from 'convex/react';
import { FunctionReturnType } from 'convex/server';
import Image from 'next/image';
import Link from 'next/link';
import { Children, useState } from 'react';
import CustomButton from '@/components/CustomButton';

export default function DashboardHomePage({
  preloadedNotes,
}: {
  preloadedNotes: Preloaded<typeof api.notes.getNotes>;
}) {
  const allNotes = usePreloadedQueryWithAuth(preloadedNotes);
  const [searchQuery, setSearchQuery] = useState('');
  const [relevantNotes, setRelevantNotes] =
    useState<FunctionReturnType<typeof api.notes.getNotes>>();

  const performMyAction = useAction(api.together.similarNotes);

  const handleSearch = async (e: any) => {
    e.preventDefault();

    console.log({ searchQuery });
    if (searchQuery === '') {
      setRelevantNotes(undefined);
    } else {
      const scores = await performMyAction({ searchQuery: searchQuery });
      const scoreMap: Map<string, number> = new Map();
      for (const s of scores) {
        scoreMap.set(s.id, s.score);
      }
      const filteredResults = allNotes.filter(
        (note) => (scoreMap.get(note._id) ?? 0) > 0.6,
      );
      setRelevantNotes(filteredResults);
    }
  };

  const finalNotes = relevantNotes ?? allNotes;

  return (
    <div
      suppressHydrationWarning={true}
      className="mt-5 min-h-screen w-full justify-center p-4 text-center"
    >
      <div className=" w-full py-[23px] md:py-4 lg:py-[25px]">
        <h2 className="text-center text-black text-2xl">Your Recordings</h2>
      </div>
      {/* search bar */}
      <div className="mx-auto mb-10 mt-4 flex h-fit w-[90%] items-center gap-[17px] rounded border border-black bg-white px-[11px] py-[10px] sm:px-[15px] md:mb-[42px] md:w-[623px] md:px-[40px] md:py-[10px]">
        <Image
          src="/icons/search.svg"
          width={27}
          height={26}
          alt="search"
          className="h-5 w-5 md:h-6 md:w-6"
        />
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            className="w-full text-[16px] outline-none md:text-xl"
          />
        </form>
      </div>
      {/* recorded items */}
      <div className="bg-dark-8 h-fit w-full  max-w-[900px] md:px-5 xl:mx-auto">
        {finalNotes &&
          finalNotes.map((item, index) => (
            <RecordedfileItemCard {...item} key={index} />
          ))}
        {finalNotes.length === 0 && (
          <div className="flex h-[50vh] w-full items-center justify-center">
            <p className="text-dark text-center text-2xl">
              You currently have no <br /> recordings.
            </p>
          </div>
        )}
      </div>
      {/* actions button container */}
      <div className="mx-auto mt-[40px] flex h-fit w-full items-center justify-center px-5 pb-10 md:mt-[50px] lg:pb-5">
        <div className="flex space-x-4">
          <CustomButton href="/record">
            <span>Record a Voice Note</span>
          </CustomButton>
          {allNotes && (
            <CustomButton href="/dashboard/action-items">
              <span>View Action Items</span>
            </CustomButton>
          )}
        </div>
      </div>
    </div>
  );
}