import React, { useState } from "react";
import css from "./FilterButton.module.css";
import { FilterButton } from "./FilterButton";
import { Modal } from "@material-ui/core";
import { FilterModule } from "../FilterModule/FilterModule";
import FilterButton_Species from "../../images/havørred.png";
import FilterButton_Spots from "../../images/filterbutton_lake.png";

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
          <FilterButton image={FilterButton_Species}></FilterButton>
        </div>
        <div
          onClick={() => {
            setToggleTypes(true);
          }}
        >
          <FilterButton image={FilterButton_Spots}></FilterButton>
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
          filterTypes={[
            {
              specie: "Kyst",
              type: "Spot"
            },
            {
              specie: "Sø",
              type: "Spot"
            },
            {
              specie: "Å",
              type: "Spot"
            },
            {
              specie: "P&T",
              type: "Spot"
            },
          ]}
          menuTitel={"Vælg fiskesteder"}
          handleSelectedItems={props.handleTypes}
          selectedOptions={props.selectedOptionsTypes}
        ></FilterModule>
      </Modal>
    </div>
  );
};
