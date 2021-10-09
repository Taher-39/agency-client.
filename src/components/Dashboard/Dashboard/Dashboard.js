import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import navLogo from '../../../images/logos/logo.png';
import { UserContext } from '../../../App';

const Dashboard = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
     <div>
         <div>
            <div style={{backgroundColor: '#FBD062'}} className='dashboard-top'>
                <div className="d-sm-flex justify-content-around py-4">
                    <div>
                        <Link to="/">
                            <img src={navLogo} style={{width: '150px'}} alt="" />
                        </Link>
                    </div>
                    <div className='page-name'>
                        <h2>Dashboard</h2>
                    </div>
                    <div>
                        <h5 className='user'>{loggedInUser.name}</h5>
                    </div>
                </div>
            </div>
        </div>
        <div className='row'>
            <div className="left-side col-md-2 btn-bg" style={{minHeight: '100vh'}}>
                <Sidebar></Sidebar>
            </div>
            <div className="right-side col-md-10 bg-light p-5">
                <h3>WellCome Your Site</h3>
            </div>
        </div>
     </div>   
    );
};

export default Dashboard;