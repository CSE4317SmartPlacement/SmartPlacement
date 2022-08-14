import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import NavBar from "../NavBar/AdminNavBar";
import "../../Style/styles.css";

/**
 * Student list page
 * @returns {JSX.Element}
 */
function StudentListPage() {
    const history = useHistory();
    const [data,setData]=useState([]);
    useEffect(()=>{
      getData();
    },[]);

    /**
     * @param {string} 
     * @returns {Object} Student information
     */
    const getData = ()=>{
        axios.post("/studapplication").then((response)=>{
            setData(response.data.result);
            console.log(response.data);
        })};

    const columns=[
        {
            dataField:"stud_id",
            text:"Student Id",
            sort:true
        },
        {
          dataField:"stud_fname",
          text:"First Name",
          sort:true
        },
        {
            dataField:"stud_lname",
            text:"Last Name",
            sort:true
          },
        {
            dataField:"registered_level",
            text:"Registered Level"
        },
        {
            dataField:"stud_email",
            text:"Email"
        },
        {
          dataField:"approval",
          text:"Status"
        },
        {
          dataField: "detail",
          text: "Detail",
          isDummyField: true,
          formatter: (cell, row, rowIndex) => <Button variant="primary" onClick={(e) => {
            history.push("/student-detail", { 
              data:row});
          }}>Detail</Button>
      }];
    const { SearchBar } = Search;
    return (
        <div className="outsideDiv">
          <NavBar></NavBar>
          <br/>
          <br/>
          <h2 style={{textAlign: "center"}}>Student Table</h2>
          <div className="studentRequestTable">
              <ToolkitProvider 
                keyField="id" 
                data={data} 
                columns={columns}                       
                search
                >
                    {
                      props => (
                        <div>
                          <SearchBar { ...props.searchProps } style={{borderColor:"grey"}} srText=""/>
                          <hr />
                          <BootstrapTable
                            { ...props.baseProps }
                            stripped 
                            hover 
                            condensed
                            pagination={paginationFactory()}
                            // filter={ filterFactory()} 
                          />
                        </div>
                      )
                    }
                </ToolkitProvider>
          </div>
        </div>
      );
}

export default StudentListPage;
