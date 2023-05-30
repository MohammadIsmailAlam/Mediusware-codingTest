import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

export default function ModalA() {
  const [show, setShow] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [onlyEvenChecked, setOnlyEvenChecked] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  

  const navigate = useNavigate();
  const handleClose = () => {
    setShow(false);
    navigate(-1);
  }

  useEffect(() => {
    // Fetch all contacts from the API
    fetch("https://contact.mediusware.com/api/contacts")
      .then((response) => response.json())
      .then((data) => {
        setContacts( data.results);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  }, []);

  useEffect(() => {
    // Filter contacts based on the checkbox and search input
    let filtered = contacts;
    if (onlyEvenChecked) {
      filtered = filtered.filter((contact) => contact.id % 2 === 0);
    }
    if (searchInput) {
      filtered = filtered.filter((contact) =>
        contact.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    setFilteredContacts(filtered);
  }, [contacts, onlyEvenChecked, searchInput]);

  const fetchFilteredContacts = () => {
    const url = `https://contact.mediusware.com/api/contacts?country=${
      modalAOpen ? "all" : "US"
    }&name=${searchInput}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setContacts(data.contacts);
      })
      .catch((error) => {
        console.error("Error fetching filtered contacts:", error);
      });
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            contacts.map((data, index) => {
             return <li key={index}>
              {data.id}
              {data.phone}
              {data.country.name}
             </li>
            })
          }
        </Modal.Body>
      </Modal>
    </>
  );
}
