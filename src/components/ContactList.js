import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { contactService } from "../services/contactService";
import Spinner from "./Spinner";

const ContactList = () => {

  let [query, setQuery] = useState({
    text: ''
  })

  let [state, setState] = useState({
    loading : false,
    contacts : [],
    filterContacts: [],
    errroMessage : '',
  })
  
  let {loading, contacts, filterContacts, errroMessage} = state
  useEffect(() => {
    async function fetchData(){
      try {
      setState({...state, loading: true})
      let response = await contactService.getAllContacts()
      setState({
        ...state,
        loading:false,
        contacts: response.data,
        filterContacts: response.data
      })
    } catch (error) {
       setState({
        ...state,
        loading: false,
        errroMessage: error.message
       })
    }
    }
    fetchData()
  }, [])
  
  const searchContact = (event) =>{
      setQuery({
        ...query,
        text: event.target.value
      })
      let theContacts = state.contacts.filter(contact =>{
        return contact.name.toLowerCase().includes(event.target.value.toLowerCase())
      })
      setState({
        ...state,
        filterContacts: theContacts
      })
  }

  const clickDelete = async(contactId) =>{
    try {
    let response = await contactService.deleteContact(contactId)
    if (response){
       setState({...state, loading: true})
      let response = await contactService.getAllContacts()
      setState({
        ...state,
        loading:false,
        contacts: response.data,
        filterContacts: response.data
      })
    }
    } catch (error) {
       setState({
        ...state,
        loading: false,
        errroMessage: error.message
       })
    }
  }
  return (
    <>
      <section className="contact-search p-3">
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3">
                  Contact Manager
                  <Link to={"/contacts/add/"} className="btn btn-primary ms-2">
                    <i className="fa fa-plus-circle me-1" />
                    New
                  </Link>
                </p>
              </div>
            </div>
            <div className="row">
              <form action="">
                <div className="row">
                  <div className="col">
                    <div className="mb-2">
                      <input
                        name="text"
                        value={query.text}
                        onChange={searchContact}
                        type="text"
                        className="form-control"
                        placeholder="search names"
                      />
                    </div>
                  </div>
                  <div className="col">
                     <div className="mb-2">
                  <input
                    type="submit"
                    className="btn btn-outline-dark"
                    value="Search"
                  />
                </div>
                  </div>
                </div>

            
              </form>
            </div>
          </div>
        </div>
      </section>
       {
        loading ? <Spinner/> : <>
        <section className="contacts">
        <div className="container">
          <div className="row">
            {
              filterContacts.length > 0 && 
              filterContacts.map(contact =>{
                return(
              <div className="col-md-6">
              <div className="card my-2">
                <div className="card-body">
                 <div className="row align-items-center d-flex justify-content-around">
                   <div className="col-md-4">
                    <img src={contact.photo} alt="" style={{height:"150px", width:"150px", borderRadius:"50%"}}/>
                  </div>
                  <div className="col-md-7">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-action">
                        Name: <span className="fw-bold">{contact.name}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Mobile Number: <span className="fw-bold">{contact.mobile}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Email: <span className="fw-bold">{contact.email}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-1 d-flex flex-column align-items-center">
                    <Link to={`/contacts/view/${contact.id}`} className="btn btn-warning my-1">
                      <i className="fa fa-eye"/>
                    </Link>
                    <Link to={`/contacts/edit/${contact.id}`} className="btn btn-primary my-1">
                      <i className="fa fa-pen"/>
                    </Link>
                    <button
                    onClick={()=>clickDelete(contact.id)}
                    className="btn btn-danger my-1">
                      <i className="fa fa-trash"/>
                    </button>
                  </div>
                 </div>
                </div>
              </div>
            </div>
                )
              })
            }
            
          </div>
        </div>
      
      </section>

        </>
       }
    </>
  );
};

export default ContactList;
