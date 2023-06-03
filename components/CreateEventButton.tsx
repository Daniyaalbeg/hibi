import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const CreateEventButton = () => {
  const { colors } = useTheme();
  const { push } = useRouter();

  const onPress = () => {
    // Navigate to create event screen
    push("/create-event");
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles(colors.primary).container}
    >
      <Text style={styles(colors.background).text}> Create Event </Text>
    </TouchableOpacity>
  );
};

const styles = (color: string) =>
  StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      height: 44,
      width: "100%",
      backgroundColor: color,
      borderRadius: 16,
    },
    text: {
      color: color,
      fontSize: 16,
    },
  });
