import React from 'react';
import { FileCheck } from 'lucide-react';

const Proof = () => {
    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', textAlign: 'center', height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <FileCheck size={48} color="var(--color-border)" strokeWidth={1.5} style={{ marginBottom: '24px' }} />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '16px' }}>Proof of Work</h2>
            <p style={{ color: 'var(--color-subtext)', fontSize: '1.1rem' }}>
                This section will house artifacts and verification proofs.
            </p>
        </div>
    );
};

export default Proof;
