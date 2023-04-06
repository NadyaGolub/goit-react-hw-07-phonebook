import { ButtonDel, Item } from "./ContactList.styled";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "redux/selectors";
import { useDispatch } from "react-redux";
import { deleteContact, fetchContacts } from "redux/operations";
import { useEffect } from "react";


export const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();
  const handleDeleteContact = evt => {
    dispatch(deleteContact(evt.target.id))
  }

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  
  return (
    <ul>
      {contacts.map(({id, name, number}) => {
        return (
          <Item key={id} >
                <p>{name}: </p>
                <p>{number} </p>
            <ButtonDel id={id} onClick={handleDeleteContact}>Delete</ButtonDel>
          </Item>
        );
      })}
    </ul>
  );
};
