import React, { useState } from 'react'
import './Auth.css'
import icon from '../../assets/icon.png'
import AboutAuth from './AboutAuth'
import { signup , login } from '../../action/auth'
import { useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

function Auth() {
    let [isSignup , setIsSignup]=useState(false)
    let [name,setName]=useState('')
    let [email,setEmail]=useState('')
    let [password,setPassword]=useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSwitch=()=>{
        setIsSignup(!isSignup)
    }
    const HandleOnSubmit=(e)=>{
        e.preventDefault()
        if(!email && !password)
        {
            toast.error("Please Enter Email and Password")
        }
        if(isSignup)
        {
            if(!name)
            {
                toast.error("Enter a Name to Continue ")
            }
           dispatch(signup({name,email,password},navigate))
        }else{
          dispatch(login({email,password},navigate))
        }
    }
  return (
    
    <section className='auth-section'>
        <div><Toaster/></div>
        {
            isSignup && <AboutAuth/>
        }
    <div className="auth-container-2">
        {
            !isSignup && <img src={icon} alt="Stack Overflow" className='login-logo' />
        }
        <form onSubmit={HandleOnSubmit}>
            {isSignup && (
                <label htmlFor="name">
                    <h4>Display Name</h4>
                    <input type="text" name='name' id='name' onChange={(e)=>{setName(e.target.value)}} required/>
                </label>
            )}
            <label htmlFor="email">
                <h4>Email</h4>
                <input type="email" name='name' id='email' onChange={(e)=>{setEmail(e.target.value)}} required/>
            </label>
            <label htmlFor="password">
                <div style={{display:'flex',justifyContent:'space-between'}}>
                <h4>Password</h4>
                {!isSignup && <p style={{color:'#007ac6',fontSize:'13px'}}>Forgot Password?</p>}
                </div>
                <input type="password" name='name' id='password' onChange={(e)=>{setPassword(e.target.value)}} required/>
                {isSignup && <p style={{color:'#666767',fontSize:'13px'}}>Password must contain at least eight<br/> charecters,including at least 1 letter and <br />1 number</p>}
            </label>
            {
                isSignup && (
                    <label htmlFor="check">
                        <input type="checkbox" id='check' required/> 
                        <p style={{fontSize:'13px'}}>Opt-in to receive occasional,<br />product updates,user reserch invitations,<br />company announcements and digests</p>
                    </label>
                )
            }
            <button type='submit' className='auth-btn'>{isSignup?'sign up':'Log in'}</button>
            {
                isSignup && (
                    <p style={{color:'#666767',fontSize:'13px'}}>By clicking “Sign up”, you agree to our 
                        <span style={{color:'#007ac6'}}> terms of<br /> service</span> , 
                        <span style={{color:'#007ac6'}}> privacy policy</span> and 
                        <span style={{color:'#007ac6'}}> cookie policy</span></p>
                )
            }
        </form>
        <p>
            {isSignup?'already have a account?':"Don't have account?"}
            <button type='button' className='handle-switch-btn' onClick={handleSwitch}>{isSignup?'Log in':'Sign up'}</button>
        </p>
        { !isSignup && <div><p style={{fontSize:'13px' , color:'rgb(69,69,69)'}}>Demo:demo@gmail.com</p>
            <p style={{fontSize:'13px' , color:'rgb(69,69,69)'}}>Password:demo</p></div>
        }
    </div>
    </section>
  )
}

export default Auth
