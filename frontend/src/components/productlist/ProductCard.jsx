// import { Link } from "react-router-dom";

// export default function ProductCard({ product }) {
//   return (
//     <div className="bg-white shadow-md rounded-xl overflow-hidden transform hover:scale-105 transition duration-300">
//       <Link to={`/products/${product.id}`}>
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-full h-56 object-cover"
//         />
//         <div className="p-4">
//           <h3 className="font-bold text-lg">{product.name}</h3>
//           <p className="text-gray-500">₹{product.price}</p>
//         </div>
//       </Link>
//     </div>
//   );
// }



import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover mb-4 rounded"
        />
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-palered font-bold">₹{product.price}</p>
      </Link>
    </div>
  );
}
