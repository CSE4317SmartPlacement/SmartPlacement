import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import NavBar from "../NavBar/AdminNavBar";
import "../../Style/styles.css";
// import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
// import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

const VacancyRequestTable = () =>  {
   const history = useHistory();
    const [data,setData]=useState([]);
    useEffect(()=>{
      getData();
  },[]);
  const selectOptions = {
    0: 'approved',
    1: 'pending',
    2: 'reject'
  };
    const getData = ()=>{
        Axios.post("/agency-student-request").then((response)=>{
            setData(response.data.result);
            console.log(response.data);
        })};

        const columns=[
        {
            dataField:"agency_id",
            text:"Agency Id",
            sort:true
        },
        {
          dataField:"agency_name",
          text:"Agency name",
          sort:true
        },
        {
            dataField:"number_of_vacancy",
            text:"No. of Vacancy"
        },
        {
            dataField:"graduation_level",
            text:"Graduation Level"
        },
        {
          dataField:"approval",
          text:"Status"
          // formatter: cell => selectOptions[cell],
          // filter: selectFilter({
          //   options: selectOptions
          // })
        },
        {
          dataField: "detail",
          text: "Detail",
          isDummyField: true,
          formatter: (cell, row) => <Button variant="primary" onClick={(e) => {
            history.push("/vacancyrequest", { 
              data:data.find(x=>x.id===row.id)});
          }}>Detail</Button>
      }];

        const { SearchBar } = Search;
        return (
            <div className="outsideDiv">
              <NavBar></NavBar>
              <br/>
              <br/>
              <h2 style={{textAlign: "center"}}>Vacancy Table</h2>
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

export default VacancyRequestTable;
