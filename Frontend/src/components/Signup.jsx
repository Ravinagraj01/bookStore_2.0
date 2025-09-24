import React from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import Login from './Login'
import axios from "axios"


function Signup() {
    const location = useLocation()
    const navigate = useNavigate()
    const from  = location.stata?.from?.pathname || "/"
    const { register, handleSubmit, formState: { errors } } = useForm();
    // const onSubmit = data => console.log(data);
    const onSubmit = async (data) => {
        const userInfo={
            name: data.name,
            email: data.email,
            password: data.password
        }
        // console.log(data);
        await axios.post('http://localhost:8000/user/signup',userInfo)
        .then((res)=>{
            console.log(res.data);
            if(res.data){
                alert('Signup Succesfully');
                navigate(from, {replace: true});
                // <Navigate to="/"/>
            } 
            localStorage.setItem("Users",JSON.stringify(res.data.user))
        }).catch((err) => {
            if(err.res){
                console.log(err);
                alert('Error: '+err)
                // alert("Error : "+err.res.data.message)
            }           
        })
        
    }

    return (
        <div>
            <div className="flex h-screen items-center justify-center shadow-md">
                <div className="border-[2px] p-8 rounded-lg w-[600px]">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex justify-between'>
                            <h3 className="font-bold text-lg">Sign Up</h3>
                            <Link to='/' className='hover:bg-gray-950 px-2 rounded-full'>X</Link>
                        </div>

                        <div className='mt-4 space-y-2'>
                            <span>Name</span>
                            <br />
                            <input
                                type="text"
                                placeholder='Enter your name'
                                className='w-full px-3 rounded-md py-1'
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                        </div>

                        <div className='mt-4 space-y-2'>
                            <span>Email</span>
                            <br />
                            <input
                                type="email"
                                placeholder='Enter your email'
                                className='w-full px-3 rounded-md py-1'
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        </div>

                        <div className='mt-4 space-y-2'>
                            <span>Password</span>
                            <br />
                            <input
                                type="password"
                                placeholder='Enter your password'
                                className='w-full px-3 rounded-md py-1'
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                        </div>

                        <div className='flex justify-around mt-3'>
                            <button type="submit" className='bg-pink-500 text-white p-1 rounded-lg hover:bg-pink-700 duration-200'>
                                Sign Up
                            </button>
                            <p>Have an account?</p>
                            <button
                                type="button"
                                className='underline text-pink-400 cursor-pointer'
                                onClick={() => document.getElementById("my_modal_3").showModal()}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <Login />
                </div>
            </div>
            
        </div>
        
    )
}

export default Signup;
