import React from 'react';
import './PopUpModule.css';
import { Card, CardContent, Modal } from '@material-ui/core';

export const PopUp = (props) => {
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {

    setOpen(true);
  };

  const handleClose = () => {

    setOpen(false);
  };

  return (
    <Modal
    open={open}
    onClose={handleClose}>
    <Card className={"Module"}>
      <CardContent >
        <div>
        <div className={"FishingSpot-CloseButton"}>❌</div>
        {props.children}
        </div>
      </CardContent>
    </Card>
    </Modal>
  );
  };
  

