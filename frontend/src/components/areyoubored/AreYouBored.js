import React, { useState, useEffect } from 'react';
import './AreYouBored.css';
import axios from 'axios';
import Loader from "react-loader-spinner";
import {Link} from 'react-router-dom';


function AreYouBored() {

    const [activity, setActivity] = useState("No Activity");
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getActivity = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('https://www.boredapi.com/api/activity');
            // console.log(response);
            setActivity(response.data.activity);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    const onDragOver = (e) => {
        e.preventDefault();
    }

    const onDragStart = (e, item) => {
        e.dataTransfer.setData("id", item);
        // console.log(item);
    }

    const onDrop = async (e, cat) => {
        let item = e.dataTransfer.getData("id");
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await axios.post('http://localhost:8000/save-activity', { token: token, activity: item });
            // console.log(response);
            getSavedActivity();
        } catch(err) {
            console.log(err);
        }
    }

    async function getSavedActivity() {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await axios.post('http://localhost:8000/get-activity', { token: token });
            setActivities(response.data.userActivities[0].activities);
            // console.log(response);
        } catch(err) {
            console.log(err);
        }
    }

    const handleDelete = async (act) => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await axios.post('http://localhost:8000/delete-activity', { token:token, activity: act });
            console.log(response);
            // let myColor = { background: 'rgb(236, 0, 0)', text: "#FFFFFF" };
            // notify.show(response.data.message, "custom", 5000, myColor);
            getSavedActivity();  
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getActivity();
        getSavedActivity();
    }, [])

    return (
        <div className="areyoubored">
            <div className='ayb_container'>
                <div className='left'>
                    <h4>Are you bored?</h4>
                    <p>Let's find out what's the magic inside it,</p>
                    <div className="ayb_content"
                         onDragStart={(e) => onDragStart(e, activity)}
                         draggable
                         >
                        {!isLoading ? <h3>{activity}</h3> : <Loader
                            type="ThreeDots"
                            color="#fff"
                            height={100}
                            width={100}
                            timeout={3000} //3 secs
                        />}
                    </div>
                    <div className="ayb_btn">
                        <button onClick={() => { getActivity() }}>Get Activity</button>
                    </div>
                </div>
                <div className='box'>
                    <h2 className="heading" >Saved Activity</h2>
                    <div className="box_content droppable"
                    onDragOver={(e) => onDragOver(e)}
                    onDrop={(e) => onDrop(e, "saved")}>
                         {
                        activities !== null && activities.length !== 0 ? activities.map((act, index) => {
                            return <div className="card" key={index} onClick={() => handleDelete(act)}>
                                {act}
                                </div>
                        }) : <div className="no_activities">no activities.</div>
                    }
                    </div>
                </div>
            </div>
            <div className='btn_dashboard'>
                <Link to='/dashboard' className='link'>Dashboard</Link>
            </div>
        </div>
    )
}

export default AreYouBored;
