import { BrowserRouter, Route, Switch } from "react-router-dom";

import Box from "./pages/Box";
import Main from "./pages/Main";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/box/:id" component={Box} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
