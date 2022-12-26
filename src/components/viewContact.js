import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { contactService } from '../services/contactService'



const ViewContact = () => {
  let {contactId} = useParams()

  const [state, setState] = useState({
    loading: false,
    contact: {},
    group: '',
    errorMessage: ''
  })
  
  let {contact, loading, errorMessage, group} = state
  useEffect(() => {
    async function fetchData(){
       try {
      setState({...state, loading: true})
      let response = await contactService.getContact(contactId)
      let groupResponse = await contactService.getGroup(response.data)
      setState({
        ...state,
        loading: false,
        contact: response.data,
        group: groupResponse.data
      })
     
    } catch (error) {
       setState({
        ...state,
        loading:false,
        errorMessage: error.message
       })
    } 
    }
    fetchData()
  }, [contactId])
  
  return (
    <div>
      <section className='my-3'>
        <div className="container">
         <div className="row">
          <div className="col">
             <p className='h4 text-warning'>Contact details</p>
          </div>
         </div> 
        </div>
      </section>

      <div className="section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4">
              <img src={contact.photo} alt='' style={{height:"250px", width:"250px", borderRadius:"50%"}}/>
            </div>
            <div className="col-md-6">
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
                      <li className="list-group-item list-group-item-action">
                        Company Name: <span className="fw-bold">{contact.company}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Title: <span className="fw-bold">{contact.title}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Group: <span className="fw-bold">{group.name}</span>
                      </li>
                    </ul>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Link to={'/contacts/list/'} className='btn btn-warning'>Back</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewContact