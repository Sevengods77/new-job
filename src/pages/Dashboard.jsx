import React, { useState, useEffect } from 'react';
import jobsData from '../data/jobs';
import JobCard from '../components/JobCard';
import FilterBar from '../components/FilterBar';
import JobModal from '../components/JobModal';

const Dashboard = () => {
    const [jobs, setJobs] = useState(jobsData);
    const [filteredJobs, setFilteredJobs] = useState(jobsData);
    const [savedJobIds, setSavedJobIds] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        location: '',
        mode: '',
        experience: '',
        source: '',
        sort: 'latest'
    });
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        // Load saved jobs from local storage
        const saved = JSON.parse(localStorage.getItem('savedJobIds') || '[]');
        setSavedJobIds(saved);
    }, []);

    useEffect(() => {
        // Filter Logic
        let result = jobs.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                job.company.toLowerCase().includes(filters.search.toLowerCase());
            const matchesLocation = filters.location ? job.location === filters.location : true;
            const matchesMode = filters.mode ? job.mode === filters.mode : true;
            const matchesExperience = filters.experience ? job.experience === filters.experience : true;

            return matchesSearch && matchesLocation && matchesMode && matchesExperience;
        });

        // Sort Logic
        if (filters.sort === 'latest') {
            result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
        } else if (filters.sort === 'oldest') {
            result.sort((a, b) => b.postedDaysAgo - a.postedDaysAgo);
        }

        setFilteredJobs(result);
    }, [filters, jobs]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = (id) => {
        let newSavedIds;
        if (savedJobIds.includes(id)) {
            newSavedIds = savedJobIds.filter(savedId => savedId !== id);
        } else {
            newSavedIds = [...savedJobIds, id];
        }
        setSavedJobIds(newSavedIds);
        localStorage.setItem('savedJobIds', JSON.stringify(newSavedIds));
    };

    return (
        <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '24px' }}>Job Discovery</h1>

            <FilterBar filters={filters} onFilterChange={handleFilterChange} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                        <div key={job.id} style={{ position: 'relative' }}>
                            <JobCard
                                job={job}
                                isSaved={savedJobIds.includes(job.id)}
                                onSave={handleSave}
                                onView={setSelectedJob}
                            />
                        </div>
                    ))
                ) : (
                    <div style={{ colSpan: 'full', textAlign: 'center', padding: '40px', color: 'var(--color-subtext)' }}>
                        No jobs match your filters.
                    </div>
                )}
            </div>

            {selectedJob && (
                <JobModal
                    job={selectedJob}
                    onClose={() => setSelectedJob(null)}
                />
            )}
        </div>
    );
};

export default Dashboard;
