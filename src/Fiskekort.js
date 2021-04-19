import React, { useState, updateState } from 'react'
import { LayersControl, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon, LayerGroup, Tooltip } from "leaflet";
import './Fiskekort.css';
import L from 'leaflet';


const Fiskekort = () => {
    // const [state, setstate] = useState("cknoda3mi3phq17pmcl9ctwq8");
    // const handleStyleChange = () => {
    //     setstate("cknoea1st54zr17mpn9ijmsm7");
    // }

    // Data
    const data = require('./data.json');
    const positions = [
        {
            title: "Sheeeeesh",
            location: [57.049251,9.941234],
            id: 1
        },
        {
            title: "Shuuuush",
            location: [57.053187,9.866103],
            id: 2
        },
    ]

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
            <MapContainer center={[57.053777295262705, 9.902697864384805]} zoom={10} minZoom={8}>
               
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
               {data.map((spot) => {         
                return (
                <Marker 
                    position={[spot.gps[0].lat, spot.gps[0].long]}
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
