import React from 'react';
import './App.css';
import ContactFormContainer from '../ContactForm/ContactForm.container';
import ContactListContainer from '../ContactList/ContactList.container';

function App() {
  return (
    <main className='app_main'>
      <ContactFormContainer />
      <ContactListContainer />
    </main>
  );
}

export default App;
