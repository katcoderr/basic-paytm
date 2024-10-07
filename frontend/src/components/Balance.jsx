import axios from "axios"
import { useState } from "react"

export const Balance = () => {
    const [balance, setBalance] = useState(0)
    
    axios.get("http://localhost:3000/api/v1/account/balance",{
        headers :{
            Authorization : localStorage.getItem("token")
        }
    }).then((response)=>{
        setBalance(response.data.balance)
    })
    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance}
        </div>
    </div>
}