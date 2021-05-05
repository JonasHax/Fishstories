import React from 'react';
import './AddCatchReportModule.css';
import {PopUp} from '../PopUpModule/PopUpModule'
import AddPhoto from '../../images/addphoto.png';

export const Menu = () => {


  return (
    <PopUp>
        <select className={"DropDown"}>
            <option >Havørrede</option>
            <option >Krokodille</option>
            <option >Skilpade</option>
            <option >Hvidhaj</option>
        </select>

        <textarea className={"TextField"}></textarea>

        <div className={"AddPhoto"}>
            <img className={"AddPhotoImage"} src={AddPhoto}></img>
        </div>

        <div className={"ButtonContainer"}>
            <button className={"LocationButton AnimatedButton"}>
                <div className={"ButtonText"}> Vælg fiskeplads </div> <div className={"ButtonIcon"}>  🎣 </div>
            </button>
            <button className={"LocationButton AnimatedButton"}>
                <div className={"ButtonText"}> Brug lokation </div> <div className={"ButtonIcon"}>  🚩 </div>
            </button>  
        </div>
        <button className={"AcceptButton AnimatedButton"}> ✔ Tilføj </button>  
    </PopUp>
  );    
  };
  

