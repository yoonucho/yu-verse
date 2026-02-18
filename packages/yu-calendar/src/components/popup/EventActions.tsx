import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import styles from "./event-actions.module.css";

type EventActionsProps = {
  isEditing: boolean;
  onSave: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

const EventActions: React.FC<EventActionsProps> = ({
  isEditing,
  onSave,
  onDelete,
  onEdit,
}) => {
  return (
    <div className={`${styles.eventActions}`}>
      {isEditing ? (
        <>
          <button
            type="button"
            className={`${styles.action} ${styles.save}`}
            onClick={onSave}
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
          <button
            type="button"
            className={`${styles.action} ${styles.delete}`}
            onClick={onDelete}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            className={`${styles.action} ${styles.edit}`}
            onClick={onEdit}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            type="button"
            className={`${styles.action} ${styles.delete}`}
            onClick={onDelete}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </>
      )}
    </div>
  );
};

export default EventActions;
