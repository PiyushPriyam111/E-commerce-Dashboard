import React,{useEffect, useState} from 'react'
import './SignUp.css'
import { useNavigate } from 'react-router-dom'

import Nav from '../components/navigation'
import Footer from './Footer'

const Signup=()=>{

const [name,setName]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const navigate = useNavigate()

async function CollectData(){
 console.log(name,email,password)
 const result = await fetch('http://localhost:5001/signup',{
    method:'post',
    body:JSON.stringify({name:name,email:email,password:password}),
    headers:{
        'Content-Type':'application/json'
    }
 })
 const finalresult = await result.json()
 console.log(finalresult)
 localStorage.setItem("user",JSON.stringify(finalresult.result) )
 localStorage.setItem("token",JSON.stringify(finalresult.auth) )
 if(finalresult){
    navigate('/')
 }
}

   useEffect (()=>{
    const auth = localStorage.getItem('user')
    if(auth){
        navigate('/')
    }
   })

    return(
        <>
           <Nav/>
           <div style={{marginLeft:650}}>
            <h1 style={{marginLeft:60}}>Signup</h1>
            <input className='inputBox' type='text' placeholder='your Name' value={name} onChange={(e)=>{setName(e.target.value)}}/>
            <input className='inputBox' type='text' placeholder='Enter Email' value={email} onChange={e=>setEmail(e.target.value)}/>
            <input className='inputBox' type='password' placeholder='Enter Password' value={password} onChange={e=>setPassword(e.target.value)}/>
            <button className='signbutton' type='button' onClick={CollectData}>Signup</button>
        </div> 
        <Footer/>
        </>
        
    )
}

export default Signup