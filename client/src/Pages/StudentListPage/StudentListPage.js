import React, { useEffect, useState } from "react";
import {
    Dropdown,

    Table,
} from "react-bootstrap";
import axios from "axios";
import { Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import NavBar from "../NavBar/AdminNavBar";
import "../../Style/styles.css";

function StudentListPage() {


    // var types = {
    //     pending: "Pending",
    //     all: "All",
    //     approved: "Approved",
    //     matching: "Matching",
    //     reject: "Reject",
    // };

    // const [listType, setListType] = useState(types.pending);

    // const [studentList, setStudentList] = useState([]);
    // const [students, setStudents] = useState([]);
    // const fetchStudents = () => {
    //     axios.post("/studapplication").then((response) => {
    //         console.log(response.data);
    //         setStudents(response.data.result);
    //         setStudentList(
    //             response.data.result.filter((item) => item.approval == "pending")
    //         );
    //     });
    // };

    // useEffect(() => {
    //     fetchStudents();
    // }, []);

    // const history = useHistory();

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
        axios.post("/studapplication").then((response)=>{
            setData(response.data.result);
            console.log(response.data);
        })};

        // <td style={{ textAlign: "center" }}>{index + 1}</td>
        // <td style={{ textAlign: "center" }}>{item.stud_id}</td>
        // <td style={{ textAlign: "center" }}>{item.stud_fname + " " + item.stud_lname}</td>
        // <td style={{ textAlign: "center" }}>{item.registered_level}</td>
        // <td style={{ textAlign: "center" }}>{item.stud_email}</td>
        // <td style={{ textAlign: "center" }}>{item.approval}</td>
        // <td style={{ textAlign: "center" }}>

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
          // formatter: cell => selectOptions[cell],
          // filter: selectFilter({
          //   options: selectOptions
          // })
        },
        {
          dataField: "detail",
          text: "Detail",
          isDummyField: true,
          formatter: (cell, row, rowIndex) => <Button variant="primary" onClick={(e) => {
            history.push("/student-detail", { 
              data:data[rowIndex]});
          }}>Detail</Button>
      }];

    // return (
    //     <div>
    //         <MyNavbar />
    //         <div className="container">
    //             <div className="d-flex justify-content-center mt-5">
    //                 <h4>students</h4>
    //             </div>
    //             <div className="d-flex justify-content-end">
    //                 <Dropdown>
    //                     <Dropdown.Toggle variant="primary" id="dropdown-basic">
    //                         {listType}
    //                     </Dropdown.Toggle>

    //                     <Dropdown.Menu>
    //                         {[types.pending, types.all, types.approved, types.matching, types.reject].map(
    //                             (item) => {
    //                                 return (
    //                                     <Dropdown.Item
    //                                         onClick={() => {
    //                                             setListType(item);
    //                                             if (item == types.all) {
    //                                                 setStudentList(students);
    //                                             } else if (item == types.approved) {
    //                                                 setStudentList(
    //                                                     students.filter(
    //                                                         (item) => item.approval == "approved"
    //                                                     )
    //                                                 );
    //                                             } else if (item == types.pending) {
    //                                                 setStudentList(
    //                                                     students.filter(
    //                                                         (item) => item.approval == "pending"
    //                                                     )
    //                                                 );
    //                                             } else if (item == types.matching) {
    //                                                 setStudentList(
    //                                                     students.filter(
    //                                                         (item) => item.approval == "matching"
    //                                                     )
    //                                                 );
    //                                             } else {
    //                                                 setStudentList(
    //                                                     students.filter((item) => item.approval == "reject")
    //                                                 );
    //                                             }
    //                                         }}
    //                                     >
    //                                         {item}
    //                                     </Dropdown.Item>
    //                                 );
    //                             }
    //                         )}
    //                     </Dropdown.Menu>
    //                 </Dropdown>
    //             </div>

    //             <Table striped bordered hover style={{ margin: "30px" }}>
    //                 <thead>
    //                     <tr>
    //                         <th style={{ textAlign: "center" }}>#</th>
    //                         <th style={{ textAlign: "center" }}>Student ID</th>
    //                         <th style={{ textAlign: "center" }}>Full Name</th>
    //                         <th style={{ textAlign: "center" }}>Degree Level</th>
    //                         <th style={{ textAlign: "center" }}>Email</th>
    //                         <th style={{ textAlign: "center" }}>Status</th>
    //                         <th style={{ textAlign: "center" }}>Detail</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {studentList.map((item, index) => {
    //                         return (
    //                             <tr>
    //                                 <td style={{ textAlign: "center" }}>{index + 1}</td>
    //                                 <td style={{ textAlign: "center" }}>{item.stud_id}</td>
    //                                 <td style={{ textAlign: "center" }}>{item.stud_fname + " " + item.stud_lname}</td>
    //                                 <td style={{ textAlign: "center" }}>{item.registered_level}</td>
    //                                 <td style={{ textAlign: "center" }}>{item.stud_email}</td>
    //                                 <td style={{ textAlign: "center" }}>{item.approval}</td>
    //                                 <td style={{ textAlign: "center" }}>
    //                                     <button
    //                                         onClick={(e) => {
    //                                             history.push("/student-detail", { student: item });
    //                                         }}
    //                                         className="btn btn-primary"
    //                                     >
    //                                         Detail
    //                                     </button>
    //                                 </td>
    //                             </tr>
    //                         );
    //                     })}
    //                 </tbody>
    //             </Table>
    //         </div>
    //     </div>
    // );


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
