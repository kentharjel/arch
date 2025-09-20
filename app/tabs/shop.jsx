import { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useCart } from "../../contexts/CartContext";
import { useMotor } from "../../contexts/motorContext";
import { MOTOR_PARTS } from "../../data/motorParts";

export default function ShopScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);

  const { addToCart } = useCart();
  const { user } = useMotor()

  const filteredParts = MOTOR_PARTS.filter(part =>
    part.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePartPress = (part) => {
    setSelectedPart(part);
    setModalVisible(true);
  };

  const handleAddToCart = async () => {
    if (!user) {
      alert("You must be logged in to add items!");
      return;
    }

    try {
      await addToCart(selectedPart, user.id);
      setModalVisible(false);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Browse all motor parts:</Text>

      <TextInput
        placeholder="Search for parts..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchBar}
      />

      <FlatList
        data={filteredParts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable style={styles.itemContainer} onPress={() => handlePartPress(item)}>
            <Text style={styles.itemText}>{item}</Text>
          </Pressable>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        style={{ width: "100%" }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add to Cart</Text>
            <Text style={styles.modalText}>Do you want to add "{selectedPart}" to your cart?</Text>

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, { backgroundColor: "#28a745" }]}
                onPress={handleAddToCart}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, { backgroundColor: "#dc3545" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  subtitle: { fontSize: 16, marginBottom: 15, color: "#555", textAlign: "center" },
  searchBar: { backgroundColor: "#fff", padding: 12, borderRadius: 10, borderWidth: 1, borderColor: "#ddd", marginBottom: 15, fontSize: 16 },
  itemContainer: { backgroundColor: "#e0f7fa", padding: 15, borderRadius: 10, marginBottom: 10 },
  itemText: { fontSize: 16, color: "#333" },
  modalBackground: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContainer: { width: "80%", backgroundColor: "#fff", borderRadius: 15, padding: 20, alignItems: "center" },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  modalText: { fontSize: 16, marginBottom: 20, textAlign: "center" },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  modalButton: { flex: 1, marginHorizontal: 5, paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  modalButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
