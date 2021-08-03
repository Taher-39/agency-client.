import React from 'react';
import Sidebar from '../Sidebar/Sidebar';

const Dashboard = () => {
    return (
        <div>
            <div className="left-side">
                <Sidebar></Sidebar>
            </div>
            <div className="right-side">
                <h3>WellCome Your Site</h3>
            </div>
        </div>
    );
};

export default Dashboard;