import React from 'react';

const PlantList = ({ plants, onMarkSoldOut }) => {
  return (
    <div>
      <h2>Plants List</h2>
      <ul>
        {plants.map((plant) => (
          <li key={plant.id}>
            <img src={plant.image} alt={plant.name} />
            <h3>{plant.name}</h3>
            <p>Price: ${plant.price}</p>

            
            {plant.soldOut ? (
              <span style={{ color: 'red', fontWeight: 'bold' }}>Sold Out</span>
            ) : (
              <button onClick={() => onMarkSoldOut(plant.id)}>In stock</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlantList;
