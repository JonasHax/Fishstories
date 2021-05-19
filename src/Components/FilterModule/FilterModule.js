import React, { useState, useEffect } from "react";
import { PopUp } from "../PopUpModule/PopUpModule";
import css from "./FilterModule.module.css";

export const FilterModule = (props) => {
  const filterTypes = props.filterTypes;
  const menuTitel = props.menuTitel;
  const selectedItems = props.selectedOptions;
  const selectedFilters = [];

  const setInitialFilters = () => {
    selectedItems.forEach((item) => {
      selectedFilters.push(item);
    });
  };
  setInitialFilters();

  function handletilføjClick() {
    props.handleSelectedItems(selectedFilters);
    props.onClose();
  }

  function handleRydClick() {
    for (let index = 0; index < selectedFilters.length; ++index) {
      var element = document.getElementById(selectedFilters[index]);
      element.classList.toggle(css.Pressed);
    }
    selectedFilters.splice(0, selectedFilters.length);

    handletilføjClick();
  }

  function toggleSelected(id) {
    var element = document.getElementById(id);
    if (element != null) {
      element.classList.toggle(css.Pressed);

      if (selectedFilters.includes(id)) {
        const index = selectedFilters.indexOf(id);
        if (index > -1) {
          selectedFilters.splice(index, 1);
        }
      } else {
        selectedFilters.push(id);
      }
    }
  }

  const toggleInitialSelected = (id) => {
    var element = document.getElementById(id);
    if (element != null) {
      element.classList.toggle(css.Pressed);
    }
  };

  // Effect for toggling the initial selected filters
  // On load the DOM hasn't rendered the elements yet, which is why this is needed
  useEffect(() => {
    selectedItems.forEach((item) => {
      toggleInitialSelected(item);
    });
  }, [selectedItems]);

  return (
    <PopUp onClose={props.onClose}>
      <div className={css.Headline}>
        <h4> {menuTitel} </h4>
      </div>
      <div className={` ${css.FilterContainer} ${css[menuTitel.replace(/\s/g, "")]}`}>
        {filterTypes.map((filter) => {
          return (
            <div
              className={css.FilterButton}
              id={filter.specie}
              onClick={() => toggleSelected(filter.specie)}
            >
              <text> {filter.specie} </text>
              <img className={`${css[filter.specie]}`} src={require("../../images/FilterImages/" + filter.specie.toUpperCase() + ".png").default} />
            </div>
          );
        })}
      </div>
      <button
        className={`${css.AcceptButton} ${css.AnimatedButton} ${css.NonSelectable}`}
        onClick={handletilføjClick}
      >
        ✔ Benyt filtræring
      </button>
      <button
        className={`${css.Clear_Filter_Button} ${css.AnimatedButton} ${css.NonSelectable}`}
        onClick={() => handleRydClick()}
      >
        ✖ Ryd filtræring
      </button>
    </PopUp>
  );
};
