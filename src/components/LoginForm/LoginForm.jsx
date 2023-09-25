import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import './LoginForm.css'
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
function LoginForm() {

    const[userEmail,setUserEmail]= useState('akash@gmail.com');
    const[userPassword,setUserPassword]= useState('ItsPersonal');
    const[status,setStatus]= useState('');
    const nav= useNavigate();

    function redirectSignUp(){
      nav('/signup');
    }

    function loginUser(e){
      e.preventDefault();
      fetch('https://academics.newtonschool.co/api/v1/user/login',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
          'projectId': 'YOUR_PROJECT_ID'
        },
        body: JSON.stringify({
          email:userEmail,
          password:userPassword,
          appType: 'music'
        })
      })
      .then((res)=>res.json())
      .then((data)=>console.log(data))
      .catch((err)=>console.log(err));
    }

  return (
    <div className='loginFormContainer'>
    <div className='loginForm'>
        <form className='loginFormTop' onSubmit={loginUser}>
            <h2>Login</h2>
            <div className='loginUserNameForm'> 
            <label for='userName'>Email</label>
            <input value={userEmail} onChange={(e)=>setUserEmail(e.target.value)} type='email' className='loginUserNameInput' required />
            </div>
            <div className='loginUserPasswordForm'>
                <div className='loginPasswordTop'>
                    <label for='password'>Password</label>
                    <Link className='updatePassLink' to='/update'>Update Password</Link>
                </div>
            <input value={userPassword} onChange={(e)=>setUserPassword(e.target.value)} type='password' className='userPasswordInput' required/>
            </div>
            <Button style={{backgroundColor:'yellow',padding:'0.5rem' ,border:'none',borderRadius:'8px' ,color:'black', width:'100%' , textAlign:'center', cursor:'pointer', marginTop:'1rem'}}>Login</Button> 
        </form>
        <div className='loginFormMiddle'>
        <div className='checkbox'>
                <input type='checkbox' />
                <p>Keep me signed in</p>    
        </div>
        </div>
        <div className='loginFormBottom'>
          <p>Don't have a Account?</p>
          <Button style={{backgroundColor:'lightseagreen',width:'100%', marginTop:'1rem', borderRadius:'5px',padding:'0.5rem',color:'white',fontWeight:'bold'}} onClick={redirectSignUp}>Sign Up</Button>
        </div>
    </div>
    </div>
 
  )
}

export default LoginForm