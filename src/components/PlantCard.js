import React, { useState } from 'react';

function PlantCard({ plant, onMarkSoldOut, onUpdatePrice, onDeletePlant }) {
  const [newPrice, setNewPrice] = useState(plant.price);

  const handlePriceChange = (e) => {
    setNewPrice(e.target.value);
  };

  const handlePriceSubmit = () => {
    if (newPrice !== plant.price) {
      onUpdatePrice(plant.id, newPrice);
    }
  };

  return (
    <div className="plant-card">
      <img src={plant.image} alt={plant.name} />
      <h3>{plant.name}</h3>
      <p>${plant.price}</p>
      <button onClick={() => onMarkSoldOut(plant.id)}>
        {plant.soldOut ? 'In stock ' : 'Sold out '}
      </button>

      <div>
        <input
          type="number"
          value={newPrice}
          onChange={handlePriceChange}
          placeholder="Update Price"
        />
        <button onClick={handlePriceSubmit}>Update Price</button>
      </div>

      <button onClick={() => onDeletePlant(plant.id)}>Delete Plant</button>
    </div>
  );
}

export default PlantCard;
