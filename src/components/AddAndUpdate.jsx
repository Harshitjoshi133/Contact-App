import React from 'react'
import Modal from './Modal'
import { Formik,Form,Field, ErrorMessage } from 'formik'
import { db } from '../config/firebase'
import { doc,addDoc, collection, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import * as Yup from "yup";
const AddAndUpdate = ({isOpen,onClose,isUpdate,contact}) => {
   
    const contactValidationSchema=Yup.object().shape({
        name:Yup.string().required("Name is Required"),
        email:Yup.string().email("Invalid Email").required("Email is Required"),
    }
    )
    const addContacts= async (contact) => { 
        try {
            const contactRef= collection(db,"contacts");
            await addDoc(contactRef,contact);
            onClose();
            toast.success("Contact has been added successFully")
        } catch (error) {
            console.log(error);
        }
        
    }
    const updateContacts= async (contact,id) => { 
        try {
            const contactRef= doc(db,"contacts",id);
            await updateDoc(contactRef,contact);
            onClose();
            toast.success("Contact has been updated successFully")
        } catch (error) {
            console.log(error);
        }
        
    }
    
  
    
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <Formik 
            validationSchema={contactValidationSchema}
            initialValues={
                isUpdate?
                {
                    name:contact.name,
                    email:contact.email,
                }:
                {
                    name:"",
                    email:"",
                }
                
            }
            onSubmit={(values)=>{
                console.log(values);
                isUpdate?updateContacts(values,contact.id):addContacts(values);
            }
            }
        >
            <Form>
                <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-1'>
                    <label>Name</label>
                    <Field name="name" className="border h-10 "/>
                    <div className='text-red-500 text-xs'>
                    <ErrorMessage name="name"/>
                    </div>
                    
                </div>
                <div className='flex flex-col gap-1'>
                    <label>Email</label>
                    <Field name="email" className="border h-10 "/>
                    <div className='text-red-500 text-xs'>
                    <ErrorMessage name="email"/>
                    </div>
                </div>
                <button className='bg-orange self-end border px-3 py-1.5'> {isUpdate ?"Update":"Add"} Contact</button>
                </div>
            </Form>
        </Formik>
        
    </Modal>

  )
}

export default AddAndUpdate