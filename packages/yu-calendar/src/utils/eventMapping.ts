import { EventApi } from "@fullcalendar/core";
import { ExtendedEventApi } from "@/types.d";
import { Database, TablesInsert, TablesUpdate } from "../../types_db";

export type YuCalendarRow = Database["public"]["Tables"]["yu_calendar"]["Row"];
export type YuCalendarRowInsert = TablesInsert<"yu_calendar">;
export type YuCalendarRowUpdate = TablesUpdate<"yu_calendar">;

// Ensure extendedProps has a description string
export const ensureDescription = (desc: unknown): string =>
  typeof desc === "string" ? desc : "";

// Serialize UI event to DB insert payload (ISO dates)
export const toInsertPayload = (event: EventApi | ExtendedEventApi): YuCalendarRowInsert => {
  const startISO = event.start ? new Date((event.start as any)).toISOString() : undefined;
  const endISO = event.end ? new Date((event.end as any)).toISOString() : undefined;
  return {
    id: (event as any).id,
    title: (event as any).title || "",
    start: startISO,
    end: endISO,
    extendedProps: {
      description: ensureDescription((event as any)?.extendedProps?.description),
    },
  };
};

// Serialize UI event to DB update payload (ISO dates)
export const toUpdatePayload = (event: EventApi | ExtendedEventApi): YuCalendarRowUpdate => {
  const startISO = event.start ? new Date((event.start as any)).toISOString() : undefined;
  const endISO = event.end ? new Date((event.end as any)).toISOString() : undefined;
  return {
    id: (event as any).id,
    title: (event as any).title,
    start: startISO,
    end: endISO,
    extendedProps: {
      description: ensureDescription((event as any)?.extendedProps?.description),
    },
  };
};

// Deserialize DB row to UI-friendly event (Date objects)
export const fromRowToEvent = (row: YuCalendarRow): Partial<ExtendedEventApi> => {
  return {
    ...row,
    start: row.start ? new Date(row.start) : undefined,
    end: row.end ? new Date(row.end) : null,
    extendedProps: {
      description: ensureDescription((row as any)?.extendedProps?.description),
    },
  } as any;
};

