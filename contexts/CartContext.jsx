import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { db } from "../firebaseConfig";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = async (item, userId) => {
    if (!userId) {
      alert("You must be logged in!");
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "carts"), {
        userId,
        item,
        addedAt: new Date(),
      });
      alert(`${item} added to cart!`);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      alert("Failed to add to cart.");
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await deleteDoc(doc(db, "carts", cartItemId));
      alert("Item removed from cart!");
    } catch (error) {
      console.error("Failed to remove item:", error);
      alert("Failed to remove item.");
    }
  };

  const clearCart = async (userId) => {
    try {
      const q = query(collection(db, "carts"), where("userId", "==", userId));
      const snapshot = await getDocs(q);
      snapshot.forEach(async (docItem) => {
        await deleteDoc(doc(db, "carts", docItem.id));
      });
      alert("Cart cleared!");
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  // Real-time listener for all cart items
  const subscribeToCart = (userId) => {
    if (!userId) return () => {};
    const q = query(collection(db, "carts"), where("userId", "==", userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCart(items);
    });
    return unsubscribe;
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, subscribeToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
