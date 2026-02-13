import React from 'react';

const Dashboard = () => {
    return (
        <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{
                backgroundColor: 'white',
                padding: '60px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                border: '1px solid var(--color-border)'
            }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '16px', color: 'var(--color-text)' }}>No jobs yet</h2>
                <p style={{ color: 'var(--color-subtext)', fontSize: '1.1rem' }}>
                    In the next step, you will load a realistic dataset.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
