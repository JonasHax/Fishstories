import React from 'react'
import './TopBar.css';
import Location from "../images/location.png";
import Close from '../images/cancel.png';

export const TopBar = (props) => {
    return (
        <div className="TopBarContainer">
            <div className={["Location", "DropShadow"].join(" ")}>
                <img src={Location} alt="Lokation" className="LocationIcon"></img>
                {props.location}
            </div>
            <img src={Close} alt="Luk" className="ExitButton"></img>
        </div>
    )
}
