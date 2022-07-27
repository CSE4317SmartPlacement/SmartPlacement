import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import { Redirect } from 'react-router-dom'

const StudentHomepage = () => {
  var isSubmitted= localStorage.getItem("isSubmitted");
  var isTrueSet = false;
  isTrueSet = (isSubmitted === 'true');
    if(!isTrueSet){
        return <Redirect to="/"/>;
    }
    const signOut = ()=>{
      window.location.href = '/';
      localStorage.setItem("isSubmitted",false);
    }
  return (
    <div>
    <h1><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
      </svg>Smart Placement
    </h1>

    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/StudentHomepage">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto">
            <Nav.Link href="/StudentHomepage">Status</Nav.Link>
            <Nav.Link href="/StudentHomepage">Requirements</Nav.Link>
            <Nav.Link href="/StudentHomepage">Records</Nav.Link>
            <Nav.Link href="/StudentHomepage">Forms</Nav.Link>
            <Nav.Link href="/StudentHomepage">Timesheets</Nav.Link>
            <Nav.Link href="/StudentHomepage">Evaluations</Nav.Link>
            <Nav.Link href="/StudentHomepage">Profile</Nav.Link>

            <NavDropdown title="Dropdown" id="basic-nav-dropdown" style={{paddingRight: '150px'}}>
              <NavDropdown.Item href="https://www.uta.edu/" target="_blank">UTA Homepage</NavDropdown.Item>
              <NavDropdown.Item href="https://www.uta.edu/mymav/" target="_blank">MyMav</NavDropdown.Item>
              <NavDropdown.Item href="/StudentHomepage">FAQ</NavDropdown.Item>
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
            <Button variant="outline-success" style={{color: 'white', border: '2px solid white'}}>Search</Button>
            </Form>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>

    

      <div className="container my-5" style={{textAlign: 'center', color: 'rgb(14, 189, 248)'}}>
        <h1>Student Placement Portal</h1>

        <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://thumbnails.texastribune.org/0lQxEGTMnxebRXUYhNAbVylabQU=/1200x630/filters:quality(95)/static.texastribune.org/media/files/99b18bdd2d62f1dcbbc487d43f17e4a4/UT%20Arlington%20Covid%20ST%20TT%2012.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Placement opportunities found near you</h3>
          <p>Please check your pending notifications for new placement suggestions.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.ctfassets.net/wob906kz2qeo/oGjzicAeYfFV09YlinEGA/7e66338af45275d27fa670808928fe27/img-2022-01-blog-newsletter-teal-1200x630.png"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Discover your ideas</h3>
          <p>Get to know yourself by getting into your first placement.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.teahub.io/photos/full/174-1742639_beautiful-nature-images-4k.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
        <h3>Explore your future now</h3>
          <p>Find your qualified placement today to shine in the future.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

      </div>
      <div className="row">
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Required Tasks</h5>
              <p className="card-text">Complete all of the tasks before the deadline.</p>
              <button type="button" className="btn btn-primary">
                To Do <span className="badge bg-secondary">5</span>
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
                Notifications <span className="badge bg-secondary">9</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Card style={{ width: '20rem', margin: 'auto', paddingLeft: '20px', paddingRight: '20px'}}>
      <Card.Img variant="top" src="https://media-exp1.licdn.com/dms/image/C4E0BAQGjwhCW28wBbw/company-logo_200_200/0/1584736693894?e=2147483647&v=beta&t=JV3h3uaP4hZ9OxGK_R1ssg5b1hTUPhWEHFo-k9Afvcw" />
      <Card.Body>
        <Card.Title>Important Notice</Card.Title>
        <Card.Text>
          Please finish all of your placement applications before DD/MM/YYYY. 
          Please contact your assigned advisor for any questions related to your placement applications.
        </Card.Text>
        <Button variant="primary">Click to Acknowledge</Button>
      </Card.Body>
      </Card>
  </div>   
  )
}

export default StudentHomepage
