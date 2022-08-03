import React, { useEffect, useState } from "react";
import {
  Dropdown,

  Table,
} from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import MyNavbar from "../NavBar/AdminNavBar";

function AgencyListPage() {


  var types = {
    pending: "Pending",
    all: "All",
    approved: "Approved",
    reject: "Reject",
  };

  const [listType, setListType] = useState(types.pending);

  const [agencyList, setAgencyList] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const fetchAgency = () => {
    axios.get("/agency").then((response) => {
      console.log(response.data);
      setAgencies(response.data.result);
      setAgencyList(
        response.data.result.filter((item) => item.approval == "pending")
      );
    });
  };

  useEffect(() => {
    fetchAgency();
  }, []);

  const history = useHistory();

  return (
    <div>
      <MyNavbar />
      <div className="container">
        <div className="d-flex justify-content-center mt-5">
          <h4>AGENCIES</h4>
        </div>
        <div className="d-flex justify-content-end">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {listType}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {[types.pending, types.all, types.approved, types.reject].map(
                (item) => {
                  return (
                    <Dropdown.Item
                      onClick={() => {
                        setListType(item);
                        if (item == types.all) {
                          setAgencyList(agencies);
                        } else if (item == types.approved) {
                          setAgencyList(
                            agencies.filter(
                              (item) => item.approval == "approved"
                            )
                          );
                        } else if (item == types.pending) {
                          setAgencyList(
                            agencies.filter(
                              (item) => item.approval == "pending"
                            )
                          );
                        } else {
                          setAgencyList(
                            agencies.filter((item) => item.approval == "reject")
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
              <th style={{ textAlign: "center" }}>Agency Name</th>
              <th style={{ textAlign: "center" }}>Agency Type</th>
              <th style={{ textAlign: "center" }}>Placement Type</th>
              <th style={{ textAlign: "center" }}>Status</th>
              <th style={{ textAlign: "center" }}>Detail</th>
            </tr>
          </thead>
          <tbody>
            {agencyList.map((item, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.agency_name}</td>
                  <td style={{ textAlign: "center" }}>{item.agency_type}</td>
                  <td>{item.placement_type}</td>
                  <td style={{ textAlign: "center" }}>{item.approval}</td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      onClick={(e) => {
                        history.push("/agency-detail", { agency: item });
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

export default AgencyListPage;
