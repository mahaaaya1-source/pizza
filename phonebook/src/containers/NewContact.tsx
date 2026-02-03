import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { createContact } from '../features/contacts/contactsThunks';
import { selectCreateContactLoading } from '../features/contacts/contactsSlice';
import ContactForm from '../components/ContactForm';
import {type Contact } from '../features/contacts/contactsTypes';

const NewContact = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectCreateContactLoading);

  const onSubmit = async (contact: Contact) => {
    await dispatch(createContact(contact));
    navigate('/');
  };

  return <ContactForm onSubmit={onSubmit} isLoading={loading} />;
};

export default NewContact;
