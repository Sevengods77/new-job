import React from 'react';
import './Layout.css';

const Layout = ({ topBar, header, footer, children }) => {
    return (
        <div className="app-container">
            <div className="top-bar-area">{topBar}</div>
            <div className="context-header-area">{header}</div>
            <main className="main-workspace-area">
                {children}
            </main>
            <div className="footer-area">{footer}</div>
        </div>
    );
};

export default Layout;
