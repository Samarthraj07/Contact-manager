import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {contactService} from '../services/contactService'

const AddContact = () => {
  let Navigate = useNavigate()

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
    groups: [],
    errorMessage: ''
  })
  
  let updataInput = (event) => {
    setState({
      ...state,
      contact:{
        ...state.contact,
        [event.target.name] : event.target.value
      }
    })
  }
  
  
  useEffect(() => {
    async function fetchdata(){
      try {
        let response = await contactService.getAllGroups()
        console.log(response.data);
        setState({
          ...state,
          loading: false,
          groups: response.data
        })
      } catch (error) {
        
      }
    }
    fetchdata()
  }, [])
  
  let {contact, loading, errorMessage, groups} = state
  
  let submitForm = async(event) =>{
    event.preventDefault()
    try {
      let response = await contactService.addContact(state.contact)
      if (response){
          Navigate('/contacts/list', {replace: true})
      }
    } catch (error) {
      setState({
       ...state,
       errorMessage: error.message

      })
       Navigate('contacts/add', {replace: false})
    }


  }


  return (
    <div>
      <section>
        
        <div className="container my-3">
          <div className="row">
            <div className="col">
              <p className="h3 text-success">Create Contact</p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <form action="" onSubmit={submitForm}>
                <div className="mb-2">
                  <input 
                  name='name'
                  required={true}
                  value={contact.name}
                  onChange={updataInput}
                  type="text" className="form-control" placeholder='Name' />
                </div>
                <div className="mb-2">
                  <input
                  name='photo'
                  //required={true}
                  value={contact.photo}
                  onChange={updataInput}
                  type="text" className="form-control" placeholder='Photo Url' />
                </div>
                <div className="mb-2">
                  <input
                  name='email'
                  //required={true}
                  value={contact.email}
                  onChange={updataInput}
                  type="text" className="form-control" placeholder='Email' />
                </div>
                <div className="mb-2">
                  <input
                  name='mobile'
                  required={true}
                  value={contact.mobile}
                  onChange={updataInput}
                  type="text" className="form-control" placeholder='Phone' />
                </div>
                <div className="mb-2">
                  <input
                  name='company'
                 // required={true}
                  value={contact.company}
                  onChange={updataInput}
                  type="text" className="form-control" placeholder='Company Name' />
                </div>
                <div className="mb-2">
                  <input
                  name='title'
                  //required={true}
                  value={contact.title}
                  onChange={updataInput}
                  type="text" className="form-control" placeholder='Title' />
                </div>
                <div className="mb-2">
                  <select
                  name='group_id'
                  required={true}
                  value={contact.group_id}
                  onChange={updataInput}
                   className='form-control'>
                    <option value="">Select a group</option>
                    {
                      groups.length > 0 &&
                      groups.map(group => {
                        return (
                          <option key={group.id} value={group.id}>{group.name}</option>
                        )
                      })
                    }
                   
                  </select>
                </div>
                <div className="mb-2">
                  <input type="submit" className="btn btn-success" value='Create' />
                  <Link to={'/contacts/list'} className='btn btn-dark ms-2'>Cancel</Link>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AddContact