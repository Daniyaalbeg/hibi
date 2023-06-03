import { create } from "zustand";
import { z } from "zod";
import { Event } from "../types/types";

export const eventSchema = z.object({
  // zod schema for event, single date object is used for the date and time
  title: z.string().min(1, { message: "Required" }),
  description: z.string().min(1, { message: "Required" }),
  date: z
    .date()
    .min(new Date("2023-05-01"), { message: "Must be after 1st May 2023" })
    .max(new Date("2023-05-31"), { message: "Must be before 1st June 2023" }),
});

type Store = {
  events: Map<string, Event>;
  addEvent: (date: string, event: Event) => void;
  removeEvent: (date: string) => void;
  selectedEvent: Event | undefined;
  setSelectedEvent: (event: Event | undefined) => void;
};

export const useStore = create<Store>((set) => ({
  // Events stored in a map, with date as key
  events: new Map(),
  // Add event to map
  addEvent: (date, event) =>
    set((state) => {
      const events = new Map(state.events);
      events.set(date, event);
      return { events, selectedEvent: event };
    }),
  // Remove event from map
  removeEvent: (date) =>
    set((state) => {
      const events = new Map(state.events);
      events.delete(date);
      return { events };
    }),
  // Selected event for editing
  selectedEvent: undefined,
  // Set selected event
  setSelectedEvent: (event) => set(() => ({ selectedEvent: event })),
}));
