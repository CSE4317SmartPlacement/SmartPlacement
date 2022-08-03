import React from 'react'
import { Redirect } from 'react-router-dom'
import NavBar from './NavBar/AgencyNavBar';

const AgencyHomepage = () => {
  return (
    <div>
      <NavBar></NavBar>
      
      <div className="container my-5" style={{textAlign: 'center', color: 'rgb(14, 189, 248)'}}>
        <h1>Welcome to Agency Portal</h1>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Required Tasks</h5>
              <p className="card-text">Pending timecards approval for the students.</p>
              <button type="button" className="btn btn-primary">
                To Do <span className="badge bg-secondary">7</span>
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Pending Notifications</h5>
              <p className="card-text">Review all of the pending notifications below.</p>
              <button type="button" className="btn btn-primary">
                Notifications <span className="badge bg-secondary">4</span>
              </button>
            </div>
          </div>
        </div>
      </div>
  </div>   
  )
}

export default AgencyHomepage
