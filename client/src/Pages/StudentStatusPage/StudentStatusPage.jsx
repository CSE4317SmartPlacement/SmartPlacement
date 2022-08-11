import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Col, Form, Row, Table } from 'react-bootstrap'
import MyNavbar from "../NavBar/AdminNavBar";
import TableRow from "../AgencyDetailPage/Components/TableRow";

function StudentStatusPage() {
    const [isMatched, setIsmatched] = useState(false)
    const [agency, setAgency] = useState("")
    const [requirements, setRequirements] = useState({})

    var fetchStudentByEmail = async (uname) => {
        //console.log('Inside fetchStudent function');
        //console.log(uname);
        var response = await axios.post("/studapplicationemail/" + uname);
        return response.data.result[0]
    }

    var fetchAgencyById = async (agencyId) => {
        var response = await axios.post("/agency/" + agencyId)
        setAgency(response.data.result)
    }

    var fetchMatchStatus = async() => {
        var uname = JSON.parse(localStorage.getItem("user"))[0].username;
        //console.log(ptest);
        var student = fetchStudentByEmail(uname);
        console.log(student);
        var response = await axios.post("/matching/student/" + student[0].stud_id);
        //console.log(response.data.result)
        setIsmatched(response.data.result.length>0)
        //console.log(response.data.result)
        if(response.data.result.length>0) {
           await fetchAgencyById(response.data.result[0].agency_id)
        }
    }

    var fetchRequirements = async (studentId) => {
        var response = await axios.post("/matching/requirements", { studentId: studentId })
        //console.log(response.data.result)
        setRequirements(response.data.result)
    }


    useEffect(() => {
        fetchMatchStatus()
    }, [])
    return (
        <div>
            {!isMatched ?
                <a>Student has not been placed anywhere</a> :
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
                                    Agency Detail
                                </p>
                                {/* </div> */}
                            </Row>
                            <Row className="justify-content-center" style={{ margin: "2% 3%" }}>
                                <h4 className="mb-3">Agency Information</h4>
                                <Table hover bordered >
                                    <tbody>
                                        <TableRow title="Agency Name" value={agency.agency_name} />
                                        <TableRow title="Agency Type" value={agency.agency_type} />
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
                                                {agency.preferred_contacts != null && JSON.parse(agency.preferred_contacts).map((item) => {
                                                    if (item.checked) {
                                                        return <p>{item.title}</p>
                                                    }
                                                })}</div>} />
                                    </tbody>
                                </Table>
                            </Row>




                            <Row className="justify-content-center" style={{ margin: "2% 3%" }}>
                                <h4 className="mb-3">Requirements Information</h4>
                                <Table hover bordered >
                                    <tbody>

                                        <TableRow title="Immunization Records"
                                            value={<div>
                                                {requirements.immunization_record != null && JSON.parse(requirements.immunization_record).map((item) => {
                                                    if (item.checked) {
                                                        return <Row className="justify-content-between" style={{padding: "30px 0px"}}><Col>- {item.title}</Col>  <Col> <input type="file"/></Col></Row>
                                                    }
                                                })}</div>} />


                                        <TableRow title="Other Reports"
                                            value={<div>
                                                {requirements.other_reports != null && JSON.parse(requirements.other_reports).map((item) => {
                                                    if (item.checked) {
                                                        return <Row className="justify-content-between"  style={{padding: "30px 0px"}}><Col>- {item.title}</Col>  <Col> <input type="file"/></Col></Row>
                                                    }
                                                })}</div>} />
                                    </tbody>
                                </Table>
                            </Row>
                            

                        </Card>
                    </div>
                </div>
            }</div>
    )
}

export default StudentStatusPage