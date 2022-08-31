import { Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { createStudentRequestApplication } from '../../../../api/student_application_api';
import NotificationToast from '../../../../components/notification_toast/notification_toast';
import { getUserAndTokenFromCookies } from '../../../../utils/secret';


function StudentApplicationRequest({ user, token }) {
    const router = useRouter()

    var stateList = [
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

    var agencyTypeList = [
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

    var titleList = [
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

    const [formValue, setFormValue] = useState({
        studentId: user.id,
        title: "",
        firstName: "",
        middleName: "",
        lastName: "",
        email: user.email,
        phone: "",
        mobile: "",
        degreeLevel: "",
        agencyTypeOne: "",
        agencyTypeTwo: "",
        agencyTypeThree: "",
        mailingAddress: {
            street: "",
            unit: "",
            city: "",
            state: "",
            zipcode: "",
            country: "USA",
        },
        prefferedContacts: [
            { title: "Email", checked: false },
            { title: "Fax", checked: false },
            { title: "Phone", checked: false },
            { title: "SMS", checked: false },
        ],
    })


    const onChange = (e) => {
        e.preventDefault()
        setFormValue({ ...formValue, [e.target.name]: e.target.value })
    }


    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)


    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            await createStudentRequestApplication(token, formValue)
            setSuccessMessage("Successfully submitted application!")
            setTimeout(() => {
                router.reload()
            }, 1000)
        } catch (error) {
            setErrorMessage(error.message)
        }
    }


    return (
        <Grid container justifyContent={"center"} style={{ marginTop: "20px" }}>
            <NotificationToast message={successMessage} onClose={() => { setSuccessMessage(null) }} />
            <ErrorDialog errorMessage={errorMessage} onClose={() => setErrorMessage(null)} errorTitle={"Error Occured"} />

            <form onSubmit={onSubmit}>
                <h2 style={{ textAlign: "center" }}> Student Application Request Form</h2>
                <div style={{ padding: "0px 200px" }} />

                <div>
                    <h4 style={{ textAlign: "start", marginTop: "40px" }}> Student Information</h4>

                    <Grid item style={{ marginBottom: "20px" }}>
                        <TextField
                            label="Student ID"
                            fullWidth
                            value={formValue.studentId}
                            name="studentId"
                            onChange={onChange}
                            required
                        />
                    </Grid>

                    <FormControl fullWidth style={{ marginBottom: "20px" }}>
                        <InputLabel>Title</InputLabel>
                        <Select
                            name="title"
                            label="Title"
                            value={formValue.title}
                            onChange={onChange}>
                            {titleList.map((item, index) => {
                                return <MenuItem key={index} value={item}> {item} </MenuItem>

                            })}
                        </Select>
                    </FormControl>

                    <Grid item style={{ marginBottom: "20px" }}>
                        <TextField
                            type="text"
                            label="First Name"
                            fullWidth
                            value={formValue.firstName}
                            name="firstName"
                            onChange={onChange}
                        />
                    </Grid>

                    <Grid item style={{ marginBottom: "20px" }}>
                        <TextField
                            type="text"
                            label="Middle Name"
                            fullWidth
                            value={formValue.middleName}
                            name="middleName"
                            onChange={onChange}
                        />
                    </Grid>

                    <Grid item style={{ marginBottom: "20px" }}>
                        <TextField
                            type="text"
                            label="Last Name"
                            fullWidth
                            value={formValue.lastName}
                            name="lastName"
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item style={{ marginBottom: "20px" }}>
                        <TextField
                            type="email"
                            label="Email"
                            fullWidth
                            value={formValue.email}
                            name="email"
                            onChange={onChange}
                            required
                        />
                    </Grid>

                    <Grid item style={{ marginBottom: "20px" }}>
                        <TextField
                            type="tel"
                            label="Phone"
                            fullWidth
                            value={formValue.phone}
                            name="phone"
                            onChange={onChange}
                            required
                        />
                    </Grid>

                    <Grid item style={{ marginBottom: "20px" }}>
                        <TextField
                            type="tel"
                            label="Mobile"
                            fullWidth
                            value={formValue.mobile}
                            name="mobile"
                            onChange={onChange}
                        />
                    </Grid>

                    <FormControl fullWidth style={{ marginBottom: "20px" }}>
                        <InputLabel>Degree Level</InputLabel>
                        <Select
                            name="degreeLevel"
                            label="Degree Level"
                            value={formValue.degreeLevel}
                            onChange={onChange}>
                            <MenuItem key={"bsw"} value={"bsw"}> BSW </MenuItem>
                            <MenuItem key={"msw"} value={"msw"}> MSW </MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth style={{ marginBottom: "20px" }}>
                        <InputLabel>Preferred Agency #1</InputLabel>
                        <Select
                            name="agencyTypeOne"
                            label="Preferred Agency #1"
                            value={formValue.agencyTypeOne}
                            onChange={onChange}>
                            {agencyTypeList.filter((item) => item != formValue.agencyTypeTwo).filter((item => item != formValue.agencyTypeThree))
                                .map((item, index) => {
                                    return <MenuItem key={index} value={item}> {item} </MenuItem>

                                })}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth style={{ marginBottom: "20px" }}>
                        <InputLabel>Preferred Agency #2</InputLabel>
                        <Select
                            name="agencyTypeTwo"
                            label="Preferred Agency #2"
                            value={formValue.agencyTypeTwo}
                            onChange={onChange}>
                            {agencyTypeList.filter((item) => item != formValue.agencyTypeOne).filter((item => item != formValue.agencyTypeThree))
                                .map((item, index) => {
                                    return <MenuItem key={index} value={item}> {item} </MenuItem>

                                })}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth style={{ marginBottom: "20px" }}>
                        <InputLabel>Preferred Agency #3</InputLabel>
                        <Select
                            name="agencyTypeThree"
                            label="Preferred Agency #3"
                            value={formValue.agencyTypeThree}
                            onChange={onChange}>
                            {agencyTypeList.filter((item) => item != formValue.agencyTypeTwo).filter((item => item != formValue.agencyTypeOne))
                                .map((item, index) => {
                                    return <MenuItem key={index} value={item}> {item} </MenuItem>

                                })}
                        </Select>
                    </FormControl>

                    <div>
                        <h4 style={{ textAlign: "start", marginTop: "40px" }}> Mailing Address </h4>
                        <Grid item style={{ marginBottom: "20px" }}>
                            <TextField
                                type="text"
                                label="Street"
                                fullWidth
                                value={formValue.mailingAddress.street}
                                name="mailingAddressStreet"
                                required
                                onChange={(e) => {
                                    e.preventDefault()
                                    setFormValue({
                                        ...formValue,
                                        mailingAddress: { ...formValue.mailingAddress, street: e.target.value }
                                    })
                                }}
                            />
                        </Grid>
                        <Grid item style={{ marginBottom: "20px" }}>
                            <TextField
                                type="text"
                                label="Unit"
                                fullWidth
                                value={formValue.mailingAddress.unit}
                                name="mailingAddressUnit"
                                onChange={(e) => {
                                    e.preventDefault()
                                    setFormValue({
                                        ...formValue,
                                        mailingAddress: { ...formValue.mailingAddress, unit: e.target.value }
                                    })
                                }}
                            />
                        </Grid>
                        <Grid item style={{ marginBottom: "20px" }}>
                            <TextField
                                type="text"
                                label="City"
                                fullWidth
                                value={formValue.mailingAddress.city}
                                name="mailingAddressCity"
                                onChange={(e) => {
                                    e.preventDefault()
                                    setFormValue({
                                        ...formValue,
                                        mailingAddress: { ...formValue.mailingAddress, city: e.target.value }
                                    })
                                }}
                                required
                            />
                        </Grid>
                        <FormControl fullWidth style={{ marginBottom: "20px" }}>
                            <InputLabel>State</InputLabel>
                            <Select
                                name="mailingAddressState"
                                label="State"
                                value={formValue.mailingAddress.state}
                                onChange={(e) => {
                                    e.preventDefault()
                                    setFormValue({ ...formValue, mailingAddress: { ...formValue.mailingAddress, state: e.target.value } })
                                }}>
                                {stateList.map((item, index) => {
                                    return <MenuItem key={index} value={item}> {item} </MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <Grid item style={{ marginBottom: "20px" }}>
                            <TextField
                                type="text"
                                label="Zip Code"
                                fullWidth
                                value={formValue.mailingAddress.zipcode}
                                name="mailingAddressZipCode"
                                onChange={(e) => {
                                    e.preventDefault()
                                    setFormValue({
                                        ...formValue,
                                        mailingAddress: { ...formValue.mailingAddress, zipcode: e.target.value }
                                    })
                                }}
                                required
                            />
                        </Grid>
                        <Grid item style={{ marginBottom: "20px" }}>
                            <TextField
                                type="text"
                                label="Country"
                                fullWidth
                                value={formValue.mailingAddress.country}
                                name="mailingAddressStreet"
                                onChange={(e) => {
                                    e.preventDefault()
                                    setFormValue({
                                        ...formValue,
                                        mailingAddress: { ...formValue.mailingAddress, country: e.target.value }
                                    })
                                }}
                            />
                        </Grid>
                    </div>

                    <h4 style={{ textAlign: "start", marginTop: "40px" }}> Preferred Contacts </h4>

                    {formValue.prefferedContacts.map((item, index) => {
                        return <FormControlLabel
                            key={index}
                            value={item.checked}
                            onChange={(e) => {
                                item.checked = e.target.checked
                                console.log(formValue.prefferedContacts)
                            }}
                            control={<Checkbox key={index} />}
                            label={item.title}
                            labelPlacement="end"
                        />
                    })}
                </div>


                <Grid item style={{ margin: "30px 0px" }}>
                    <Button
                        type="submit"
                        variant='contained'
                        fullWidth > Submit
                    </Button>
                </Grid>
            </form>
        </Grid>
    )
}

export default StudentApplicationRequest

StudentApplicationRequest.getInitialProps = async ({ req }) => {
    const { token, user } = getUserAndTokenFromCookies(req)

    return { user: user, token: token }
}