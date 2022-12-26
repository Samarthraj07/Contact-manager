import React from 'react'
import spinnerImg from '../assets/images/Loading_icon.gif'

const Spinner = () => {
  return (
    <div>
        <img src={spinnerImg} alt="" style={{display:"block", margin: "auto", width: "250px"}}/>
    </div>
  )
}

export default Spinner