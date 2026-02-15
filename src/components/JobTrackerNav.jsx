import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './JobTrackerNav.css';

const JobTrackerNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="job-tracker-nav">
            <div className="nav-container">
                <div className="nav-logo">
                    {/* Placeholder for Logo if needed, or just keeping it simple as per request */}
                </div>

                <div className="mobile-menu-toggle" onClick={toggleMenu}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </div>

                <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setIsMenuOpen(false)}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/saved" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setIsMenuOpen(false)}>
                        Saved
                    </NavLink>
                    <NavLink to="/digest" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setIsMenuOpen(false)}>
                        Digest
                    </NavLink>
                    <NavLink to="/settings" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setIsMenuOpen(false)}>
                        Settings
                    </NavLink>
                    <NavLink to="/proof" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setIsMenuOpen(false)}>
                        Proof
                    </NavLink>
                    <div className="nav-separator"></div>
                    <NavLink to="/jt/07-test" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setIsMenuOpen(false)}>
                        Test Checklist
                    </NavLink>
                    <NavLink to="/jt/08-ship" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setIsMenuOpen(false)}>
                        Ship 🚀
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default JobTrackerNav;
