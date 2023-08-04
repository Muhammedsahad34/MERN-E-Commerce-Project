import React from 'react'
import Header from '../../Components/Header/Header'
import AdminViewProduct from '../../Components/AdminViewProduct/AdminViewProduct'

function HomeAdmin(props) {
  return (
    <div>
        <Header isAdmin={props.isAdmin}/>
        <AdminViewProduct/>
        
    </div>
  )
}

export default HomeAdmin