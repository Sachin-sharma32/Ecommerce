import axios from 'axios';
import React from 'react';

const Practice = () => {
  const handleClick = async () => {
    const res = await axios.post('http://localhost:8000/api/paypal', { amount: 10, description: 'Test payment' });
    console.log(res)
  }

  return (
    <div>
      <h1>Practice</h1>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};

export default Practice;