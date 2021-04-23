import React from 'react'

export const DataInsert = () => {

    const data = require('./data.json');
  
    const InsertData = () => {
        data.forEach(spot => {
            const spotData = {
                name: spot.name,
                description: spot.description,
                fishTypes: spot.fishTypes,
                gps: {
                    lat: spot.gps[0].lat,
                    lng: spot.gps[0].long,
                },
                type: "Kyst"
            }
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(spotData)
            };
            fetch('https://localhost:5001/api/FishingSpot', requestOptions);
        });
    }

    return (
        <div>
            <button onClick={() => {
                InsertData();
            }}>Insert now</button>
        </div>
    )
}
