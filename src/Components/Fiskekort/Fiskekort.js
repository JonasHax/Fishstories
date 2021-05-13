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
import {
  catchReportIcon,
  fishingSpotIcon_Coast,
  fishingSpotIcon_Lake,
  fishingSpotIcon_PutAndTake,
  fishingSpotIcon_River,
} from "./fishingSpotIcons";

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
  const [spotsLoaded, setSpotsLoaded] = useState(false);

  // Initial Data from API
  const initialFishingSpots = props.fishingSpots;
  const initialCatchReports = props.catchReports;

  // Display arrays (arrays that are shown on the map and can be changed)
  const [fishingSpotsDisplayArray, setFishingSpotsDisplayArray] = useState([]);

  // Filter functions
  const FilterByType = (type) => {
    const filteredArray = [];
    if (fishingSpotsDisplayArray.length !== initialFishingSpots.length) {
      initialFishingSpots.forEach((spot) => {
        if (spot.type === type) {
          filteredArray.push(spot);
        }
      });
    } else {
      initialFishingSpots.forEach((spot) => {
        if (spot.type === type) {
          filteredArray.push(spot);
        }
      });
    }
    setFishingSpotsDisplayArray(filteredArray);
  };

  const FilterBySpecies = (species) => {
    const filteredArray = [];
    if (fishingSpotsDisplayArray.length !== initialFishingSpots.length) {
      fishingSpotsDisplayArray.forEach((spot) => {
        species.forEach((specie) => {
          if (spot.fishTypes.includes(specie)) {
            filteredArray.push(spot);
          }
        });
      });
    } else {
      initialFishingSpots.forEach((spot) => {
        species.forEach((specie) => {
          if (spot.fishTypes.includes(specie)) {
            filteredArray.push(spot);
          }
        });
      });
    }
    setFishingSpotsDisplayArray(filteredArray);
  };

  // Effect for loading the display array with the data from the API when it's fetched
  useEffect(() => {
    if (initialFishingSpots.length > 0 && !spotsLoaded) {
      setFishingSpotsDisplayArray(initialFishingSpots);
      setSpotsLoaded(true);
    }
  }, [initialFishingSpots, spotsLoaded]);

  return (
    <div>
      <button
        onClick={() => {
          // FilterByType("Å");
          FilterBySpecies(["Havørred", "Ål"]);
          console.log(fishingSpotsDisplayArray);
        }}
      ></button>
      <button
        onClick={() => {
          FilterByType("Sø");
        }}
      ></button>
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
        {fishingSpotsDisplayArray.map((spot) => {
          return (
            <Marker
              position={[spot.gps.lat, spot.gps.lng]}
              key={spot.id}
              icon={
                spot.type === "Sø"
                  ? fishingSpotIcon_Lake
                  : spot.type === "Å"
                  ? fishingSpotIcon_River
                  : spot.type === "P&T"
                  ? fishingSpotIcon_PutAndTake
                  : fishingSpotIcon_Coast
              }
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
        {initialCatchReports.map((report) => {
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
