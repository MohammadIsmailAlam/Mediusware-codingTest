import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

export default function ModalB() {
  const [show, setShow] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [onlyEvenChecked, setOnlyEvenChecked] = useState(false);

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

  const handleShowAllContacts = () => {
    navigate("/modal-a");
  };

  const handleOnlyEvenChange = () => {
    setOnlyEvenChecked(!onlyEvenChecked);
    if (!onlyEvenChecked) {
      setContacts(contacts.filter((data) => data.id % 2 === 0));
    }
  };

  return (
    <>
      <Modal show={show} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {contacts
            .filter((data) => data.country.name == "United States")
            .map((data, index) => {
              return (
                <li key={index}>
                  {data.id}
                  {data.phone}
                  {data.country.name}
                </li>
              );
            })}
          <Button onClick={handleShowAllContacts}>Button A</Button>
          <Button >Button B</Button>
          <Button onClick={handleClose}>Button C</Button>
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
