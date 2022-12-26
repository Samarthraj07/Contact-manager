import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import ContactList from "./components/ContactList"
import EditContact from "./components/EditContact"
import AddContact from "./components/AddContact"
import ViewContact from "./components/Viewcontact"
import Spinner from './components/Spinner';




function App() {
  return (
   <>
  
    <Navbar/>
    <Routes>
      <Route path={'/'} element={<Navigate to={'/contacts/list'}/>}/>
      <Route path={'/contacts/list'} element={<ContactList/>}/>
      <Route path={'/contacts/add/'} element={<AddContact/>}/>
      <Route path={'/contacts/view/:contactId'} element={<ViewContact/>}/>
      <Route path={'/contacts/edit/:contactId'} element={<EditContact/>}/>
      

    </Routes>


   </>
  );
}

export default App;
