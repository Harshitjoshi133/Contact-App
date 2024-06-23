import React from 'react'
import Modal from './Modal'
import { Formik,Form,Field } from 'formik'
import { db } from '../config/firebase'
import { addDoc, collection } from 'firebase/firestore'
const AddAndUpdate = ({isOpen,onClose}) => {
   
    const addContacts= async (contact) => { 
        try {
            const contactRef= collection(db,"contacts");
            await addDoc(contactRef,contact);
        } catch (error) {
            
        }
        
    }
    
  
    
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <Formik 
            initialValues={{
                name:"",
                email:"",
            }}
            onSubmit={(values)=>{
                console.log(values);
                addContacts(values);
            }
            }
        >
            <Form>
                <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-1'>
                    <label>Name</label>
                    <Field name="name" className="border h-10 "/>
                    
                </div>
                <div className='flex flex-col gap-1'>
                    <label>Email</label>
                    <Field name="email" className="border h-10 "/>
                    
                </div>
                <button className='bg-orange self-end border px-3 py-1.5'> Add Contact</button>
                </div>
            </Form>
        </Formik>
        
    </Modal>

  )
}

export default AddAndUpdate