import React from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import axios from "axios";

const AgencyAccountRequest = () => {
  var a = {}
  var states = [
    "Alabama",
    "Alaska",
    "American Samoa",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "District of Columbia",
    "Federated States of Micronesia",
    "Florida",
    "Georgia",
    "Guam",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Marshall Islands",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Northern Mariana Islands",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Palau",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virgin Island",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  var agencyTypes = [
    "Addictions",
    "Adoptions",
    "Aged Care",
    "Alcohol & amp; Drug",
    "Athletics",
    "Carers",
    "Child Intervention",
    "Children",
    "Chiropractic Office",
    "Coaching",
    "Community",
    "Correctional",
    "Counselling",
    "Court",
    "Crisis Support",
    "Disability",
    "Domestic Violence",
    "Education",
    "Employment",
    "Ethnic",
    "Family",
    "Fitness Center",
    "Grief",
    "Health",
    "Homeless",
    "Housing",
    "Indigenous",
    "International",
    "Law",
    "Mediation",
    "Mental Health",
    "Occupational Therapy",
    "Offenders",
    "Other",
    "P - 12",
    "Palliative Care",
    "Personal Training",
    "Physical Therapy",
    "Policy",
    "Primary School",
    "Private",
    "Prosthetics and Orthotics",
    "Public",
    "Recreation Center - Collegiate",
    "Refugee",
    "Rehabilitation",
    "Research Lab",
    "Secondary School",
    "Sexual Assault",
    "Shadowing PA",
    "Shadowing Physician",
    "Social Action",
    "Special Population",
    "Strength and Conditioning",
    "TAFE",
    "Veterans",
    "Violence",
    "Welfare",
    "Wellness",
    "Women",
    "Womens Advocacy",
    "Youth",
  ];

  var titles = [
    "Associate Professor",
    "Dr",
    "Father",
    "Miss",
    "Mr",
    "Mrs",
    "Ms",
    "Professor",
    "Reverend",
  ];

  const hover = (e) => {
    e.target.style.background = "#205eb9";
  };
  const hoverStop = (e) => {
    e.target.style.background = "#0d6efd";
  };

  const [formValue, setFormValue] = useState({
    preferred_contacts: [
      { title: "Email", checked: false },
      { title: "Fax", checked: false },
      { title: "Phone", checked: false },
      { title: "SMS", checked: false },
    ],
    graduation_level: [
      { title: "Grad", checked: false },
      { title: "UnderGrad", checked: false },
    ],
  });

  const onFormChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const [businessAddress, setBusinessAddress] = useState({});
  const [mailingAddress, setMailingAddress] = useState({});

  // const onSubmit = async () => {
  //   var res = await axios.post("/agency", {
  //     formValue: formValue,
  //     businessAddress: businessAddress,
  //     mailingAddress: mailingAddress,
  //   });
  //   alert(formValue.title);
  // };

  const onSubmit = () => {
    axios
      .post("/agency", {
        formValue: formValue,
        businessAddress: businessAddress,
        mailingAddress: mailingAddress,
      })
      .then((response) => {
        if (response.body.message) {
          window.location.href("/");
        } else {
          alert("failed");
        }
      });
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

      <div className="mb-3"></div>
      <div
        class="container form-horizontal col-sm-5 w-30"
        style={{ textAlign: "Left", color: "rgb(14, 189, 248)" }}
      >
        <h3>Registration for Organization</h3>
        <div className="mb-3"></div>
        <div>
          <h5>About You</h5>
          <p>...............................................................</p>
        </div>
        <div class="form-group row">
          <label class="col-sm-5 col-form-label">Title </label>
          <div class="col-sm-7">
            <Dropdown className="d-inline mx-6 w-75 col-sm-5">
              <Dropdown.Toggle id="dropdown-autoclose-true">
                {formValue.agent_title == null
                  ? "Title"
                  : formValue.agent_title}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {titles.map((item) => {
                  return (
                    <Dropdown.Item
                      onClick={() => {
                        setFormValue({
                          ...formValue,
                          agent_title: item,
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

        <form>
          <div class="form-group row">
            <label for="fname" class="col-sm-5 col-form-label">
              First Name
            </label>
            <div class="col-sm-5">
              <input
                type="text"
                class="form-control"
                id="fname"
                placeholder="First Name"
                name="agent_fname"
                onChange={onFormChange}
              />
            </div>
          </div>
          <div className="mb-3"></div>
          <div class="form-group row">
            <label for="lname" class="col-sm-5 col-form-label">
              Last Name
            </label>
            <div class="col-sm-5">
              <input
                type="text"
                class="form-control"
                id="lname"
                placeholder="Last Name"
                name="agent_lname"
                onChange={onFormChange}
              />
            </div>
          </div>
          <div className="mb-3"></div>
          <div class="form-group row">
            <label for="fname" class="col-sm-5 col-form-label">
              Business Phone
            </label>
            <div class="col-sm-5">
              <input
                type="text"
                class="form-control"
                id="bphone"
                placeholder="Business Phone"
                name="phone"
                onChange={onFormChange}
              />
            </div>
          </div>
          <div className="mb-3"></div>
          <div class="form-group row">
            <label for="smobphone" class="col-sm-5 col-form-label">
              Mobile Number
            </label>
            <div class="col-sm-5">
              <input
                type="text"
                class="form-control"
                id="smobphone"
                placeholder="Mobile Number "
                name="agent_phone"
                onChange={onFormChange}
              />
            </div>
          </div>
          <div className="mb-3"></div>
          <div class="form-group row">
            <label for="sBfax" class="col-sm-5 col-form-label">
              Business Fax
            </label>
            <div class="col-sm-5">
              <input
                type="text"
                class="form-control"
                id="sBfax"
                placeholder="Business Fax"
                name="fax"
                onChange={onFormChange}
              />
            </div>
          </div>
          <div className="mb-3"></div>
          <div class="form-group row">
            <label for="sBemail" class="col-sm-5 col-form-label">
              Business Email
            </label>
            <div class="col-sm-5">
              <input
                type="email"
                class="form-control"
                id="sBemail"
                placeholder="Business Email"
                name="email"
                onChange={onFormChange}
              />
            </div>
          </div>
          <div className="mb-3"></div>
          <div className="mb-3"></div>
          <div color="#000000">
            <h5>Set Up your Organization</h5>
          </div>
          <div className="mb-3"></div>
          <div class="form-group row">
            <label for="sorgani" class="col-sm-5 col-form-label">
              Organization Name
            </label>
            <div class="col-sm-5">
              <input
                type="text"
                class="form-control"
                id="sorgani"
                placeholder="Organization Name"
                name="agency_name"
                onChange={onFormChange}
              />
            </div>
          </div>
          <div className="mb-3"></div>
          <div class="form-group row">
            <label for="Atype" class="col-sm-5 col-form-label">
              Agency type
            </label>
            <div class="col-sm-5">
              {/* agency_type */}
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {formValue.agency_type == null
                    ? "Agency Type"
                    : formValue.agency_type}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {agencyTypes.map((item) => {
                    return (
                      <Dropdown.Item
                        onClick={() => {
                          setFormValue({
                            ...formValue,
                            agency_type: item,
                          });
                        }}
                      >
                        {item}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
              {/* <input
                type="text"
                class="form-control"
                id="Atype"
                placeholder="Agency type"
                name="Atype"
              /> */}
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
            <label for="website" class="col-sm-5 col-form-label">
              Website
            </label>
            <div class="col-sm-5">
              <input
                type="text"
                class="form-control"
                id="website"
                placeholder="website"
                name="website"
                onChange={onFormChange}
              />
            </div>
          </div>
          <div className="mb-3"></div>
          <div class="form-group row">
            <label for="site" class="col-sm-5 col-form-label">
              Select disciplines related to your organization
            </label>
            <div class="col-sm-5">
              <div class="form-group row col-sm-15 ">
                {formValue.graduation_level.map((item) => {
                  return (
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          type="checkbox"
                          onClick={() => {
                            item.checked = !item.checked ? true : false;

                            var contacts = formValue.graduation_level;

                            setFormValue({
                              ...formValue,
                              graduation_level: contacts,
                            });
                            console.log(formValue.graduation_level);
                          }}
                          className="form-check-input"
                        />
                        {item.title}
                      </label>
                    </div>
                  );
                })}
              </div>
              {/* <input
                type="text"
                class="form-control"
                id="site"
                placeholder="Select disciplines related to your organization drop"
                name="graduation_level"
                onChange={onFormChange}
              /> */}
            </div>
          </div>
          <div className="mb-3"></div>
          <div class="form-group row">
            <label for="Tplac" class="col-sm-5 col-form-label">
              Types of Placement offered
            </label>
            <div class="col-sm-5">
              <input
                type="text"
                class="form-control"
                id="Tplac"
                placeholder="Different placement types"
                name="placement_type"
                onChange={onFormChange}
              />
            </div>
          </div>
          <div className="mb-3"></div>

          <div>
            <h5>Business Address</h5>
          </div>
          <div className="mb-3"></div>

          <div class="form-group row">
            <label for="Bunit" class="col-sm-5 col-form-label">
              Unit number
            </label>
            <div class="col-sm-5">
              <input
                type="text"
                onChange={(e) => {
                  setBusinessAddress({
                    ...businessAddress,
                    [e.target.name]: e.target.value,
                  });
                }}
                class="form-control"
                id="Bunit"
                placeholder="Unit Number"
                name="unit"
              />
            </div>
          </div>
          <div className="mb-3"></div>
          <div class="form-group row">
            <label for="bstreet" class="col-sm-5 col-form-label">
              Street number and name
            </label>
            <div class="col-sm-5">
              <input
                type="text"
                onChange={(e) => {
                  setBusinessAddress({
                    ...businessAddress,
                    [e.target.name]: e.target.value,
                  });
                }}
                class="form-control"
                id="bstreet"
                placeholder="Street number and name"
                name="street"
              />
            </div>
          </div>
          <div className="mb-3"></div>
          <div class="form-group row">
            <label for="Bcity" class="col-sm-5 col-form-label">
              city
            </label>
            <div class="col-sm-5">
              <input
                type="text"
                onChange={(e) => {
                  setBusinessAddress({
                    ...businessAddress,
                    [e.target.name]: e.target.value,
                  });
                }}
                class="form-control"
                id="Bcity"
                placeholder="City"
                name="city"
              />
            </div>
          </div>
          <div className="mb-3"></div>
          <div class="form-group row">
            <label for="bstate" class="col-sm-5 col-form-label">
              State
            </label>
            <div class="col-sm-5">
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {businessAddress.state == null
                    ? "State"
                    : businessAddress.state}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {states.map((item) => {
                    return (
                      <Dropdown.Item
                        onClick={() => {
                          setBusinessAddress({
                            ...businessAddress,
                            state: item,
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
            <label for="bzip" class="col-sm-5 col-form-label">
              Zip code
            </label>
            <div class="col-sm-5">
              <input
                type="text"
                onChange={(e) => {
                  setBusinessAddress({
                    ...businessAddress,
                    [e.target.name]: e.target.value,
                  });
                }}
                class="form-control"
                id="bzip"
                placeholder="Zipcode"
                name="zip"
              />
            </div>
          </div>
          <div className="mb-3"></div>
          {/* <div class="form-group row">
            <label for="bcountry" class="col-sm-5 col-form-label">
              Country
            </label>
            <div class="col-sm-5">
              <input
                type="text"
                onChange={(e) => {
                  setBusinessAddress({
                    ...businessAddress,
                    [e.target.name]: e.target.value,
                  });
                  console.log(businessAddress);
                }}
                class="form-control"
                id="bcountry"
                placeholder="Country"
                name="country"
              />
            </div>
          </div> */}
          <div className="mb-3"></div>

          <div className="row">
            <h5>Mailing Address</h5>

            <div className="form-check">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked == false) {
                      setMailingAddress({});
                    } else {
                      setMailingAddress(businessAddress);
                    }
                  }}
                  className="form-check-input"
                />
                Same As Business Address
              </label>
            </div>
          </div>

          <div class="form-group row">
            <label for="munit" class="col-sm-5 col-form-label">
              Unit number
            </label>
            <div class="col-sm-5">
              <input
                onChange={(e) => {
                  setMailingAddress({
                    ...mailingAddress,
                    [e.target.name]: e.target.value,
                  });
                }}
                value={mailingAddress.unit == null ? "" : mailingAddress.unit}
                type="text"
                class="form-control"
                id="munit"
                placeholder="Unit Number"
                name="unit"
              />
            </div>
          </div>
          <div className="mb-3"></div>
          <div class="form-group row">
            <label for="mstreet" class="col-sm-5 col-form-label">
              Street number and name
            </label>
            <div class="col-sm-5">
              <input
                type="text"
                value={
                  mailingAddress.street == null ? "" : mailingAddress.street
                }
                onChange={(e) => {
                  setMailingAddress({
                    ...mailingAddress,
                    [e.target.name]: e.target.value,
                  });
                }}
                class="form-control"
                id="mstreet"
                placeholder="Street number and name"
                name="street"
              />
            </div>
          </div>
          <div className="mb-3"></div>
          <div class="form-group row">
            <label for="mcity" class="col-sm-5 col-form-label">
              city
            </label>
            <div class="col-sm-5">
              <input
                type="text"
                value={mailingAddress.city == null ? "" : mailingAddress.city}
                onChange={(e) => {
                  setMailingAddress({
                    ...mailingAddress,
                    [e.target.name]: e.target.value,
                  });
                }}
                class="form-control"
                id="mcity"
                placeholder="City"
                name="city"
              />
            </div>
          </div>
          <div className="mb-3"></div>
          <div class="form-group row">
            <label for="mstate" class="col-sm-5 col-form-label">
              State
            </label>
            <div class="col-sm-5">
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {mailingAddress.state == null
                    ? "State"
                    : mailingAddress.state}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {states.map((item) => {
                    return (
                      <Dropdown.Item
                        onClick={() => {
                          setMailingAddress({
                            ...mailingAddress,
                            state: item,
                          });
                        }}
                      >
                        {item}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
              {/* <input
                type="text"
                value={mailingAddress.state == null ? "" : mailingAddress.state}
                onChange={(e) => {
                  setMailingAddress({
                    ...mailingAddress,
                    [e.target.name]: e.target.value,
                  });
                }}
                class="form-control"
                id="mstate"
                placeholder="State"
                name="state"
              /> */}
            </div>
          </div>
          <div className="mb-3"></div>
          <div class="form-group row">
            <label for="mzip" class="col-sm-5 col-form-label">
              Zip code
            </label>
            <div class="col-sm-5">
              <input
                type="text"
                value={mailingAddress.zip == null ? "" : mailingAddress.zip}
                onChange={(e) => {
                  setMailingAddress({
                    ...mailingAddress,
                    [e.target.name]: e.target.value,
                  });
                }}
                class="form-control"
                id="mzip"
                placeholder="Zipcode"
                name="zip"
              />
            </div>
          </div>
          <div className="mb-3"></div>
          {/* <div class="form-group row">
            <label for="mcountry" class="col-sm-5 col-form-label">
              Country
            </label>
            <div class="col-sm-5">
              <input
                type="text"
                value={
                  mailingAddress.country == null ? "" : mailingAddress.country
                }
                onChange={(e) => {
                  setMailingAddress({
                    ...mailingAddress,
                    [e.target.name]: e.target.value,
                  });
                  console.log(mailingAddress);
                }}
                class="form-control"
                id="mcountry"
                placeholder="Country"
                name="country"
              />
            </div>
          </div> */}
          <div class="form-group row">
            <label for="fname" class="col-sm-5 col-form-label">
              Prefered Contact
            </label>
            <div class="col-sm-5">
              <div class="form-group row col-sm-15 ">
                {formValue.preferred_contacts.map((item) => {
                  return (
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          type="checkbox"
                          onClick={() => {
                            item.checked = !item.checked ? true : false;

                            var contacts = formValue.preferred_contacts;

                            setFormValue({
                              ...formValue,
                              preferred_contacts: contacts,
                            });
                            console.log(formValue.preferred_contacts);
                          }}
                          className="form-check-input"
                        />
                        {item.title}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </form>

        <div className="d-grid">
          <button
            onClick={onSubmit}
            onMouseOver={hover}
            onMouseLeave={hoverStop}
            type="submit"
            className="btn btn-primary"
            style={{ background: "#0d6efd", border: "#0d6efd" }}
          >
            Apply
          </button>
        </div>
      </div>
      <div className="mb-5"></div>
    </div>
  );
};

export default AgencyAccountRequest;
