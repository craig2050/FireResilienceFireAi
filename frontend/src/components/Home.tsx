import React, { useState } from 'react';
import { generateText } from '../services/api';
import './Home.css';

const Home: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  return (
    <div className="container">
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
  );
};

export default Home;
