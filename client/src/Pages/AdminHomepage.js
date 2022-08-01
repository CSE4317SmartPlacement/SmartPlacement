import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Redirect, useHistory } from 'react-router-dom'

const AdminHomepage = () => {
  const history = useHistory()
  var isSubmitted = localStorage.getItem("isSubmitted");
  var isTrueSet = false;
  isTrueSet = (isSubmitted === 'true');
  if (!isTrueSet) {
    return <Redirect to="/" />;
  }
  const signOut = () => {
    window.location.href = '/';
    localStorage.setItem("isSubmitted", false);
  }
  return (
    <div>
      <h1><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
      </svg>Smart Placement
      </h1>

      <Navbar bg="primary" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="/AdminHomepage">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/AdminHomepage">Placements</Nav.Link>
              <Nav.Link href="/AdminHomepage">Student-Info</Nav.Link>
              <Nav.Link href="/AdminHomepage">Agency-Info</Nav.Link>
              <Nav.Link href="/AdminHomepage">Agency-Docs</Nav.Link>
              <Nav.Link href="/AdminHomepage">Contracts</Nav.Link>
              <Nav.Link href="/AdminHomepage">Timesheets</Nav.Link>
              <Nav.Link href="/AdminHomepage">Profile</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown" style={{ paddingRight: '150px' }}>
                <NavDropdown.Item href="https://www.uta.edu/" target="_blank">UTA Homepage</NavDropdown.Item>
                <NavDropdown.Item href="https://www.uta.edu/mymav/" target="_blank">MyMav</NavDropdown.Item>
                <NavDropdown.Item href="/AdminHomepage">FAQ</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={signOut} >Sign Out</NavDropdown.Item>
              </NavDropdown>
              <Form className="d-flex" >
                <Form.Control
                  type="search"
                  placeholder="Enter text"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success" style={{ color: 'white', border: '2px solid white' }}>Search</Button>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container my-5" style={{ textAlign: 'center', color: 'rgb(14, 189, 248)' }}>
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

      <div className="row justify-content-md-center mt-5">
        <div className="col-sm-6 col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Agency Requests</h5>
              <p className="card-text">Check all the agency request forms that are approved, pending and rejected</p>
              <button type="button" className="btn btn-primary" onClick={(e) => {
                history.push("/agencies")
              }}>
                Check
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Student Requests</h5>
              <p className="card-text">Check all the student request forms that are approved, pending and rejected</p>
              <button type="button" className="btn btn-primary" onClick={(e) => {
                history.push("/students")
              }}>
                Check
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHomepage
