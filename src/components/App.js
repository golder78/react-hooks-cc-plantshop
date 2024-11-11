import React, { useState, useEffect } from 'react';
import '../index'; 
import PlantCard from './PlantCard'; 
import NewPlantForm from './NewPlantForm'; 

function App() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    fetch('https://react-hooks-cc-plantshop-wsa8.onrender.com/plants')
      .then((response) => response.json())
      .then((data) => {
        setPlants(data);
        setLoading(false);  
      })
      .catch((error) => {
        console.error('Error fetching plants:', error);
        setLoading(false);  
      });
  }, []);

  //new plant
  const handleAddPlant = (newPlant) => {
    fetch('https://react-hooks-cc-plantshop-wsa8.onrender.com/plants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((addedPlant) => {
        setPlants((prevPlants) => [...prevPlants, addedPlant]);
      })
      .catch((error) => {
        console.error('Error adding plant:', error);
      });
  };
  const handleMarkSoldOut = (id) => {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === id ? { ...plant, soldOut: !plant.soldOut } : plant
      )
    );
  };

  // Update the price 
  const handleUpdatePrice = (id, newPrice) => {
    fetch(`https://react-hooks-cc-plantshop-wsa8.onrender.com/plants/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ price: newPrice }),
    })
      .then((response) => response.json())
      .then((updatedPlant) => {
        setPlants((prevPlants) =>
          prevPlants.map((plant) =>
            plant.id === id ? { ...plant, price: updatedPlant.price } : plant
          )
        );
      })
      .catch((error) => {
        console.error('Error updating price:', error);
      });
  };
//delete 
  const handleDeletePlant = (id) => {
    fetch(`https://react-hooks-cc-plantshop-wsa8.onrender.com/plants/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting plant:', error);
      });
  };

  
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Plantsy</h1>
      <input
        type="text"
        placeholder="Search for a plant..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}  
      />

      <NewPlantForm onAddPlant={handleAddPlant} />
      {loading ? (
        <p>Loading plants...</p>
      ) : (
        <div className="plant-list">
          {filteredPlants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onMarkSoldOut={handleMarkSoldOut}
              onUpdatePrice={handleUpdatePrice}
              onDeletePlant={handleDeletePlant}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
