import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useMotor } from "../contexts/motorContext"; // make sure path is correct

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { signInUser } = useMotor();

  const handleSignIn = async () => {
    const loggedInUser = await signInUser({ email, password });
    if (loggedInUser) {
      router.push("/tabs/shop"); // navigate to your main screen
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>M</Text>
        <Text style={styles.appName}>MOTOBROOM</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer} onPress={() => router.push("/signup")}>
        Don't have an account? Sign up
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", justifyContent: "center", alignItems: "center", paddingHorizontal: 20 },
  logoContainer: { alignItems: "center", marginBottom: 30 },
  logo: { fontSize: 60, fontWeight: "bold", color: "#ff4d4d" },
  appName: { fontSize: 24, fontWeight: "bold", color: "#333", marginTop: 5 },
  form: { width: "100%" },
  input: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 15, fontSize: 16, borderWidth: 1, borderColor: "#ddd" },
  button: { backgroundColor: "#ff4d4d", padding: 15, borderRadius: 10, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  footer: { marginTop: 20, color: "#555" },
});
