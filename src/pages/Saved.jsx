import React, { useState, useEffect } from 'react';
import { Bookmark } from 'lucide-react';
import jobsData from '../data/jobs';
import JobCard from '../components/JobCard';
import JobModal from '../components/JobModal';

const Saved = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);

    // Helper to refresh saved jobs
    const loadSavedJobs = () => {
        const savedIds = JSON.parse(localStorage.getItem('savedJobIds') || '[]');
        const jobs = jobsData.filter(job => savedIds.includes(job.id));
        setSavedJobs(jobs);
    };

    useEffect(() => {
        loadSavedJobs();
    }, []);

    const handleSave = (id) => {
        // Toggle save (remove in this context)
        const savedIds = JSON.parse(localStorage.getItem('savedJobIds') || '[]');
        const newSavedIds = savedIds.filter(savedId => savedId !== id);
        localStorage.setItem('savedJobIds', JSON.stringify(newSavedIds));
        loadSavedJobs(); // Refresh list
    };

    return (
        <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '24px' }}>Saved Jobs</h1>

            {savedJobs.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                    {savedJobs.map(job => (
                        <div key={job.id} style={{ position: 'relative' }}>
                            <JobCard
                                job={job}
                                isSaved={true}
                                onSave={handleSave}
                                onView={setSelectedJob}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', textAlign: 'center', height: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Bookmark size={48} color="var(--color-border)" strokeWidth={1.5} style={{ marginBottom: '24px' }} />
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '16px' }}>Your Collection is Empty</h2>
                    <p style={{ color: 'var(--color-subtext)', fontSize: '1.1rem' }}>
                        Browse the dashboard and save jobs to see them here.
                    </p>
                </div>
            )}

            {selectedJob && (
                <JobModal
                    job={selectedJob}
                    onClose={() => setSelectedJob(null)}
                />
            )}
        </div>
    );
};

export default Saved;
