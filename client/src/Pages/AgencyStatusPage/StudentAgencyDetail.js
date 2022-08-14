import React from "react";
import {Card, Row, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import MyNavbar from "../NavBar/StudentNavBar";
import TableRow from "../TableRow";

/**
 * Student agency detail page
 * @returns {JSX.Element}
 */
const StudentAgencyDetail=()=> {
    const history = useHistory();
    const agency = history.location.state.data;
    return (
        <div>
          <MyNavbar />
          <div className="container">
            <Card style={{ margin: "50px 0px" }}>
              <Row className="justify-content-center mt-5 mb-5">
                <p style={{
                  textAlign: "center",
                  fontSize: "40px",
                  fontWeight: "bold",
                }}>
                  Agency Detail
                </p>
              </Row>
              <Row className="justify-content-center" style={{ margin: "2% 3%" }}>
                <h4 className="mb-3">Agency Information</h4>
                <Table hover bordered >
                  <tbody>
                    <TableRow title="Agency Name" value={agency.agency_name.toUpperCase()} />
                    <TableRow title="Agency Type" value={agency.agency_type.toUpperCase()} />
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
            </Card>
          </div>
        </div >
      );
    }
    
export default StudentAgencyDetail;