import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import AdminHomepage from "./Pages/AdminHomepage";
import AgencyHomepage from "./Pages/AgencyHomepage";
import StudentHomepage from "./Pages/StudentHomepage";
import AgencyAccountRequest from "./Pages/AgencyAccountRequest";
import StudentApplication from "./Pages/StudentApplication";
import RequestStudent from "./Pages/RequestStudent";
import AgencyListPage from "./Pages/AgencyListPage/AgencyListPage";
import AgencyDetailPage from "./Pages/AgencyDetailPage/AgencyDetailPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route
          exact
          path="/agencyaccountrequest"
          component={AgencyAccountRequest}
        />
        <Route exact path="/agency-detail" component={AgencyDetailPage} />

        <Route exact path="/agencies" component={AgencyListPage} />

        <Route exact path="/studenthomepage" component={StudentHomepage} />
        <Route
          exact
          path="/studenthomepage/studentapplication"
          component={StudentApplication}
        />
        <Route exact path="/adminhomepage" component={AdminHomepage} />
        <Route exact path="/agencyhomepage" component={AgencyHomepage} />
        <Route
          exact
          path="/agencyhomepage/requeststudents"
          component={RequestStudent}
        />
        <Route exact path="/forgotpassword" component={ForgotPassword} />
      </Switch>
    </Router>
  );
}

export default App;
