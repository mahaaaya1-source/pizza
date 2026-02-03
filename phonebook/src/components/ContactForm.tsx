import { useState } from 'react';

const ContactForm = ({ onSubmit, existingContact, isLoading }: any) => {
  const [form, setForm] = useState(
    existingContact || { name: '', phone: '', email: '', photo: '' }
  );

  const changeHandler = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <input name="name" value={form.name} onChange={changeHandler} placeholder="Name" />
      <input name="phone" value={form.phone} onChange={changeHandler} placeholder="Phone" />
      <input name="email" value={form.email} onChange={changeHandler} placeholder="Email" />
      <input name="photo" value={form.photo} onChange={changeHandler} placeholder="Photo URL" />
      <button disabled={isLoading}>Save</button>
    </form>
  );
};

export default ContactForm;
