import React, { useState, updateState } from 'react'
import { LayersControl, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { heatLayer, Icon, LayerGroup, Tooltip } from "leaflet";
import './Fiskekort.css';
import L from 'leaflet';
import { CatchReportView } from '../CatchReport/CatchReportView';

const Fiskekort = (props) => {
    // Data
    const fishingSpots = props.fishingSpots;
    const catchReports = props.catchReports;

    // Marker Icon - skal ud i eget @ some point
    const icon = L.icon({ 
        iconUrl: require("../../images/smoll.png").default,
        iconSize: [26, 45],
        iconRetinaUrl: require("../../images/smoll.png").default,
        iconAnchor: [13, 44],
        popupAnchor: [0, -45],
    });

    const catchReportIcon = L.icon({
        iconUrl: require("../../images/catchReportIcon.png").default,
        iconSize: [35, 35],
        iconRetinaUrl: require("../../images/catchReportIcon.png").default,
        iconAnchor: [17, 35],
        popupAnchor: [-5, -35],
    });

    return (
        <div>
            <MapContainer center={[57.053777295262705, 9.902697864384805]} zoom={10} minZoom={7}>
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

                {/* Catches */}
                {catchReports.map((report) => {
                return (
                <Marker
                    position={[report.gps.lat, report.gps.lng]}
                    key={report.id}
                    icon={catchReportIcon}
                    >
                    <Popup className="CatchReportPopup">
                        <CatchReportView catchReport={report}></CatchReportView>
                    </Popup>
                </Marker>)
                })}

             </MapContainer>
    </div>
    )
}

export default Fiskekort
