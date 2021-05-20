import React, { useState } from "react";
import css from "./FishingSpotModule.module.css";
import { FishType } from "./FishType";
import { Location } from "./FishingLocation";
import { PopUp } from "../PopUpModule/PopUpModule";
import defaultCoast from "../../images/fishingSpotType_Coast.png";
import defaultLake from "../../images/fishingSpotType_Lake.png";
import defaultPutAndTake from "../../images/fishingSpotType_PutAndTake.png";
import defaultRiver from "../../images/fishingSpotType_River.png";
import { Modal } from "@material-ui/core";
import { CatchReportView } from "../CatchReport/CatchReportView";
import { FishstoriesModule } from "./FishstoriesModule";
import { ToastContainer, toast } from "react-toastify";

export const FishingSpotModule = (props) => {
  const fishingSpot = props.chosenSpot;
  const catches = props.connectedCatches;
  const [modalOpen, setModalOpen] = useState(false);

  const handleStoriesClicked = () => {
    if (catches.length > 0) {
      setModalOpen(true);
    } else {
      toast.error("Ingen fangster er rapporteret på denne fiskeplads");
    }
  };

  const handleOnClose = () => setModalOpen(false);

  return (
    <PopUp onClose={props.onClose}>
      <div className={css.FishingSpot_CoverImage}>
        <Location location={fishingSpot.name} className={"absolute"}></Location>
        <div
          className={css.FishingSpot_StoryButton}
          onClick={handleStoriesClicked}
        >
          Fangster 🐟
        </div>
        <img
          className={css.FishingSpot_Image}
          src={
            fishingSpot.type === "Kyst"
              ? defaultCoast
              : fishingSpot.type === "Sø"
              ? defaultLake
              : fishingSpot.type === "Å"
              ? defaultRiver
              : defaultPutAndTake
          }
          alt="billede"
        ></img>
      </div>
      <div className={css.FishingSpot_FishContainer}>
        <FishType fishTypes={fishingSpot.fishTypes}></FishType>
      </div>

      <div className={css.FishingSpot_TextField}>{fishingSpot.description}</div>

      <Modal open={modalOpen} onClose={handleOnClose}>
        <FishstoriesModule
          catchReports={catches}
          onClose={handleOnClose}
        ></FishstoriesModule>
      </Modal>

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
