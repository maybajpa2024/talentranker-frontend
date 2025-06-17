import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setChat([...chat, { sender: 'user', message }]);
    setIsLoading(true);

    try {
      const res = await fetch('https://talentranker-production-4641.up.railway.app/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setChat(prev => [...prev, { sender: 'ai', message: data.reply }]);
    } catch (err) {
      setChat(prev => [...prev, { sender: 'ai', message: '❌ Error connecting to backend.' }]);
    } finally {
      setIsLoading(false);
      setMessage('');
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  return (
    <div className="chat-container">
      <h2>🧠 TalentRanker Chat</h2>
      <div className="chat-box">
        {chat.map((entry, idx) => (
          <div key={idx} className={`message ${entry.sender}`}>
            <strong>{entry.sender === 'user' ? '🧑 You' : '🤖 AI'}:</strong> {entry.message}
          </div>
        ))}
        {isLoading && <p>⏳ Thinking...</p>}
        <div ref={bottomRef} />
      </div>
      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Paste a JD or ask something..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
