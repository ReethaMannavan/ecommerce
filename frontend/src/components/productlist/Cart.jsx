

// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import { CartContext } from "../../context/CartContext";

// export default function Cart() {
//   const { cartItems, removeFromCart, updateCartItem } = useContext(CartContext);

//   // Calculate total safely
//   const total = Array.isArray(cartItems)
//     ? cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
//     : 0;

//   return (
//     <div className="p-8 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

//       {cartItems.length === 0 ? (
//         <div className="text-center py-20">
//           <p className="text-lg text-gray-500 mb-4">Your cart is empty</p>
//           <Link
//             to="/shop"
//             className="px-6 py-3 bg-darkslate text-white rounded-lg hover:opacity-90"
//           >
//             Continue Shopping
//           </Link>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {cartItems.map((item) => (
//             <div
//               key={item.id}
//               className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
//             >
//               {/* Product info */}
//               <div className="flex items-center gap-4">
//                 <img
//                   src={item.product.image}
//                   alt={item.product.name}
//                   className="w-20 h-20 object-contain rounded"
//                 />
//                 <div>
//                   <h3 className="font-semibold">{item.product.name}</h3>
//                   <p className="text-sm text-gray-600">₹{item.product.price}</p>
//                 </div>
//               </div>

//               {/* Quantity controls */}
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => updateCartItem(item.id, item.quantity - 1)}
//                   className="px-2 py-1 border rounded hover:bg-gray-100"
//                 >
//                   −
//                 </button>
//                 <span className="px-3">{item.quantity}</span>
//                 <button
//                   onClick={() => updateCartItem(item.id, item.quantity + 1)}
//                   className="px-2 py-1 border rounded hover:bg-gray-100"
//                 >
//                   +
//                 </button>
//               </div>

//               {/* Subtotal + Remove */}
//               <div className="text-right">
//                 <p className="font-semibold">
//                   ₹{(item.product.price * item.quantity).toFixed(2)}
//                 </p>
//                 <button
//                   onClick={() => removeFromCart(item.id)}
//                   className="text-red-500 text-sm hover:underline"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}

//           {/* Total + Checkout */}
//           <div className="mt-8 flex justify-between items-center border-t pt-4">
//             <h3 className="font-bold text-xl">Total: ₹{total.toFixed(2)}</h3>
//             <Link
//               to="/checkout"
//               className="px-6 py-3 bg-palered rounded-lg text-white font-semibold hover:opacity-90"
//             >
//               Checkout
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, updateCartItem } = useContext(CartContext);

  // Total calculation
  const total = Array.isArray(cartItems)
    ? cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
    : 0;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-gray-500 mb-4">Your cart is empty</p>
          <Link
            to="/shop"
            className="px-6 py-3 bg-darkslate text-white rounded-lg hover:opacity-90"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
            >
              {/* Product info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-contain rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-sm text-gray-600">₹{item.product.price}</p>
                </div>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateCartItem(item.id, item.quantity - 1)}
                  className="px-2 py-1 border rounded hover:bg-gray-100"
                >
                  −
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  onClick={() => updateCartItem(item.id, item.quantity + 1)}
                  className="px-2 py-1 border rounded hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              {/* Subtotal + Remove */}
              <div className="text-right">
                <p className="font-semibold">
                  ₹{(item.product.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total + Checkout */}
          <div className="mt-8 flex justify-between items-center border-t pt-4">
            <h3 className="font-bold text-xl">Total: ₹{total.toFixed(2)}</h3>
            <Link
              to="/checkout"
              className="px-6 py-3 bg-green-500 rounded-lg text-white font-semibold hover:opacity-90"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
