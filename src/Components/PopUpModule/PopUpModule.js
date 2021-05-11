import React, { useEffect } from "react";
import "./PopUpModule.css";
import { Card, CardContent } from "@material-ui/core";

export const PopUp = (props) => {
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    setOpen(props.isOpen);
  }, [open]);

  return (
    <Card className={"Module"}>
      <CardContent>
        <div>
          <div className={"FishingSpot-CloseButton"}>❌</div>
          {props.children}
        </div>
      </CardContent>
    </Card>
  );
};
