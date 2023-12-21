import React from 'react'
import Pay_btn from './Pay_btn'

export default function Checkout() {

    const product ={
        name: "Best seller",
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2N2GO38XBJgDXuNRehChsFr27oP4jI8HQOw&usqp=CAU',
        price: 100,
    }
  return (
    <div style={
        {
            display: 'flex',
            justifyContent: 'center',
            alignItems: "center",
            width: "100%",
            height:'100vh',
        }
    }>
        <div style={
            {
                display: 'flex',
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                background: 'lightgray',
                borderRadius: '15px',
                padding: '30px 50px'
            }
        }>
            <h3>Best seller{product.name}</h3>
            <img src={product.image} />
            <p>${product.price}</p>
            <Pay_btn product={product} />
        </div>
    </div>
  )
}
