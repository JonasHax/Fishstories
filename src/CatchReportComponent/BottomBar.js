import React from 'react'
import "./BottomBar.css";
import FishType from "../images/fish.png";
import Weight from "../images/weight.png";
import Ruler from "../images/ruler.png";

export const BottomBar = (props) => {
    console.log(props.description);
    return (
        <div className="BottomBarContainer">
            <div className="FishType">
                <img src={FishType} alt="Art" className="FishIcon"></img>
                {props.fishType}
            </div>
            <div className="Weight">
                <img src={Weight} alt="Vægt" className="Icons"></img>
                {props.weight} kg
            </div>
            <div className="Lenght">
                <img src={Ruler} alt="Længde" className="Icons"></img>
                {props.lenght} cm
            </div>
            <div className="Description">
                {props.description}
            </div>
        </div>
    )
}
