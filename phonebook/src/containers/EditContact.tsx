import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchContact,
  updateContact,
} from '../features/contacts/contactsThunks';
import {
  selectFetchOneContactLoading,
  selectOneContact,
  selectUpdateContactLoading,
} from '../features/contacts/contactsSlice';
import ContactForm from '../components/ContactForm';

const EditContact = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const contact = useAppSelector(selectOneContact);
  const loading = useAppSelector(selectFetchOneContactLoading);
  const updating = useAppSelector(selectUpdateContactLoading);

  useEffect(() => {
    dispatch(fetchContact(id));
  }, [dispatch, id]);

  const onSubmit = async (data: any) => {
    await dispatch(updateContact({ id, contact: data }));
    navigate('/');
  };

  if (loading) return <p>Loading...</p>;

  return (
    contact && (
      <ContactForm
        existingContact={contact}
        onSubmit={onSubmit}
        isEdit
        isLoading={updating}
      />
    )
  );
};

export default EditContact;
