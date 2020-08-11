import React, { useState, useEffect } from 'react';
import firestore from '../firestore';
import ContactListView from './ContactList.view';
import './ContactList.css';

function ContactListContainer() {
  // state & data
  const [ allContacts, setContacts ] = useState([]);
  const [ allTitles, setTitles ] = useState([]);
  const [ selectedTitle, setFilteredTitle ] = useState('');
  const [ showDeletedMessage, setDeletedMessage ] = useState(false);
  // methods
  useEffect(() => {
    const contactsRef = firestore.collection('contacts');
    // set listener on contacts collection
    const contactsRefOff = contactsRef.onSnapshot((snapshot) => {
      // early return if there are no documents
      if (!snapshot.docs) {
        console.log('no contact cards to display');
        return;
      }
      // create array of contact documents and set them to state
      const contactsData = snapshot.docs.map(doc => { 
        return { ...doc.data(), id: doc.id }
      })
      setContacts(contactsData)
      // get all unique contact titles
      const uniqueTitles = [];
      for (const doc of snapshot.docs) {
        if (doc.data().title && !uniqueTitles.includes(doc.data().title)) {
          uniqueTitles.push(doc.data().title)
        }
      }
      setTitles(uniqueTitles);
    })
    // unsubscribe firestore listener to avoid memory leaks
    return () => {
      contactsRefOff();
    };
  }, []);

  const deleteContact = async (docId) => {
    await firestore.doc(`contacts/${docId}`).delete()
      .then(() => {
        setDeletedMessage(true);
      })
  }

  const renderContactCards = () => {
    // fitler by title if selected
    let filteredContacts = allContacts;
    if (selectedTitle !== '') {
      filteredContacts = allContacts.filter(contact => contact.title === selectedTitle)
    }
    // sort by first name descending by default (make lower case because case affects sort)
    const firstNameDes = filteredContacts.sort((a, b) => {
      if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
        return -1;
      }
      if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
        return 1;
      }
      return 0;
    })
    return firstNameDes.map((contactInfo) => {
      return (
        <div className='contact_card' key={Math.random()}>
          <p className='contact_card_info'>{contactInfo.firstName}</p>
          <p className='contact_card_info'>{contactInfo.lastName}</p>
          <p className='contact_card_info'>{contactInfo.phone}</p>
          <p className='contact_card_info'>{contactInfo.email}</p>
          <p className='contact_card_info'>{contactInfo.title}</p>
          <button onClick={() => deleteContact(contactInfo.id)}>Delete Contact</button>
        </div>
      )
    })
  }

  const renderOptions = () => {
    return allTitles.map((title) => {
      return (
        <option value={title} key={Math.random()}>{title}</option>
      )
    })
  }

  return (
    <ContactListView 
      // state & data
      selectedTitle={selectedTitle}
      showDeletedMessage={showDeletedMessage}
      // methods
      renderContactCards={renderContactCards}
      renderOptions={renderOptions}
      setFilteredTitle={setFilteredTitle}
    />
  )
} 

export default ContactListContainer;