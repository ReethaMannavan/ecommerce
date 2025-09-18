// import { useContext, useState } from "react";
// import { CartContext } from "../../context/CartContext";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";

// export default function Checkout() {
//   const { cartItems, cartCount, clearCart } = useContext(CartContext);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     address: "",
//   });

//   // Calculate total safely
//   const total = Array.isArray(cartItems)
//     ? cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
//     : 0;

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

// const handlePlaceOrder = () => {
//   if (!formData.name || !formData.email || !formData.address) {
//     toast.error("Please fill all fields!");
//     return;
//   }

//   if (cartItems.length === 0) {
//     toast.error("Your cart is empty!");
//     return;
//   }

//   // Show success toast
//   toast.success("Order placed successfully!", { duration: 2000 });

//   // Clear the cart
//   clearCart();

//   // Reset form fields
//   setFormData({
//     name: "",
//     email: "",
//     address: "",
//   });

//   // Redirect to homepage after 2 seconds
//   setTimeout(() => {
//     navigate("/"); // homepage
//   }, 2000);
// };



//   if (cartItems.length === 0)
//     return (
//       <div className="p-8 text-center">
//         <p className="text-lg text-gray-500 mb-4">Your cart is empty</p>
//         <Link
//           to="/shop"
//           className="px-6 py-3 bg-darkslate text-white rounded-lg hover:opacity-90"
//         >
//           Continue Shopping
//         </Link>
//       </div>
//     );

//   return (
//     <div className="p-8 max-w-4xl mx-auto space-y-8">
//       <h2 className="text-2xl font-bold mb-6">Checkout</h2>

//       {/* Cart Items */}
//       <div className="space-y-4">
//         {cartItems.map((item) => (
//           <div
//             key={item.id}
//             className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
//           >
//             <div className="flex items-center gap-4">
//               <img
//                 src={item.product.image}
//                 alt={item.product.name}
//                 className="w-20 h-20 object-contain rounded"
//               />
//               <div>
//                 <h3 className="font-semibold">{item.product.name}</h3>
//                 <p className="text-sm text-gray-600">
//                   ₹{item.product.price} × {item.quantity}
//                 </p>
//               </div>
//             </div>
//             <p className="font-semibold">
//               ₹{(item.product.price * item.quantity).toFixed(2)}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Total */}
//       <div className="text-right font-bold text-xl">
//         Total: ₹{total.toFixed(2)}
//       </div>

//       {/* Shipping Form */}
//       <div className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />
//         <textarea
//           name="address"
//           placeholder="Shipping Address"
//           value={formData.address}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           rows={4}
//         />
//         <button
//           onClick={handlePlaceOrder}
//           className="w-full bg-green-600 text-white px-4 py-2 rounded hover:opacity-90 font-semibold"
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// }


import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const total = Array.isArray(cartItems)
    ? cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
    : 0;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = () => {
    if (!formData.name || !formData.email || !formData.address) {
      toast.error("Please fill all fields!");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    // ✅ Clear cart, reset form, navigate home
    clearCart();
    setFormData({ name: "", email: "", address: "" });
    toast.success("Order placed successfully!");
    navigate("/");
  };

  if (cartItems.length === 0)
    return (
      <div className="p-8 text-center">
        <p className="text-lg text-gray-500 mb-4">Your cart is empty</p>
      </div>
    );

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-contain rounded"
              />
              <div>
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-sm text-gray-600">
                  ₹{item.product.price} × {item.quantity}
                </p>
              </div>
            </div>
            <p className="font-semibold">
              ₹{(item.product.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="text-right font-bold text-xl">Total: ₹{total.toFixed(2)}</div>

      {/* Shipping Form */}
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="address"
          placeholder="Shipping Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={4}
        />
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-green-600 text-white px-4 py-2 rounded hover:opacity-90 font-semibold"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
