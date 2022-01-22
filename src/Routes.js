import { BrowserRouter, Route } from "react-router-dom";

import Home from "./pages/Home";
import Data from "./pages/Data";
import Register from "./pages/Register";

const Routes = () => {

    return (
        <BrowserRouter>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/data" component={Data} />
            <Route exact={true} path="/signup" component={Register} />
        </BrowserRouter>
    )

}

export default Routes;