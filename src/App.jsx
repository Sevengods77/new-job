import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import JobTrackerLayout from './components/JobTrackerLayout';
import Dashboard from './pages/Dashboard';
import Saved from './pages/Saved';
import Digest from './pages/Digest';
import Settings from './pages/Settings';
import Proof from './pages/Proof';
import NotFound from './pages/NotFound';

// Import existing components if we want to keep the old project scope as a route, 
// but for now I will focus on the requested Job Notification Tracker routes.

function App() {
  return (
    <Routes>
      <Route path="/" element={<JobTrackerLayout />}>
        {/* Redirect root to dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="saved" element={<Saved />} />
        <Route path="digest" element={<Digest />} />
        <Route path="settings" element={<Settings />} />
        <Route path="proof" element={<Proof />} />

        {/* Catch-all for unknown routes */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
