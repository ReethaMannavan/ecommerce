// import { createContext, useState, useEffect, useContext } from "react";
// import API from "../api/api";
// import { AuthContext } from "./AuthContext";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const { authTokens } = useContext(AuthContext);
//   const [cartItems, setCartItems] = useState([]); // always array
//   const [cartCount, setCartCount] = useState(0);

//   // Fetch cart from API
//   const fetchCart = async () => {
//     if (!authTokens) {
//       setCartItems([]);
//       setCartCount(0);
//       return;
//     }
//     try {
//       const res = await API.get("cart/", {
//         headers: { Authorization: `Bearer ${authTokens.access}` },
//       });
//       const items = Array.isArray(res.data) ? res.data : [];
//       setCartItems(items);
//       setCartCount(items.length);
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//       setCartItems([]);
//       setCartCount(0);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [authTokens]);

//   // Add product to cart
//   const addToCart = async (productId, quantity = 1) => {
//     if (!authTokens) throw new Error("Not authenticated");

//     try {
//       const res = await API.post(
//         "cart/",
//         { product_id: productId, quantity },
//         { headers: { Authorization: `Bearer ${authTokens.access}` } }
//       );

//       setCartItems(prev => {
//         const safePrev = Array.isArray(prev) ? prev : [];
//         const exists = safePrev.find(item => item.id === res.data.id);
//         if (exists) {
//           // Update existing
//           return safePrev.map(item => (item.id === res.data.id ? res.data : item));
//         }
//         // Add new
//         return [...safePrev, res.data];
//       });

//       setCartCount(prev => (prev || 0) + 1);
//     } catch (err) {
//       console.error("Error adding to cart:", err);
//       throw err;
//     }
//   };

//   // Remove product from cart
//   const removeFromCart = async (cartItemId) => {
//     if (!authTokens) throw new Error("Not authenticated");

//     try {
//       await API.delete(`cart/${cartItemId}/`, {
//         headers: { Authorization: `Bearer ${authTokens.access}` },
//       });
//       setCartItems(prev => {
//         const safePrev = Array.isArray(prev) ? prev : [];
//         return safePrev.filter(item => item.id !== cartItemId);
//       });
//       setCartCount(prev => Math.max((prev || 1) - 1, 0));
//     } catch (err) {
//       console.error("Error removing from cart:", err);
//     }
//   };

//   // Update quantity
//   const updateCartItem = async (cartItemId, quantity) => {
//     if (!authTokens) throw new Error("Not authenticated");
//     if (quantity < 1) return;

//     try {
//       const res = await API.patch(
//         `cart/${cartItemId}/`,
//         { quantity },
//         { headers: { Authorization: `Bearer ${authTokens.access}` } }
//       );
//       setCartItems(prev => {
//         const safePrev = Array.isArray(prev) ? prev : [];
//         return safePrev.map(item => (item.id === cartItemId ? res.data : item));
//       });
//     } catch (err) {
//       console.error("Error updating cart item:", err);
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         cartCount,
//         fetchCart,
//         addToCart,
//         removeFromCart,
//         updateCartItem,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };


import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i
        );
      } else {
        return [...prev, { id: Date.now(), product, quantity: qty }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateCartItem = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: newQty } : i))
    );
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

   const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateCartItem, cartCount,  clearCart, }}
    >
      {children}
    </CartContext.Provider>
  );
};
