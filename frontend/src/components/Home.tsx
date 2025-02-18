import React, { useState } from 'react';
import { generateText } from '../services/api';

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">FireAI Assistant</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <textarea
            className="w-full p-2 border rounded"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            rows={4}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !prompt}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </form>
      
      {error && (
        <div className="text-red-500 mb-4">
          {error}
        </div>
      )}
      
      {response && (
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-bold mb-2">Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
