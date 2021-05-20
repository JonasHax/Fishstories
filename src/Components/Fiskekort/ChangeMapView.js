import { useMap } from "react-leaflet";

function ChangeView({ center, zoom }) {
  const map = useMap();
  if (center !== undefined) {
    map.setView(center, zoom);
  }

  return null;
}

export default ChangeView;
