import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateUser = () => {

  const navigate=useNavigate()

  const {id} = useParams()

  const [name,setName]=useState()
  const [email,setEmail]=useState()
  const [age,setAge]=useState()

  const userUpdate=()=>{
    
  }

  useEffect(()=>{
      axios.post('http://127.0.0.1:3001/getUser/'+id)
      .then(response=>{
        setName(response.data.name)
        setEmail(response.data.email)
        setAge(response.data.age)
      })
  },[])

  const updateUser=(e)=>{
    e.preventDefault()
    axios.post('http://127.0.0.1:3001/updateUser/',{
      id:id,
      name:name,
      email:email,
      age:age
    })
    .then(response=>{
      console.log(response.data)
      navigate('/')
    })
    .catch(err=>console.log(err))
    
  }
  
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white round p-3'>


        <form onSubmit={updateUser}>
          <h2>Update User</h2>
            <div className='mb-2'>
              <label htmlFor='name'>Name</label>
              <input type='text' placeholder='Enter Name' className='form-control' value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>

            <div className='mb-2'>
              <label htmlFor='email'>Email</label>
              <input type='email' placeholder='Enter Email' className='form-control' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>

            <div className='mb-2'>
              <label htmlFor='age'>Age</label>
              <input type='text' placeholder='Enter Age' className='form-control' value={age} onChange={(e)=>setAge(e.target.value)}/>
            </div>
            <button className='btn btn-success'>Update</button>
        </form>
      </div>

    </div>
  )
}

export default UpdateUser