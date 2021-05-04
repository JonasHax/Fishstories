import React from 'react';
import './AddCatch.css';
import logo from '../../images/fishAdd.png';

export const Button = () => {

  function handleClick() {
    alert("jonas er et æg")
    }
  
  return (
    <button className={"add-button"} onClick={handleClick}>
      <img  className={'add-img'} src={logo}></img>
    </button>
  );
};
