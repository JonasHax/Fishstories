import './App.css';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import Fiskekort from './Fiskekort';
import { DataInsert } from './DataInsert';
import { FiskekortAPIHandler } from './FiskekortAPIHandler';
import { CatchReportView } from './CatchReportComponent/CatchReportView';

function App() {

  return (
    // <Fiskekort />
    <FiskekortAPIHandler></FiskekortAPIHandler>
    // <CatchReportView></CatchReportView>
    // <DataInsert />
  );
}
// cknoea1st54zr17mpn9ijmsm7 - satelit
// cknoda3mi3phq17pmcl9ctwq8 - street
export default App;
