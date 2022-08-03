import React from 'react'
import { Redirect } from 'react-router-dom'
import NavBar from './NavBar/AdminNavBar';

const AdminHomepage = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className="container my-5" style={{textAlign: 'center', color: 'rgb(14, 189, 248)'}}>
        <h1>Welcome to Admin Portal</h1>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Required Tasks</h5>
              <p className="card-text">Pending student applications to finish.</p>
              <button type="button" className="btn btn-primary">
                To Do <span className="badge bg-secondary">2</span>
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
                Notifications <span className="badge bg-secondary">6</span>
              </button>
            </div>
          </div>
        </div>
      </div>
  </div>   
  )
}

export default AdminHomepage
