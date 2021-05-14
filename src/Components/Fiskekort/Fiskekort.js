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
  const [spotsLoaded, setSpotsLoaded] = useState(false);
  const [filterOptionsSpotType, setFilterOptionsSpotType] = useState([]);
  const [filterOptionsSpecies, setFilterOptionsSpecies] = useState([]);

  // Initial Data from API
  const initialFishingSpots = props.fishingSpots;
  const initialCatchReports = props.catchReports;

  // Display arrays (arrays that are shown on the map and can be changed)
  const [fishingSpotsDisplayArray, setFishingSpotsDisplayArray] = useState([]);

  // Filter functions
  const FilterDisplayArray = (type, species) => {
    const filteredArray = [];
    if (species.length === 0 && type.length === 0) {
      setFishingSpotsDisplayArray(initialFishingSpots);
    } else if (species.length === 0 && type.length !== 0) {
      initialFishingSpots.forEach((spot) => {
        type.forEach((type) => {
          if (spot.type === type) {
            filteredArray.push(spot);
          }
        });
        setFishingSpotsDisplayArray(filteredArray);
      });
    } else if (species.length !== 0 && type.length === 0) {
      initialFishingSpots.forEach((spot) => {
        species.forEach((specie) => {
          if (spot.fishTypes.includes(specie)) {
            filteredArray.push(spot);
          }
        });
      });
      setFishingSpotsDisplayArray(filteredArray);
    } else {
      initialFishingSpots.forEach((spot) => {
        type.forEach((type) => {
          species.forEach((specie) => {
            if (spot.type === type && spot.fishTypes.includes(specie)) {
              filteredArray.push(spot);
            }
          });
        });
      });
      setFishingSpotsDisplayArray(filteredArray);
    }
  };

  // Effect for filtering the displayarray each time filteroptions are changed
  useEffect(() => {
    FilterDisplayArray(filterOptionsSpotType, filterOptionsSpecies);
  }, [filterOptionsSpotType, filterOptionsSpecies]);

  // Effect for loading the display array with the data from the API when it's fetched
  useEffect(() => {
    if (initialFishingSpots.length > 0 && !spotsLoaded) {
      setFishingSpotsDisplayArray(initialFishingSpots);
      setSpotsLoaded(true);
    }
  }, [initialFishingSpots, spotsLoaded]);

  // More functions
  const handleSpeciesSelected = (selectedSpecies) => {
    setFilterOptionsSpecies(selectedSpecies);
  };

  const handleSpotTypesSelected = (selectedTypes) => {
    setFilterOptionsSpotType(selectedTypes);
  };

  return (
    <div>
      <MapContainer
        className={css.MapCont}
        center={[57.053777295262705, 9.902697864384805]}
        zoom={10}
        minZoom={7}
      >
        <FilterMenu
          handleSpecies={handleSpeciesSelected}
          handleTypes={handleSpotTypesSelected}
          selectedOptionsSpecies={filterOptionsSpecies}
          selectedOptionsTypes={filterOptionsSpotType}
        />
        <AddCatchButton />
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
      </MapContainer>
    </div>
  );
};

export default Fiskekort;
