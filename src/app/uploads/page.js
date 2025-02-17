'use client';

import { useState } from 'react';

export default function HomePage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/uploads', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setResult(data.result || data.error);
  };

  return (
    <main style={{ padding: '2rem' }}>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload}>Upload & Process</button>
      {result && (
        <pre style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>
          {result}
        </pre>
      )}
    </main>
  );
}