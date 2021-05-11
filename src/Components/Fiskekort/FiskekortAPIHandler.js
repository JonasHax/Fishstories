import React, { useEffect, useState } from "react";
import Fiskekort from "./Fiskekort";

export const FiskekortAPIHandler = () => {
  const [spots, setSpots] = useState([]);
  const [spotsFetched, setSpotsFetched] = useState(false);

  const [reports, setReports] = useState([]);
  const [reportsFetched, setReportsFetched] = useState(false);

  useEffect(() => {
    async function fetchFishingSpots() {
      await fetch("https://localhost:5001/api/FishingSpot")
        .then((res) => res.json())
        .then((spot) => {
          setSpots(spot);
          setSpotsFetched(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    async function fetchCatchReports() {
      await fetch("https://localhost:5001/api/CatchReport")
        .then((res) => res.json())
        .then((reports) => {
          setReports(reports);
          setReportsFetched(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (!spotsFetched) {
      fetchFishingSpots();
    }
    if (!reportsFetched) {
      fetchCatchReports();
    }
  });

  return <Fiskekort fishingSpots={spots} catchReports={reports}></Fiskekort>;
};
