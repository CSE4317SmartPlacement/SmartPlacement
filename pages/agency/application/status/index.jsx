import { Grid, Table, TableBody, Typography } from '@mui/material'
import React from 'react'
import { retrieveAgencyDetail } from '../../../../api/agency_application_api'
import CustomTableRow from '../../../../components/custom_table_row/custom_table_row'
import { primaryColor, successColor } from '../../../../utils/colors'
import { getUserAndTokenFromCookies } from '../../../../utils/secret'

function AgencyApplicationStatus({ formData, token, user }) {
    return (
        <Grid container justifyContent={"center"} style={{ marginTop: "3%" }}>

            <Grid container justifyContent={"center"} style={{ width: "60%" }}>
                <Typography >
                    <h2>Application Status</h2>
                </Typography>


                <Table border={true} size='medium' sx={{ tableLayout: "auto" }}>
                    <h3>Agency Information </h3>
                    <TableBody>
                        <CustomTableRow title={"Agency ID"} value={formData.agencyId} />
                        <CustomTableRow title={"Ageny Name"} value={formData.name} />
                        <CustomTableRow title={"Ageny Type"} value={formData.type} />
                        <CustomTableRow title={"Email"} value={formData.email} />
                        <CustomTableRow title={"Phone"} value={formData.phone} />
                        <CustomTableRow title={"Fax"} value={formData.fax ?? "N/A"} />
                        <CustomTableRow title={"Website"} value={formData.website ?? "N/A"} />
                        <CustomTableRow title={"Business Address"} value={JSON.parse(formData.businessAddress).street + " " + JSON.parse(formData.businessAddress).unit
                            + ", " + JSON.parse(formData.businessAddress).city + ", " + JSON.parse(formData.businessAddress).state + " " + JSON.parse(formData.businessAddress).zipcode + ", " + JSON.parse(formData.businessAddress).country
                        } />
                        <CustomTableRow title={"Mailing Address"} value={JSON.parse(formData.mailingAddress).street + " " + JSON.parse(formData.mailingAddress).unit
                            + ", " + JSON.parse(formData.mailingAddress).city + ", " + JSON.parse(formData.mailingAddress).state + " " + JSON.parse(formData.mailingAddress).zipcode + ", " + JSON.parse(formData.mailingAddress).country
                        } />
                        <CustomTableRow title={"Preferred Contacts"} value={JSON.parse(formData.prefferedContacts).filter((item) => item.checked).map((item, index) => {
                            return <Grid key={index} item> - {item.title} </Grid>
                        })} />
                        <CustomTableRow title={"Application Status"} value={<p style={{
                            color: formData.applicationStatus == "pending" ? primaryColor : formData.applicationStatus == "rejected" ?
                                dangerColor : successColor,
                        }}>{formData.applicationStatus.toUpperCase()}</p>} />
                    </TableBody>

                </Table>
                <Table border={true} size='medium' sx={{ tableLayout: "auto", mt: "20px" }}>
                    <h3>Agent Information </h3>
                    <TableBody>
                        <CustomTableRow title={"Agent ID"} value={formData.agencyId} />
                        <CustomTableRow title={"Full Name"} value={formData.agentTitle + ". " + formData.agentFirstName + " " + formData.agentMiddleName + " " + formData.agentLastName} />
                        <CustomTableRow title={"Email"} value={formData.agentEmail} />
                        <CustomTableRow title={"Phone"} value={formData.agentPhone} />

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

export default AgencyApplicationStatus

AgencyApplicationStatus.getInitialProps = async ({ req }) => {
    const { token, user } = getUserAndTokenFromCookies(req)

    const formData = await retrieveAgencyDetail(token)
    return { formData, user, token }
}