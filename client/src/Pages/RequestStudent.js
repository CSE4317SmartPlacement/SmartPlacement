import React from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import NavBar from "./NavBar/AgencyNavBar";
import axios from "axios";
import { useHistory } from "react-router-dom";
const RequestStudent = () => {
  const history = useHistory();
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
    axios.post("/agency-student-requestadd", formValue).then((response) => {
      history.push("/agencyhomepage");
      console.log(response);
    });
  };
  var graduation_level = ["BSW", "MSW", "Any"];
  return (
    <div>
      <NavBar></NavBar>
      <div
        class="container form-horizontal col-sm-5 w-30"
        style={{ textAlign: "Left", color: "rgb(14, 189, 248)" }}
      >
        <h3>Request Student</h3>

        <div className="mb-3"></div>

        <form>
          <div class="form-group row">
            <label for="nuvacency" class="col-sm-5 col-form-label">
              EIN Number
            </label>
            <div class="col-sm-5">
              <input
                type="number"
                class="form-control"
                id="ein"
                placeholder="EIN"
                name="ein"
                onChange={onFormChange}
              />
            </div>
          </div>
          <br></br>
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
