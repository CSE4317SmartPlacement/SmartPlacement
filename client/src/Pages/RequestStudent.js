import React from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import axios from "axios";

const RequestStudent = () => {
  const hover = (e) => {
    e.target.style.background = "#205eb9";
  };
  const hoverStop = (e) => {
    e.target.style.background = "#0d6efd";
  };
  const onFormChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };
  const [formValue, setFormValue] = useState({
    immunization_record: [
      { title: "Varicella (Chickenpox)", checked: false },
      {
        title: "Tetanus, diphtheria, acellular pertussis (Tdap)",
        checked: false,
      },
      { title: "Influenza", checked: false },
      { title: "TB Skin Test (TST)", checked: false },
    ],
    other_reports: [
      { title: "Clear Background Test", checked: false },
      { title: "Sex offender Registery", checked: false },
      { title: "Negative Drug Test", checked: false },
    ],
  });
  const requeststd = () => {
    axios.post("/agency-student-request", formValue).then((response) => {
      console.log(response);
    });
  };
  var graduation_level = ["BSW", "MSW", "Any"];
  var isSubmitted = localStorage.getItem("isSubmitted");
  var isTrueSet = false;
  isTrueSet = isSubmitted === "true";
  if (!isTrueSet) {
    return <Redirect to="/" />;
  }
  const placementApplication = () => {
    window.location.href = "/StudentApplication";
  };
  const accountActivation = () => {
    window.location.href = "/AgencyAccountRequest";
  };
  const signOut = () => {
    window.location.href = "/";
    localStorage.setItem("isSubmitted", false);
  };

  return (
    <div>
      <h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          class="bi bi-people"
          viewBox="0 0 16 16"
        >
          <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
        </svg>
        Smart Placement
      </h1>

      <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/Homepage">
            Home
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/Homepage">
                  Status
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/Homepage">
                  Requirements
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/Homepage">
                  Records
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/Homepage">
                  Attachments
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/Homepage">
                  Profile
                </a>
              </li>
              <Dropdown className="d-inline mx-2">
                <Dropdown.Toggle id="dropdown-autoclose-true">
                  Default Dropdown
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={placementApplication}>
                    Apply for Placement
                  </Dropdown.Item>
                  <Dropdown.Item onClick={accountActivation}>
                    Apply for getting account
                  </Dropdown.Item>
                  <Dropdown.Item href="#">Request For students</Dropdown.Item>
                  <Dropdown.Item href="#">
                    See the application process
                  </Dropdown.Item>
                  <Dropdown.Item onClick={signOut}>Sign Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              ></input>
              <button
                className="btn btn-outline-success"
                type="submit"
                style={{ color: "white", border: "2px solid white" }}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div
        class="container form-horizontal col-sm-5 w-30"
        style={{ textAlign: "Left", color: "rgb(14, 189, 248)" }}
      >
        <h3>Request Student</h3>

        <div className="mb-3"></div>

        <form>
          <div className="mb-3"></div>
          <div class="form-group row">
            <label for="nuvacency" class="col-sm-5 col-form-label">
              Number of Vacency
            </label>
            <div class="col-sm-5">
              <input
                type="number"
                class="form-control"
                id="nuvacancy"
                placeholder="Number of Vacancy"
                name="number_of_vacancy"
                onChange={onFormChange}
              />
            </div>
          </div>

          <div className="mb-3"></div>

          <div class="form-group row">
            <label for="sein" class="col-sm-5 col-form-label">
              EIN
            </label>
            <div class="col-sm-5">
              <input
                type="text"
                class="form-control"
                id="sein"
                placeholder="EIN:"
                name="ein"
                onChange={onFormChange}
              />
            </div>
          </div>
          <div className="mb-3"></div>
          <div class="form-group row">
            <label for="firstpriority" class="col-sm-5 col-form-label">
              Prefered
            </label>

            <div class="col-sm-5">
              <Dropdown className="d-inline mx-6 w-75 col-sm-5">
                <Dropdown.Toggle id="dropdown-autoclose-true">
                  {formValue.graduation_level == null
                    ? "Looking for?"
                    : formValue.graduation_level}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {graduation_level.map((item) => {
                    return (
                      <Dropdown.Item
                        onClick={() => {
                          setFormValue({
                            ...formValue,
                            graduation_level: item,
                          });
                        }}
                      >
                        {item}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <div className="mb-3"></div>
          <div class="form-group row">
            <label for="iinfo" class="col-sm-5 col-form-label">
              Requirement or Expections
            </label>
            <div class="col-sm-5">
              <div class="form-outline">
                <textarea
                  class="form-control"
                  id="iinfo"
                  rows="4"
                  placeholder="Other Requirement "
                  name="requirement"
                  onChange={onFormChange}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="mb-3"></div>

          <div class="form-group row">
            <label for="fname" class="col-sm-5 col-form-label">
              Immunization test
            </label>
            <div class="col-sm-5">
              <div class="form-group row col-sm-15 ">
                {formValue.immunization_record.map((item) => {
                  return (
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          type="checkbox"
                          onClick={() => {
                            item.checked = !item.checked ? true : false;

                            var contacts = formValue.immunization_record;

                            setFormValue({
                              ...formValue,
                              immunization_record: contacts,
                            });
                            console.log(formValue.immunization_record);
                          }}
                          className="form-check-input"
                        />
                        {item.title}
                      </label>
                    </div>
                  );
                })}
                {/* <label>
                  <input type="checkbox" name="prefered contact type" />
                  Measles, Mumps, Rubella (MMR)
                </label>
                <label>
                  <input type="checkbox" name="prefered contact type" />
                  Varicella (Chickenpox)
                </label>
                <label>
                  <input type="checkbox" name="prefered contact type" />
                  Tetanus, diphtheria, acellular pertussis (Tdap)
                </label>
                <label>
                  <input type="checkbox" name="prefered contact type" />
                  Influenza
                </label>
                <label>
                  <input type="checkbox" name="prefered contact type" /> TB Skin
                  Test (TST)
                </label> */}
              </div>
            </div>
          </div>

          <div className="mb-3"></div>
          <div class="form-group row">
            <label for="fname" class="col-sm-5 col-form-label">
              Must Be able to Do
            </label>
            <div class="col-sm-5">
              <div class="form-group row col-sm-10 ">
                {formValue.other_reports.map((item) => {
                  return (
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          type="checkbox"
                          onClick={() => {
                            item.checked = !item.checked ? true : false;

                            var contacts = formValue.other_reports;

                            setFormValue({
                              ...formValue,
                              other_reports: contacts,
                            });
                            console.log(formValue.other_reports);
                          }}
                          className="form-check-input"
                        />
                        {item.title}
                      </label>
                    </div>
                  );
                })}
                {/* <label>
                  <input type="checkbox" name="prefered contact type" /> Clear
                  Background Test
                </label>

                <label>
                  <input type="checkbox" name="prefered contact type" /> Sex
                  offender Registery
                </label>

                <label>
                  <input type="checkbox" name="prefered contact type" />
                  Negative Drug Test
                </label>

                <label>
                  <input type="checkbox" name="prefered contact type" /> TB Test
                </label> */}
              </div>
            </div>
          </div>
        </form>

        <center>
          <div className="mb-3"></div>
          <div class="d-grid col-sm-5">
            <button
              onClick={requeststd}
              onMouseOver={hover}
              onMouseLeave={hoverStop}
              type="submit"
              className="btn btn-primary"
              style={{ background: "#0d6efd", border: "#0d6efd" }}
            >
              Request Student
            </button>
          </div>
        </center>
      </div>
    </div>
  );
};

export default RequestStudent;
