import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { contactService } from '../services/contactService'
import Spinner from "./Spinner";


const EditContact = () => {
  let Navigate = useNavigate()
  let {contactId} = useParams()
  
  const [state, setState] = useState({
    loading: false,
    contact: {
      name: '',
      photo: '',
      mobile: '',
      email: '',
      title: '',
      company: '',
      group_id: ''
    },
    errorMessage: '',
    groups: []
  })
  
  useEffect(()=>{
    async function fetchdata() {
      try {
      let response = await contactService.getContact(contactId)
      let groupsresponse = await contactService.getAllGroups()
      setState({
        ...state,
        loading: false,
        contact: response.data,
        groups: groupsresponse.data
      })
    } catch (error) {
       setState({
        ...state,
        loading:false,
        errorMessage: error.message
       })
    }
    }
    fetchdata()

  },[contactId])

  
  let updataInput = (event) => {
    setState({
      ...state,
      contact:{
        ...state.contact,
        [event.target.name] : event.target.value
      }
    })
  }
  
let {contact, loading, errorMessage, groups} = state
 
const submitForm = async(event) =>{
  event.preventDefault()
   try {
    setState({...state, loadiing:true})
      let response = await contactService.updateContact(state.contact, contactId)
      if (response){
          Navigate('/contacts/list', {replace: true})
      }
    } catch (error) {
      setState({
       ...state,
       loading:false,
       errorMessage: error.message

      })
       Navigate(`contacts/edit/${contactId}`, {replace: false})
    }
}
  
  return (
     loading ? <Spinner/> :
     <div>
      <section>
        <div className="container my-3">
          <div className="row">
            <div className="col">
              <p className="h3 text-primary">Edit Contact</p>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-md-4">
              <form action="" onSubmit={submitForm}>
                <div className="mb-2">
                  <input
                  name='name'
                  value={contact.name}
                  onChange={updataInput}
                  required={true}
                
                  type="text" className="form-control" placeholder='Name' />
                </div>
                <div className="mb-2">
                  <input
                  name='photo'
                  value={contact.photo}
                  onChange={updataInput}
                 // required={true}
                  type="text" className="form-control" placeholder='Photo Url' />
                </div>
                <div className="mb-2">
                  <input
                  name='email'
                  value={contact.email}
                  onChange={updataInput}
                 // required={true}
                  type="text" className="form-control" placeholder='Email' />
                </div>
                <div className="mb-2">
                  <input
                  name='mobile'
                  value={contact.mobile}
                  onChange={updataInput}
                 // required={true}
                  type="text" className="form-control" placeholder='Phone' />
                </div>
                <div className="mb-2">
                  <input
                  name='company'
                  value={contact.company}
                  onChange={updataInput}
                 // required={true}
                  type="text" className="form-control" placeholder='Company Name' />
                </div>
                <div className="mb-2">
                  <input
                  name='title'
                  value={contact.title}
                  onChange={updataInput}
                 // required={true}
                  type="text" className="form-control" placeholder='Title' />
                </div>
                <div className="mb-2">
                  <select
                  name='group_id'
                  value={contact.group_id}
                  onChange={updataInput}
                 // required={true}
                  id="" className='form-control'>
                    <option value="">Select a group</option>
                    {
                      groups.length > 0 &&
                      groups.map(group => {
                        return (
                          <option key={group.id} value={group.value}>{group.name}</option>
                        )
                      })
                    }
                  </select>
                </div>
                <div className="mb-2">
                  <input type="submit" className="btn btn-primary" value='Update' />
                  <Link to={'/contacts/list'} className='btn btn-dark ms-2'>Cancel</Link>
                  
                </div>
              </form>
            </div>

            <div className="col-md-6">
              <img src={contact.photo} alt='' style={{height:"250px", width:"250px", borderRadius:"50%"}}/>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EditContact