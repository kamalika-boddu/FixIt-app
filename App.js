import React, { useState, useEffect } from 'react';
import './App.css';

// 🔹 Google AI Tool Simulation (Natural Language API style)
const googleAICategorize = (text) => {
  // Simulated AI-based text understanding
  if (text.includes('electric') || text.includes('power')) {
    return {
      category: 'Electricity',
      assignedTo: 'Mr. Sharma (Chief Electrician)'
    };
  }

  if (text.includes('hygiene') || text.includes('clean')) {
    return {
      category: 'Washroom & Sanitation',
      assignedTo: 'Ms. Rani (Sanitation Lead)'
    };
  }

  return {
    category: 'General',
    assignedTo: 'Campus Manager'
  };
};

function App() {
  const [complaint, setComplaint] = useState('');
  const [category, setCategory] = useState('General');
  const [assignedTo, setAssignedTo] = useState('Admin Office');
  const [submitted, setSubmitted] = useState(false);
  const [ticketStatus, setTicketStatus] = useState('Pending');

  // 🔹 Auto-sorting logic + Google AI fallback
  useEffect(() => {
    const text = complaint.toLowerCase();

    if (
      text.includes('fan') ||
      text.includes('light') ||
      text.includes('wire') ||
      text.includes('switch')
    ) {
      setCategory('Electricity');
      setAssignedTo('Mr. Sharma (Chief Electrician)');
    } else if (
      text.includes('washroom') ||
      text.includes('toilet') ||
      text.includes('pad') ||
      text.includes('dustbin') ||
      text.includes('water')
    ) {
      setCategory('Washroom & Sanitation');
      setAssignedTo('Ms. Rani (Sanitation Lead)');
    } else if (
      text.includes('bench') ||
      text.includes('desk') ||
      text.includes('door')
    ) {
      setCategory('Carpentry/Furniture');
      setAssignedTo('Mr. Kumar (Maintenance)');
    } else if (text.trim() !== '') {
      // 🔹 Google AI-based fallback categorization
      const aiResult = googleAICategorize(text);
      setCategory(aiResult.category);
      setAssignedTo(aiResult.assignedTo);
    } else {
      setCategory('General');
      setAssignedTo('Campus Manager');
    }
  }, [complaint]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTicketStatus('Dispatched');

    setTimeout(() => setTicketStatus('Seen by Admin'), 3000);
    setTimeout(() => setTicketStatus('In Progress'), 6000);
    setTimeout(() => setTicketStatus('Resolved'), 10000);
  };

  return (
    <div className="college-app">
      <div className={`main-card ${submitted ? 'slide-out' : ''}`}>
        <h1 className="title">
          Campus <span>FixIt</span>
        </h1>
        <p className="subtitle">Smart College Complaint Portal</p>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label>Student ID</label>
            <input type="text" placeholder="e.g. CLG-2024-001" required />
          </div>

          <div className="input-box">
            <label>Describe the Issue</label>
            <textarea
              placeholder="e.g. The fan in Room 302 is not working..."
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              required
            />
          </div>

          <div className="sorting-badge-container">
            <div className={`category-badge ${category.toLowerCase().split(' ')[0]}`}>
              Detected: {category}
            </div>
            <div className="route-info">
              Routing to: <strong>{assignedTo}</strong>
            </div>
          </div>

          <button type="submit" className="glow-button">
            Submit Complaint
          </button>
        </form>
      </div>

      {submitted && (
        <div className="success-overlay">
          <div className="success-content">
            <div className={`pulse-circle ${ticketStatus === 'Resolved' ? 'resolved' : ''}`}>
              {ticketStatus === 'Resolved' ? '✓' : '●'}
            </div>

            <h2>{ticketStatus === 'Resolved' ? 'Issue Fixed!' : 'Tracking Ticket'}</h2>

            <div className="status-tracker">
              <div className="status-line">
                <div className={`dot ${ticketStatus !== 'Pending' ? 'filled' : ''}`}></div>
                <div className={`dot ${['Seen by Admin', 'In Progress', 'Resolved'].includes(ticketStatus) ? 'filled' : ''}`}></div>
                <div className={`dot ${['In Progress', 'Resolved'].includes(ticketStatus) ? 'filled' : ''}`}></div>
                <div className={`dot ${ticketStatus === 'Resolved' ? 'filled' : ''}`}></div>
              </div>
              <p className="status-text">
                Current Status: <strong>{ticketStatus}</strong>
              </p>
            </div>

            <p>
              Your ticket is with <strong>{assignedTo}</strong>
            </p>

            <button
              onClick={() => {
                setSubmitted(false);
                setComplaint('');
                setTicketStatus('Pending');
              }}
              className="back-btn"
            >
              {ticketStatus === 'Resolved' ? 'Log Another Issue' : 'Close Tracker'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
