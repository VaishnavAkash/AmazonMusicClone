import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button'
import './SignUpForm.css'

function SignUpForm() {

  const[userName,setUserName]= useState('');
  const[userEmail,setUserEmail]= useState('');
  const[userPassword,setUserPassword]= useState('');
  const[status,setStatus]= useState('Hello Im Akash');
  const nav= useNavigate();


  function signUpUser(e){

    e.preventDefault();
    fetch('https://academics.newtonschool.co/api/v1/user/signup',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'projectId': 'YOUR_PROJECT_ID'
      },
      body: JSON.stringify({
        name:userName,
        email:userEmail,
        password:userPassword,
        appType: 'music'
      })
    })
    .then((res)=>res.json())
    .then((data)=>console.log(data))
    .catch((err)=>console.log(err));
  }


  function redirectLogin(){
    nav('/login');
  }


  return (
    <div className='signUpFormContainer'>
    <div className='signUpForm'>
        <form className='signUpFormTop' onSubmit={signUpUser}>
            <h2>Sign In</h2>
            <div className='signUpUserNameForm'>
            <label for='userName'>Username</label>
            <input value={userName} onChange={(e)=>{
                setUserName(e.target.value)
                }} type='text' className='signUpUserNameInput' style={{marginBottom:0}}/>
            </div>
            <div className='userEmailForm'>
            <label for='userName'>Email</label>
            <input value={userEmail} onChange={(e)=>{
                setUserEmail(e.target.value)
                }} type='text' className='signUpUserEmailInput'/>
            </div>
            <div className='userPasswordForm'>
            <label for='password'> Password</label>
            <input value={userPassword} onChange={(e)=>{
                setUserPassword(e.target.value)
                }} type='password' className='signUpUserPasswordInput'/>
            </div>
            <p style={{fontSize:'1rem',color:'red '}}>{status}</p>   
            <Button className='updatePasswordSubmit' style={{backgroundColor:'yellow',width:'100%', borderRadius:'5px',padding:'0.5rem'}}>Sign Up</Button>
            </form>
        <div className='signUpFormBottom'>
          <p>Already have a Account?</p>
          <Button className='updatePasswordSubmit' style={{backgroundColor:'lightseagreen',width:'100%', marginTop:'1rem', borderRadius:'5px',padding:'0.5rem'}} onClick={redirectLogin}>Login</Button>
        </div>
    </div>
    </div>
  )
}

export default SignUpForm