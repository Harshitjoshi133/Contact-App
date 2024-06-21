import React from 'react'
import { HiOutlineUser } from "react-icons/hi";
import { RiEditCircleLine } from "react-icons/ri";
import { IoTrash } from "react-icons/io5";

const ContactCard = ({contact}) => {
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
      <RiEditCircleLine/>
      <IoTrash className="text-orange"/>
     </div>
      
    </div>
  )
}

export default ContactCard