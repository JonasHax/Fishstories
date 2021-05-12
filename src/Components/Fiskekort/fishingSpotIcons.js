import React from "react";
import L from "leaflet";

export const icon = L.icon({
  iconUrl: require("../../images/smoll.png").default,
  iconSize: [26, 45],
  iconRetinaUrl: require("../../images/smoll.png").default,
  iconAnchor: [13, 44],
  popupAnchor: [0, -45],
});

export const catchReportIcon = L.icon({
  iconUrl: require("../../images/catchReportIcon.png").default,
  iconSize: [35, 35],
  iconRetinaUrl: require("../../images/catchReportIcon.png").default,
  iconAnchor: [17, 35],
  popupAnchor: [-5, -35],
});
