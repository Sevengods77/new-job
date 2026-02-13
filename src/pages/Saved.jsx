import React from 'react';
import { Bookmark } from 'lucide-react';

const Saved = () => {
    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', textAlign: 'center', height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Bookmark size={48} color="var(--color-border)" strokeWidth={1.5} style={{ marginBottom: '24px' }} />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '16px' }}>Your Collection</h2>
            <p style={{ color: 'var(--color-subtext)', fontSize: '1.1rem' }}>
                Jobs you save will appear here for easy access.
            </p>
        </div>
    );
};

export default Saved;
