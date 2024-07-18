import Link from 'next/link';
import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import toast, { Toaster } from 'react-hot-toast';
import { Doc } from '@/convex/_generated/dataModel';

export default function RecordingMobile({
  note,
  actionItems,
}: {
  note: Doc<'notes'>;
  actionItems: Doc<'actionItems'>[];
}) {
  const { summary, transcription, title, _creationTime } = note;
  const [activeTab, setActiveTab] = useState<
    'transcript' | 'summary' | 'actionItems'
  >('transcript');

  const mutateActionItems = useMutation(api.notes.removeActionItem);

  function removeActionItem(actionId: any) {
    mutateActionItems({ id: actionId });
  }

  return (
    <div className="min-h-screen md:hidden">
      <div className="my-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {title ?? 'Untitled Note'}
        </h1>
      </div>
      <div className="flex justify-between border-b border-gray-200">
        <button
          onClick={() => setActiveTab('transcript')}
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            activeTab === 'transcript'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Transcript
        </button>
        <button
          onClick={() => setActiveTab('summary')}
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            activeTab === 'summary'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Summary
        </button>
        <button
          onClick={() => setActiveTab('actionItems')}
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            activeTab === 'actionItems'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Action Items
        </button>
      </div>
      <div className="p-4">
        {activeTab === 'transcript' && (
          <div className="text-gray-700">{transcription}</div>
        )}
        {activeTab === 'summary' && (
          <div className="text-gray-700">{summary}</div>
        )}
        {activeTab === 'actionItems' && (
          <div>
            <div className="space-y-4">
              {actionItems?.map((item) => (
                <div
                  key={item._id}
                  className="rounded-lg bg-white p-4 shadow-md"
                >
                  <div className="flex items-center">
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
                    <div className="ml-4">
                      <p className="text-base font-medium text-gray-900">
                        {item.task}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(Number(_creationTime)).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/dashboard/action-items"
                className="block w-full rounded-md bg-blue-600 px-4 py-3 text-center text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                View All Action Items
              </Link>
            </div>
          </div>
        )}
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}