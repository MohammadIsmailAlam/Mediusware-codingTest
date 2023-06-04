import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

export default function ModalA() {
  const [show, setShow] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [showContacts, setShowContacts] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [onlyEvenChecked, setOnlyEvenChecked] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    navigate(-1);
  };

  const handleShowAllContacts = () => {
    setShowContacts(true);
    setFilteredContacts(contacts);
  };

  const handleShowUSContacts = () => {
    setShowContacts(true);
    setFilteredContacts(
      contacts.filter((data) => data.country.name === "United States")
    );
  };

  const handleOnlyEvenChange = () => {
    setOnlyEvenChecked(!onlyEvenChecked);
    if (!onlyEvenChecked) {
      setFilteredContacts(contacts.filter((data) => data.id % 2 === 0));
    } else {
      if (showContacts) {
        handleShowAllContacts();
      }
    }
  };

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

  return (
    <>
      <Modal show={show} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {contacts.map((data, index) => {
            return (
              <li key={index}>
                {data.id}
                {data.phone}
                {data.country.name}
              </li>
            );
          })}
          <Button onClick={handleShowAllContacts}>Button A</Button>
          <Button onClick={handleShowUSContacts}>Button B</Button>
          <Button onClick={handleClose}>Button C</Button>
          {showContacts && (
            <ul class="contact-list">
              {filteredContacts.map((data, index) => (
                <li key={index}>
                  {data.id} {data.phone} {data.country.name}
                </li>
              ))}
            </ul>
          )}
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
