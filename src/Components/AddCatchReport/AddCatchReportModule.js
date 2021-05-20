import React, { useState } from "react";
import css from "./AddCatchReport.module.css";
import { PopUp } from "../PopUpModule/PopUpModule";
import AddPhoto from "../../images/addphoto.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChooseFishingSpot } from "./ChooseFishingSpot";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

export const AddCatchReportModule = (props) => {
  const species = require("../../Data/fishTypes.json");
  const [description, setDescription] = useState("");
  const [caughtFish, setCaughtFish] = useState("");
  const [weight, setWeight] = useState();
  const [length, setLength] = useState();
  const [caughtPosition, setPosition] = useState({ lat: null, lng: null });
  const [useLocation, setUseLocation] = useState(false);
  const [useFishingSpot, setUseFishingSpot] = useState(false);
  const [chooseSpotOpen, setChooseSpotOpen] = useState(false);
  const [fishingSpotChosen, setFishingSpotChosen] = useState(null);

  function handlePhotoClick() {
    alert("add photo - mangler implementation");
  }

  function handlefishingSpotClick() {
    setChooseSpotOpen(!chooseSpotOpen);
    setUseFishingSpot(false);
  }

  function handleLocationClick() {
    navigator.geolocation.getCurrentPosition(function (position) {
      setPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setUseLocation(true);
      setUseFishingSpot(false);
    });
  }

  function handletilføjClick() {
    // If no weight and length is given, set to a default 0.0
    if (weight === undefined) {
      setWeight(0.0);
    }
    if (length === undefined) {
      setLength(0.0);
    }

    if (checkData()) {
      sendToApi();
    }
  }

  const onSucces = () => {
    toast.success("Fangstrapport tilføjet");
    setDescription("");
    setCaughtFish("");
    setPosition({ lat: null, lng: null });
    setWeight(0);
    setLength(0);
    setFishingSpotChosen("");
  };

  const checkData = () => {
    let errors = 0;

    if (description.length === 0) {
      errors++;
      toast.error("Beskriv din fangst");
    }
    if (caughtFish.length === 0 || caughtFish === "Vælg Fiskeart") {
      errors++;
      toast.error("Vælg fiskeart");
    }
    if (!useLocation && !useFishingSpot) {
      errors++;
      toast.error(
        "Vælg den fiskeplads fisken er fanget, eller brug nuværende lokation"
      );
    }

    if (errors > 0) {
      return false;
    } else {
      return true;
    }
  };

  async function sendToApi() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        location: useFishingSpot ? fishingSpotChosen.name : "Ikke angivet",
        location_id: useFishingSpot ? fishingSpotChosen.stringId : null,
        description: description,
        fishType: caughtFish,
        length: length,
        weight: weight,
        gps: useFishingSpot ? fishingSpotChosen.gps : caughtPosition,
        image: "Placeholder.png",
      }),
    };
    await fetch("https://localhost:5001/api/CatchReport", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        onSucces();
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          "Der skete en fejl. Din fangst er ikke rapporteret. Prøv igen"
        );
      });
  }

  // State handlers
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleCaughtFishChange = (event) => {
    setCaughtFish(event.target.value);
  };
  const handleWeightChange = (event) => {
    setWeight(parseFloat(event.target.value));
  };
  const handleLengthChange = (event) => {
    setLength(parseFloat(event.target.value));
  };

  const handleFishingSpotChosen = (chosenSpot) => {
    setFishingSpotChosen(chosenSpot);
    setChooseSpotOpen(false);
    setUseFishingSpot(true);
    setUseLocation(false);
  };

  return (
    <PopUp onClose={props.onClose}>
      <FormControl className={css.DropDown}>
        <InputLabel>Vælg fiskeart</InputLabel>
        <Select value={caughtFish} onChange={handleCaughtFishChange}>
          {species.fish.map((fish) => {
            return <MenuItem value={fish.specie}>{fish.specie}</MenuItem>;
          })}
        </Select>
      </FormControl>

      <div className={css.SpinnerContainer}>
        <div className={css.AutoMargin}>
          <input
            id="weight"
            className={css.Spinner}
            type="number"
            min="0"
            max="100"
            step=".1"
            placeholder="Vægt"
            value={weight}
            onChange={handleWeightChange}
          ></input>
          <label className={css.LabelText} for="length">
            Kg
          </label>
        </div>
        <div className={css.AutoMargin}>
          <input
            id="length"
            className={css.Spinner}
            type="number"
            min="0"
            max="500"
            step=".1"
            placeholder="Længde"
            value={length}
            onChange={handleLengthChange}
          ></input>
          <label className={css.LabelText} for="length">
            Cm
          </label>
        </div>
      </div>

      <textarea
        className={css.TextField}
        type="text"
        placeholder="Beskriv din fangst"
        value={description}
        onChange={handleDescriptionChange}
      ></textarea>

      <div
        className={[css.AddPhoto, css.NonSelectable].join(" ")}
        onClick={handlePhotoClick}
      >
        <img
          className={[css.AddPhotoImage, css.NonSelectable].join(" ")}
          src={AddPhoto}
          alt=""
        ></img>
      </div>

      <div className={css.ButtonContainer}>
        <button
          className={[
            css.LocationButton,
            css.AnimatedButton,
            css.NonSelectable,
            useFishingSpot ? css.ChosenFishingSpot : null,
          ].join(" ")}
          onClick={handlefishingSpotClick}
        >
          <div className={css.ButtonText}> Vælg fiskeplads </div>{" "}
          <div className={css.ButtonIcon}> 🎣 </div>
        </button>
        {chooseSpotOpen ? (
          <ChooseFishingSpot
            spots={props.spots}
            onChoose={handleFishingSpotChosen}
          />
        ) : null}
        <button
          className={[
            css.LocationButton,
            css.AnimatedButton,
            css.NonSelectable,
            useLocation ? css.ChosenLocation : null,
          ].join(" ")}
          onClick={handleLocationClick}
        >
          <div className={css.ButtonText}> Brug lokation </div>{" "}
          <div className={css.ButtonIcon}> 🚩 </div>
        </button>
      </div>
      <button
        className={[
          css.AcceptButton,
          css.AnimatedButton,
          css.NonSelectable,
        ].join(" ")}
        onClick={handletilføjClick}
      >
        {" "}
        ✔ Tilføj{" "}
      </button>
      <ToastContainer
        className={css.ToastContainer}
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </PopUp>
  );
};
