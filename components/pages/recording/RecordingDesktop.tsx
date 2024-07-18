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
    mutateActionItems({ id: actionId });
  }

  return (
    <div className="mx-10 hidden min-h-screen rounded border md:block">
      <div className="rounded-lg p-6 text-center  shadow-sm">
        <h2
          className={`mb-2 text-3xl font-bold text-gray-800 ${
            generatingTitle && 'animate-pulse'
          }`}
        >
          {generatingTitle ? 'Generating Title...' : title ?? 'Untitled Note'}
        </h2>
        <p className="text-lg text-gray-500">
          {formatTimestamp(Number(_creationTime))}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2  gap-2">
        <div className=" m-5 rounded-lg border  p-6">
          <div className="mb-4 flex items-center justify-between">
            <button
              className={`text-xl font-semibold ${
                originalIsOpen ? 'text-blue-600' : 'text-gray-500'
              }`}
              onClick={() => setOriginalIsOpen(true)}
            >
              Transcript
            </button>
            <div
              className="relative inline-block h-6 w-12 cursor-pointer rounded-full bg-gray-300"
              onClick={() => setOriginalIsOpen(!originalIsOpen)}
            >
              <div
                className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                  originalIsOpen ? 'translate-x-0' : 'translate-x-6'
                }`}
              />
            </div>
            <button
              className={`text-xl font-semibold ${
                !originalIsOpen ? 'text-blue-600' : 'text-gray-500'
              }`}
              onClick={() => setOriginalIsOpen(false)}
            >
              Summary
            </button>
          </div>
          <div className="text-lg text-gray-800">
            {transcription ? (
              <div>{originalIsOpen ? transcription : summary}</div>
            ) : (
              <div className="animate-pulse">
                <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />
                <div className="mb-2 h-4 w-full rounded bg-gray-200" />
                <div className="mb-2 h-4 w-5/6 rounded bg-gray-200" />
                <div className="h-4 w-1/2 rounded bg-gray-200" />
              </div>
            )}
          </div>
        </div>

        <div className=" m-5 rounded-lg border  p-6">
          <h3 className="mb-4 text-2xl font-bold text-gray-800">
            Action Items
          </h3>
          {generatingActionItems ? (
            <div className="space-y-4">
              {[0, 1, 2].map((item) => (
                <div key={item} className="flex items-center">
                  <div className="mr-4 h-4 w-4  rounded-full bg-gray-200" />
                  <div className="h-4 w-full rounded bg-gray-200" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {actionItems?.map((item) => (
                  <div
                    key={item._id}
                    className="hover:scale-10 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-transform duration-300"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <input
                          type="checkbox"
                          className="form-checkbox h-6 w-6 rounded-full border-2 border-gray-300 text-blue-600 transition duration-200 focus:ring-blue-500 focus:ring-opacity-50"
                          onChange={(e) => {
                            if (e.target.checked) {
                              removeActionItem(item._id);
                              toast.success('Task completed!');
                            }
                          }}
                        />
                      </div>
                      <div className="ml-4">
                        <p className="text-lg font-medium text-gray-900">
                          {item.task}
                        </p>
                        <div className="mt-2 flex items-center space-x-4">
                          <div className="flex items-center">
                            <svg
                              className="h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="ml-1 text-sm text-gray-500">
                              {new Date(
                                item._creationTime,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <svg
                              className="h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="ml-1 text-sm text-gray-500">
                             
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link
                  href="/dashboard/action-items"
                  className="rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  View All Action Items
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}