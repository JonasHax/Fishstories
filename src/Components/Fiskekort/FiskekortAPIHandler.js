import React, { useEffect, useState } from "react";
import Fiskekort from "./Fiskekort";

export const FiskekortAPIHandler = () => {
  const [spots, setSpots] = useState([]);
  const [spotsFetched, setSpotsFetched] = useState(false);

  const [reports, setReports] = useState([]);
  const [reportsFetched, setReportsFetched] = useState(false);

  const [catchReportsDivided, setCatchReportsDivided] = useState(false);

  const [standAloneCatches, setStandAloneCatches] = useState([]);
  const [catchesConnectedToSpots, setCatchesConnectedToSpots] = useState([]);

  useEffect(() => {
    async function fetchFishingSpots() {
      await fetch("https://localhost:5001/api/FishingSpot", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
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
      await fetch("https://localhost:5001/api/CatchReport", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((reports) => {
          setReports(reports);
          setReportsFetched(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const divideCatchReports = () => {
      const standAlone = [];
      const connected = [];

      if (reports.length > 0) {
        reports.forEach((report) => {
          if (report.location === "Ikke angivet") {
            standAlone.push(report);
          } else {
            connected.push(report);
          }
        });
        setStandAloneCatches(standAlone);
        setCatchesConnectedToSpots(connected);
        setCatchReportsDivided(true);
      }
    };

    if (!spotsFetched) {
      fetchFishingSpots();
    }
    if (!reportsFetched) {
      fetchCatchReports();
    }

    if (!catchReportsDivided) {
      divideCatchReports();
    }
  });

  return (
    <Fiskekort
      fishingSpots={spots}
      catchReports={reports}
      standAloneCatches={standAloneCatches}
      connectedCatches={catchesConnectedToSpots}
    ></Fiskekort>
  );
};
