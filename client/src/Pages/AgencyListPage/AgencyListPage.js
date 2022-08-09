import React, { useEffect, useState } from "react";
import {
  Dropdown,

  Table,
} from "react-bootstrap";
import { Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useHistory } from "react-router-dom";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import NavBar from "../NavBar/AdminNavBar";
import "../../Style/styles.css";

// function AgencyListPage() {


//   var types = {
//     pending: "Pending",
//     all: "All",
//     approved: "Approved",
//     reject: "Reject",
//   };

  // const [listType, setListType] = useState(types.pending);

  // const [agencyList, setAgencyList] = useState([]);
  // const [agencies, setAgencies] = useState([]);
  // const fetchAgency = () => {
  //   axios.post("/agency").then((response) => {
  //     console.log(response.data);
  //     setAgencies(response.data.result);
  //     setAgencyList(
  //       response.data.result.filter((item) => item.approval == "pending")
  //     );
  //   });
  // };

  // useEffect(() => {
  //   fetchAgency();
  // }, []);


  const AgencyListPage = () =>  {
    const history = useHistory();
     const [data,setData]=useState([]);
     useEffect(()=>{
       getData();
   },[]);
  //  const selectOptions = {
  //    0: 'approved',
  //    1: 'pending',
  //    2: 'reject'
  //  };
       //           <th style={{ textAlign: "center" }}>#</th>
    //           <th style={{ textAlign: "center" }}>Agency Name</th>
    //           <th style={{ textAlign: "center" }}>Agency Type</th>
    //           <th style={{ textAlign: "center" }}>Placement Type</th>
    //           <th style={{ textAlign: "center" }}>Status</th>
    //           <th style={{ textAlign: "center" }}>Detail</th>
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
             history.push("/agency-detail", { 
               data:data.find(x=>x.id===row.id)});
           }}>Detail</Button>
       }];
 
         const { SearchBar } = Search;

  return (
    // <div>
    //   <MyNavbar />
    //   <div className="container">
    //     <div className="d-flex justify-content-center mt-5">
    //       <h4>AGENCIES</h4>
    //     </div>
    //     <div className="d-flex justify-content-end">
    //       <Dropdown>
    //         <Dropdown.Toggle variant="primary" id="dropdown-basic">
    //           {listType}
    //         </Dropdown.Toggle>

    //         <Dropdown.Menu>
    //           {[types.pending, types.all, types.approved, types.reject].map(
    //             (item) => {
    //               return (
    //                 <Dropdown.Item
    //                   onClick={() => {
    //                     setListType(item);
    //                     if (item == types.all) {
    //                       setAgencyList(agencies);
    //                     } else if (item == types.approved) {
    //                       setAgencyList(
    //                         agencies.filter(
    //                           (item) => item.approval == "approved"
    //                         )
    //                       );
    //                     } else if (item == types.pending) {
    //                       setAgencyList(
    //                         agencies.filter(
    //                           (item) => item.approval == "pending"
    //                         )
    //                       );
    //                     } else {
    //                       setAgencyList(
    //                         agencies.filter((item) => item.approval == "reject")
    //                       );
    //                     }
    //                   }}
    //                 >
    //                   {item}
    //                 </Dropdown.Item>
    //               );
    //             }
    //           )}
    //         </Dropdown.Menu>
    //       </Dropdown>
    //     </div>

    //     <Table striped bordered hover style={{ margin: "30px" }}>
    //       <thead>
    //         <tr>
    //           <th style={{ textAlign: "center" }}>#</th>
    //           <th style={{ textAlign: "center" }}>Agency Name</th>
    //           <th style={{ textAlign: "center" }}>Agency Type</th>
    //           <th style={{ textAlign: "center" }}>Placement Type</th>
    //           <th style={{ textAlign: "center" }}>Status</th>
    //           <th style={{ textAlign: "center" }}>Detail</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {agencyList.map((item, index) => {
    //           return (
    //             <tr>
    //               <td>{index + 1}</td>
    //               <td>{item.agency_name}</td>
    //               <td style={{ textAlign: "center" }}>{item.agency_type}</td>
    //               <td>{item.placement_type}</td>
    //               <td style={{ textAlign: "center" }}>{item.approval}</td>
    //               <td style={{ textAlign: "center" }}>
    //                 <button
    //                   onClick={(e) => {
    //                     history.push("/agency-detail", { agency: item });
    //                   }}
    //                   className="btn btn-primary"
    //                 >
    //                   Detail
    //                 </button>
    //               </td>
    //             </tr>
    //           );
    //         })}
    //       </tbody>
    //     </Table>
    //   </div>
    // </div>





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
