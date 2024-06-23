import { useEffect, useState } from "react";
import NavigationBar from "./components/NavigationBar";
import { CiSearch } from "react-icons/ci";
import { FaPlusCircle } from "react-icons/fa";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "./components/Modal";
import AddAndUpdate from "./components/AddAndUpdate";
import useDisclose from "./hooks/useDisclose";
import NotFoundContact from "./components/NotFoundContact";

export default function App() {
  const [contacts, setContacts] = useState([]); // State to store contacts
  const { isOpen, onOpen, onClose } = useDisclose(); // Custom hook for managing modal state

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts"); // Reference to the "contacts" collection in Firestore
        onSnapshot(contactsRef, (snapshot) => {
          const contactsList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          console.log(contactsList);
          setContacts(contactsList); // Update contacts state with fetched data
          return contactsList;
        });
      } catch (error) {
        console.log(error); // Log any errors
      }
    }
    getContacts(); // Fetch contacts on component mount
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value; // Get search input value
    try {
      const contactsRef = collection(db, "contacts"); // Reference to the "contacts" collection in Firestore
      onSnapshot(contactsRef, (snapshot) => {
        const contactsList = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        const filteredContacts = contactsList.filter((contact) => contact.name.toLowerCase().includes(value.toLowerCase()));
        console.log(filteredContacts);
        setContacts(filteredContacts); // Update contacts state with filtered data
        return filteredContacts;
      });
    } catch (error) {
      console.log(error); // Log any errors
    }
  }

  return (
    <>
      <div className="px-4 max-w-[370px] mx-auto">
        <NavigationBar></NavigationBar>
        <div className="flex">
          <div className="flex flex-grow ml-1 relative items-center">
            <CiSearch className="absolute text-3xl text-white" />
            <input onChange={filterContacts} type="text" className="h-10 flex-grow bg-transparent border pl-9 text-white border-white rounded-md" />
          </div>
          <FaPlusCircle onClick={onOpen} className="text-white text-4xl ml-2 cursor-pointer" />
        </div>
        <div className="mt-4 gap-3">{
          contacts.length <= 0 ? <NotFoundContact></NotFoundContact> : contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))
        }
        </div>
      </div>
      <AddAndUpdate isOpen={isOpen} onClose={onClose} /> {/* Modal component */}
      <ToastContainer position="bottom-center" /> {/* Toast notifications */}
    </>
  )
}
