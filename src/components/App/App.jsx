
import ContactForm from 'components/ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { GlobalStyle } from '../GlobalStyle';
import { Section } from '../Section/Section';
import { Container } from './App.styled';
import { useDispatch, useSelector} from 'react-redux';

import { useEffect } from 'react';
import { selectError, selectIsLoading } from 'redux/selectors';
import { fetchContacts } from 'redux/operations';




export const App = () => {
  
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
   const error = useSelector(selectError);

 useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  

  return (
    <Container>
      <Section title="Add contact">
        <ContactForm />
      </Section>
      <Section title="Find contacts by name">
        <Filter />
      </Section>
      <Section title="Contact list">
        {isLoading && !error && <b>Request in progress...</b>}
        <ContactList />
      </Section>
      <GlobalStyle />
    </Container>
  );
};
