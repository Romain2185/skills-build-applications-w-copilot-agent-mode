import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('Welcome to OctoFit Tracker');

  useEffect(() => {
    setMessage('OctoFit Tracker is ready.');
  }, []);

  return (
    <div className="container py-5">
      <header className="mb-4">
        <h1 className="display-6">OctoFit Tracker</h1>
        <p className="lead">Modern multi-tier app starter with React, Vite, Express, and MongoDB.</p>
      </header>
      <section>
        <div className="alert alert-primary" role="alert">
          {message}
        </div>
      </section>
    </div>
  );
}

export default App;
