import { EventApi } from "@fullcalendar/core";
import { ExtendedEventApi } from "@/types.d";
import { Database, TablesInsert, TablesUpdate } from "../../types_db";

export type YuCalendarRow = Database["public"]["Tables"]["yu_calendar"]["Row"];
export type YuCalendarRowInsert = TablesInsert<"yu_calendar">;
export type YuCalendarRowUpdate = TablesUpdate<"yu_calendar">;

// Ensure extendedProps has a description string
export const ensureDescription = (desc: unknown): string =>
  typeof desc === "string" ? desc : "";

const normalizeExtendedProps = (raw: unknown) => {
  const base =
    raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  return {
    ...base,
    description: ensureDescription(base.description),
  };
};

// Serialize UI event to DB insert payload (ISO dates)
export const toInsertPayload = (
  event: EventApi | ExtendedEventApi,
): YuCalendarRowInsert => {
  const startISO = event.start
    ? new Date(event.start as any).toISOString()
    : undefined;
  const endISO = event.end
    ? new Date(event.end as any).toISOString()
    : undefined;
  const extendedProps = normalizeExtendedProps((event as any)?.extendedProps);
  return {
    id: (event as any).id,
    title: (event as any).title || "",
    start: startISO,
    end: endISO,
    extendedProps: extendedProps as any,
  };
};

// Serialize UI event to DB update payload (ISO dates)
export const toUpdatePayload = (
  event: EventApi | ExtendedEventApi,
): YuCalendarRowUpdate => {
  const startISO = event.start
    ? new Date(event.start as any).toISOString()
    : undefined;
  const endISO = event.end
    ? new Date(event.end as any).toISOString()
    : undefined;
  const extendedProps = normalizeExtendedProps((event as any)?.extendedProps);
  return {
    id: (event as any).id,
    title: (event as any).title,
    start: startISO,
    end: endISO,
    extendedProps: extendedProps as any,
  };
};

/** DB 행을 UI용 이벤트 객체(Date 객체 포함)로 역직렬화한다 */
export const fromRowToEvent = (
  row: YuCalendarRow,
): Partial<ExtendedEventApi> => {
  const extendedProps = normalizeExtendedProps((row as any)?.extendedProps);
  return {
    ...row,
    start: row.start ? new Date(row.start) : undefined,
    end: row.end ? new Date(row.end) : null,
    extendedProps: extendedProps as any,
  } as any;
};

/**
 * FullCalendar EventImpl 또는 Plain Object를 스토어 저장용 일관된 Plain Object로 변환한다
 * EventImpl의 경우 toPlainObject()를 사용하고, getter 기반 프로퍼티를 안전하게 추출한다
 */
export const normalizeEventForStore = (event: any): ExtendedEventApi => {
  if (typeof event?.toPlainObject === "function") {
    const plain = event.toPlainObject({ collapseExtendedProps: false });
    return {
      ...plain,
      start: event.start,
      end: event.end,
      startStr: event.startStr,
      endStr: event.endStr,
      extendedProps: { ...(event.extendedProps || {}) },
    } as any;
  }

  return {
    ...event,
    extendedProps: { ...(event?.extendedProps || {}) },
  } as any;
};
