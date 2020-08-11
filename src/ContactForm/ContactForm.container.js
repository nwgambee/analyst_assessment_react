import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import firestore from '../firestore';
import ContactFormView from './ContactForm.view';
import './ContactForm.css';

function ContactFormContainer() {
  // state & data
  const [ loading, setLoading ] = useState(false);
  const [ currentNames, setNames ] = useState([]);
  const [ contactExistsError, setContactExistsError ] = useState(false);
  const [ showSuccessMessage, setShowSuccessMessage ] = useState(false);
  const { register, errors, handleSubmit } = useForm();
  // methods
  useEffect(() => {
    const names = [];
    firestore.collection('contacts').get()
      .then((snapshot) => {
        // early return if no documents
        if (!snapshot.docs) {
          return;
        }
        for (const doc of snapshot.docs) {
          const firstAndLast = `${doc.data().firstName.toLowerCase()} ${doc.data().lastName.toLowerCase()}`;
          names.push(firstAndLast);
        }
        setNames(names);
      })
  }, [])

  const onSubmit = async (formData) => {
    setLoading(true);
    // check if current name already exists as a contact, display error if so.
    const thisName = `${formData.firstName.toLowerCase()} ${formData.lastName.toLowerCase()}`;
    if (currentNames.includes(thisName)) {
      setContactExistsError(true);
      setLoading(false);
      return;
    }
    // create contact document
    const {
      firstName, 
      lastName, 
      email,
      phone,
      title,
    } = formData;
    await firestore.collection('contacts').doc()
      .set({
        firstName, 
        lastName, 
        email,
        phone,
        title,
      })
      .then(() => {
        setLoading(false);
        setContactExistsError(false);
        setShowSuccessMessage(true);
      })
      .catch(e => console.log('error creating contact document:', e));
  };


  return (
    <ContactFormView 
      // state & data
      loading={loading}
      contactExistsError={contactExistsError}
      showSuccessMessage={showSuccessMessage}
      errors={errors}
      // methods
      handleSubmit={handleSubmit}
      register={register}
      onSubmit={onSubmit}
    />
  )
} 

export default ContactFormContainer;