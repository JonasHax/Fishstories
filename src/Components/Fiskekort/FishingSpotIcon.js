import L from 'leaflet';

const FishingSpotIcon = new L.Icon({
    iconUrl: require('./images/smoll.png'),
    iconRetinaUrl: require('./images/smoll.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon'
});

export { FishingSpotIcon };