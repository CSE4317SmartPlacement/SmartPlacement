import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Row, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import MyNavbar from "../NavBar/AgencyNavBar";
import TableRow from "../TableRow";

/**
 * Agency student detail page
 * @returns {JSX.Element}
 */
function AgencyStudentDetail() {
  const history = useHistory();
  const val = history.location.state.data;
  const [student, setStudent] = useState(val);
  const [matches, setMatches] = useState([]);
  const [isMatched, setIsmatched] = useState(false);

  //Approve scenario
  var onApprove = async (e) => {
    await axios.patch("/studapplicationapproval/" + student.stud_id, {
      status:
        student.approval == "pending" || student.approval == "reject"
          ? "approved"
          : "matching",
    });
    await fetchStudentById();
    history.push("/students");
  };
  //reject scenario
  var onReject = async (e) => {
    await axios.patch("/studapplicationapproval/" + student.stud_id, {
      status: student.approval == "reject" ? "pending" : "reject",
    });
    await fetchStudentById();
    history.push("/students");
  };
  //cancle scenario
  var onCancel = async (e) => {
    await axios.patch("/studapplicationapproval/" + student.stud_id, {
      status: "approved",
    });
    fetchStudentById();
    history.push("/students");
  };

  //Getting student details by id
  var fetchStudentById = async () => {
    var response = await axios.post("/studapplication/" + student.stud_id);
    setStudent(response.data.result);
  };

  //Getting student match status by id
  var fetchMatchStatus = async () => {
    var response = await axios.post("/matching/student/" + student.stud_id);
    setIsmatched(response.data.result.length > 0);
    if (response.data.result.length > 0) {
      await fetchAgencyById(response.data.result[0].agency_id);
    }
  };

  const [agency, setAgency] = useState("");
  //Getting agency details by id
  var fetchAgencyById = async (agencyId) => {
    var response = await axios.post("/agency/" + agencyId);
    setAgency(response.data.result);
  };

  useEffect(() => {
    fetchStudentById();
    fetchMatchStatus();
  }, []);

  return (
    <div>
      <MyNavbar /> 
      <div className="container">
        <Card style={{ margin: "50px 0px" }}>
          <Row className="justify-content-center mt-5 mb-5">
            <p
              style={{
                textAlign: "center",
                fontSize: "40px",
                fontWeight: "bold",
              }}
            >
              Student Information
            </p>
          </Row>
          <Row className="justify-content-center" style={{ margin: "2% 3%" }}>
            <h4 className="mb-3">Student Information</h4>
            <Table hover bordered>
              <tbody>
                <TableRow title="ID" value={student.stud_id} />
                <TableRow
                  title="Name"
                  value={student.stud_fname + " " + student.stud_lname}
                />
                <TableRow title="Title" value={student.stud_title} />
                <TableRow title="Email" value={student.stud_email} />
                <TableRow title="Home Phone" value={student.stud_homephone} />
                <TableRow
                  title="Mobile Phone"
                  value={student.stud_mobilephone}
                />

                <TableRow
                  title="Address"
                  value={
                    <a
                      href={
                        "https://maps.google.com/?q=" +
                        student.stud_street +
                        " " +
                        student.stud_unit +
                        ", " +
                        student.stud_city +
                        ", " +
                        student.stud_state +
                        ", " +
                        student.stud_zip
                      }
                    >
                      {`${student.stud_street} ${student.stud_unit}, ${student.stud_city} ${student.stud_state} ${student.stud_zip} ${student.stud_country}`}
                    </a>
                  }
                />
              </tbody>
            </Table>
          </Row>

          <Row className="justify-content-center" style={{ margin: "2% 3%" }}>
            <h4 className="mb-3">Application Information</h4>
            <Table hover bordered>
              <tbody>
                <TableRow
                  title="Preferred Agency Type"
                  value={
                    student.agent_type_one +
                    ", " +
                    student.agent_type_two +
                    ", " +
                    student.agent_type_three
                  }
                />
                <TableRow
                  title="Degree Level"
                  value={
                    <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                      {student.registered_level}{" "}
                    </p>
                  }
                />
              </tbody>
            </Table>
          </Row>

          {isMatched ? (
            <></>
          ) : (
            <div
              class="row justify-content-end"
              style={{ marginTop: "2%", marginBottom: "2%", marginRight: "3%" }}
            >
              <div class="col-3">
                {student.approval == "matching" ||
                student.approval == "approved" ? (
                  <Button
                    className="btn btn-info"
                    onClick={async () => {
                      await axios.patch(
                        "/studapplicationapproval/" + student.stud_id,
                        { status: "matching" }
                      );
                      await fetchStudentById();

                      var result = await axios.post("/matching", {
                        agent_type_1: student.agent_type_one,
                        agent_type_2: student.agent_type_two,
                        agent_type_3: student.agent_type_three,
                      });
                      const { data1, data2, data3 } = result.data;
                      var results = [];
                      results.push.apply(results, data1);
                      results.push.apply(results, data2);
                      results.push.apply(results, data3);
                      setMatches(results);
                    }}
                    style={style.buttonStyle}
                  >
                    Start Matching
                  </Button>
                ) : (
                  <Button
                    className="btn btn-primary"
                    onClick={onApprove}
                    style={style.buttonStyle}
                  >
                    Approve
                  </Button>
                )}
              </div>
              <div class="col-3">
                {student.approval == "matching" ? (
                  <Button
                    className="btn btn-danger"
                    onClick={onCancel}
                    style={style.buttonStyle}
                  >
                    Cancel Matching
                  </Button>
                ) : (
                  <Button
                    className="btn btn-danger"
                    onClick={onReject}
                    style={style.buttonStyle}
                  >
                    {student.approval == "reject" ? "Cancel Reject" : "Reject"}
                  </Button>
                )}
              </div>
            </div>
          )}
          {student.approval == "matching" ? (
            <Row
              className="justify-content-center"
              style={{ margin: "2% 3%" }}
            ></Row>
          ) : (
            <></>
          )}
        </Card>
        {isMatched ? (
          <></>
        ) : (
          <Table striped bordered hover style={{ margin: "30px" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>#Priority</th>
                <th style={{ textAlign: "center" }}>Agency Name</th>
                <th style={{ textAlign: "center" }}>Agency Type</th>
                <th style={{ textAlign: "center" }}>Number Of Vacancy </th>
                <th style={{ textAlign: "center" }}>Match</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((item, index) => {
                return (
                  <tr>
                    <td style={{ textAlign: "center" }}>{index + 1}</td>
                    <td style={{ textAlign: "center" }}>{item.agency_name}</td>
                    <td style={{ textAlign: "center" }}>{item.agency_type}</td>
                    <td style={{ textAlign: "center" }}>
                      {item.number_of_vacancy}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        onClick={async (e) => {
                          await axios.post("/matching/insert", {
                            agency_id: item.agency_id,
                            student_id: student.stud_id,
                            form_id: item.id,
                          });
                          setMatches([]);
                          await fetchMatchStatus();
                          await axios.patch(
                            "/studapplicationapproval/" + student.stud_id,
                            { status: "matched" }
                          );
                          await fetchStudentById();
                          history.push("/students");
                        }}
                        className="btn btn-success"
                      >
                        Match
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
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
    borderRadius: "50px",
    color: "white",
  },
};
export default AgencyStudentDetail;
