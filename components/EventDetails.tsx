import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { textStyles } from "../style/styles";
import { useStore } from "../state/store";

export const EventDetails = () => {
  const { colors } = useTheme();
  const selectedEvent = useStore((state) => state.selectedEvent);

  if (!selectedEvent)
    // If there is no selected event, return a no event message
    return (
      <View style={styles(colors.card).container}>
        <Text style={textStyles(colors.text).text}>No event</Text>
      </View>
    );

  return (
    <View style={styles(colors.card).container}>
      <Label label="Title" data={selectedEvent.title} />
      <Label label="Description" data={selectedEvent.description} />
      <Label label="Date" data={selectedEvent.date.toLocaleDateString()} />
      <Label
        label="Time"
        // Convert the time to a string and slice off the seconds
        data={selectedEvent.date.toTimeString().split(" ")[0].slice(0, 5)}
      />
    </View>
  );
};

const Label = ({ label, data }: { label: string; data: string }) => {
  // This component is used to display a label and data in a column
  const { colors } = useTheme();

  return (
    <View style={styles(colors.background).innerContainer}>
      <Text style={textStyles(colors.text).text}>{label}</Text>
      <Text style={textStyles(colors.text).text}>{data}</Text>
    </View>
  );
};

const styles = (color: string) =>
  StyleSheet.create({
    container: {
      height: 200,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: color,
      borderRadius: 8,
      marginBottom: 8,
    },
    innerContainer: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 4,
    },
  });
