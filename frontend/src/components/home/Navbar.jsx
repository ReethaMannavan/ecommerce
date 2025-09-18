

// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import { CartContext } from "../../context/CartContext";

// export default function Navbar() {
//   const { user, logoutUser } = useContext(AuthContext);
//   const { cartCount } = useContext(CartContext);

//   return (
//     <nav className="bg-darkslate text-white p-4 flex justify-between items-center shadow-md">
//       <Link to="/" className="text-2xl font-bold">🛒 MyShop</Link>

//       <div className="flex items-center space-x-6">
//         <Link to="/cart" className="relative">
//           <span className="text-xl">🛍</span>
//           {cartCount > 0 && (
//             <span className="absolute -top-2 -right-2 bg-palered text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//               {cartCount}
//             </span>
//           )}
//         </Link>

//         {user ? (
//           <>
//             <span className="mr-2">Hi, {user.username || user.email}</span>
//             <button onClick={logoutUser} className="bg-palered px-3 py-1 rounded hover:opacity-90">Logout</button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="px-3 py-1 border border-white rounded hover:bg-white hover:text-darkslate">Login</Link>
//             <Link to="/register" className="px-3 py-1 bg-palered rounded hover:opacity-90">Register</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }


import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";

export default function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);

  return (
    <nav className="bg-darkslate text-white p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold">🛒 MyShop</Link>

      <div className="flex items-center space-x-6">
        <Link to="/cart" className="relative">
          <span className="text-xl">🛍</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-palered text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
        {user ? (
          <>
            <span className="mr-2">Hi, {user.username || user.email}</span>
            <button onClick={logoutUser} className="bg-palered px-3 py-1 rounded hover:opacity-90 transition">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-3 py-1 border border-white rounded hover:bg-white hover:text-darkslate transition">Login</Link>
            <Link to="/register" className="px-3 py-1 bg-palered rounded hover:opacity-90 transition">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
