import React, { useEffect, useState } from "react";
import "../components/navigation.css";
import "../components/SignUp.css";
import { useParams,useNavigate } from "react-router-dom";

const Update = () => {

const navigate = useNavigate()

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();

  useEffect(() => {
    getProductsdetails();
  }, []);
  const getProductsdetails = async () => {
    let result = await fetch(`http://localhost:5001/products/${params.id}`,{headers: {Authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`}});
    result = await result.json();
    console.log(result);
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const updateproductButtonhandler = async () => {
    
    let result = await fetch(`http://localhost:5001/products/${params.id}`, {
      method: "put",
      body: JSON.stringify({ name, price, category, company }),
      headers: { 'Content-Type':'application/json'
        ,Authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`}
    });
    result = await result.json();
 console.log(result)
 if(result.modifiedCount===0){
    alert('please modify something')
 }else{
     navigate('/')
 }

  };

  return (
    <>
      <div style={{ marginLeft: 650 }}>
        <h1 style={{ marginLeft: 40 }}>Update Products</h1>
        <input
          type="text"
          placeholder="Enter Product name"
          className="inputBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter product price"
          className="inputBox"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter product category"
          className="inputBox"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter products  company"
          className="inputBox"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <button className="signbutton" onClick={updateproductButtonhandler}>
          Update Products
        </button>
      </div>
    </>
  );
};

export default Update;
