import React, { useState, useEffect } from "react";
import { FishingSpotModule } from "../FishingSpot/FishingSpotModule";
import {
  LayersControl,
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  ZoomControl,
} from "react-leaflet";
import css from "./Fiskekort.module.css";
import "./globals.css";
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
import ChangeView from "./ChangeMapView";
import { FilterDisplayArray } from "./FilterFunction";

const Fiskekort = (props) => {
  // Hooks for handling state of modals
  const [fishingSpotModalOpen, setFishingSpotModalOpen] = useState(false);
  const [currentSpot, setCurrentSpot] = useState([]);
  const handleFishingSpotModalClose = () => setFishingSpotModalOpen(false);
  const handleFishingSpotModalShow = () => setFishingSpotModalOpen(true);
  const [catchReportModalOpen, setCatchReportModalOpen] = useState(false);
  const [currentReport, setCurrentReport] = useState([]);
  const handleCatchReportModalClose = () => setCatchReportModalOpen(false);
  const handleCatchReportModalShow = () => setCatchReportModalOpen(true);
  const [currentConnectedCatches, setCurrentConnectedCatches] = useState([]);

  // Hooks for handling filtration
  const [filterOptionsSpotType, setFilterOptionsSpotType] = useState([]);
  const [filterOptionsSpecies, setFilterOptionsSpecies] = useState([]);

  // Map positions
  const defaultPosition = {
    lat: 56.43213,
    lng: 9.339407,
  };
  const [fetchedPosition, setPosition] = useState();
  const [positionLoaded, setPositionLoaded] = useState(false);

  // Initial Data from API
  const initialFishingSpots = props.fishingSpots;
  const initialStandAloneCatchReports = props.standAloneCatches;
  const initialConnectedCatchReports = props.connectedCatches;

  // Display arrays (arrays that are shown on the map and can be changed)
  const [fishingSpotsDisplayArray, setFishingSpotsDisplayArray] = useState([]);
  const [spotsLoaded, setSpotsLoaded] = useState(false);
  const [catchReportsDisplayArray, setCatchReportsDisplayArray] = useState([]);
  const [catchesLoaded, setCatchesLoaded] = useState(false);
  const [connectedCatches, setConnectedCatches] = useState([]);
  const [connectedCatchesLoaded, setConnectedCatchesLoaded] = useState(false);

  // Effect for filtering the displayarray each time filteroptions are changed
  useEffect(() => {
    let filteredArray = FilterDisplayArray(
      filterOptionsSpotType,
      filterOptionsSpecies,
      initialFishingSpots
    );
    setFishingSpotsDisplayArray(filteredArray);
  }, [filterOptionsSpotType, filterOptionsSpecies]);

  // Effect for loading the display array (spots) with the data from the API when it's fetched
  useEffect(() => {
    if (initialFishingSpots.length > 0 && !spotsLoaded) {
      setFishingSpotsDisplayArray(initialFishingSpots);
      setSpotsLoaded(true);
    }
  }, [initialFishingSpots, spotsLoaded]);

  // Effect for loading the display array (catches - standalone) with the data from the API when it's fetched
  useEffect(() => {
    if (initialStandAloneCatchReports.length > 0 && !catchesLoaded) {
      setCatchReportsDisplayArray(initialStandAloneCatchReports);
      setCatchesLoaded(true);
    }
  }, [initialStandAloneCatchReports, catchesLoaded]);

  // Effect for loading the display array (catches - connected) with the data from the API when it's fetched
  useEffect(() => {
    if (initialConnectedCatchReports.length > 0 && !connectedCatchesLoaded) {
      setConnectedCatches(initialConnectedCatchReports);
      setConnectedCatchesLoaded(true);
    }
  }, [initialConnectedCatchReports, connectedCatchesLoaded]);

  // Effect for getting the geolocation of the device in use
  useEffect(() => {
    if (!positionLoaded) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition([position.coords.latitude, position.coords.longitude]);
        setPositionLoaded(true);
      });
    }
  }, []);

  // Filter handlers
  const handleSpeciesSelected = (selectedSpecies) => {
    setFilterOptionsSpecies(selectedSpecies);
  };
  const handleSpotTypesSelected = (selectedTypes) => {
    setFilterOptionsSpotType(selectedTypes);
  };

  // On click, connect the reported catches to the fishingspot thats being clicked
  const connectCatchesToCurrentSpot = (spot) => {
    const results = [];
    connectedCatches.forEach((report) => {
      if (report.location_Id === spot.stringId) {
        results.push(report);
      }
    });
    setCurrentConnectedCatches(results);
  };

  // Update map automatically (locally) on a newly added catchreport
  const onAddCatchReport = (report, isLocationBased) => {
    if (isLocationBased) {
      setCatchReportsDisplayArray([...catchReportsDisplayArray, report]);
    } else {
      setConnectedCatches([...connectedCatches, report]);
    }
  };

  return (
    <div>
      <MapContainer
        className={css.MapCont}
        center={defaultPosition}
        zoom={8}
        minZoom={7}
        zoomControl={false}
      >
        <ChangeView
          center={positionLoaded ? undefined : fetchedPosition}
          zoom={12}
        ></ChangeView>
        {positionLoaded ? (
          <Marker position={fetchedPosition}>
            <Tooltip opacity={0.75}>Du er her</Tooltip>
          </Marker>
        ) : null}
        <FilterMenu
          handleSpecies={handleSpeciesSelected}
          handleTypes={handleSpotTypesSelected}
          selectedOptionsSpecies={filterOptionsSpecies}
          selectedOptionsTypes={filterOptionsSpotType}
        />
        <AddCatchButton spots={initialFishingSpots} onAdd={onAddCatchReport} />
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
        <ZoomControl position="topright" />

        {/* Markers */}
        {fishingSpotsDisplayArray.map((spot, index) => {
          return (
            <Marker
              position={[spot.gps.lat, spot.gps.lng]}
              key={index}
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
                  connectCatchesToCurrentSpot(spot);
                  handleFishingSpotModalShow();
                },
              }}
            ></Marker>
          );
        })}

        {/* Catches */}
        {catchReportsDisplayArray.map((report, index) => {
          return (
            <Marker
              position={[report.gps.lat, report.gps.lng]}
              key={index}
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
            connectedCatches={currentConnectedCatches}
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
