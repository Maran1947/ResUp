import React from 'react';
import DashboardContent from '../../components/dashboard_content/DashboardContent';
import DashboardHeader from '../../components/dashboard_header/DashboardHeader';

function Dashboard() {
    return (
        <div className='dashboard_box'>
            <h1>Dashboard</h1>
            <DashboardHeader />
            <DashboardContent />
        </div>
    )
}

export default Dashboard;
