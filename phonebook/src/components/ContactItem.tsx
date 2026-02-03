const ContactItem = ({ contact, onClick }: any) => (
    <div className="contact-card" onClick={onClick}>
      <img src={contact.photo} alt={contact.name} />
      <span>{contact.name}</span>
    </div>
  );
  
  export default ContactItem;
  