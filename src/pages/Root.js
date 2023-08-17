import { Outlet ,Navigate} from "react-router-dom"
import Home from "./Home"
import Nav from '../components/navigation'
import Footer from "../components/Footer"

const Root= ()=>{
 const auth = localStorage.getItem('user')

    return (<>
        <Nav/>
        <main>
         {auth?<Outlet/>:<Navigate to='/signup'/>}
        </main>
        <Footer/>
    </>)
}

export default Root