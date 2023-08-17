import { Link} from "react-router-dom"
import './navigation.css'


const Nav=()=>{
const auth = localStorage.getItem('user')
const Logout =()=>{
    localStorage.clear()
   

}

    return (<>
      
           <img src="https://cdn.dribbble.com/users/2948332/screenshots/5926397/media/357699e8f3cebb604bc8c2cb172682a9.jpg"
           alt="logo"
            className="logoimg"
           />
            <ul className='nav-ul'>
               
             {
                
                auth?<>
                    <li><Link to='/'>Home</Link></li>
                <li><Link to='/add'>Add</Link></li>
               
            
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link to='/signup' onClick={Logout}>LogOut {(JSON.parse(auth).name)}</Link></li>
                </>:
                <>
                       <li><Link to='/signup'>Signup</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                </>
             } 
          
            </ul>
     
     
       
      
    </>)
}

export default Nav