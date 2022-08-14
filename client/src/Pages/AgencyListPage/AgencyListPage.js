import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useHistory } from "react-router-dom";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import NavBar from "../NavBar/AdminNavBar";
import "../../Style/styles.css";

/**
 * Agency list page
 * @returns {JSX.Element}
 */
const AgencyListPage = () =>  {
    const history = useHistory();
     const [data,setData]=useState([]);
     useEffect(()=>{
       getData();
    },[]);

    //Getting agency list
     const getData = ()=>{
         axios.post("/agency").then((response)=>{
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
             dataField:"agency_type",
             text:"Agency Type"
         },
         {
             dataField:"placement_type",
             text:"Placement Type"
         },
         {
           dataField:"approval",
           text:"Status"
         },
         {
           dataField: "detail",
           text: "Detail",
           isDummyField: true,
           formatter: (cell, row,rowIndex) => <Button variant="primary" onClick={(e) => {
             history.push("/agency-detail", { 
               data:row});
           }}>Detail</Button>
       }];

    const { SearchBar } = Search;
    return (
      <div className="outsideDiv">
      <NavBar></NavBar>
      <br/>
      <br/>
      <h2 style={{textAlign: "center"}}>Agency Table</h2>
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

export default AgencyListPage;
