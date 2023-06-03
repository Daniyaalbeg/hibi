import { useTheme } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { textStyles } from "../style/styles";
import { convertDateToKey } from "../utils/get-date-key";
import { useStore } from "../state/store";

export const CalendarItem = ({
  date,
  selectEvent,
}: {
  date: Date;
  selectEvent: (date: string) => void;
}) => {
  const { colors } = useTheme();
  const selectedEvent = useStore((state) => state.selectedEvent);
  const isSelected =
    !!selectedEvent &&
    convertDateToKey(selectedEvent?.date) === convertDateToKey(date);

  const onPress = () => {
    // Select event
    selectEvent(convertDateToKey(date));
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={selectedStyles(isSelected, colors.card).container}
    >
      <Text style={[textStyles(colors.text).text]}>
        {convertDateToKey(date)}
      </Text>
    </TouchableOpacity>
  );
};

const selectedStyles = (isSelected: boolean, backgroundColor: string) =>
  StyleSheet.create({
    container: {
      height: 48,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: isSelected ? "blue" : backgroundColor,
      borderRadius: 8,
      marginBottom: 8,
    },
  });
