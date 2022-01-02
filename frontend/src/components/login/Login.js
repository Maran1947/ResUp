import React, { useContext } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


function Login() {
    const navigate = useNavigate();

    async function submitForm(e) {
        e.preventDefault();

        const data = {
            email: e.target.email.value,
            password: e.target.password.value,
        }
        // console.log(data);

        try {
            const response = await axios.post('http://localhost:8000/login', data);
            if(response.status === 201) {
                localStorage.setItem("token",JSON.stringify(response.data.token))
                navigate('/');
            }
        } catch (err) {
            console.log(err.response);
        }

    }

    return (
        <div className="login_container">
            <form method='POST' onSubmit={submitForm}>
                <h2>Sign In</h2>
                <div className="form_rows">
                    <label htmlFor='Username'>Email: </label>
                    <input type="text" name="email" className="input" ></input>
                </div>
                <div className="form_rows">
                    <label htmlFor='password'>Password: </label>
                    <input type="password" name="password" className="input" ></input>
                </div>
                <div className='form_btn_box'>
                    <button type='submit'>Log in</button>
                </div>
                <span>Don't have an account? <Link to='/signup'>Sign up</Link></span>
            </form>
        </div>
    )
}

export default Login;
