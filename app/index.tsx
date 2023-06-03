import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { CalendarList } from "../components/CelendarList";
import { EventDetails } from "../components/EventDetails";
import { CreateEventButton } from "../components/CreateEventButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Main entry point of expo router, uses safe area insets to avoid the bottom

export default function Home() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {/*`Screen` component used to configure the layout. */}
      <Stack.Screen options={{ headerShown: true, headerTitle: "" }} />
      <CalendarList />
      <EventDetails />
      <CreateEventButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
});
