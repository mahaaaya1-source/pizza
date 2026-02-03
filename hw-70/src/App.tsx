import { Routes, Route } from 'react-router-dom';
import Contacts from './containers/Contacts';
import NewContact from './containers/NewContact';
import EditContact from './containers/EditContact';

const App = () => (
  <Routes>
    <Route path="/" element={<Contacts />} />
    <Route path="/new" element={<NewContact />} />
    <Route path="/edit/:id" element={<EditContact />} />
  </Routes>
);

export default App;
