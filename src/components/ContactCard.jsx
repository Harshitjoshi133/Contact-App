import React from 'react'
import { HiOutlineUser } from "react-icons/hi";
import { RiEditCircleLine } from "react-icons/ri";
import { IoTrash } from "react-icons/io5";
import { deleteDoc,doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import useDisclose from '../hooks/useDisclose';
import AddAndUpdate from './AddAndUpdate';
import { toast } from 'react-toastify';
const ContactCard = ({contact}) => {
  const {isOpen, onOpen ,onClose}=useDisclose();
  const deleteContact = async (id)=>{
    try {
      
      await deleteDoc(doc(db,"contacts",id));
      toast.success("Contact has been deleted successFully")
    } catch (error) {
      console.log(error);
    }
      
  }
  return (
    <div key={contact.id} className="bg-yellow items-center p-2 
    rounded-lg justify-between mt-4 flex">
      <div className="flex gap-1">
      <HiOutlineUser className="text-orange text-4xl"/>
      <div className="">
        <h2 className="font-medium">{contact.name}</h2>
        <p className="text-sm">{contact.email}</p>
      </div>
      </div>
     <div className="flex text-3xl">
      <RiEditCircleLine onClick={onOpen} className='cursor-pointer'/>
      <IoTrash onClick={()=>deleteContact(contact.id)} className="text-orange cursor-pointer" />
     </div>
      <AddAndUpdate contact={contact} isUpdate isOpen={isOpen} onClose={onClose}/>
    </div>
  )
}

export default ContactCard