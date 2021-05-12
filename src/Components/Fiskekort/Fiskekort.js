import React, { useState, useEffect } from "react";
import { FishingSpotModule } from "../FishingSpot/FishingSpotModule";
import { LayersControl, MapContainer, Marker, TileLayer } from "react-leaflet";
import css from "./Fiskekort.module.css";
import "./globals.css";
import L from "leaflet";
import { CatchReportView } from "../CatchReport/CatchReportView";
import { Modal } from "@material-ui/core";
import { FilterMenu } from "../FilterButton/FilterMenu";
import { AddCatchButton } from "../AddCatchButton/AddCatch";
import { AddCatchReportModule } from "../AddCatchReport/AddCatchReportModule";
import { icon, catchReportIcon } from "./fishingSpotIcons";

const Fiskekort = (props) => {
  const [fishingSpotModalOpen, setFishingSpotModalOpen] = useState(false);
  const [currentSpot, setCurrentSpot] = useState([]);
  const handleFishingSpotModalClose = () => setFishingSpotModalOpen(false);
  const handleFishingSpotModalShow = () => setFishingSpotModalOpen(true);
  const [catchReportModalOpen, setCatchReportModalOpen] = useState(false);
  const [currentReport, setCurrentReport] = useState([]);
  const handleCatchReportModalClose = () => setCatchReportModalOpen(false);
  const handleCatchReportModalShow = () => setCatchReportModalOpen(true);
  const [addCatchModalOpen, setAddCatchModalOpen] = useState(false);
  const handleAddCatchModalClose = () => setAddCatchModalOpen(false);
  const handleAddCatchModalShow = () => setAddCatchModalOpen(true);

  // Data
  const fishingSpots = props.fishingSpots;
  const catchReports = props.catchReports;

  return (
    <div>
      <MapContainer
        className={css.MapCont}
        center={[57.053777295262705, 9.902697864384805]}
        zoom={10}
        minZoom={7}
      >
        <FilterMenu />
        <div
          onClick={() => {
            handleAddCatchModalShow();
          }}
        >
          <AddCatchButton />
        </div>
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Streetview">
            <TileLayer
              url="https://api.mapbox.com/styles/v1/jonashaxholm/cknoda3mi3phq17pmcl9ctwq8/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoiam9uYXNoYXhob2xtIiwiYSI6ImNrbm9kOHM2bTA5OXkydW53djJwYmlnZnEifQ.Mk4LLLSrzm3dn0YikqSSqQ"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellit">
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
              eventHandlers={{
                click: () => {
                  setCurrentSpot(spot);
                  handleFishingSpotModalShow();
                },
              }}
            ></Marker>
          );
        })}

        {/* Catches */}
        {catchReports.map((report) => {
          return (
            <Marker
              position={[report.gps.lat, report.gps.lng]}
              key={report.id}
              icon={catchReportIcon}
              eventHandlers={{
                click: () => {
                  setCurrentReport(report);
                  handleCatchReportModalShow();
                },
              }}
            ></Marker>
          );
        })}

        {/* Modals */}
        {/* Spots */}
        <Modal
          open={fishingSpotModalOpen}
          onClose={handleFishingSpotModalClose}
        >
          <FishingSpotModule
            chosenSpot={currentSpot}
            onClose={handleFishingSpotModalClose}
          />
        </Modal>

        {/* Reports */}
        <Modal
          open={catchReportModalOpen}
          onClose={handleCatchReportModalClose}
        >
          <CatchReportView
            catchReport={currentReport}
            onClose={handleCatchReportModalClose}
          ></CatchReportView>
        </Modal>

        {/* Add Catch */}
        <Modal open={addCatchModalOpen} onClose={handleAddCatchModalClose}>
          <AddCatchReportModule
            onClose={handleAddCatchModalClose}
          ></AddCatchReportModule>
        </Modal>
      </MapContainer>
    </div>
  );
};

export default Fiskekort;
