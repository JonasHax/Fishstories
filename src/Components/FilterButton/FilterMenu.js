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
          filterTypes={[
            {
              specie: "Kyst",
              image:
                "https://www.klimatilpasning.dk/media/1647050/colourbox10385100_kyst_020919_850x304.jpg",
            },
            {
              specie: "Sø",
              image:
                "https://img.nordjyske.dk/s3/nj-prod-public-images/32qM6uc2wC9qMeXAuXuqoWRPv5I.jpg?w=960&h=540&scale=both&mode=crop",
            },
            {
              specie: "Å",
              image:
                "https://www.fredninger.dk/dnressources/Trend_%C3%85dal_SO.jpg",
            },
            {
              specie: "P&T",
              image:
                "https://esmark.dk/esmark-dev/wp-content/themes/esmark_meltdown/gfx/aktiviteter/put-and-take-top.jpg",
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
