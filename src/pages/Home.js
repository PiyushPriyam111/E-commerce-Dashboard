import React, { useEffect, useState } from "react";
import '../components/navigation.css'
import { Link } from "react-router-dom";

const Home=()=>{
const [products,setProducts]=useState([])

const deleteButton=async(id)=>{
   console.log(id)
   let result =await fetch(`http://localhost:5001/products/${id}`,{
      method:'Delete',
      headers: {Authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`}

   })
   result =await result.json() 
   if(result){
   getProducts()
   }
}

useEffect(()=>{
   getProducts()
},[])
  

const search=async(event)=>{
  let key = event.target.value
  if(key){
   let result = await fetch(`http://localhost:5001/search/${key}`,{
      headers: {Authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`}
    })
  result =await result.json()
   if(result){
   setProducts(result)
  }
  else{
   getProducts()
  }
  }  



}
const getProducts=async()=>{
    let result = await fetch('http://localhost:5001/products',{
      headers: {Authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`}
    })
    result = await result.json()
   setProducts(result)
}
console.log("products",products)
    return (<>
     <div className='product-list'>
     
     <h3>Product List</h3>
     <input type="text" placeholder="Search Product" className="searchbar" onChange={search}/>
     <ul>
        <li>S.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Categoy</li>
        <li>Operation</li>
     </ul>
     {
      products.length>0? products.map((item,index)=>(<ul key={item._id}>
        <li>{index+1}</li>
        <li>{item.name}</li>
        <li>$ {item.price}</li>
        <li>{item.category}</li>
        <li>{<button onClick={()=>{deleteButton(item._id)}}>Delete</button>}
        <Link to={'/update/'+item._id}>Update</Link>
        </li>                               
        
      </ul>)):<h1>No result found</h1>
     }
     </div>
    </>)
}

export default Home