const { FilterDisplayArray } = require("./FilterFunction");

// Setup array for all tests to use
const initialFishingSpots = [
  {
    name: "Kyst1",
    fishTypes: ["Havørred", "Hornfisk"],
    type: "Kyst",
  },
  {
    name: "Kyst2",
    fishTypes: ["Havørred", "Sild"],
    type: "Kyst",
  },
  {
    name: "Sø1",
    fishTypes: ["Aborre"],
    type: "Sø",
  },
  {
    name: "Å1",
    fishTypes: ["Gedde", "Fjeldørred"],
    type: "Å",
  },
  {
    name: "P&T1",
    fishTypes: ["Regnbueørred"],
    type: "P&T",
  },
  {
    name: "Å2",
    fishTypes: ["Havørred", "Gedde"],
    type: "Å",
  },
  {
    name: "Kyst3",
    fishTypes: ["Hornfisk"],
    type: "Kyst",
  },
  {
    name: "Sø2",
    fishTypes: ["Gedde", "Torsk"],
    type: "Sø",
  },
];

test("test_spottype_chosen", () => {
  // Define filteroptions
  let filterOptionsSpecies = [];
  let filterOptionsType = ["Kyst"];

  // Call filterfunction which returns the filtered array
  let filteredArray = FilterDisplayArray(
    filterOptionsType,
    filterOptionsSpecies,
    initialFishingSpots
  );

  // Assert / expect
  expect(filteredArray.length).toBe(3); // should be 3 spots left
  expect(filteredArray[0].type).toBe("Kyst");
  expect(filteredArray[1].type).toBe("Kyst");
  expect(filteredArray[2].type).toBe("Kyst");

  // Change filteroption to "Sø"
  filterOptionsType = ["Sø"];

  filteredArray = FilterDisplayArray(
    filterOptionsType,
    filterOptionsSpecies,
    initialFishingSpots
  );

  expect(filteredArray.length).toBe(2);
});

test("test_species_chosen", () => {
  // Define filteroptions
  let filterOptionsSpecies = ["Aborre", "Hornfisk"];
  let filterOptionsType = [];

  // Call filterfunction which returns the filtered array
  let filteredArray = FilterDisplayArray(
    filterOptionsType,
    filterOptionsSpecies,
    initialFishingSpots
  );

  expect(filteredArray.length).toBe(3); // 3 spots has 1 or more of the chosen species so length should be 3
  expect(filteredArray[0].fishTypes.includes("Hornfisk")).toBeTruthy();
  expect(filteredArray[1].fishTypes.includes("Aborre")).toBeTruthy();

  // Change filteroptions
  filterOptionsSpecies = ["Torsk"];

  filteredArray = FilterDisplayArray(
    filterOptionsType,
    filterOptionsSpecies,
    initialFishingSpots
  );

  expect(filteredArray.length).toBe(1); // only 1 spot with "Torsk"

  // Change filteroptions
  filterOptionsSpecies = ["Havørred", "Gedde", "Regnbueørred", "Aborre"];

  filteredArray = FilterDisplayArray(
    filterOptionsType,
    filterOptionsSpecies,
    initialFishingSpots
  );

  expect(filteredArray.length).toBe(7);
});

test("test_both_options_chosen", () => {
  // Define filteroptions
  let filterOptionsSpecies = ["Gedde"];
  let filterOptionsType = ["Sø", "Å"];

  // Call filterfunction which returns the filtered array
  let filteredArray = FilterDisplayArray(
    filterOptionsType,
    filterOptionsSpecies,
    initialFishingSpots
  );

  // Expect
  expect(filteredArray.length).toBe(3);
  expect(filteredArray[0].type).toBe("Å");
  expect(filteredArray[1].type).toBe("Å");
  expect(filteredArray[2].type).toBe("Sø");

  // Change filteroptions
  filterOptionsSpecies = ["Havørred", "Gedde", "Regnbueørred", "Aborre"];
  filterOptionsType = ["P&T"];

  filteredArray = FilterDisplayArray(
    filterOptionsType,
    filterOptionsSpecies,
    initialFishingSpots
  );

  expect(filteredArray.length).toBe(1); // Many spots has the fish, but only 1 spot has fish and type combined
  expect(filteredArray[0].type).toBe("P&T");
  expect(filteredArray[0].fishTypes.includes("Regnbueørred")).toBeTruthy();
});
