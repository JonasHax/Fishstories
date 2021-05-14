import React from "react";
import { PopUp } from "../PopUpModule/PopUpModule";
import css from "./FilterModule.module.css";
import havørrede from "../../images/havørred.png";

export const FilterModule = (props) => {
  const filterTypes = props.filterTypes;
  const menuTitel = props.menuTitel;
  const selectedFilters = new Array();

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

  }

  function toggleSelected(id) {
    var element = document.getElementById(id);
    element.classList.toggle(css.Pressed);

    if (selectedFilters.includes(id)) {
      const index = selectedFilters.indexOf(id);
      if (index > -1) {
        selectedFilters.splice(index, 1);
      }
    } else {
      selectedFilters.push(id);
    }

    console.log(selectedFilters);
  }

  return (
    <PopUp onClose={props.onClose}>
      <div className={css.Headline}>
        {" "}
        <h4> {menuTitel} </h4>{" "}
      </div>
      <div className={css.FilterContainer}>
        {filterTypes.map((filter) => {
          return (
            <div
              className={css.FilterButton}
              id={filter}
              onClick={() => toggleSelected(filter)}
            >
              <text> {filter} </text>
              <img src={havørrede} alt="" />
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
        className={`${css.Clear_Filter_Button} ${css.AnimatedButton} ${css.NonSelectable}` }
        onClick={() => handleRydClick()}
      >
        ✖ Ryd filtræring
      </button>
    </PopUp>
  );
};
