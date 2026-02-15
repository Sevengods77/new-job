import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import JobTrackerLayout from './components/JobTrackerLayout';
import Dashboard from './pages/Dashboard';
import Saved from './pages/Saved';
import Digest from './pages/Digest';
import Settings from './pages/Settings';
import Proof from './pages/Proof';
import NotFound from './pages/NotFound';
import Landing from './pages/Landing';

// Import existing components if we want to keep the old project scope as a route, 
// but for now I will focus on the requested Job Notification Tracker routes.

import TestChecklist from './pages/TestChecklist';
import Ship from './pages/Ship';
import { TEST_ITEMS } from './utils/testItems';

const ShipGuard = ({ children }) => {
  const saved = localStorage.getItem('job_tracker_test_status');
  const checkedItems = saved ? JSON.parse(saved) : {};
  const passedCount = Object.values(checkedItems).filter(Boolean).length;

  if (passedCount < TEST_ITEMS.length) {
    return <Navigate to="/jt/07-test" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<JobTrackerLayout />}>
        <Route index element={<Landing />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="saved" element={<Saved />} />
        <Route path="digest" element={<Digest />} />
        <Route path="settings" element={<Settings />} />
        <Route path="proof" element={<Proof />} />

        {/* New Test & Ship Routes */}
        <Route path="jt/proof" element={<Proof />} />
        <Route path="jt/07-test" element={<TestChecklist />} />
        <Route path="jt/08-ship" element={
          <ShipGuard>
            <Ship />
          </ShipGuard>
        } />

        {/* Catch-all for unknown routes */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
