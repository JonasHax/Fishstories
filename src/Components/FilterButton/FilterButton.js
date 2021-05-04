import React from 'react';
import './FilterButton.css';
import havørrede from '../../images/havørred.png'

export const Button = ({image}) => {

  // const { logoUrl } = require(image);

  function handleClick() {
    alert(image)
    }

    // const imagepath = require(image)

  return (
    <button className={'filter-button'} onClick={handleClick}>
          <img className={'filter-img'}src = {image} alt=''/>
    </button>
  );
};
