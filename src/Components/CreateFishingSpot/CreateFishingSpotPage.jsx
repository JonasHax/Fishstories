import React, { useState, useRef, useMemo } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import css from "./createFishingSpot.module.css";
import {
  Input,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { MultipleSelect } from "react-select-material-ui";

export const CreateFishingSpotPage = () => {
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [possibleCatches, setPossibleCatches] = useState([]);
  const fish = [];

  const fishTypes = require("../../Data/fishTypes.json");

  const convertFishData = () => {
    fishTypes.fish.forEach((fishtype) => {
      fish.push(fishtype.specie);
    });
  };
  convertFishData();

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );

  async function sendToApi() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: title,
        description: description,
        fishTypes: possibleCatches,
        gps: position,
        type: type,
      }),
    };
    await fetch("https://localhost:5001/api/FishingSpot", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err);
      });
  }

  const handleClick = () => {
    sendToApi();
    clearStuff();
  };

  const clearStuff = () => {
    setTitle("");
    setDescription("");
    setType("");
    setPossibleCatches([]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const handleChangeMultiSelect = (values) => {
    setPossibleCatches(...[values]);
  };

  return (
    <div>
      <div className={css.Content}>
        <div>
          Lat: <Input value={position.lat}></Input>
          Long: <Input value={position.lng}></Input>
        </div>
        <div>
          <h4>Fiskeplads titel:</h4>
          <Input
            name="Fiskepladsen titel:"
            value={title}
            onChange={handleTitleChange}
          ></Input>
        </div>
        <div>
          <h4>Beskrivelse: </h4>
          <TextField
            id="outlined-multiline-flexible"
            label="Multiline"
            multiline
            rowsMax={4}
            variant="outlined"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div>Fiskearter skal kunne v??lges ud fra en dropdown</div>
        <MultipleSelect
          label="V??lg fiskearter"
          values={possibleCatches}
          options={fish}
          onChange={handleChangeMultiSelect}
          SelectProps={{
            isCreatable: true,
            msgNoOptionsAvailable: "Alle fiskearter er valgt",
            msgNoOptionsMatchFilter: "Ingen arter matcher s??gningen",
          }}
        />

        <div>Type af kyst ogs?? gennem dropdown</div>
        <FormControl>
          <InputLabel>V??lg kysttype</InputLabel>
          <Select value={type} onChange={handleTypeChange}>
            <MenuItem value={"Kyst"}>Kyst</MenuItem>
            <MenuItem value={"S??"}>S??</MenuItem>
            <MenuItem value={"??"}>??</MenuItem>
            <MenuItem value={"P&T"}>P&T</MenuItem>
          </Select>
        </FormControl>
        <button className={css.AddButton} onClick={handleClick}>
          Knap til at udf??re
        </button>
      </div>

      <MapContainer
        className={css.MapCont}
        center={[57.053777295262705, 9.902697864384805]}
        zoom={10}
        minZoom={7}
      >
        <TileLayer
          url="https://api.mapbox.com/styles/v1/jonashaxholm/cknoda3mi3phq17pmcl9ctwq8/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoiam9uYXNoYXhob2xtIiwiYSI6ImNrbm9kOHM2bTA5OXkydW53djJwYmlnZnEifQ.Mk4LLLSrzm3dn0YikqSSqQ"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          draggable={true}
          eventHandlers={eventHandlers}
          position={position}
          ref={markerRef}
        ></Marker>
      </MapContainer>
    </div>
  );
};

const center = {
  lat: 57.053777295262705,
  lng: 9.902697864384805,
};
