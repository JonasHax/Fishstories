import React from "react";
import { BottomBar } from "./BottomBar";
import css from "./CatchReportView.module.css";
import { TopBar } from "./TopBar";

export const CatchReportView = (props) => {
  return (
    <div className={css.Container}>
      <TopBar
        className={css.TopBar}
        location={props.catchReport.location}
      ></TopBar>
      <BottomBar
        className={css.BottomBar}
        fishType={props.catchReport.fishType}
        weight={props.catchReport.weight}
        lenght={props.catchReport.length}
        description={props.catchReport.description}
      ></BottomBar>
    </div>
  );
};
