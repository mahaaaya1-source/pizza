const ContactModal = ({ contact, onClose, onDelete, onEdit }: any) => (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="close" onClick={onClose}>×</button>
        <img src={contact.photo} alt={contact.name} />
        <h3>{contact.name}</h3>
        <p>{contact.phone}</p>
        <p>{contact.email}</p>
  
        <div className="modal-actions">
          <button onClick={onEdit}>Edit</button>
          <button className="danger" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
  
  export default ContactModal;
  