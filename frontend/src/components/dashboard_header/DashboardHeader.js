import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './DashboardHeader.css';
import quotes from './Quotes.json'; 

function DashboardHeader() {

    let index = Math.floor(Math.random() * 102);
    
    return (
        <div className='d_header'>
            <h3>
                <i className='fas fa-quote-left'></i> 
                <span>{quotes[index].quote}</span>
                <span className='author'> - {quotes[index].author}</span>
                <i className='fas fa-quote-right'></i>
            </h3>
        </div>
    )
}

export default DashboardHeader;
