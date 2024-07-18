import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import Link from 'next/link';

const RecordedfileItemCard = ({
  title,
  count,
  _creationTime,
  _id,
}: {
  title?: string;
  count: number;
  _creationTime: number;
  _id: any;
}) => {
  const deleteNote = useMutation(api.notes.removeNote);

  return (
    <Link href={`/dashboard/recording/${_id}`} className="mx-2 mb-5 flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-all hover:scale-[1.01]">
    <div className="flex items-center gap-4">
      <div className="hidden items-center justify-center rounded-full bg-purple-500 p-2.5 md:flex">
        <img src="/icons/file_symbol.svg" width={20} height={20} alt="file" className="h-5 w-5" />
      </div>
      <p className="text-lg font-medium text-gray-900 md:text-xl lg:text-2xl">{title}</p>
    </div>
    <div className="flex items-center gap-x-8">
      <h3 className="hidden text-sm font-light text-gray-500 md:inline-block md:text-base">
        {new Date(_creationTime).toDateString()}
      </h3>
      <h3 className="hidden text-sm font-light text-gray-500 md:inline-block md:text-base">
        {count} tasks
      </h3>
      <button
        onClick={(e) => {
          e.preventDefault();
          deleteNote({ id: _id });
        }}
        className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 p-2 text-red-700 transition-all hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        <img src={'/icons/delete.svg'} alt="delete" width={20} height={20} />
      </button>
    </div>
  </Link>
  );
};

export default RecordedfileItemCard;