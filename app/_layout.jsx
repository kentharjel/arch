import { Stack } from "expo-router";
import { CartProvider } from "../contexts/CartContext";
import { MotorProvider } from "../contexts/motorContext";

export default function RootLayout() {
  return (
    <MotorProvider>
      <CartProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen name="tabs" options={{ headerShown: false }} />
        </Stack>
      </CartProvider>
    </MotorProvider>
  );
}
