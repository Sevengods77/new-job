import React, { useState } from 'react';
import './ProofFooter.css';
import Checkbox from './Checkbox';

const ProofFooter = () => {
    const [proofs, setProofs] = useState({
        uiBuilt: false,
        logicWorking: false,
        testPassed: false,
        deployed: false
    });

    const toggleProof = (key) => {
        setProofs(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="proof-footer-content">
            <div className="proof-group">
                <Checkbox
                    label="UI Built"
                    checked={proofs.uiBuilt}
                    onChange={() => toggleProof('uiBuilt')}
                    id="proof-ui"
                />
                <Checkbox
                    label="Logic Working"
                    checked={proofs.logicWorking}
                    onChange={() => toggleProof('logicWorking')}
                    id="proof-logic"
                />
                <Checkbox
                    label="Test Passed"
                    checked={proofs.testPassed}
                    onChange={() => toggleProof('testPassed')}
                    id="proof-test"
                />
                <Checkbox
                    label="Deployed"
                    checked={proofs.deployed}
                    onChange={() => toggleProof('deployed')}
                    id="proof-deploy"
                />
            </div>
            <div className="proof-status">
                {Object.values(proofs).every(Boolean) ? (
                    <span className="status-complete">Ready to Ship</span>
                ) : (
                    <span className="status-pending">Verification Required</span>
                )}
            </div>
        </div>
    );
};

export default ProofFooter;
