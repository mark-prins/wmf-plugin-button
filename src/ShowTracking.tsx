import React from 'react';

const ShowTracking = ({ data }: { data: any }) => (
  <div>
    <button onClick={() => alert(`hello ${data.id}`)}>Click me</button>
  </div>
);

export default ShowTracking;
