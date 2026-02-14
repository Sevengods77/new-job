import React, { useState, useEffect } from 'react';
import { JOB_STATUS_CHANGE_EVENT } from '../hooks/useJobStatus';

const Toast = () => {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('info'); // 'info', 'success', 'error'

    useEffect(() => {
        const handleStatusChange = (event) => {
            const { status } = event.detail;

            let msg = `Status updated: ${status}`;
            let msgType = 'info';

            if (status === 'Applied') msgType = 'info';
            if (status === 'Selected') msgType = 'success';
            if (status === 'Rejected') msgType = 'error';

            setMessage(msg);
            setType(msgType);
            setShow(true);

            // Hide after 3 seconds
            setTimeout(() => setShow(false), 3000);
        };

        window.addEventListener(JOB_STATUS_CHANGE_EVENT, handleStatusChange);

        return () => {
            window.removeEventListener(JOB_STATUS_CHANGE_EVENT, handleStatusChange);
        };
    }, []);

    if (!show) return null;

    const getBackgroundColor = () => {
        switch (type) {
            case 'success': return 'var(--color-success, #28a745)';
            case 'error': return 'var(--color-error, #dc3545)';
            default: return '#007bff'; // Explicit Blue for Info/Applied
        }
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: getBackgroundColor(),
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 1000,
            animation: 'slideIn 0.3s ease-out',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 500
        }}>
            {message}
        </div>
    );
};

export default Toast;
