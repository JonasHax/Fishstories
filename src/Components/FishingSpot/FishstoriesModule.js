import React, { useState, useEffect } from "react";
import { CatchReportView } from "../CatchReport/CatchReportView";
import css from "./Fishstories.module.css";
import nextButton from "../../images/fishstories_next.png";

export const FishstoriesModule = (props) => {
  const catches = props.catchReports;
  const [currentCatch, setCurrentCatch] = useState(catches[0]);
  const [hasNext, setHasNext] = useState(true);
  const [hasPrevious, setHasPrevious] = useState(true);

  const handleNext = () => {
    const nextCatch = catches[catches.indexOf(currentCatch) + 1];
    if (nextCatch !== undefined) {
      setCurrentCatch(nextCatch);
    }
  };

  const handlePrevious = () => {
    const previousCatch = catches[catches.indexOf(currentCatch) - 1];
    if (previousCatch !== undefined) {
      setCurrentCatch(previousCatch);
    }
  };

  useEffect(() => {
    const nextCatch = catches[catches.indexOf(currentCatch) + 1];
    const previousCatch = catches[catches.indexOf(currentCatch) - 1];

    if (nextCatch !== undefined) {
      setHasNext(true);
    } else {
      setHasNext(false);
    }

    if (previousCatch !== undefined) {
      setHasPrevious(true);
    } else {
      setHasPrevious(false);
    }
  }, [currentCatch, catches]);

  return (
    <div className={css.PopUpContainer}>
      <CatchReportView
        onClose={props.onClose}
        catchReport={currentCatch}
      ></CatchReportView>
      <div className={css.ButtonContainer}>
        <div onClick={handlePrevious}>
          <img
            src={nextButton}
            className={[
              css.Icon_Next,
              css.Icon_Flipped,
              hasPrevious ? null : css.Invisible,
            ].join(" ")}
            alt=""
          ></img>
        </div>
        <div onClick={handleNext}>
          <img
            src={nextButton}
            className={[css.Icon_Next, hasNext ? null : css.Invisible].join(
              " "
            )}
            alt=""
          ></img>
        </div>
      </div>
    </div>
  );
};
