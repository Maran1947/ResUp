import React from 'react';
import './Signup.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();

    async function submitForm(e) {
        e.preventDefault();

        const data = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
            cpassword: e.target.confirm_password.value
        }

        if(data.password === data.cpassword ) {
            // console.log(data);
            try {
                const response = await axios.post('http://localhost:8000/signup',data);
                if(response.status === 201) {
                    console.log(response)
                    localStorage.setItem("token",JSON.stringify(response.data.token));
                    navigate('/');
                }
            } catch(err) {
                console.log(err.response);
            }
        } 
    }

    return (
        <div className="signup_container">
            <form method="POST" onSubmit={submitForm} >
                <h2>Sign up</h2>
                <div className="form_rows">
                    <label htmlFor='Username'>Username: </label>
                    <input type="text" name="username" className="input" ></input>
                </div>
                <div className="form_rows">
                    <label htmlFor='email'>Email: </label>
                    <input type="email" name="email" className="input" ></input>
                </div>
                <div className="form_rows">
                    <label htmlFor='password'>Password: </label>
                    <input type="password" name="password" className="input" ></input>
                </div>
                <div className="form_rows">
                    <label htmlFor='confirm_password'>Confirm Password: </label>
                    <input type="password" name="confirm_password" className="input" ></input>
                </div>
                <div className='form_btn_box'>
                    <button type='submit'>Register</button>
                </div>
                <span>Already have an account? <Link to='/signin'>Sign in</Link></span>
            </form>
        </div>
    )
}

export default Signup;
