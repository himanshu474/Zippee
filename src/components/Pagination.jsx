export default function Pagination({ next, prev, onPageChange }) {
  return (
    <div className="flex justify-center gap-4 mt-8">
      <button
        onClick={() => onPageChange(prev)}
        disabled={!prev}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition"
      >
        Previous
      </button>
      <button
        onClick={() => onPageChange(next)}
        disabled={!next}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition"
      >
        Next
      </button>
    </div>
  );
}

