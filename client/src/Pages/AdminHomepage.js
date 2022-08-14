import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import NavBar from './NavBar/AdminNavBar';

/**
 * Admin homepage
 * @returns {JSX.Element}
 */
const AdminHomepage = () => {
  const [pendingAgencyNumber, setpendingAgencyNumber] = useState(0);
  const [pendingStudentNumber, setpendingStudentNumber] = useState(0);
  const [pendingVacancyNumber, setpendingVacancyNumber] = useState(0);

  /**
   * @param {string} 
   * @returns {Object} Agency information
   */
  const pendingAgencies = async()=>{
    const response = await axios.post("/agency");
    var num=0;
    const num1 = response.data.result.forEach(agency => {
      if(agency.approval=="pending"){
        num++;
        setpendingAgencyNumber(num);
    }});
    console.log(pendingAgencyNumber);
  }

  /**
   * @param {string} 
   * @returns {Object} Student information
   */
  const pendingStudents = async()=>{
    const response = await axios.post("/studapplication");
    var num=0;
    const num1 = response.data.result.forEach(student => {
      if(student.approval=="pending"){
        num++;
        setpendingStudentNumber(num);
    }});
    console.log(pendingStudentNumber);
  }

  /**
   * @param {string} 
   * @returns {Object} Vacancy information
   */
  const pendingVacancy= async()=>{
    const response = await axios.post("/agency-student-request");
    var num=0;
    const num1 = response.data.result.forEach(student => {
      if(student.approval=="pending"){
        num++;
        setpendingVacancyNumber(num);
    }});
    console.log(pendingVacancyNumber);
  }
  useEffect(() => {
    pendingAgencies();
    pendingStudents();
    pendingVacancy();
}, [])
  return (
    <div>
      <NavBar></NavBar>
      <div className="container my-5" style={{textAlign: 'center', color: 'rgb(14, 189, 248)'}}>
        <h1>Welcome to Admin Portal</h1>
      </div>
      <div className="row">
      <div className="col-sm-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Pending Agencies</h5>
              <p className="card-text">Review all of the pending notifications below.</p>
              <button type="button" className="btn btn-primary">
                Notifications <span className="badge bg-secondary">{pendingAgencyNumber}</span>
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Pending Students</h5>
              <p className="card-text">Review all of the pending notifications below.</p>
              <button type="button" className="btn btn-primary">
                Notifications <span className="badge bg-secondary">{pendingStudentNumber}</span>
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Pending Vacancy</h5>
              <p className="card-text">Review all of the pending notifications below.</p>
              <button type="button" className="btn btn-primary">
                Notifications <span className="badge bg-secondary">{pendingVacancyNumber}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
  </div>   
  )
}

export default AdminHomepage
