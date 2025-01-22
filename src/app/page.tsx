'use client';

import React from 'react';

export default function HomePage() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <h1>Hello from React + Next.js 15.1!</h1>
      <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>
    </div>
  );
}