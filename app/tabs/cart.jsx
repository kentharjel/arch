import { useEffect } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useCart } from "../../contexts/CartContext";
import { useMotor } from "../../contexts/motorContext";

export default function AddToCartScreen() {
  const { cart, removeFromCart, clearCart, subscribeToCart } = useCart();
  const { user } = useMotor()

  useEffect(() => {
    if (!user) return;
    // Subscribe to cart changes
    const unsubscribe = subscribeToCart(user.id);
    return () => unsubscribe();
  }, [user]);

  const handleRemove = (itemId) => {
    removeFromCart(itemId);
  };

  const handleClear = () => {
    if (!user) return;
    clearCart(user.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>

      {user ? (
        cart.length > 0 ? (
          <>
            <FlatList
              data={cart}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Text style={styles.itemText}>{item.item}</Text>
                  <Pressable style={styles.removeButton} onPress={() => handleRemove(item.id)}>
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </Pressable>
                </View>
              )}
            />
            <Pressable style={styles.clearButton} onPress={handleClear}>
              <Text style={styles.clearButtonText}>Clear Cart</Text>
            </Pressable>
          </>
        ) : (
          <Text>Your cart is empty.</Text>
        )
      ) : (
        <Text>Please log in to see your cart.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 15, textAlign: "center", color: "#ff4d4d" },
  itemContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#e0f7fa", padding: 15, borderRadius: 10, marginBottom: 10 },
  itemText: { fontSize: 16, color: "#333" },
  removeButton: { backgroundColor: "#dc3545", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  removeButtonText: { color: "#fff", fontWeight: "bold" },
  clearButton: { marginTop: 10, backgroundColor: "#ff4d4d", padding: 12, borderRadius: 10, alignItems: "center" },
  clearButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
