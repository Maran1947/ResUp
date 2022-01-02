import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="hero_container">
            <div className='hero_content'>
                <div className='hero_text'>
                    <h2>Make Yourself better with <br /><span>ResUp</span></h2>
                    <p>This New Year, resolve to better yourself in terms of productivity, 
                        efficiency, and more. In this new year, resolve to be better 
                        than your past. This new year, resolve to learn new things every day.
                        Keep one thing in mind, a new year comes with 12 months, in other words, 8760 hours.
                        With that thought in mind, 
                        ResUp will assist you throughout the journey. 
                        So, what are you waiting for?</p>
                    <a href='#'>Let's dive into it</a>
                </div>
            </div>
        </header>
    )
}

export default Header;
