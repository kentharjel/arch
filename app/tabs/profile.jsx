import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useMotor } from "../../contexts/motorContext";

export default function ProfileScreen() {
  const { user, logoutUser, updateUserProfile } = useMotor(); // setUser will allow updating locally
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || "");
  const [editedEmail, setEditedEmail] = useState(user?.email || "");

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            logoutUser();
            router.replace("/");
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleSaveProfile = () => {
  if (!editedName || !editedEmail) {
    alert("All fields are required!");
    return;
  }
  updateUserProfile({ name: editedName, email: editedEmail });
  setModalVisible(false);
};

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: user?.avatar || "https://i.pravatar.cc/150?img=12" }}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.name}>{user ? user.name : "Guest User"}</Text>
        <Text style={styles.email}>{user ? user.email : "No email available"}</Text>
      </View>

      {/* Profile Info Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Account Details</Text>
        {user ? (
          <>
            <Text style={styles.cardText}>Name: {user.name}</Text>
            <Text style={styles.cardText}>Email: {user.email}</Text>
            <Text style={styles.cardText}>
              Member since: {user.createdAt ? new Date(user.createdAt.seconds * 1000).toDateString() : "N/A"}
            </Text>

            {/* Edit Profile Button */}
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                setEditedName(user.name);
                setEditedEmail(user.email);
                setModalVisible(true);
              }}
            >
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.cardText}>No user logged in.</Text>
        )}
      </View>

      {/* Logout Button */}
      {user && (
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      )}

      {/* Edit Profile Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <TextInput
              placeholder="Name"
              value={editedName}
              onChangeText={setEditedName}
              style={styles.input}
            />
            <TextInput
              placeholder="Email"
              value={editedEmail}
              onChangeText={setEditedEmail}
              style={styles.input}
              keyboardType="email-address"
            />

            <View style={styles.modalButtons}>
              <Pressable style={[styles.modalButton, { backgroundColor: "#28a745" }]} onPress={handleSaveProfile}>
                <Text style={styles.modalButtonText}>Save</Text>
              </Pressable>
              <Pressable style={[styles.modalButton, { backgroundColor: "#dc3545" }]} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6fc" },

  header: {
    backgroundColor: "#ff4d4d",
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  avatarContainer: {
    marginBottom: 15,
    borderWidth: 3,
    borderColor: "#fff",
    borderRadius: 60,
    padding: 3,
    backgroundColor: "#fff",
  },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  name: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  email: { fontSize: 16, color: "#ffe5e0", marginTop: 5 },

  card: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 15, color: "#333" },
  cardText: { fontSize: 16, marginBottom: 8, color: "#555" },

  editButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  editButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },

  logoutButton: {
    marginHorizontal: 20,
    backgroundColor: "#ff4d4d",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  modalButton: { flex: 1, marginHorizontal: 5, paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  modalButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
