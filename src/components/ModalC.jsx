import { Button, Modal } from "react-bootstrap";
import { useState } from "react";

export default function ModalC({ selectedContact, onClose, customText }) {
  const [showThirdModal, setShowThirdModal] = useState(true);

  return (
    <>
      <Modal show={showThirdModal} onHide={onClose}>
        <Modal.Header>
          <Modal.Title>Contact Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{customText}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}