import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import ModalC from "./ModalC";

export default function ModalA() {
  const [show, setShow] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [onlyEvenChecked, setOnlyEvenChecked] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const [showThirdModal, setShowThirdModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all contacts from the API
    fetch("https://contact.mediusware.com/api/contacts")
      .then((response) => response.json())
      .then((data) => {
        setContacts(data.results);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  }, []);

  const handleClose = () => {
    setShow(false);
    navigate("/problem-2");
  };

  const handleShowUSContacts = () => {
    navigate("/modal-b");
  };

  const handleOnlyEvenChange = () => {
    setOnlyEvenChecked(!onlyEvenChecked);
    if (!onlyEvenChecked) {
      setContacts(contacts.filter((data) => data.id % 2 === 0));
    }
  };

  const handleItemClick = (data) => {
    setSelectedContact(data);
    setShowThirdModal(true);
  };

  return (
    <>
      <Modal show={show} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {contacts.map((data, index) => {
            return (
              <li key={index} onClick={() => handleItemClick(data)}>
                <p>ID: {data.id}</p>
                <p>Phone: {data.phone}</p>
                <p>Country: {data.country.name}</p>
              </li>
            );
          })}

          {showThirdModal && (
            <ModalC
              selectedContact={selectedContact}
              onClose={() => setShowThirdModal(false)}
              customText="Custom text or data to display"
            />
          )}

          <Button style={{ backgroundColor: "white", color: "#46139f" }}>
            Button A
          </Button>
          <Button
            style={{ backgroundColor: "white", color: "#ff7f50" }}
            onClick={handleShowUSContacts}
          >
            Button B
          </Button>
          <Button
            style={{
              backgroundColor: "white",
              border: "1px solid #46139f",
              color: "#46139f",
            }}
            onClick={handleClose}
          >
            Button C
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <label>
            <input
              type="checkbox"
              checked={onlyEvenChecked}
              onChange={handleOnlyEvenChange}
            />
            Only even
          </label>
        </Modal.Footer>
      </Modal>
    </>
  );
}
