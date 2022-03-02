import { BrowserRouter, Route } from "react-router-dom";

import Home from "./pages/Home";
import Data from "./pages/Data";
import Register from "./pages/Register";
import DataViewer from "./pages/DataViewer";
import DataCharts from "./pages/DataChats";
import About from "./pages/About";

const Routes = () => {

    return (
        <BrowserRouter>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/data" component={Data} />
            <Route exact={true} path="/signup" component={Register} />
            <Route exact={true} path="/dataviewer" component={DataViewer} />
            <Route exact={true} path="/datacharts" component={DataCharts} />
            <Route exact={true} path="/about" component={About} />
        </BrowserRouter>
    )

}

export default Routes;