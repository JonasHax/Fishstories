import React from "react";
import { PopUp } from "../PopUpModule/PopUpModule";
import { BottomBar } from "./BottomBar";
import css from "./CatchReportView.module.css";
import { TopBar } from "./TopBar";
import defaultImage_havørred from "../../images/catchreport_default2.png";
import defaultImage_other from "../../images/catchreport_default3.png";
import defaultImage_other2 from "../../images/catchreport_default1.png";

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
        <img
          src={
            props.catchReport.fishType === "Havørred"
              ? defaultImage_havørred
              : props.catchReport.fishType === "Gedde"
              ? defaultImage_other2
              : defaultImage_other
          }
          alt=""
          className={css.CoverImage}
        ></img>
      </div>
    </PopUp>
  );
};
