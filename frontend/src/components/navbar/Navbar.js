import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'
import axios from 'axios';

function Navbar() {
    const navigate = useNavigate(); 

    const logout = async () => {
        try {
            const response = await axios.get('http://localhost:8000/logout');
            if(response.status === 200) {
                localStorage.removeItem("token");
                navigate('/');
            }
        } catch(err) {
            console.log(err);
        }
    } 

    const RenderMenu = () => {
        if(localStorage.getItem("token") !== null) {
            return (
                <>
                <li><Link to='/dashboard' className='a'>Dashboard</Link></li>
                <li><button onClick={logout}>Log out</button></li>
                </>
            )
        } else {
            return (
                <>
                    <li><Link to='/signup' className='a'>Sign up</Link></li>
                    <li><Link to='/signin' className='a'>Sign in</Link></li>
                </>
            )
        }
    }

    return (
        <div className="navbar">
            <h1> ResUp </h1>
            <ul>
                <li><Link to="/" className='a'>Home</Link></li>
                <RenderMenu />
            </ul>
        </div>
    )
}

export default Navbar;
