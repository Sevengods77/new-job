import React from 'react';
import Layout from './components/Layout';
import TopBar from './components/TopBar';
import ContextHeader from './components/ContextHeader';
import ProofFooter from './components/ProofFooter';
import Card from './components/Card';
import Button from './components/Button';
import Input from './components/Input';
import { Copy, Hammer, Check, AlertTriangle, Image as ImageIcon } from 'lucide-react';

function App() {
  return (
    <Layout
      topBar={<TopBar currentStep={1} totalSteps={5} status="In Progress" />}
      header={
        <ContextHeader
          title="Define Project Scope"
          description="Outline the core objectives and constraints of the project. Be specific about what is included and what is excluded."
        />
      }
      footer={<ProofFooter />}
    >
      {/* Primary Workspace (70%) */}
      <div style={{ flex: '7', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Card>
          <h3>Project Details</h3>
          <div style={{ display: 'grid', gap: '16px', marginTop: '16px' }}>
            <Input label="Project Name" id="p-name" placeholder="e.g. KodNest Premium Build System" />
            <Input label="Core Objective" id="p-obj" placeholder="What is the main goal?" />
          </div>
        </Card>

        <Card>
          <h3>Design Philosophy</h3>
          <div style={{ marginTop: '16px' }}>
            <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-subtext)', marginBottom: '16px' }}>
              Select the key attributes that define the visual language.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="secondary" style={{ borderRadius: '100px' }}>Calm</Button>
              <Button variant="secondary" style={{ borderRadius: '100px' }}>Intentional</Button>
              <Button variant="secondary" style={{ borderRadius: '100px' }}>Coherent</Button>
              <Button variant="secondary" style={{ borderRadius: '100px' }}>Confident</Button>
              <Button variant="primary" style={{ borderRadius: '100px' }}>+ Add Attribute</Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Secondary Panel (30%) */}
      <div style={{ flex: '3', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Card style={{ backgroundColor: '#F7F6F3', border: 'none' }}> {/* "Calm styling" implies maybe blending in or subtle contrast */}
          <h4 style={{ marginBottom: '12px' }}>Instruction</h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-subtext)' }}>
            Fill out the project details to generate the initial prompt. This will set the foundation for the entire build.
          </p>
        </Card>

        <Card>
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ margin: 0 }}>Prompt</h4>
            <Button variant="secondary" style={{ padding: '4px 8px', fontSize: '0.8rem' }}><Copy size={12} style={{ marginRight: '4px' }} /> Copy</Button>
          </div>
          <div style={{
            backgroundColor: '#f0f0f0',
            padding: '12px',
            borderRadius: '6px',
            fontFamily: 'monospace',
            fontSize: '0.85rem',
            color: '#333',
            minHeight: '100px'
          }}>
            Create a premium SaaS design system called "KodNest Premium Build System".
            This is not a student project. This must feel like a serious B2C product company.
          </div>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Button variant="primary"><Hammer size={16} style={{ marginRight: '8px' }} /> Build in Lovable</Button>
          <Button variant="secondary"><Check size={16} style={{ marginRight: '8px' }} /> It Worked</Button>
          <Button variant="secondary"><AlertTriangle size={16} style={{ marginRight: '8px' }} /> Error</Button>
          <Button variant="secondary"><ImageIcon size={16} style={{ marginRight: '8px' }} /> Add Screenshot</Button>
        </div>
      </div>
    </Layout>
  );
}

export default App;
