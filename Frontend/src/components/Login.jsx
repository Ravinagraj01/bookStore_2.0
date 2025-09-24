import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from 'axios';

function Login() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    // const onSubmit = data => console.log(data);
    const onSubmit = async (data) => {
        const userInfo={
            email: data.email,
            password: data.password
        }
        // console.log(data);
        await axios.post('http://localhost:8000/user/login',userInfo)
        .then((res)=>{
            console.log(res.data);
            if(res.data){
                alert('Signup Succesfully')
                document.getElementById("my_modal_3").close()
                setTimeout(()=>{
                    window.location.reload()
                },2000)
                
            } 
            localStorage.setItem("Users",JSON.stringify(res.data.user))
        }).catch((err) => {
            if(err.res){
                console.log(err);
                alert('Error: '+err)
                // alert("Error : "+err.res.data.message)
                setTimeout(()=>{})
            }           
        })
        
    }

    return (
        <div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                        {/* Close Button */}
                        <button
                            type="button"
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={() => document.getElementById('my_modal_3').close()}
                        >
                            X
                        </button>

                        <h3 className="font-bold text-lg">Login</h3>

                        <div className='mt-4 space-y-2'>
                            <span>Email</span>
                            <br />
                            <input
                                type="email"
                                placeholder='Enter your email'
                                className='w-80 px-3 rounded-md py-1'
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
                                className='w-80 px-3 rounded-md py-1'
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                        </div>

                        <div className='flex justify-around mt-3'>
                            <button type="submit" className='bg-pink-500 text-white p-1 rounded-lg hover:bg-pink-700 duration-200'>
                                Login
                            </button>
                            <p>Not Registered?</p>
                            <Link to='/signup' className='underline text-pink-400 cursor-pointer'>SignUp</Link>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    )
}

export default Login;
