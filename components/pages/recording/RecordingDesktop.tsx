import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import { formatTimestamp } from '@/lib/utils';
import { useMutation } from 'convex/react';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function RecordingDesktop({
  note,
  actionItems,
}: {
  note: Doc<'notes'>;
  actionItems: Doc<'actionItems'>[];
}) {
  const {
    generatingActionItems,
    generatingTitle,
    summary,
    transcription,
    title,
    _creationTime,
  } = note;
  const [originalIsOpen, setOriginalIsOpen] = useState<boolean>(true);

  const mutateActionItems = useMutation(api.notes.removeActionItem);

  function removeActionItem(actionId: any) {
    // Trigger a mutation to remove the item from the list
    mutateActionItems({ id: actionId });
  }

  return (
    <div className="hidden md:block">
      <div className="max-width mt-5 flex items-center justify-between">
        <div />
        <h1
          className={`leading text-dark text-center text-xl font-medium leading-[114.3%] tracking-[-0.75px] md:text-[35px] lg:text-[43px] ${
            generatingTitle && 'animate-pulse'
          }`}
        >
          {generatingTitle ? 'Generating Title...' : title ?? 'Untitled Note'}
        </h1>
        <div className="flex items-center justify-center">
          <p className="text-lg opacity-80">
            {formatTimestamp(Number(_creationTime))}
          </p>
        </div>
      </div>
      <div className="mt-[18px] grid h-fit w-full grid-cols-2 px-[30px] py-[19px] lg:px-[45px]">
        <div className="flex w-full items-center justify-center gap-[50px] border-r  lg:gap-[70px]">
          <div className="flex items-center gap-4">
            <button
              className={`text-dark text-xl leading-[114.3%] tracking-[-0.6px] lg:text-2xl ${
                originalIsOpen ? 'opacity-100' : 'opacity-40'
              } transition-all duration-300`}
            >
              Transcript
            </button>
            <div
              onClick={() => setOriginalIsOpen(!originalIsOpen)}
              className="bg-dark flex h-[20px] w-[36px] cursor-pointer items-center rounded-full px-[1px]"
            >
              <div
                className={`bg-light h-4 w-4 rounded-[50%] ${
                  originalIsOpen ? 'translate-x-1' : 'translate-x-[18px]'
                } transition-all duration-300`}
              />
            </div>
            <button
              className={`text-dark text-xl leading-[114.3%] tracking-[0.6px] lg:text-2xl ${
                !originalIsOpen ? 'opacity-100' : 'opacity-40'
              } transition-all duration-300`}
            >
              Summary
            </button>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-dark text-xl leading-[114.3%] tracking-[-0.75px] lg:text-2xl xl:text-[30px]">
            Action Items
          </h1>
        </div>
      </div>

      <div className="grid h-full w-full grid-cols-2 px-[30px] lg:px-[45px]">
        <div className="relative min-h-[70vh] w-full border-r px-5 py-3 text-justify text-xl font-[300] leading-[114.3%] tracking-[-0.6px] lg:text-2xl">
          {transcription ? (
            <div className="">{originalIsOpen ? transcription : summary}</div>
          ) : (
            // Loading state for transcript
            <ul className="animate-pulse space-y-3">
              <li className="h-6 w-full rounded-full bg-gray-200 dark:bg-gray-700"></li>
              <li className="h-6 w-full rounded-full bg-gray-200 dark:bg-gray-700"></li>
              <li className="h-6 w-full rounded-full bg-gray-200 dark:bg-gray-700"></li>
              <li className="h-6 w-full rounded-full bg-gray-200 dark:bg-gray-700"></li>
              <li className="h-6 w-full rounded-full bg-gray-200 dark:bg-gray-700"></li>
            </ul>
          )}
        </div>

        {/* start action items div */}
        <div className="relative mx-auto mt-[10px] w-full max-w-[900px] px-5 md:mt-[45px]">
          {generatingActionItems
            ? [0, 1, 3].map((item: any, idx: number) => (
                <div
                  className="animate-pulse border-[#00000033] py-1 md:border-t-[1px] md:py-2"
                  key={idx}
                >
                  <div className="flex w-full justify-center">
                    <div className="text-white group w-full items-center rounded p-2 text-lg font-[300] transition-colors duration-300 checked:text-gray-300  md:text-2xl">
                      <div className="flex items-center">
                        <input
                          disabled
                          type="checkbox"
                          checked={false}
                          className="mr-4 h-5 w-5 cursor-pointer rounded-sm border-2 border-gray-300"
                        />
                        <label className="h-5 w-full rounded-full text-white bg-gray-200" />
                      </div>
                      <div className="flex justify-between md:mt-2">
                        <p className="text-white ml-9 text-[15px] font-[300] leading-[249%] tracking-[-0.6px] opacity-60 md:inline-block md:text-xl lg:text-xl">
                          {new Date(Number(_creationTime)).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : actionItems?.map((item: any, idx: number) => (
                <div className="" key={idx}>
                  <div className="mx-2 space-x-4 flex items-center rounded-lg mb-5 justify-between pl-3 backdrop-blur-sm bg-purple-200/30 border-4 border-purple-200/20 backdrop-filter">
                    <div className=" group w-full items-center rounded p-2 text-lg font-[300] transition-colors duration-300 checked:text-gray-300 text-white md:text-2xl">
                      <div className="flex text-white items-center">
                        <input
                          onChange={(e) => {
                            if (e.target.checked) {
                              removeActionItem(item._id);
                              toast.success('1 task completed.');
                            }
                          }}
                          type="checkbox"
                          checked={false}
                          className="mr-4 h-5 w-5 cursor-pointer rounded-sm border-2 border-gray-300"
                        />
                        {/* Action Item Title Start */}
                        <label className="text-white"><p>{item?.task}</p></label>
                          {/* Action Item Title Finish */}
                      </div>

                      {/* Action Item Date Start */}
                      <div className="flex justify-between md:mt-2">
                        <p className="text-white ml-9  tracking-[-0.6px] opacity-60 md:inline-block md:text-xl lg:text-xl">
                          {new Date(Number(_creationTime)).toLocaleDateString()}
                        </p>
                      </div>
                      {/* Action Item Date Start */}
                    </div>
                  </div>
                </div>
              ))}

          {/* Start view all action items button */}
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center justify-center">
            <Link
              className="bg-dark text-light rounded-[7px] px-5 py-[15px] text-[17px] leading-[79%] tracking-[-0.75px] md:text-xl lg:px-[37px]"
              style={{ boxShadow: ' 0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
              href="/dashboard/action-items"
            >
              View All Action Items
            </Link>
          </div>
          {/* End view all action items button */}
        </div>
        {/* end action items div */}
      </div>
    </div>
  );
}
