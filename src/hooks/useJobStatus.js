import { useState, useEffect } from 'react';

// Custom event name for checking status updates across components
export const JOB_STATUS_CHANGE_EVENT = 'jobStatusChange';

const useJobStatus = () => {
    const [statuses, setStatuses] = useState({});

    useEffect(() => {
        // Initial load
        const loadStatuses = () => {
            try {
                const stored = JSON.parse(localStorage.getItem('jobTrackerStatus') || '{}');
                setStatuses(stored);
            } catch (e) {
                console.error("Failed to parse job statuses", e);
                setStatuses({});
            }
        };

        loadStatuses();

        // Listen for storage events (cross-tab) or custom events (same-tab) if we needed real-time sync
        // For now, simpler approach: updateStatus updates local state AND dispatches event
        const handleLocalChange = () => loadStatuses();
        window.addEventListener(JOB_STATUS_CHANGE_EVENT, handleLocalChange);

        return () => {
            window.removeEventListener(JOB_STATUS_CHANGE_EVENT, handleLocalChange);
        };
    }, []);

    const updateStatus = (jobId, newStatus) => {
        const currentStatuses = JSON.parse(localStorage.getItem('jobTrackerStatus') || '{}');
        const updatedStatuses = {
            ...currentStatuses,
            [jobId]: {
                status: newStatus,
                date: new Date().toISOString()
            }
        };

        localStorage.setItem('jobTrackerStatus', JSON.stringify(updatedStatuses));
        setStatuses(updatedStatuses);

        // Dispatch custom event to notify other components (like Toast or other lists)
        const event = new CustomEvent(JOB_STATUS_CHANGE_EVENT, {
            detail: { jobId, status: newStatus }
        });
        window.dispatchEvent(event);
    };

    const getStatus = (jobId) => {
        return statuses[jobId]?.status || 'Not Applied';
    };

    const getStatusObject = (jobId) => {
        return statuses[jobId] || null;
    }

    return { statuses, updateStatus, getStatus, getStatusObject };
};

export default useJobStatus;
