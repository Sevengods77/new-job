import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '24px',
            maxWidth: '800px',
            margin: '0 auto'
        }}>
            <h1 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '3.5rem',
                marginBottom: '16px',
                lineHeight: '1.2'
            }}>
                Stop Missing The Right Jobs.
            </h1>
            <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.25rem',
                color: 'var(--color-subtext)',
                marginBottom: '40px',
                maxWidth: '600px'
            }}>
                Precision-matched job discovery delivered daily at 9AM.
            </p>
            <Link
                to="/settings"
                style={{
                    textDecoration: 'none',
                    color: 'white',
                    backgroundColor: 'var(--color-accent)',
                    padding: '16px 32px',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    transition: 'background-color 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = 'var(--color-accent-hover)'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'var(--color-accent)'}
            >
                Start Tracking
            </Link>
        </div>
    );
};

export default Landing;
