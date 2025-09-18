

// import { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import API from "../../api/api";
// import { AuthContext } from "../../context/AuthContext";
// import { CartContext } from "../../context/CartContext";

// export default function ProductDetail() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const { user } = useContext(AuthContext);
//   const { addToCart } = useContext(CartContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await API.get(`products/${id}/`);
//         setProduct(res.data);
//       } catch (err) {
//         console.error("Error fetching product:", err);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   const handleAddToCart = async () => {
//     if (!user) {
//       toast.error("Please login to add products to cart!", {
//         duration: 2000,
//         position: "top-center",
//       });
//       setTimeout(() => navigate("/login"), 2000);
//       return;
//     }
//     try {
//       await addToCart(product.id, 1);
//       toast.success("Product added to cart!", { duration: 2000, position: "top-center" });
//     } catch {
//       toast.error("Failed to add product to cart", { duration: 2000, position: "top-center" });
//     }
//   };

//   if (!product) return <p className="p-8">Loading product...</p>;

//   return (
//     <div className="p-8 flex flex-col md:flex-row gap-8">
//       <div className="w-full md:w-1/2 h-96 overflow-hidden rounded-lg">
//         <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
//       </div>
//       <div className="flex-1">
//         <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
//         <p className="mb-4">{product.description}</p>
//         <p className="text-xl font-semibold mb-4">₹{product.price}</p>
//         <p className="mb-4">Category: {product.category}</p>
//         <p className="mb-4">Stock: {product.stock}</p>
//         <button
//           onClick={handleAddToCart}
//           className="bg-darkslate text-white px-4 py-2 rounded hover:opacity-90"
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import API from "../../api/api";
import { CartContext } from "../../context/CartContext";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`products/${id}/`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    // ✅ Pass full product object
    addToCart(product, 1);
    toast.success("Added to cart!", { duration: 1500 });
    navigate("/cart"); // optional: go to cart page
  };

  if (!product) return <p className="p-8">Loading product...</p>;

  return (
    <div className="p-8 flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2 h-96 overflow-hidden rounded-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="mb-4">{product.description}</p>
        <p className="text-xl font-semibold mb-4">₹{product.price}</p>
        <p className="mb-4">Category: {product.category}</p>
        <p className="mb-4">Stock: {product.stock}</p>
        <button
          onClick={handleAddToCart}
          className="bg-darkslate text-white px-4 py-2 rounded hover:opacity-90"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
