import React, { useState, useEffect } from "react";
import css from "./ChooseFishingSpot.module.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { Divider, TextField } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";

export const ChooseFishingSpot = (props) => {
  const initialSpots = props.spots;
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayArray, setDisplayArray] = useState(props.spots);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const handleChooseClick = () => {
    if (initialSpots[selectedIndex] === undefined) {
      toast.error("Du har ikke valgt en fiskeplads");
    } else {
      props.onChoose(displayArray[selectedIndex]);
    }
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterDisplayArray = () => {
    let filteredArray = [];

    if (searchTerm.trim().toLowerCase() === "") {
      filteredArray = initialSpots;
    } else {
      initialSpots.forEach((spot) => {
        if (spot.name.toLowerCase().includes(searchTerm.trim().toLowerCase())) {
          filteredArray.push(spot);
        }
      });
    }
    setDisplayArray(filteredArray);
  };

  useEffect(() => {
    filterDisplayArray();
  }, [searchTerm]);

  return (
    <div className={css.Container}>
      <div className={css.SearchContainer}>
        <TextField
          id="filled-basic"
          label="Søg fiskeplads"
          value={searchTerm}
          onChange={handleSearchTermChange}
        ></TextField>
      </div>
      <div className={css.ListContainer}>
        <List>
          {displayArray.map((spot, index) => {
            return (
              <div>
                <ListItem
                  button
                  selected={selectedIndex === index}
                  onClick={() => handleListItemClick(index)}
                >
                  <ListItemText primary={spot.name}></ListItemText>
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      </div>
      <div className={css.ButtonContainer}>
        <Button variant="contained" color="primary" onClick={handleChooseClick}>
          Vælg plads
        </Button>
      </div>
      <ToastContainer
        className={css.ToastContainer}
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
