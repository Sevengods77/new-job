import React from 'react';
import { Mail } from 'lucide-react';

const Digest = () => {
    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', textAlign: 'center', height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Mail size={48} color="var(--color-border)" strokeWidth={1.5} style={{ marginBottom: '24px' }} />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '16px' }}>Daily Digest</h2>
            <p style={{ color: 'var(--color-subtext)', fontSize: '1.1rem' }}>
                Your curated list of precision-matched jobs will appear here daily.
            </p>
        </div>
    );
};

export default Digest;
