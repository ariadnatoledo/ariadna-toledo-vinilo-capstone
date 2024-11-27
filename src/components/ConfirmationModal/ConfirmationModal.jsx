import "./ConfirmationModal.scss";

function ConfirmationModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="confirmation-modal">
      <div className="confirmation-modal__content">
        <p>Are you sure you want to delete your post?</p>
        <div className="confirmation-modal__actions">
          <button className="confirmation-modal__button confirm" onClick={onConfirm}>
            Yes
          </button>
          <button className="confirmation-modal__button cancel" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
