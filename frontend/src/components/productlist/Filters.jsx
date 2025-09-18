// export default function Filters({ categories, setCategory, setSort }) {
//   return (
//     <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
//       {/* Category Filter */}
//       <select
//         onChange={(e) => setCategory(e.target.value)}
//         className="p-2 border rounded"
//       >
//         <option value="">All Categories</option>
//         {Array.isArray(categories) &&
//           categories.map((cat) => (
//             <option key={cat.id} value={cat.id}>
//               {cat.name}
//             </option>
//           ))}
//       </select>

//       {/* Sort */}
//       <select
//         onChange={(e) => setSort(e.target.value)}
//         className="p-2 border rounded"
//       >
//         <option value="">Sort By</option>
//         <option value="price">Price (Low → High)</option>
//         <option value="-price">Price (High → Low)</option>
//         <option value="-rating">Top Rated</option>
//       </select>
//     </div>
//   );
// }


export default function Filters({ categories, category, setCategory, sort, setSort }) {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
      {/* Category Filter */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">All Categories</option>
        {Array.isArray(categories) &&
          categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
      </select>

      {/* Sort Filter */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">Sort By</option>
        <option value="price">Price (Low → High)</option>
        <option value="-price">Price (High → Low)</option>
        <option value="-rating">Top Rated</option>
      </select>
    </div>
  );
}
