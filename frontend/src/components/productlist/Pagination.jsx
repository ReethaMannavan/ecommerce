// export default function Pagination({ page, setPage, hasNext, hasPrev }) {
//   return (
//     <div className="flex justify-center items-center space-x-4 mt-6">
//       <button
//         disabled={!hasPrev}
//         onClick={() => setPage((p) => p - 1)}
//         className="px-4 py-2 bg-darkslate text-white rounded disabled:opacity-50"
//       >
//         Prev
//       </button>
//       <span>Page {page}</span>
//       <button
//         disabled={!hasNext}
//         onClick={() => setPage((p) => p + 1)}
//         className="px-4 py-2 bg-darkslate text-white rounded disabled:opacity-50"
//       >
//         Next
//       </button>
//     </div>
//   );
// }


export default function Pagination({ page, setPage, hasNext, hasPrev }) {
  // For simple pagination, show current page and next 2 pages
  const visiblePages = [page];
  if (hasNext) visiblePages.push(page + 1);
  if (hasNext && visiblePages.length < 3) visiblePages.push(page + 2);

  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      <button
        disabled={!hasPrev}
        onClick={() => setPage((p) => p - 1)}
        className="px-3 py-1 bg-darkslate text-white rounded disabled:opacity-50"
      >
        Prev
      </button>

      {visiblePages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`px-3 py-1 rounded ${
            p === page ? "bg-palered text-white" : "bg-gray-200 text-darkslate"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        disabled={!hasNext}
        onClick={() => setPage((p) => p + 1)}
        className="px-3 py-1 bg-darkslate text-white rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
