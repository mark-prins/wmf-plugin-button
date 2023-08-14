import React from 'react';

export const ShowTracking = ({ data }: { data: any }) => (
  <div>
    <button onClick={() => alert(`hello ${data.id}`)}>Click me</button>
  </div>
);
