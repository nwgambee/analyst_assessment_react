import React from 'react';
import './ContactList.css';

function ContactListView(props) {
  const {
    // state & data
    selectedTitle,
    showDeletedMessage,
    // methods
    renderContactCards,
    renderOptions,
    setFilteredTitle,
  } = props;
  
  return (
    <main className='contact_list_main'>
      <h2 className='contacts_header'>Contacts</h2>
      <select className='title_filter' value={selectedTitle} onChange={(e) => setFilteredTitle(e.target.value)}>
        <option value=''>Filter By Title</option>
        {renderOptions()}
      </select>
      {selectedTitle !== '' ? <p className='selected_title_label'>Title: {selectedTitle}</p> : null}
      {showDeletedMessage ? <p className='deleted_msg'>Contact successfully deleted.</p> : null}
      <section className='contact_cards_container'>
        {renderContactCards()}
      </section>
    </main>
  )
} 

export default ContactListView;