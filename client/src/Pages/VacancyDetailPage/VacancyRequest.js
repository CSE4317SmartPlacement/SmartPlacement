import React from "react";
import { Button, Card, Row, Table } from "react-bootstrap";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import TableRow from "../TableRow";
import NavBar from "../NavBar/AdminNavBar";

/**
 * Vacancy detail page
 * @returns {JSX.Element}
 */
const VacancyRequest = () =>  { 
    const history = useHistory();
    const data = history.location.state.data;
    //Approve scenario
    var onApprove = (e) => {
        Axios.patch("/agency-student-requestapproval/" + data.id, { "status": data.approval == "approved" ? "pending" : "approved" })
          .then((response) => {
            history.push("/vacancyrequesttable");
          })
      }
    //Reject scenario
      var onReject = (e) => {
        Axios.patch("/agency-student-requestapproval/" + data.id, { "status": data.approval == "reject" ? "pending" : "reject" })
          .then((response) => {
            history.push("/vacancyrequesttable");
          })
      }

    return(
        <div>
            <NavBar/>
            <div className="container" style={{width:"90%"}}>
                <Card style={{ margin: "50px 0px" }}>
                    <Row className="justify-content-center mt-5 mb-5">
                        <p style={{
                            textAlign: "center",
                            fontSize: "40px",
                            fontWeight: "bold",
                            }}>
                                Vacancy Request
                        </p>
                    </Row>
                    <Row className="justify-content-center" style={{ margin: "2% 3%" }}>
                        <Table hover bordered >
                            <tbody>
                            <TableRow title="Number of Vacancy" value={data.number_of_vacancy} />
                            <TableRow title="Preferred" value={data.graduation_level} />
                            <TableRow title="Requirement" value={data.requirement} />
                            <TableRow title="EIN number" value={data.ein} />
                            <TableRow title="Immunization Record"
                                value={<div>
                                    {JSON.parse(data.immunization_record).map((item) => {
                                    if (item.checked) {
                                        return <p>{item.title}</p>
                                    }
                                    })}</div>} />
                            <TableRow title="Other Records"
                                value={<div>
                                    {JSON.parse(data.other_reports).map((item) => {
                                    if (item.checked) {
                                        return <p>{item.title}</p>
                                    }
                                    })}</div>} />
                            <TableRow title="Application Status"
                                    value={<p
                                        style={{
                                            fontWeight: "bold",
                                            color: data.approval == "pending" ? "blue" :
                                                data.approval == "approved" || data.approval == "matching" ? "green" : "red",
                                            fontSize: "25px"
                                        }}>
                                        {data.approval.toUpperCase()}
                                    </p>} />
                            </tbody>

                        </Table>
                    </Row>
                    <div class="row justify-content-end" style={{ marginTop: "2%", marginBottom: "2%", marginRight: "3%" }}>
                        <div class="col-3" >
                            <Button className={data.approval == "approved" ? "btn btn-success" : "btn btn-primary"}
                            onClick={onApprove}
                            style={style.buttonStyle}>{data.approval == "approved" ? "Send To Pending" : "Approve"}</Button>
                        </div>
                        <div class="col-3">
                            <Button className={data.approval == "reject" ? "btn btn-success" : "btn btn-danger"}
                            onClick={onReject}

                            style={style.buttonStyle}>{data.approval == "reject" ? "Send To Pending" : "Reject"}</Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>

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

export default VacancyRequest;