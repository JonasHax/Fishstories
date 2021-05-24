function FilterDisplayArray(type, species, initialFishingSpots) {
  const filteredArray = [];

  if (species.length === 0 && type.length === 0) {
    return initialFishingSpots;
  } else if (species.length <= 0 && type.length > 0) {
    initialFishingSpots.forEach((spot) => {
      type.forEach((type) => {
        if (spot.type === type) {
          if (!filteredArray.includes(spot)) {
            filteredArray.push(spot);
          }
        }
      });
    });
    return filteredArray;
  } else if (species.length > 0 && type.length <= 0) {
    initialFishingSpots.forEach((spot) => {
      species.forEach((specie) => {
        if (spot.fishTypes.includes(specie)) {
          if (!filteredArray.includes(spot)) {
            filteredArray.push(spot);
          }
        }
      });
    });
    return filteredArray;
  } else {
    initialFishingSpots.forEach((spot) => {
      type.forEach((type) => {
        species.forEach((specie) => {
          if (spot.type === type && spot.fishTypes.includes(specie)) {
            if (!filteredArray.includes(spot)) {
              filteredArray.push(spot);
            }
          }
        });
      });
    });
    return filteredArray;
  }
}

export { FilterDisplayArray };
