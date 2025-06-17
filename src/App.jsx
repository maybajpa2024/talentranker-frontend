import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://talentranker-production-4641.up.railway.app/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      setResponse('❌ Error connecting to backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <h1>💼 TalentRanker</h1>
      <textarea
        placeholder="Paste the job description here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Rank Candidates</button>
      {loading ? <p>⏳ Ranking resumes...</p> : <pre>{response}</pre>}
    </div>
  );
}

export default App;
