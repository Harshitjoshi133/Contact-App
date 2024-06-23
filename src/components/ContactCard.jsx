import React from 'react'
import { HiOutlineUser } from "react-icons/hi"; // Import user icon
import { RiEditCircleLine } from "react-icons/ri"; // Import edit icon
import { IoTrash } from "react-icons/io5"; // Import trash icon
import { deleteDoc, doc } from 'firebase/firestore'; // Import Firestore delete functions
import { db } from '../config/firebase'; // Import Firestore configuration
import useDisclose from '../hooks/useDisclose'; // Import custom hook for modal state
import AddAndUpdate from './AddAndUpdate'; // Import AddAndUpdate component
import { toast } from 'react-toastify'; // Import toast notifications

const ContactCard = ({ contact }) => {
  const { isOpen, onOpen, onClose } = useDisclose(); // Destructure modal state from custom hook

  // Function to delete contact
  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id)); // Delete contact document from Firestore
      toast.success("Contact has been deleted successfully"); // Show success toast
    } catch (error) {
      console.log(error); // Log error
    }
  }

  return (
    <div key={contact.id} className="bg-yellow items-center p-2 rounded-lg justify-between mt-4 flex">
      <div className="flex gap-1">
        <HiOutlineUser className="text-orange text-4xl" /> {/* User icon */}
        <div className="">
          <h2 className="font-medium">{contact.name}</h2> {/* Display contact name */}
          <p className="text-sm">{contact.email}</p> {/* Display contact email */}
        </div>
      </div>
      <div className="flex text-3xl">
        <RiEditCircleLine onClick={onOpen} className='cursor-pointer' /> {/* Edit icon with click handler */}
        <IoTrash onClick={() => deleteContact(contact.id)} className="text-orange cursor-pointer" /> {/* Delete icon with click handler */}
      </div>
      <AddAndUpdate contact={contact} isUpdate isOpen={isOpen} onClose={onClose} /> {/* AddAndUpdate modal */}
    </div>
  )
}

export default ContactCard
