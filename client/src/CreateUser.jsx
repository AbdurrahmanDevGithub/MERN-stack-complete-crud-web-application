import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const CreateUser = () => {

  const [name,setName]=useState()
  const [email,setEmail]=useState()
  const [age,setAge]=useState()

  const navigate = useNavigate()

  const [user,setUser] = useState()

  const Submit=(e)=>{
    e.preventDefault();
    axios.post('http://127.0.0.1:3001/createUser',{
      name:name,
      email:email,
      age:age
    })
    .then(result=>{
      console.log(result)
      navigate('/')
    })
    .catch(err=>console.log(err))
  }

  useEffect(()=>{
    axios.get('http://127.0.0.1:3001/showUser')
    .then(response=>{
      setUser(response.data)
    })
  })

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white round p-3'>
        <form onSubmit={Submit}>
          <h2>Add User</h2>
            <div className='mb-2'>
              <label htmlFor='name'>Name</label>
              <input type='text' placeholder='Enter Name' className='form-control' onChange={(e)=>setName(e.target.value)}/>
            </div>

            <div className='mb-2'>
              <label htmlFor='email'>Email</label>
              <input type='email' placeholder='Enter Email' className='form-control' onChange={(e)=>setEmail(e.target.value)}/>
            </div>

            <div className='mb-2'>
              <label htmlFor='age'>Age</label>
              <input type='text' placeholder='Enter Age' className='form-control' onChange={(e)=>setAge(e.target.value)}/>
            </div>
            <button className='btn btn-success'>Submit</button>
        </form>
      </div>

    </div>
  )
}

export default CreateUser