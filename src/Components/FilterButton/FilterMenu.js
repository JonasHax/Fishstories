import React, { useState } from "react";
import css from "./FilterButton.module.css";
import { FilterButton } from "./FilterButton";
import { Modal } from "@material-ui/core";
import { FilterModule } from "../FilterModule/FilterModule";

export const FilterMenu = (props) => {
  const [toggleSpecies, setToggleSpecies] = useState(false);
  const [toggleTypes, setToggleTypes] = useState(false);
  const handleCloseSpecies = () => setToggleSpecies(false);
  const handleCloseTypes = () => setToggleTypes(false);
  const fishSpecies = require("../../Data/fishTypes.json");

  return (
    <div>
      <div className={css.FilterContainer}>
        <div
          onClick={() => {
            setToggleSpecies(true);
          }}
        >
          <FilterButton
            image={"https://i.imgur.com/JsLSgeQ.png"}
          ></FilterButton>
        </div>
        <div
          onClick={() => {
            setToggleTypes(true);
          }}
        >
          <FilterButton
            image={"https://i.imgur.com/FL725Ou.png"}
          ></FilterButton>
        </div>
      </div>
      <Modal open={toggleSpecies} onClose={handleCloseSpecies}>
        <FilterModule
          onClose={handleCloseSpecies}
          filterTypes={fishSpecies.fish}
          menuTitel={"Vælg fiskearter"}
          handleSelectedItems={props.handleSpecies}
          selectedOptions={props.selectedOptionsSpecies}
        ></FilterModule>
      </Modal>
      <Modal open={toggleTypes} onClose={handleCloseTypes}>
        <FilterModule
          onClose={handleCloseTypes}
          filterTypes={["Kyst", "Sø", "Å", "P&T"]}
          menuTitel={"Vælg fiskesteder"}
          handleSelectedItems={props.handleTypes}
          selectedOptions={props.selectedOptionsTypes}
        ></FilterModule>
      </Modal>
    </div>
  );
};
