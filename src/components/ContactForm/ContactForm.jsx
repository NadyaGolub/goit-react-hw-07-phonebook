import React, { useState} from 'react';
import { nanoid } from 'nanoid';
import { Box, Btn, Label } from './ContactForm.styled';

import { useDispatch, useSelector } from 'react-redux';
import { selectContacts} from 'redux/selectors';
import { addContact } from 'redux/operations';


 const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
   const contacts = useSelector(selectContacts);
  //  const isLoading = useSelector(selectIsLoading);
  //  const error = useSelector(selectError);


  const handleNameChange = evt => {
    setName(evt.target.value);
  };
  const handleNumberChange = evt => {
    setNumber(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    
    if (contacts.some(contact => contact.name === name)) {
      alert(`contact already exists`);
      return;
    }

    dispatch(addContact({ name, number, id: nanoid() }));

    resetForm();
  };
  const resetForm = () => {
    setName('');
    setNumber('');
  };

  //  useEffect(() => {
  //   dispatch(fetchContacts());
  // }, [dispatch]);
   
  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <Label> Name </Label>
        <input
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Za-яА-Я]+(([' -][a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$"
          onChange={handleNameChange}
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />

        <Label>Number </Label>
        <input
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          onChange={handleNumberChange}
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        {/* {isLoading === `true` && <h2>Loading ...</h2>}
        {error && <h2>An error occurt {error}</h2>} */}
        <Btn type="submit">Add contact</Btn>
      </Box>
    </form>
  );
};

export default ContactForm;