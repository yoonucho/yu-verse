import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

type EventActionsProps = {
	isEditing: boolean;
	onSave: () => void;
	onDelete: () => void;
	onEdit: () => void;
};

const EventActions: React.FC<EventActionsProps> = ({ isEditing, onSave, onDelete, onEdit }) => {
	return (
		<div className="event-actions">
			{isEditing ? (
				<>
					<button className="save" onClick={onSave}>
						<FontAwesomeIcon icon={faSave} />
					</button>
					<button className="delete" onClick={onDelete}>
						<FontAwesomeIcon icon={faTrash} />
					</button>
				</>
			) : (
				<button className="edit" onClick={onEdit}>
					<FontAwesomeIcon icon={faEdit} />
				</button>
			)}
		</div>
	);
}

export default EventActions;
