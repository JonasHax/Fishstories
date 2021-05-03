import React, { useState, updateState } from 'react'
import { LayersControl, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon, LayerGroup, Tooltip } from "leaflet";
import './Fiskekort.css';
import L from 'leaflet';

const Fiskekort = (props) => {
    // Data
    // const data = require('./data.json');
    const fishingSpots = props.fishingSpots;

    // Marker Icon - skal ud i eget @ some point
    const icon = L.icon({ 
        iconUrl: require("./images/smoll.png").default,
        iconSize: [26, 45],
        iconRetinaUrl: require("./images/smoll.png").default,
        iconAnchor: [13, 44],
        popupAnchor: [0, -45],
    });

    return (
        <div>
            <MapContainer center={[57.053777295262705, 9.902697864384805]} zoom={10} minZoom={7}>
               
               <button> GU GI GING GANG</button>
               <LayersControl position="topright">
                   <LayersControl.BaseLayer checked
                   name="Streetview">
                    <TileLayer
                    url="https://api.mapbox.com/styles/v1/jonashaxholm/cknoda3mi3phq17pmcl9ctwq8/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoiam9uYXNoYXhob2xtIiwiYSI6ImNrbm9kOHM2bTA5OXkydW53djJwYmlnZnEifQ.Mk4LLLSrzm3dn0YikqSSqQ"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                   </LayersControl.BaseLayer>
                   <LayersControl.BaseLayer 
                   name="Satellit">
                    <TileLayer
                    url="https://api.mapbox.com/styles/v1/jonashaxholm/cknoea1st54zr17mpn9ijmsm7/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoiam9uYXNoYXhob2xtIiwiYSI6ImNrbm9kOHM2bTA5OXkydW53djJwYmlnZnEifQ.Mk4LLLSrzm3dn0YikqSSqQ"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                   </LayersControl.BaseLayer>
               </LayersControl>

                 {/* Markers */}
               {fishingSpots.map((spot) => {
                return (
                <Marker 
                    position={[spot.gps.lat, spot.gps.lng]}
                    key={spot.id}
                    icon={icon}
                    >
                    <Popup>
                        {spot.name}
                        <br></br>
                        {spot.description}
                    </Popup>
                </Marker>) 
                })}

             </MapContainer>
    </div>
    )
}

export default Fiskekort
