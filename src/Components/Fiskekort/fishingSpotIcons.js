import React from "react";
import L from "leaflet";

export const catchReportIcon = L.icon({
  iconUrl: require("../../images/catchReportIcon.png").default,
  iconSize: [35, 35],
  iconRetinaUrl: require("../../images/catchReportIcon.png").default,
  iconAnchor: [17, 35],
  popupAnchor: [-5, -35],
});

export const fishingSpotIcon_Coast = L.icon({
  iconUrl: require("../../images/fishingSpotIcon_Coast_small.png").default,
  iconSize: [26, 45],
  iconRetinaUrl: require("../../images/fishingSpotIcon_Coast_small.png")
    .default,
  iconAnchor: [13, 44],
  popupAnchor: [0, -45],
});

export const fishingSpotIcon_Lake = L.icon({
  iconUrl: require("../../images/fishingSpotIcon_Lake.png").default,
  iconSize: [35, 35],
  iconRetinaUrl: require("../../images/fishingSpotIcon_Lake.png").default,
  iconAnchor: [17, 35],
  popupAnchor: [-5, -35],
});

export const fishingSpotIcon_PutAndTake = L.icon({
  iconUrl: require("../../images/fishingSpotIcon_PutAndTake.png").default,
  iconSize: [35, 35],
  iconRetinaUrl: require("../../images/fishingSpotIcon_PutAndTake.png").default,
  iconAnchor: [17, 35],
  popupAnchor: [-5, -35],
});

export const fishingSpotIcon_River = L.icon({
  iconUrl: require("../../images/fishingSpotIcon_River.png").default,
  iconSize: [35, 35],
  iconRetinaUrl: require("../../images/fishingSpotIcon_River.png").default,
  iconAnchor: [17, 35],
  popupAnchor: [-5, -35],
});
