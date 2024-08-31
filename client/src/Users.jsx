import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'

const Users = () => {

  const [user,setUser] = useState([])

  const navigate=useNavigate()
  
  useEffect(() => {
    axios.get('http://127.0.0.1:3001/showUser')
      .then(response => setUser(response.data))
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);
  
  const deleteData=(id)=>{
    axios.post('http://127.0.0.1:3001/deleteUser/'+id,{
      name:name
    })
    .then(response=>
      setUser(user.filter(u=> u._id!==id)),
      navigate('/')
    )
  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <Link to="/create" className='btn btn-success'>Add +</Link>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {
            user.map((user)=>{
              return (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <Link to={`/update/${user._id}`}><button className='btn btn-success'>Edit</button></Link> 
                    <button onClick={()=>deleteData(user._id)} className='btn btn-danger'>Delete</button> 
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users