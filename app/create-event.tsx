import { Stack } from "expo-router";
import { View } from "react-native";
import { CreateEvent } from "../components/CreateEvent";

export default function () {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title: "Create an Event" }} />
      <CreateEvent />
    </View>
  );
}
