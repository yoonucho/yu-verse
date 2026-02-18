/**
 * 이벤트 상세 정보를 표시하는 뷰어 컴포넌트
 * description 텍스트를 파싱하여 요약, 분야별 헤드라인+링크 형태로 렌더링한다
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { EventType, HolidayDates } from "@/types.d";
import EventActions from "./EventActions";
import styles from "./event-viewer.module.css";

type EventViewerProps = {
  event: EventType | any;
  onEdit: () => void;
  onDelete: (eventId: string) => void;
};

/** 분야별 헤드라인과 링크를 묶은 타입 */
type NewsItem = {
  category: string;
  headline: string;
  url: string;
};

/** URL 패턴을 감지하여 텍스트를 React 노드 배열로 변환하는 함수 */
const renderTextWithLinks = (text: string) => {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlPattern);

  return parts.map((part, index) => {
    if (urlPattern.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

/**
 * description 텍스트를 파싱하여 요약문과 분야별 뉴스 아이템 배열로 변환한다
 * 형식: "요약: ...\n\n분야: 헤드라인\n...\n\n링크: 분야 url / 분야 url"
 */
const parseDescription = (
  text: string,
): { summary: string; items: NewsItem[] } => {
  const linkSectionIndex = text.indexOf("링크:");

  /** 링크 섹션이 없으면 전체를 요약으로 반환 */
  if (linkSectionIndex === -1) {
    return { summary: text.trim(), items: [] };
  }

  const headlinePart = text.slice(0, linkSectionIndex).trim();
  const linkPart = text.slice(linkSectionIndex + 3).trim();

  /** 헤드라인 파트에서 첫 줄(요약)과 분야별 헤드라인을 분리 */
  const headlineLines = headlinePart
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const summary = headlineLines[0] || "";

  /** "분야: 헤드라인 - 출처 (출처명)" 형식의 줄을 파싱 */
  const headlineMap: Record<string, string> = {};
  for (const line of headlineLines.slice(1)) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const category = line.slice(0, colonIdx).trim();
    const headline = line.slice(colonIdx + 1).trim();
    headlineMap[category] = headline;
  }

  /**
   * 링크 파트를 "분야 url / 분야 url" 형식으로 파싱
   * 첫 번째 토큰이 분야명, 두 번째가 url, 이후 "/" 로 구분
   */
  const items: NewsItem[] = [];
  const segments = linkPart.split(/\s*\/\s*(?=[가-힣]+\s+https?:\/\/)/);

  for (const segment of segments) {
    const trimmed = segment.trim();
    const spaceIdx = trimmed.indexOf(" ");
    if (spaceIdx === -1) continue;
    const category = trimmed.slice(0, spaceIdx).trim();
    const url = trimmed.slice(spaceIdx + 1).trim();
    if (!url.startsWith("http")) continue;
    items.push({
      category,
      headline: headlineMap[category] || category,
      url,
    });
  }

  return { summary, items };
};

const EventViewer: React.FC<EventViewerProps> = ({
  event,
  onEdit,
  onDelete,
}) => {
  const isHoliday = (event: any): event is HolidayDates => {
    /** 공휴일인지 확인하는 함수 */
    return event.extendedProps?.types?.[0] === "Public";
  };

  const formatDateForInput = (date: Date) => {
    if (isHoliday(event)) {
      return format(date, "yyyy년 MM월 dd일", { locale: ko });
    } else {
      return format(date, "yyyy년 MM월 dd일 a HH:mm", { locale: ko });
    }
  };

  const description: string = event.extendedProps?.description || "";
  const { summary, items } = parseDescription(description);

  return (
    <div className={styles.viewer}>
      <h2 className={`${styles.title} ellipsis`}>{event.title}</h2>
      <p className={styles.time}>
        {event.startStr && (
          <>
            <span>
              <FontAwesomeIcon
                icon={faClock}
                style={{ color: "var(--primary-color)" }}
              />
            </span>
            <span>{formatDateForInput(new Date(event.startStr))}</span>
            <span>{event.extendedProps?.dayOfWeek}</span>
          </>
        )}
      </p>
      <p className={styles.time}>
        {event.endStr && (
          <>
            <span>
              <FontAwesomeIcon
                icon={faClock}
                style={{ color: "var(--primary-color)" }}
              />
              {formatDateForInput(new Date(event.endStr))}
            </span>
            <span>{event.extendedProps?.dayOfWeek}</span>
          </>
        )}
      </p>
      {description && (
        <div className={styles.descriptionWrapper}>
          {summary && (
            <p className={styles.summary}>{renderTextWithLinks(summary)}</p>
          )}
          {items.length > 0 && (
            <ul className={styles.descriptionList}>
              {items.map((item, index) => (
                <li key={index} className={styles.descriptionItem}>
                  <span className={styles.category}>{item.category}</span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                    title={item.headline}
                  >
                    {item.headline}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {!isHoliday(event) && (
        <EventActions
          isEditing={false}
          onSave={() => {}}
          onDelete={() => onDelete(event.id)}
          onEdit={onEdit}
        />
      )}
    </div>
  );
};

export default EventViewer;
