import { BrowserRouter, Route } from "react-router-dom";

import Home from "./pages/Home";
import Data from "./pages/Data";
import Register from "./pages/Register";
import DataViewer from "./pages/DataViewer";

const Routes = () => {

    return (
        <BrowserRouter>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/data" component={Data} />
            <Route exact={true} path="/signup" component={Register} />
            <Route exact={true} path="/dataviewer" component={DataViewer} />
        </BrowserRouter>
    )

}

export default Routes;