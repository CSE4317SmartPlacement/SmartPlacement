import axios from "axios";
import React from "react";
import { Button, Card, Row, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import MyNavbar from "../NavBar/AdminNavBar";
import TableRow from "./Components/TableRow";

function AgencyDetailPage() {
  const history = useHistory();
  const agency = history.location.state.agency;

  var onApprove = (e) => {

    axios.patch("/agencyapproval/" + agency.agency_id, { "status": agency.approval == "approved" ? "pending" : "approved" })
      .then((response) => {
        console.log(response)
        history.push("/agencies")
      })
  }

  var onReject = (e) => {
    axios.patch("/agencyapproval/" + agency.agency_id, { "status": agency.approval == "reject" ? "pending" : "reject" })
      .then((response) => {
        console.log(response)
        history.push("/agencies")
      })
  }

  return (
    <div>
      <MyNavbar />
      <div className="container">
        <Card style={{ margin: "50px 0px" }}>
          <Row className="justify-content-center mt-5 mb-5">
            {/* <div style={{
              backgroundColor: "#2C5EBA",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              textAlign: "center"
            }} > */}
            <p style={{
              textAlign: "center",
              fontSize: "40px",
              fontWeight: "bold",
            }}>
              Agency Application Request
            </p>
            {/* </div> */}
          </Row>
          <Row className="justify-content-center" style={{ margin: "2% 3%" }}>
            <h4 className="mb-3">Agency Information</h4>
            <Table hover bordered >
              <tbody>
                <TableRow title="Agency Name" value={agency.agency_name.toUpperCase()} />
                <TableRow title="Agency Type" value={agency.agency_type.toUpperCase()} />
                <TableRow title="EIN" value={<p style={{ fontWeight: "bold", fontSize: "20px" }}>{agency.ein} </p>} />
                <TableRow title="Business Email" value={agency.email} />
                <TableRow title="Business Address" value={

                  <a href={"https://maps.google.com/?q=" + agency.bus_street + " " + agency.bus_unit + ", " +
                    agency.bus_city + ", " + agency.bus_state + ", " + agency.bus_zip}>
                    {`${agency.bus_street} ${agency.bus_unit}, ${agency.bus_city} ${agency.bus_state} ${agency.bus_zip} ${agency.bus_country}`}
                  </a>
                } />
                <TableRow title="Phone" value={agency.phone ?? "N/A"} />
                <TableRow title="Fax" value={agency.fax ?? "N/A"} />
                <TableRow title="Website" value={agency.website == null ? "N/A" : <a href={agency.website}>{agency.website}</a>} />
                <TableRow title="Mailing Address" value={<a href={"https://maps.google.com/?q=" + agency.mail_street + " " + agency.mail_unit + ", " +
                  agency.mail_city + ", " + agency.mail_state + ", " + agency.mail_zip}>
                  {`${agency.mail_street} ${agency.mail_unit}, ${agency.mail_city} ${agency.mail_state} ${agency.mail_zip} ${agency.mail_country}`}
                </a>} />
                <TableRow title="Preferred Contacts"
                  value={<div>
                    {JSON.parse(agency.preferred_contacts).map((item) => {
                      if (item.checked) {
                        return <p>{item.title}</p>
                      }
                    })}</div>} />


              </tbody>
            </Table>
          </Row>

          <Row className="justify-content-center" style={{ margin: "2% 3%" }}>
            <h4 className="mb-3">Agent Information</h4>
            <Table hover bordered >
              <tbody>
                <TableRow title="Agenct Name" value={agency.agent_fname + " " + agency.agent_lname} />
                <TableRow title="Agenct Title" value={agency.agent_title} />
                <TableRow title="Agent Phone" value={agency.agent_phone} />
              </tbody>
            </Table>
          </Row>

          <Row className="justify-content-center" style={{ margin: "2% 3%" }}>
            <h4 className="mb-3">Application Information</h4>
            <Table hover bordered >
              <tbody>
                <TableRow striped title="Request Date" value={new Date(agency.request_date).toDateString() + " at " + new Date(agency.request_date).toLocaleTimeString()} />
                <TableRow title="Placement Type" value={agency.placement_type} />
                <TableRow title="Graduation level"
                  value={<div>
                    {JSON.parse(agency.graduation_level).map((item) => {
                      if (item.checked) {
                        return <p>{item.title}</p>
                      }
                    })}</div>} />
                <TableRow title="Application Status"
                  value={<p
                    style={{
                      fontWeight: "bold",
                      color: agency.approval == "pending" ? "blue" :
                        agency.approval == "approved" ? "green" : "red",
                      fontSize: "25px"
                    }}>
                    {agency.approval.toUpperCase()}
                  </p>} />
              </tbody>
            </Table>
          </Row>
          <div class="row justify-content-end" style={{ marginTop: "2%", marginBottom: "2%", marginRight: "3%" }}>
            <div class="col-3" >
              <Button className={agency.approval == "approved" ? "btn btn-success" : "btn btn-primary"}
                onClick={onApprove}
                style={style.buttonStyle}>{agency.approval == "approved" ? "Send To Pending" : "Approve"}</Button>
            </div>
            <div class="col-3">
              <Button className={agency.approval == "reject" ? "btn btn-success" : "btn btn-danger"}
                onClick={onReject}

                style={style.buttonStyle}>{agency.approval == "reject" ? "Send To Pending" : "Reject"}</Button>
            </div>
          </div>

        </Card>
      </div>
    </div >
  );
}


const style = {
  buttonStyle: {
    width: "300px",
    padding: "10px 50px",
    fontSize: "20px",
    fontWeight: "bold",
    borderRadius: "50px"
  }
}
export default AgencyDetailPage;
