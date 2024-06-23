import React from 'react'
import Modal from './Modal'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { db } from '../config/firebase'
import { doc, addDoc, collection, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import * as Yup from "yup";

const AddAndUpdate = ({ isOpen, onClose, isUpdate, contact }) => {
   
    // Validation schema for contact form
    const contactValidationSchema = Yup.object().shape({
        name: Yup.string().required("Name is Required"),
        email: Yup.string().email("Invalid Email").required("Email is Required"),
    });

    // Function to add new contact
    const addContacts = async (contact) => { 
        try {
            const contactRef = collection(db, "contacts"); // Reference to contacts collection
            await addDoc(contactRef, contact); // Add new contact document
            onClose(); // Close modal
            toast.success("Contact has been added successfully"); // Show success toast
        } catch (error) {
            console.log(error); // Log error
        }
    }

    // Function to update existing contact
    const updateContacts = async (contact, id) => { 
        try {
            const contactRef = doc(db, "contacts", id); // Reference to specific contact document
            await updateDoc(contactRef, contact); // Update contact document
            onClose(); // Close modal
            toast.success("Contact has been updated successfully"); // Show success toast
        } catch (error) {
            console.log(error); // Log error
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}> {/* Modal component */}
            <Formik 
                validationSchema={contactValidationSchema} // Set validation schema
                initialValues={
                    isUpdate ? 
                    {
                        name: contact.name,
                        email: contact.email,
                    } :
                    {
                        name: "",
                        email: "",
                    }
                }
                onSubmit={(values) => {
                    console.log(values); // Log form values
                    isUpdate ? updateContacts(values, contact.id) : addContacts(values); // Call add or update function
                }}
            >
                <Form>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-1'>
                            <label>Name</label>
                            <Field name="name" className="border h-10 "/> {/* Name field */}
                            <div className='text-red-500 text-xs'>
                                <ErrorMessage name="name"/> {/* Error message for name */}
                            </div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label>Email</label>
                            <Field name="email" className="border h-10 "/> {/* Email field */}
                            <div className='text-red-500 text-xs'>
                                <ErrorMessage name="email"/> {/* Error message for email */}
                            </div>
                        </div>
                        <button className='bg-orange self-end border px-3 py-1.5'> 
                            {isUpdate ? "Update" : "Add"} Contact {/* Button text changes based on isUpdate */}
                        </button>
                    </div>
                </Form>
            </Formik>
        </Modal>
    )
}

export default AddAndUpdate
