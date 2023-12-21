import axios from 'axios'

export default function Pay_btn({product}) {

    const BtnClick = async ()=>{
        try {
            const res = await axios.post('http://localhost:5000/api/checkout/payment',product)
            console.log(res.data);
        } catch (error) {
            console.log(error.message);
        }
    }
  return (
    <div>
        <button onClick={BtnClick} style={
            {
                background: 'black',
                color: 'white',
                padding: '15px 35px',
                borderRadius: '10px'
            }
        }>Pay</button>
    </div>
  )
}
