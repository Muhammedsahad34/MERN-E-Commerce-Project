import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../../URL';

function ViewOrderDetail() {
  const {id} = useParams();

  useEffect(()=>{
    console.log(id);
    axios.get(`${baseUrl}/fetchEachOrder/${id}`,{withCredentials:true}).then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    })
  },[id])
  return (
    <div>
        <h1>{id}</h1>
    </div>
  )
}

export default ViewOrderDetail