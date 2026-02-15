import React from 'react';
import { Rocket } from 'lucide-react';

const Ship = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '70vh',
            textAlign: 'center',
            padding: 'var(--space-md)'
        }}>
            <div style={{
                backgroundColor: 'rgba(46, 125, 50, 0.1)',
                padding: 'var(--space-lg)',
                borderRadius: '50%',
                marginBottom: 'var(--space-md)'
            }}>
                <Rocket size={64} color="var(--color-success)" />
            </div>
            <h1>Ready to Ship!</h1>
            <p style={{ maxWidth: '500px', color: 'var(--color-subtext)' }}>
                All tests have passed. The system is stable and ready for deployment.
                Great work ensuring quality!
            </p>
        </div>
    );
};

export default Ship;
