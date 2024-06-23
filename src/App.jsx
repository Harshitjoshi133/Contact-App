import { useEffect, useState } from "react";
import NavigationBar from "./components/NavigationBar";
import { CiSearch } from "react-icons/ci";
import { FaPlusCircle } from "react-icons/fa";
import { collection,getDocs } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import Modal from "./components/Modal";
import AddAndUpdate from "./components/AddAndUpdate";


export default function App() {
  const [contacts,setContacts]=useState([]);
  const[isOpen,setOpen]=useState(false);
  const onOpen=()=>{
    setOpen(true);
  };
  const onClose=()=>{
    setOpen(false);
  };

  useEffect(()=>{
    const getContacts= async () =>{
        try{
          const contactsRef= collection(db,"contacts");
          const contactsSnapshot= await getDocs(contactsRef);
          const contactsList=contactsSnapshot.docs.map((doc)=>{
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          console.log(contactsList);
          setContacts(contactsList);
        }
        catch(error){
          console.log(error);
        }
    }
    getContacts();
  },[]);

  return (
    <>
    <div className="px-4 max-w-[370px] mx-auto">
      <NavigationBar></NavigationBar>
      <div className="flex">
      <div className="flex flex-grow ml-1 relative items-center">
        <CiSearch className="absolute text-3xl text-white"/>
        <input type="text" className=" h-10 flex-grow 
        bg-transparent border pl-9 text-white border-white rounded-md" />
      </div>
        <FaPlusCircle onClick={onOpen} className="text-white text-4xl ml-2 cursor-pointer" />
      </div>
      <div className="mt-4 gap-3">{
        contacts.map((contact) =>(
          <ContactCard key= {contact.id} contact={contact}/>
      ))}
      </div>
    </div>
    <AddAndUpdate isOpen={isOpen} onClose={onClose}/>
    </>
  )
}
