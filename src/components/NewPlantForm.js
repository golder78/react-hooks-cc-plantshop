import React, { useState } from 'react';

const NewPlantForm = ({ onAddPlant }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlant = {
      name,
      image,
      price: parseFloat(price),
    };

    fetch('https://react-hooks-cc-plantshop-wsa8.onrender.com/plants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((data) => {
        onAddPlant(data); 
        setName('');
        setImage('');
        setPrice('');
      })
      .catch((error) => console.error('Error adding plant:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Plant</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Image URL:
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
      </label>
      <label>
        Price:
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>
      <button type="submit">Add Plant</button>
    </form>
  );
};

export default NewPlantForm;
