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
import NavBar from './NavBar/StudentNavBar';

/**
 * Student homepage
 * @returns {JSX.Element}
 */
const StudentHomepage = () => {
  return (
    <div>
      <NavBar></NavBar>
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
