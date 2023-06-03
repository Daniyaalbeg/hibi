import { FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native";
import { useStore } from "../state/store";
import { CalendarItem } from "./CalendarItem";
import { useEffect, useRef } from "react";
import { convertDateToKey } from "../utils/get-date-key";

const LENGTH_OF_DAYS_IN_MAY = new Date(2023, 5, 0).getDate();

// Create an array of dates for the month of May 2023
const DATES = Array.from({ length: LENGTH_OF_DAYS_IN_MAY }, (_, i) => {
  return new Date(2023, 4, i + 2);
});

export const CalendarList = () => {
  const events = useStore((state) => state.events);
  const selectedEvent = useStore((state) => state.selectedEvent);
  const setSelectedEvent = useStore((state) => state.setSelectedEvent);
  const listRef = useRef<FlatList<Date>>(null);

  const selectEvent = (date: string) => {
    // If there is no event for the selected date, set selected event to undefined otherwise select event
    const maybeEvent = events.get(date);
    if (!maybeEvent) return setSelectedEvent(undefined);
    setSelectedEvent(events.get(date));
  };

  const renderItem = (itemInfo: ListRenderItemInfo<Date>) => {
    return <CalendarItem date={itemInfo.item} selectEvent={selectEvent} />;
  };

  useEffect(() => {
    // If there is no selected event or no list ref, return, otherwise scroll to the selected event
    if (!selectedEvent || !listRef.current) return;
    listRef.current.scrollToIndex({
      index: DATES.findIndex((v) => {
        return convertDateToKey(v) === convertDateToKey(selectedEvent.date);
      }),
      animated: true,
    });
  }, [selectedEvent]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        style={styles.flatList}
        data={DATES}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          // Hardcoded height of each item
          length: 48,
          offset: 48 * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    width: "100%",
    paddingVertical: 8,
  },
  flatList: {
    height: "100%",
    width: "100%",
  },
});
