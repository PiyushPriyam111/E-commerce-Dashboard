import React, { useState } from "react";
import "../components/navigation.css";
import "../components/SignUp.css";
const Add = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
                                                              
  const addproductButtonhandler = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }
    const auth = localStorage.getItem("user");
    const userId = JSON.parse(auth)._id;

    const result = await fetch("http://localhost:5001/add-products", {
      method: "post",
      body: JSON.stringify({ name, price, category, userId, company }),
      headers: { "Content-Type": "application/json" ,Authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`},
    });

    const finalresult = await result.json();
    console.log(finalresult);
  };

  return (
    <>
      <div style={{ marginLeft: 650 }}>
        <h1 style={{ marginLeft: 40 }}>Add Products</h1>
        <input
          type="text"
          placeholder="Enter Product name"
          className="inputBox"
          onChange={(e) => setName(e.target.value)}
        />
        {error && !name && (
          <span style={{ marginLeft: 42, color: "red" ,marginTop:0 }}>Enter Valid Name</span>
        )}
        <input
          type="text"
          placeholder="Enter product price"
          className="inputBox"
          onChange={(e) => setPrice(e.target.value)}
        />
        {error && !price && (
          <span style={{ marginLeft: 42, color: "red" }}>
            Enter Valid price
          </span>
        )}
        <input
          type="text"
          placeholder="Enter product category"
          className="inputBox"
          onChange={(e) => setCategory(e.target.value)}
        />
        {error && !category && (
          <span style={{ marginLeft: 42, color: "red" }}>
            Enter Valid category
          </span>
        )}
        <input
          type="text"
          placeholder="Enter products  company"
          className="inputBox"
          onChange={(e) => setCompany(e.target.value)}
        />
        {error && !company && (
          <span style={{ marginLeft: 42, color: "red" }}>
            Enter Valid company
          </span>
        )}
        <button className="signbutton" onClick={addproductButtonhandler}>
          Add Products
        </button>
      </div>
    </>
  );
};

export default Add;
