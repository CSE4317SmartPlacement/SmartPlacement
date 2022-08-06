import React, { useEffect, useState } from "react";
import {
    Dropdown,

    Table,
} from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import MyNavbar from "../NavBar/AdminNavBar";

function StudentListPage() {


    var types = {
        pending: "Pending",
        all: "All",
        approved: "Approved",
        matching: "Matching",
        reject: "Reject",
    };

    const [listType, setListType] = useState(types.pending);

    const [studentList, setStudentList] = useState([]);
    const [students, setStudents] = useState([]);
    const fetchStudents = () => {
        axios.post("/studapplication").then((response) => {
            console.log(response.data);
            setStudents(response.data.result);
            setStudentList(
                response.data.result.filter((item) => item.approval == "pending")
            );
        });
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const history = useHistory();

    return (
        <div>
            <MyNavbar />
            <div className="container">
                <div className="d-flex justify-content-center mt-5">
                    <h4>students</h4>
                </div>
                <div className="d-flex justify-content-end">
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            {listType}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {[types.pending, types.all, types.approved, types.matching, types.reject].map(
                                (item) => {
                                    return (
                                        <Dropdown.Item
                                            onClick={() => {
                                                setListType(item);
                                                if (item == types.all) {
                                                    setStudentList(students);
                                                } else if (item == types.approved) {
                                                    setStudentList(
                                                        students.filter(
                                                            (item) => item.approval == "approved"
                                                        )
                                                    );
                                                } else if (item == types.pending) {
                                                    setStudentList(
                                                        students.filter(
                                                            (item) => item.approval == "pending"
                                                        )
                                                    );
                                                } else if (item == types.matching) {
                                                    setStudentList(
                                                        students.filter(
                                                            (item) => item.approval == "matching"
                                                        )
                                                    );
                                                } else {
                                                    setStudentList(
                                                        students.filter((item) => item.approval == "reject")
                                                    );
                                                }
                                            }}
                                        >
                                            {item}
                                        </Dropdown.Item>
                                    );
                                }
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <Table striped bordered hover style={{ margin: "30px" }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "center" }}>#</th>
                            <th style={{ textAlign: "center" }}>Student ID</th>
                            <th style={{ textAlign: "center" }}>Full Name</th>
                            <th style={{ textAlign: "center" }}>Degree Level</th>
                            <th style={{ textAlign: "center" }}>Email</th>
                            <th style={{ textAlign: "center" }}>Status</th>
                            <th style={{ textAlign: "center" }}>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentList.map((item, index) => {
                            return (
                                <tr>
                                    <td style={{ textAlign: "center" }}>{index + 1}</td>
                                    <td style={{ textAlign: "center" }}>{item.stud_id}</td>
                                    <td style={{ textAlign: "center" }}>{item.stud_fname + " " + item.stud_lname}</td>
                                    <td style={{ textAlign: "center" }}>{item.registered_level}</td>
                                    <td style={{ textAlign: "center" }}>{item.stud_email}</td>
                                    <td style={{ textAlign: "center" }}>{item.approval}</td>
                                    <td style={{ textAlign: "center" }}>
                                        <button
                                            onClick={(e) => {
                                                history.push("/student-detail", { student: item });
                                            }}
                                            className="btn btn-primary"
                                        >
                                            Detail
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default StudentListPage;
