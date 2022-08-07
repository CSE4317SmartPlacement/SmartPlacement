import React,{useState} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import AdminHomepage from "./Pages/AdminHomepage";
import AgencyHomepage from "./Pages/AgencyHomepage";
import StudentHomepage from "./Pages/StudentHomepage";
import AgencyAccountRequest from "./Pages/AgencyAccountRequest";
import StudentApplication from "./Pages/StudentApplication";
import RequestStudent from "./Pages/RequestStudent";
import VacancyRequestTable from "./Pages/VacancyListPage/VacancyRequestTable";
import VacancyRequest from "./Pages/VacancyDetailPage/VacancyRequest";
import AgencyListPage from "./Pages/AgencyListPage/AgencyListPage";
import AgencyDetailPage from "./Pages/AgencyDetailPage/AgencyDetailPage";
import StudentListPage from "./Pages/StudentListPage/StudentListPage";
import studentDetailPage from "./Pages/StudentDetailPage/StudentDetailPage";
import StudentStatusPage from "./Pages/StudentStatusPage/StudentStatusPage";


function App() {

  return(
    
    <Router>
      <Switch>
        <Route exact path="/" component = {Login}/>
        <Route exact path="/agencyaccountrequest" component = {AgencyAccountRequest}/>
        <Route exact path="/agency-detail" component={AgencyDetailPage} />
        <Route exact path="/agencies" component={AgencyListPage} />
        <Route exact path="/student-detail" component={studentDetailPage} />
        <Route exact path="/student-status" component={StudentStatusPage} />
        <Route exact path="/students" component={StudentListPage} />
        <Route exact path="/studenthomepage" component = {StudentHomepage}/>
        <Route exact path="/studentapplication" component = {StudentApplication}/>
        <Route exact path="/adminhomepage" component = {AdminHomepage}/>
        <Route exact path="/vacancyrequesttable" component = {VacancyRequestTable}/>
        <Route exact path="/vacancyrequest" component = {VacancyRequest}/>
        <Route exact path="/agencyhomepage" component = {AgencyHomepage}/>
        <Route exact path="/requeststudents" component = {RequestStudent}/>
        <Route exact path="/forgotpassword" component = {ForgotPassword}/>
      </Switch>
    </Router>
  )

}

export default App;