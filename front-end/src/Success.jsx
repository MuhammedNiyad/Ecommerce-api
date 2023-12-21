import React from 'react'

export default function Success() {
    const success_btn = {
        color: "white",
        background: "green",
        padding: "10px 25px",
        border: "none",
        "border-radius": "5px"
    }
  return (
    <div style={{ width:"100%", height:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        <button style={success_btn}>Success</button>
        <p>Payment successully completed</p>
    </div>
  )
}
