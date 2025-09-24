import React from 'react'
import { useAuth } from '../context/AuthProvider'

export default function Logout() {
    const [authUser, setAuthUser] = useAuth()
    const handleLogout=()=>{
        try {
            setAuthUser({
                ...authUser,
                user : null
            })
            localStorage.removeItem("Users")
            alert("Logout Succesfull")
            
            setTimeout(()=>{
                window.location.reload()
            },2000)
          
        } catch (error) {
            alert("Error Loging Out :"+error)
        }
    }
  return (
    <div>
        <button className='px-3 py-2 bg-pink-600 text-white rounded-md cursor-pointer hover:bg-red-700 duration-100'
        onClick={handleLogout}
        >Logout</button>
    </div>
  )
}
