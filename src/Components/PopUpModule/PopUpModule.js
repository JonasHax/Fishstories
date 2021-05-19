import React, { useEffect } from "react";
import css from "./PopUpModule.module.css";
import { Card, CardContent } from "@material-ui/core";

export const PopUp = (props) => {
  return (
    <Card className={css.Module}>
      <CardContent>
        <div>
          <div className={css.FishingSpot_CloseButton} onClick={props.onClose}>
            ❌
          </div>
          {props.children}
        </div>
      </CardContent>
    </Card>
  );
};