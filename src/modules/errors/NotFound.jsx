import React from 'react'
import Oops404Error from "./../../assets/images/Oops404Error.svg"
import './../../assets/Pages/NotFound.scss'
const NotFound = () => {
  return (
    <div className='content'>
      <img src={Oops404Error}/>
    </div>
  )
}

export default NotFound
