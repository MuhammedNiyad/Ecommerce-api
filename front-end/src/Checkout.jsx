import StripeCheckout from 'react-stripe-checkout';
import React, { useState, useEffect } from "react";
import axios from 'axios';


const KEY = "pk_test_51OP1RdSB7koZnX9zxaTQYgUzM4wZgFMif8GocIHQjL7v0894FtgpODmxEML6SRG1L4Oi2tMu6DdT1CHuWs4KRgMn00svAEq6gM"

export default function Checkout() {
  
const product = {
    name: "book",
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg9eLnXnJoH9sJNBQWKlwiE60ZVrXBCeuPdg&usqp=CAU",
    price: 10
}
 
    return (
        <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <h3>{product.name}</h3>
            <img style={{ width: "50px"}} src={product.img} alt="book" />
            <h5>${product.price}</h5>
   
          <Button product={product}/>
   
            <p>Click the pay button for payment</p>
        </div>
    )
}


const Button = ({product}) => {
    const pay_btn = {
        color: "white",
        background: "black",
        padding: "10px 25px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
    }

    const checkout = async ()=> {
        try {
            const res = await axios.post('http://localhost:5000/api/checkout/payment',product)
            console.log(res.data);
        } catch (error) {
            console.log(error.message);
        }
    }
    return(
        <button type='submit' onClick={checkout} style={pay_btn}>Pay</button>
    )
}