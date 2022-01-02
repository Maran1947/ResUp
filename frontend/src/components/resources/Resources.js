import React, { useEffect, useState } from 'react';
import './Resources.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Notifications, {notify} from 'react-notify-toast';

function Resources() {
    const [resource, setResource] = useState([]);

    const savedResource = async (e) => {
        e.preventDefault();

        const new_res = {
            token: JSON.parse(localStorage.getItem("token")),
            title: e.target.title.value,
            link: e.target.link.value
        }

        try {
            const response = await axios.post('http://localhost:8000/save-resource', new_res);
            let myColor = { background: 'rgb(21, 255, 0)', text: "#FFFFFF" };
            notify.show(response.data.message, "custom", 5000, myColor);
            getResource()
        } catch(err) {
            console.log(err);
        }

        e.target.title.value = "";
        e.target.link.value = "";
    }

    const handleLetsGo = (res,index) => {
        window.open(res.link, '_blank');  
    }

    const handleDelete = async (res,index) => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await axios.post('http://localhost:8000/delete-resource', { token:token, title:res.title });
            // console.log(response);
            let myColor = { background: 'rgb(236, 0, 0)', text: "#FFFFFF" };
            notify.show(response.data.message, "custom", 5000, myColor);
            getResource();  
        } catch(err) {
            console.log(err);
        }
    }

    async function getResource() {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await axios.post('http://localhost:8000/get-resource', { token:token });
            setResource(response.data.userResources[0].resources);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getResource(); 
        // console.log(resource);
    }, []);

    return (
        <div className="res_container">
            <Notifications />
            <h1>Resources</h1>
            <div className="res_content">
                <div className="res_content_box">
                    {
                        resource !== null && resource.length !== 0 ? resource.map((res, index) => {
                            return <div className="res_content_item" key={index}>
                                <h4>{res.title}</h4>
                                <div>
                                    <button onClick={() => handleLetsGo(res,index)}>Let's go</button>
                                    <button onClick={() => handleDelete(res,index)}>Delete</button>
                                </div>
                            </div>
                        }) : <div className="no_resources">no resources.</div>
                    }
                </div>
            </div>
            <div className="bottom">
                <form onSubmit={savedResource}>
                    <div className='form_rows'>
                        <label htmlFor="title">Title:</label>
                        <input type="text" name="title" autoComplete='off' />
                    </div>
                    <div className='form_rows'>
                        <label htmlFor="title">Link:</label>
                        <input type="text" name="link" autoComplete='off' />
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>
            <div className='dashboard'>
                <Link to='/dashboard' className='link'>Dashboard</Link>
            </div>
        </div>
    )
}

export default Resources;
