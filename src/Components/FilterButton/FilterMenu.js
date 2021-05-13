import React, { useState } from "react";
import css from "./FilterButton.module.css";
import { Button } from "./FilterButton";
import { Modal } from "@material-ui/core";
import { FilterModule } from "../FilterModule/FilterModule";

export const FilterMenu = () => {
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
          <Button image={"https://i.imgur.com/JsLSgeQ.png"}></Button>
        </div>
        <div
          onClick={() => {
            setToggleTypes(true);
          }}
        >
          <Button image={"https://i.imgur.com/FL725Ou.png"}></Button>
        </div>
      </div>
      <Modal open={toggleSpecies} onClose={handleCloseSpecies}>
        <FilterModule
          filterTypes={fishSpecies.fish}
          menuTitel={"Vælg fiskearter"}
        ></FilterModule>
      </Modal>
      <Modal open={toggleTypes} onClose={handleCloseTypes}>
        <FilterModule
          filterTypes={["Kyst", "Sø", "Å", "P&T"]}
          menuTitel={"Vælg fiskesteder"}
        ></FilterModule>
      </Modal>
    </div>
  );
};
