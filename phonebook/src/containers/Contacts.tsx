import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchContacts, deleteContact } from '../features/contacts/contactsThunks';
import { selectContacts } from '../features/contacts/contactsSlice';
import ContactItem from '../components/ContactItem';
import ContactModal from '../components/ContactModal';

const Contacts = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);
  const navigate = useNavigate();

  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const onDelete = async () => {
    await dispatch(deleteContact(selected.id));
    setSelected(null);
    dispatch(fetchContacts());
  };

  return (
    <div className="container">
      <header>
        <h2>Phonebook</h2>
        <Link to="/new">Add new</Link>
      </header>

      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onClick={() => setSelected(contact)}
        />
      ))}

      {selected && (
        <ContactModal
          contact={selected}
          onClose={() => setSelected(null)}
          onDelete={onDelete}
          onEdit={() => navigate(`/edit/${selected.id}`)}
        />
      )}
    </div>
  );
};

export default Contacts;
