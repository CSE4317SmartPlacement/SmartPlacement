import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Row, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import MyNavbar from "../../Components/MyNavbar";
import TableRow from "../AgencyDetailPage/Components/TableRow";

function StudentDetailPage() {
    const history = useHistory();

    const [student, setStudent] = useState(history.location.state.student)

    var onApprove = async (e) => {
        await axios.patch("/studapplication/" + student.stud_id, { "status": student.approval == "pending" || student.approval == "reject" ? "approved" : "matching" })
        await fetchStudentById()
    }

    var onReject = async (e) => {
        await axios.patch("/studapplication/" + student.stud_id, { "status": student.approval == "reject" ? "pending" : "reject" })
        await fetchStudentById()
    }

    var onCancel = async (e) => {
        await axios.patch("/studapplication/" + student.stud_id, { "status": "approved" })
        fetchStudentById()
    }

    var fetchStudentById = async () => {
        var response = await axios.get("/studapplication/" + student.stud_id)
        setStudent(response.data.result)
    }

    useEffect(() => {
        fetchStudentById()
    }, [])


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
                            Student Application Request
                        </p>
                        {/* </div> */}
                    </Row>
                    <Row className="justify-content-center" style={{ margin: "2% 3%" }}>
                        <h4 className="mb-3">Student Information</h4>
                        <Table hover bordered >
                            <tbody>
                                <TableRow title="ID" value={student.stud_id} />
                                <TableRow title="Name" value={student.stud_fname + " " + student.stud_lname} />
                                <TableRow title="Title" value={student.stud_title} />
                                <TableRow title="Email" value={student.stud_email} />
                                <TableRow title="Home Phone" value={student.stud_homephone} />
                                <TableRow title="Mobile Phone" value={student.stud_mobilephone} />

                                <TableRow title="Address" value={

                                    <a href={"https://maps.google.com/?q=" + student.stud_street + " " + student.stud_unit + ", " +
                                        student.stud_city + ", " + student.stud_state + ", " + student.stud_zip}>
                                        {`${student.stud_street} ${student.stud_unit}, ${student.stud_city} ${student.stud_state} ${student.stud_zip} ${student.stud_country}`}
                                    </a>
                                } />

                                <TableRow title="Preferred Contacts"
                                    value={<div>
                                        {JSON.parse(student.preferred_contacts).map((item) => {
                                            if (item.checked) {
                                                return <p>{item.title}</p>
                                            }
                                        })}</div>} />


                            </tbody>
                        </Table>
                    </Row>

                    <Row className="justify-content-center" style={{ margin: "2% 3%" }}>
                        <h4 className="mb-3">Application Information</h4>
                        <Table hover bordered >
                            <tbody>
                                {/* <TableRow striped title="Request Date" value={new Date(student.request_date).toDateString() + " at " + new Date(student.request_date).toLocaleTimeString()} /> */}

                                <TableRow title="Preferred Agency Type" value={student.agent_type_one + ", " + student.agent_type_two + ", " + student.agent_type_three} />

                                <TableRow title="Degree Level" value={<p style={{ fontWeight: "bold", fontSize: "20px" }}>{student.registered_level} </p>} />

                                <TableRow title="Application Status"
                                    value={<p
                                        style={{
                                            fontWeight: "bold",
                                            color: student.approval == "pending" ? "blue" :
                                                student.approval == "approved" || student.approval == "matching" ? "green" : "red",
                                            fontSize: "25px"
                                        }}>
                                        {student.approval.toUpperCase()}
                                    </p>} />
                            </tbody>
                        </Table>
                    </Row>
                    <div class="row justify-content-end" style={{ marginTop: "2%", marginBottom: "2%", marginRight: "3%" }}>
                        <div class="col-3" >
                            {student.approval == "matching" || student.approval == "approved" ?
                                <Button className="btn btn-info"
                                    onClick={async () => {
                                        await axios.patch("/studapplication/" + student.stud_id, { "status": "matching" })
                                        await fetchStudentById()
                                        history.push("/macthing")
                                    }}
                                    style={style.buttonStyle}>Start Matching
                                </Button> :

                                <Button className="btn btn-primary"
                                    onClick={onApprove}
                                    style={style.buttonStyle}>Approve
                                </Button>}
                        </div>
                        <div class="col-3">
                            {student.approval == "matching" ?
                                <Button className="btn btn-danger"
                                    onClick={onCancel}
                                    style={style.buttonStyle}>Cancel Matching
                                </Button> :

                                <Button className="btn btn-danger"
                                    onClick={onReject}

                                    style={style.buttonStyle}>{
                                        student.approval == "reject" ?
                                            "Cancel Reject" :
                                            "Reject"}
                                </Button>}

                        </div>
                    </div>

                    {student.approval == "matching" ?

                        <Row className="justify-content-center" style={{ margin: "2% 3%" }}>

                        </Row> : <></>
                    }
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
        borderRadius: "50px",
        color: "white",
    }
}
export default StudentDetailPage;
