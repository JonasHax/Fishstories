import React from "react";
import "./AddCatchReportModule.css";
import { PopUp } from "../PopUpModule/PopUpModule";
import AddPhoto from "../../images/addphoto.png";

export const AddCatchReportModule = () => {
  function handlePhotoClick() {
    alert("add photo");
  }

  function handlefishingSpotClick() {
    alert("vælg fiskeplads");
  }

  function handleLocationClick() {
    alert("brug lokation");
  }

  function handletilføjClick() {
    alert("tilføj");
  }

  return (
    <PopUp>
      <select className={"DropDown"}>
        <option>Havørrede</option>
        <option>Krokodille</option>
        <option>Skilpade</option>
        <option>Hvidhaj</option>
      </select>

      <div className={"SpinnerContainer"}>
        <div className={"AutoMargin"}>
          <input
            id="weight"
            className={"Spinner"}
            type="number"
            min="0"
            max="100"
            step=".1"
            placeholder="Vægt"
          ></input>
          <label className={"LabelText"} for="length">
            Kg
          </label>
        </div>
        <div className={"AutoMargin"}>
          <input
            id="length"
            className={"Spinner"}
            type="number"
            min="0"
            max="500"
            step=".1"
            placeholder="Længde"
          ></input>
          <label className={"LabelText"} for="length">
            Cm
          </label>
        </div>
      </div>

      <textarea className={"TextField"}></textarea>

      <div className={"AddPhoto NonSelectable"} onClick={handlePhotoClick}>
        <img
          className={"AddPhotoImage NonSelectable"}
          src={AddPhoto}
          alt=""
        ></img>
      </div>

      <div className={"ButtonContainer"}>
        <button
          className={"LocationButton AnimatedButton NonSelectable"}
          onClick={handlefishingSpotClick}
        >
          <div className={"ButtonText"}> Vælg fiskeplads </div>{" "}
          <div className={"ButtonIcon"}> 🎣 </div>
        </button>
        <button
          className={"LocationButton AnimatedButton NonSelectable"}
          onClick={handleLocationClick}
        >
          <div className={"ButtonText"}> Brug lokation </div>{" "}
          <div className={"ButtonIcon"}> 🚩 </div>
        </button>
      </div>
      <button
        className={"AcceptButton AnimatedButton NonSelectable"}
        onClick={handletilføjClick}
      >
        {" "}
        ✔ Tilføj{" "}
      </button>
    </PopUp>
  );
};
