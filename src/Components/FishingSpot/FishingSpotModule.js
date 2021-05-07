import React from 'react';
import './FishingSpotModule.css';
import {FishType} from './FishType';
import {Location} from './FishingLocation'
import {PopUp} from '../PopUpModule/PopUpModule'

export const FishingSpotModule = () => {


  return (
   
        <PopUp>
                <div className={"FishingSpot-CoverImage"}>
                    <Location text={"Hvidesande Fiskeanstalt"}></Location>
                    <div className={"FishingSpot-StoryButton"}>🐟</div>
                    <img className={"FishingSpot-Image"} src="https://i.imgur.com/jTzHTWU.png"></img>
                </div>
                <div className={"FishingSpot-FishContainer"}>
                    <FishType text={"Havørrede"}></FishType>
                    <FishType text={"Hvidhaj"}></FishType>
                    <FishType text={"Loch Ness-uhyret"}></FishType>
                </div>
            
                <div className={"FishingSpot-TextField"}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labo et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </div>
         </PopUp>

     
  );
  };
  

