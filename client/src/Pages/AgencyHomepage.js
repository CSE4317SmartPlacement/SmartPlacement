import NavBar from "./NavBar/AgencyNavBar";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

const AgencyHomepage = () => {
  const history = useHistory();
  const [data, setData] = useState([]);

  const getData = () => {
    const user = localStorage.getItem("user");
    console.log(JSON.parse(user));
    const email = JSON.parse(user).username;
    axios.post("/matchingstudent/studentlist", { email }).then((response) => {
      console.log(response.data);
      setData(response.data.data);
    });
  };

  const columns = [
    {
      dataField: "stud_fname",
      text: "First Name",
      sort: true,
    },
    {
      dataField: "stud_lname",
      text: "Last Name",
      sort: true,
    },
    {
      dataField: "registered_level",
      text: "Registered Level",
    },
    {
      dataField: "stud_email",
      text: "Email",
    },
    {
      dataField: "detail",
      text: "Detail",
      isDummyField: true,
      formatter: (cell, row, rowIndex) => (
        <Button
          variant="primary"
          onClick={(e) => {
            history.push("/student-detail", {
              data: data[rowIndex],
            });
          }}
        >
          Detail
        </Button>
      ),
    },
  ];

  const { SearchBar } = Search;
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <NavBar></NavBar>
      <div className="studentRequestTable">
        <div>
          {" "}
          <h1>List of Student For placement</h1>
        </div>
        <ToolkitProvider keyField="id" data={data} columns={columns} search>
          {(props) => (
            <div>
              <SearchBar
                {...props.searchProps}
                style={{ borderColor: "grey" }}
                srText=""
              />
              <hr />
              <BootstrapTable
                {...props.baseProps}
                stripped
                hover
                condensed
                pagination={paginationFactory()}
              />
            </div>
          )}
        </ToolkitProvider>
      </div>
    </div>
  );
};

export default AgencyHomepage;
