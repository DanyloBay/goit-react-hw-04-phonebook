import { useState, useEffect } from 'react';
import './App.css';
import shortid from 'shortid';

import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { DATA_KEY } from './Constants';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(DATA_KEY)) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(DATA_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    const existingContact = contacts.find(
      contact => contact.name === data.name
    );
    if (existingContact) {
      alert(`${data.name} is already in contacts`);
      return;
    }
    const newContact = { id: shortid.generate(), ...data };
    setContacts(prevState => [...prevState, newContact]);
  };

  const handleInputFind = e => setFilter(e.currentTarget.value);

  const handleDeleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const filteredContacts = () => {
    const normilizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normilizedFilter)
    );
  };

  return (
    <div className="container">
      <div>
        <h1 className="container__title">Phonebook</h1>
        <ContactForm onSubmit={formSubmitHandler} />
      </div>
      <div className="container__contacts">
        <h1 className="container__title">Contacts</h1>
        <Filter value={filter} onChangeFilter={handleInputFind} />
        <ContactList
          contacts={filteredContacts()}
          onClick={handleDeleteContact}
        />
      </div>
    </div>
  );
};

export default App;
