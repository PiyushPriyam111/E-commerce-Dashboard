
import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import Home from './pages/Home';
import Add from './pages/Add';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import Update from './pages/Update';
import Signup from './components/SignUp';
import Login from './components/login';



const router = createBrowserRouter([
  {path:'/',element:<Root/>,
  children:[
    {index:true,element:<Home/>},
    {path:'/add',element:<Add/>},
    {path:'/profile',element:<Profile/>},
    {path:'/logout',element:<Logout/>},
    {path:'/update/:id',element:<Update/>},
   
  
  ]
  
},
 {path:'/signup',element:<Signup/>},
 {path:'/login',element:<Login/>}
])

function App() {
  return (<>
  <RouterProvider router={router}/>
  </>
   );
}

export default App;
