import { React,useEffect,useState } from "react"
import Footer from "./Footer"
import Nav from './navigation'
import { useNavigate } from "react-router-dom"
import './SignUp.css'

const Login=()=>{

   const navigate = useNavigate()
   const [email,setEmail]=useState('')
   const [password,setPassword]=useState('')

   useEffect(()=>{
  const auth = localStorage.getItem('user')
  if(auth){
    navigate('/')
  }
   },[])

   async function loginHandler (){
    
    let result =await fetch('http://localhost:5001/login',{
        method:'post',
        body:JSON.stringify({email:email,password:password}),
        headers:{
            'Content-Type':'application/json'
        }
       
    })
   const finalresult =  await result.json()
   
    if(finalresult.auth){
     localStorage.setItem('user',JSON.stringify(finalresult.user))
     localStorage.setItem('token',JSON.stringify(finalresult.auth))
     navigate('/')
    }else{
     console.log('please enter correct details')
    }
  
   }
    return <>


        <Nav/>
        <h1 style={{marginLeft:720}}>
            login
        </h1>
        <div style={{marginLeft:650}}>
            <input type='text' placeholder="email" value={email} className='inputBox' onChange={e=>setEmail(e.target.value)}/>
            <input type='text' placeholder="password" value={password} className='inputBox'onChange={e=>setPassword(e.target.value)}/>
             <button type="button" className='signbutton' onClick={loginHandler}>Submit</button>
        </div>
        <Footer/>
                        
    </>
}

export default Login