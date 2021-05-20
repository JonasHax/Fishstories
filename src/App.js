import "./App.css";
import { FiskekortAPIHandler } from "./Components/Fiskekort/FiskekortAPIHandler";
import { CreateFishingSpotPage } from "./Components/CreateFishingSpot/CreateFishingSpotPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        {/* Portal for creating fishingspots */}
        <Route path="/create">
          <CreateFishingSpotPage></CreateFishingSpotPage>
        </Route>
        {/* Home / Default App */}
        <Route path="/">
          <FiskekortAPIHandler></FiskekortAPIHandler>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
