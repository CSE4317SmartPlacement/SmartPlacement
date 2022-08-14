import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Row, Table } from 'react-bootstrap'
import MyNavbar from "../NavBar/StudentNavBar";
import TableRow from "../TableRow";
import { useHistory } from 'react-router-dom';

/**
 * StudentStatusPage
 * @returns {Component} 
 */
function StudentStatusPage() {
    const history = useHistory();
    const [isMatched, setIsmatched] = useState(false)
    const [agency, setAgency] = useState("")
    const [student, setStudents] = useState({});

    //Getting the match status of the student
    var fetchMatchStatus = async() => {
        const uname = JSON.parse(localStorage.getItem("user"))[0].username;
        const response = await axios.post("/studapplicationemail/" + uname);
        setStudents(response.data.result[0]);
        var matched = await fetchIsMatched(response.data.result[0].stud_id);
        await axios.post("/matching/student/" + response.data.result[0].stud_id)
        .then((response)=>{
            setIsmatched(response.data.result.length>0);
        });
        if(response.data.result.length>0) {
            await axios.post("/agency/" + matched.data.result[0].agency_id)
            .then((response)=>{
                setAgency(response.data.result)
            });
        }
    }
    
    //Checking if the student is matched or not
    var fetchIsMatched= async(studentId) => {
            const response = await axios.post("/matching/student/" + studentId);
            return response;
    }
    
    useEffect(() => {
        fetchMatchStatus();
    }, [])
    return (
        <div>
            <MyNavbar />
            <div className="container" style={{width:"80%"}}>
                <Card style={{ margin: "50px 0px" }}>
                    <Row className="justify-content-center mt-5 mb-5">
                        <p style={{
                            textAlign: "center",
                            fontSize: "40px",
                            fontWeight: "bold",
                        }}>
                            Student Status
                        </p>
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
                            </tbody>
                        </Table>
                    </Row>
                    <Row className="justify-content-center" style={{ margin: "2% 3%" }}>
                        <h4 className="mb-3">Application Information</h4>
                        <Table hover bordered >
                            <tbody>
                                <TableRow title="Preferred Agency Type" value={student.agent_type_one + ", " + student.agent_type_two + ", " + student.agent_type_three} />

                                <TableRow title="Degree Level" value={<p style={{ fontWeight: "bold", fontSize: "20px" }}>{student.registered_level} </p>} />

                                <TableRow title="Application Status"
                                    value={<p
                                        style={{
                                            fontWeight: "bold",
                                            color: student.approval == "pending" ? "blue" :
                                                student.approval == "approved" || student.approval == "matching" ? "green" : "red",
                                            fontSize: "20px"
                                        }}>
                                        {
                                        isMatched ? <span>Already matched with <a className="text-primary" onClick={(e) => {
                                            history.push("/agency-status",{data: agency})
                                        }}>{agency.agency_name}</a></span>:
                                        student.approval}
                                    </p>} />
                            </tbody>
                        </Table>
                    </Row>
                </Card>
            </div>
        </div>
    );
}

export default StudentStatusPage;