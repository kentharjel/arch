import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { db } from "../firebaseConfig";

const MotorContext = createContext();

export function MotorProvider({ children }) {
  const [user, setUser] = useState(null);

  const createUser = async ({ name, email, password }) => {
    if (!name || !email || !password) {
      alert("All fields are required!");
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "users"), {
        name,
        email,
        password,
        createdAt: new Date(),
      });
      const newUser = { id: docRef.id, name, email, password };
      setUser(newUser);
      alert(`User added with ID: ${docRef.id}`);
      return docRef;
    } catch (error) {
      console.error(error);
      alert("Failed to add user");
    }
  };

  const signInUser = async ({ email, password }) => {
    if (!email || !password) {
      alert("All fields are required!");
      return null;
    }
    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", email),
        where("password", "==", password)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("Invalid email or password");
        return null;
      }

      const userDoc = querySnapshot.docs[0];
      const userData = { id: userDoc.id, ...userDoc.data() };
      setUser(userData);
      alert(`Welcome back, ${userData.name}!`);
      return userData;
    } catch (error) {
      console.error(error);
      alert("Failed to sign in");
    }
  };

  const logoutUser = () => {
    setUser(null);
    alert("You have been logged out");
  };

  // ✅ New: Update profile in Firebase
  const updateUserProfile = async ({ name, email }) => {
    if (!user) return;
    if (!name || !email) {
      alert("All fields are required!");
      return;
    }
    try {
      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, { name, email });
      setUser({ ...user, name, email }); // update local state
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    }
  };

  return (
    <MotorContext.Provider value={{ user, setUser, createUser, signInUser, logoutUser, updateUserProfile }}>
      {children}
    </MotorContext.Provider>
  );
}

export const useMotor = () => {
  const context = useContext(MotorContext);
  if (!context) throw new Error("useMotor must be used within a MotorProvider");
  return context;
};
