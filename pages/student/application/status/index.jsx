import { Grid, Table, TableBody, Typography } from '@mui/material'
import React from 'react'
import { retrieveStudentApplication } from '../../../../api/student_application_api'
import CustomTableRow from '../../../../components/custom_table_row/custom_table_row'
import { primaryColor, successColor } from '../../../../utils/colors'
import { getUserAndTokenFromCookies } from '../../../../utils/secret'

function StudentApplicationStatus({ formData, user, token }) {
    return (
        <Grid container justifyContent={"center"} style={{ marginTop: "3%" }}>

            <Grid container justifyContent={"center"} style={{ width: "60%" }}>
                <Typography >
                    <h2>Application Status</h2>
                </Typography>
                <Table border={true} size='medium' sx={{ tableLayout: "auto" }}>
                    <TableBody>
                        <CustomTableRow title={"Student ID"} value={formData.studentId} />
                        <CustomTableRow title={"Student Name"} value={formData.title + ". " + formData.firstName + " " + formData.middleName + " " + formData.lastName} />
                        <CustomTableRow title={"Email"} value={formData.email} />
                        <CustomTableRow title={"Home Phone"} value={formData.phone} />
                        <CustomTableRow title={"Mobile Phone"} value={formData.mobile} />
                        <CustomTableRow title={"Degree Level"} value={formData.degreeLevel.toUpperCase()} />
                        <CustomTableRow title={"Mailing Address"} value={JSON.parse(formData.mailingAddress).street + " " + JSON.parse(formData.mailingAddress).unit
                            + ", " + JSON.parse(formData.mailingAddress).city + ", " + JSON.parse(formData.mailingAddress).state + " " + JSON.parse(formData.mailingAddress).zipcode + ", " + JSON.parse(formData.mailingAddress).country
                        } />
                        <CustomTableRow title={"Preferred Agency Types"} value={formData.agencyTypeOne + ", " + formData.agencyTypeTwo + ", " + formData.agencyTypeThree} />
                        <CustomTableRow title={"Preferred Contacts"} value={JSON.parse(formData.prefferedContacts).filter((item) => item.checked).map((item, index) => {
                            return <Grid key={index} item> - {item.title} </Grid>
                        })} />
                        <CustomTableRow title={"Application Status"} value={<p style={{
                            color: formData.applicationStatus == "pending" ? primaryColor : formData.applicationStatus == "rejected" ?
                                dangerColor : successColor,
                        }}>{formData.applicationStatus.toUpperCase()}</p>} />
                    </TableBody>
                </Table>

                <h3 style={{
                    color: formData.applicationStatus == "pending" ? primaryColor : formData.applicationStatus == "rejected" ?
                        dangerColor : successColor,
                }}>{formData.applicationStatus == "pending" ? "Your application is under review." :
                    formData.applicationStatus == "rejected" ?
                        "Your application is rejected." :

                        "You application has been approved."}
                </h3>
            </Grid>

        </Grid >
    )
}

export default StudentApplicationStatus

StudentApplicationStatus.getInitialProps = async ({ req }) => {
    const { token, user } = getUserAndTokenFromCookies(req)

    const response = await retrieveStudentApplication(token)
    return { formData: response, user: user, token: token }
}