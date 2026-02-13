import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{
            padding: '40px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
        }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', marginBottom: '16px', color: 'var(--color-accent)' }}>404</h1>
            <h2 style={{ fontFamily: 'var(--font-serif)', marginBottom: '24px' }}>Page Not Found</h2>
            <p style={{ color: 'var(--color-subtext)', marginBottom: '32px' }}>
                The page you are looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/dashboard"
                style={{
                    textDecoration: 'none',
                    color: 'white',
                    backgroundColor: 'var(--color-accent)',
                    padding: '10px 24px',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 500
                }}
            >
                Return to Dashboard
            </Link>
        </div>
    );
};

export default NotFound;
