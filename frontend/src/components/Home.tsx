import React, { useState } from 'react';
import { generateText } from '../services/api';
import './Home.css';

const Home: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sosActive, setSosActive] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await generateText(prompt);
      setResponse(result);
    } catch (err) {
      setError('Error generating text. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEmergencyCall = () => {
    // In a real app, this would integrate with emergency services
    alert('Initiating emergency call to 911...');
  };

  const handleSOS = () => {
    setSosActive(!sosActive);
    if (!sosActive) {
      alert('SOS Signal Activated! Emergency services will be notified.');
    }
  };

  // Mock emergency alerts - in a real app, these would come from an API
  const emergencyAlerts = [
    {
      id: 1,
      severity: 'high',
      title: 'Active Wildfire',
      location: 'North Hills Area',
      time: '10 minutes ago',
      details: 'Mandatory evacuation in effect'
    },
    {
      id: 2,
      severity: 'medium',
      title: 'Fire Risk Warning',
      location: 'Valley Region',
      time: '1 hour ago',
      details: 'High wind conditions'
    }
  ];

  return (
    <div className="app-container">
      <div className="emergency-sidebar">
        <div className="emergency-header">
          <span role="img" aria-label="alert">🚨</span> Emergency Alerts
        </div>
        
        <div className="alerts-container">
          {emergencyAlerts.map(alert => (
            <div key={alert.id} className={`alert-card ${alert.severity}`}>
              <div className="alert-title">{alert.title}</div>
              <div className="alert-location">
                <span role="img" aria-label="location">📍</span> {alert.location}
              </div>
              <div className="alert-time">{alert.time}</div>
              <div className="alert-details">{alert.details}</div>
            </div>
          ))}
        </div>

        <div className="emergency-actions">
          <button 
            className="emergency-button call"
            onClick={handleEmergencyCall}
          >
            <span role="img" aria-label="phone">📞</span> Emergency Call
          </button>
          
          <button 
            className={`emergency-button sos ${sosActive ? 'active' : ''}`}
            onClick={handleSOS}
          >
            <span role="img" aria-label="sos">🆘</span> {sosActive ? 'SOS Active' : 'SOS Signal'}
          </button>

          <button className="emergency-button evacuation">
            <span role="img" aria-label="map">🗺️</span> Evacuation Routes
          </button>

          <button className="emergency-button resources">
            <span role="img" aria-label="resources">🏥</span> Emergency Resources
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <div className="logo">
            <span className="logo-icon">🔥</span>
          </div>
          <h1>FireAI Assistant</h1>
          <div className="status-indicator">
            <span className="status-dot"></span>
            Ready to Help
          </div>
        </div>

        <div className="chat-container">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask about emergency response, fire prediction, or disaster preparedness..."
                rows={4}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !prompt}
              className={loading ? 'button loading' : 'button'}
            >
              {loading ? '' : 'Ask FireAI'}
            </button>
          </form>
          
          {error && (
            <div className="error-message">
              <span role="img" aria-label="warning">⚠️</span> {error}
            </div>
          )}
          
          {response && (
            <div className="response-container">
              <h2><span role="img" aria-label="ai">🤖</span> AI Response</h2>
              <p>{response}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
