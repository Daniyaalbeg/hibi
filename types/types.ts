import { eventSchema } from "../state/store";
import { z } from "zod";

export type Event = z.infer<typeof eventSchema>;