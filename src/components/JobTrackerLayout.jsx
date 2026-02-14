import React from 'react';
import JobTrackerNav from './JobTrackerNav';
import { Outlet } from 'react-router-dom';
import Toast from './Toast';

const JobTrackerLayout = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <JobTrackerNav />
            <main style={{ flex: 1, height: '100%' }}>
                <Outlet />
            </main>
            <Toast />
        </div>
    );
};

export default JobTrackerLayout;
