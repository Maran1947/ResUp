import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './DashboardContent.css';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const months = [
    'January', 'February',
    'March', 'April',
    'May', 'June',
    'July', 'August',
    'September', 'October',
    'November', 'December'
];

function DashboardContent() {

    const [totalActivities, setTotalActivity] = useState(0);
    const [totalResources, setTotalResources] = useState(0);
    const [goal,setGoal] = useState({
        yearlyGoal: "No Goal",
        monthlyGoal: "No Goal"
    });
    const [type,setType] = useState("");

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        //   subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleGoal = (type) => {
        setType(type);
        openModal();
    }

    async function getActivities() {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await axios.post('http://localhost:8000/get-activity', { token })
            setTotalActivity(response.data.userActivities[0].activities.length);
        } catch (err) {
            console.log(err);
        }
    }

    async function getResources() {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await axios.post('http://localhost:8000/get-resource', { token })
            // console.log(response.data.userResources[0].resources.length);
            setTotalResources(response.data.userResources[0].resources.length);
        } catch (err) {
            console.log(err);
        }
    }

    async function getGoal() {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await axios.post('http://localhost:8000/get-goal', { token });
            console.log(response);
            // console.log(response.data.userResources[0].resources.length);
            // setTotalResources(response.data.userResources[0].);
            setGoal({ 
                yearlyGoal: response.data.userGoal[0].yearlyGoal,
                monthlyGoal: response.data.userGoal[0].monthlyGoal
            });
        } catch (err) {
            console.log(err);
        }
    }

    let date = new Date()
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let fullDate = day + " / " + months[month - 1] + " / " + year;

    useEffect(() => {
        getActivities();
        getResources();
        getGoal();
    }, []);
    
    const handleGoalSubmit = async (e) => {
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem("token"));
        const data = { token: token, type: type, goal: e.target.goal.value }

        try {
            const response = await axios.post('http://localhost:8000/set-goal', data);
            // console.log(response);
            getGoal();
            closeModal();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='d_content'>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='modal_content'>
                    <div className='modal_top'>
                        <h2>Set Your Goal</h2>
                        <button onClick={closeModal}>close</button>
                    </div>
                    <form method='post' onSubmit={handleGoalSubmit} >
                        {/* <label htmlFor='goal'>Enter Your Goal</label> */}
                        <input type='text' name='goal' autoComplete='False' />
                        <button type='submit'>set</button>
                    </form>
                </div>
            </Modal>
            <div className='d_resolution'>
                <div className='d_res_yearly'>
                    <h4>Yearly Resolution</h4>
                    <div className='goal_box'>{goal.yearlyGoal}</div>
                    <button className='prev_btn'>{fullDate}</button>
                    <button className='btn_yearly' onClick={() => handleGoal("yearlyGoal")}>set</button>
                    {/* <button className='next_btn'>next</button> */}
                </div>
                <div className='d_res_monthly'>
                    <h4>Monthly Resolution</h4>
                    <div className='goal_box'>{goal.monthlyGoal}</div>
                    {/* <button className='prev_btn'>prev</button> */}
                    <button className='btn_monthly' onClick={() => handleGoal("monthlyGoal")} >set</button>
                    <button className='next_btn'>{fullDate}</button>
                </div>
            </div>
            <div className='d_status'>
                <div className='d_status_row'>
                    <div className='d_total_activity'>
                        <h4>{totalActivities}</h4>
                        <span>total activities</span>
                    </div>
                    <div className='d_total_resources'>
                        <h4>{totalResources}</h4>
                        <span>total resources</span>
                    </div>
                </div>
                <div className='d_options'>
                    <div className='d_ayb_box'>
                        Are You Bored?
                        <Link to='/areyoubored' className='btn_go'>Let's Go</Link>
                    </div>
                    <div className='d_resources_box'>
                        Home
                        <Link to='/' className='btn_go' >Let's Go</Link>
                    </div>
                    <div className='d_resources_box'>
                        Your Resources
                        <Link to='/resources' className='btn_go' >Let's Go</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardContent;
