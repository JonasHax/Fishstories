import React, { useEffect, useState }  from 'react'
import Fiskekort from './Fiskekort';

export const FiskekortAPIHandler = () => {
    const [data, setData] = useState([]);
    const [fetched, setFetched] = useState(false);
    
    useEffect(() =>{
        async function fetchData() {
            await fetch('https://localhost:5001/api/FishingSpot')
            .then(res => res.json())
            .then(spot => {
                setData(spot)
                setFetched(true)
            })
            .catch(err => {
                console.log(err)
            })
        }
        if(!fetched){
            fetchData()
        }
    })

    return (
        <Fiskekort fishingSpots={data}></Fiskekort>
    )
}
