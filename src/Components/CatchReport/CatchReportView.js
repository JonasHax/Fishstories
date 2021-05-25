import React from "react";
import { PopUp } from "../PopUpModule/PopUpModule";
import { BottomBar } from "./BottomBar";
import css from "./CatchReportView.module.css";
import { TopBar } from "./TopBar";
import defaultImage from "../../images/catchreport_default.png";

export const CatchReportView = (props) => {
  return (
    <PopUp onClose={props.onClose}>
      <div className={css.Container}>
        <TopBar location={props.catchReport.location}></TopBar>
        <BottomBar
          fishType={props.catchReport.fishType}
          weight={props.catchReport.weight}
          lenght={props.catchReport.length}
          description={props.catchReport.description}
        ></BottomBar>
        <img src={defaultImage} alt="" className={css.CoverImage}></img>
      </div>
    </PopUp>
  );
};
