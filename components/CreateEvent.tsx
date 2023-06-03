import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema, useStore } from "../state/store";
import { useTheme } from "@react-navigation/native";
import { Event } from "../types/types";
import { convertDateToKey } from "../utils/get-date-key";
import { useRouter } from "expo-router";

export const CreateEvent = () => {
  const { colors } = useTheme();
  const addEvent = useStore((state) => state.addEvent);
  const { back } = useRouter();
  // Uses react-hook-form to manage form state with a zod schema as the resolver
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date("2023-05-01"),
    },
  });

  const onSubmit = (data: Event) => {
    // Add event and go back to main screen
    addEvent(convertDateToKey(data.date), data);
    back();
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={colorStyles(colors.text).textInput}
            placeholder="Title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="title"
      />
      {errors.title ? (
        <Text style={styles.error}>This is required.</Text>
      ) : (
        <Text />
      )}

      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Description"
            style={colorStyles(colors.text).textInput}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="description"
      />
      {errors.description ? (
        <Text style={styles.error}>This is required.</Text>
      ) : (
        <Text />
      )}

      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.datePickerContainer}>
            <Text style={colorStyles(colors.text).text}>Select a date:</Text>
            <DateTimePicker
              style={styles.datePicker}
              onChange={(_, date) => {
                if (!date) {
                  return;
                }
                onChange(date);
              }}
              value={value}
              maximumDate={new Date("2023-05-31")}
              minimumDate={new Date("2023-05-01")}
            />
          </View>
        )}
        name="date"
      />

      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.datePickerContainer}>
            <Text style={colorStyles(colors.text).text}>Select a time:</Text>
            <DateTimePicker
              style={styles.datePicker}
              onChange={(_, date) => {
                if (!date) {
                  return;
                }
                onChange(date);
              }}
              mode="time"
              value={value}
              maximumDate={new Date("2023-05-31")}
              minimumDate={new Date("2023-05-01")}
            />
          </View>
        )}
        name="date"
      />
      {errors.date ? (
        <Text style={styles.error}>This date is incorrect.</Text>
      ) : (
        <Text />
      )}

      <TouchableOpacity
        style={buttonStyles(colors.primary).button}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={buttonStyles(colors.background).text}>Create Event</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 12,
    paddingVertical: 24,
  },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  datePicker: {
    marginBottom: 12,
  },
  error: {
    color: "red",
    fontSize: 16,
    marginBottom: 12,
  },
});

const colorStyles = (color: string) =>
  StyleSheet.create({
    text: {
      fontSize: 16,
      color: color,
    },
    datePicker: {
      marginBottom: 12,
      color: color,
    },
    textInput: {
      width: "100%",
      color: color,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 4,
      fontSize: 24,
      paddingVertical: 12,
      paddingHorizontal: 12,
    },
  });

const buttonStyles = (color: string) =>
  StyleSheet.create({
    button: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      height: 44,
      borderRadius: 12,
      backgroundColor: color,
    },
    text: {
      color: color,
      fontSize: 16,
    },
  });
