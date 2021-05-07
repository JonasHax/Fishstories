import React from 'react';
import './PopUpModule.css';
import { Card, CardContent, Modal } from '@material-ui/core';

export const PopUp = (props) => {

  return (
    <Modal open={true} >
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
  

