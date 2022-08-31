import { Table, TableBody } from '@mui/material'
import { Container } from '@mui/system'
import moment from 'moment'
import React from 'react'
import { retrieveAgencyApplicationFormByAgencyId } from '../../../api/agency_application_api'
import { retrievePlacementByStudentId } from '../../../api/placement_api'
import CustomTableRow from '../../../components/custom_table_row/custom_table_row'
import { getUserAndTokenFromCookies } from '../../../utils/secret'

function StudentPlacement({ placement, agency, user, token }) {
    return (
        <Container>
            {console.log(agency)}
            <Table border={true} size='medium' sx={{ tableLayout: "auto", mt: "20px" }}>
                <h3> Placement Information </h3>
                <TableBody>
                    <CustomTableRow title={"Agency Name"} value={agency.name} />
                    <CustomTableRow title={"Agency Email"} value={agency.email} />
                    <CustomTableRow title={"Agency Phone"} value={agency.phone} />
                    <CustomTableRow title={"Agency Address"} value={
                        JSON.parse(agency.businessAddress).street + " " + JSON.parse(agency.businessAddress).unit
                        + ", " + JSON.parse(agency.businessAddress).city + ", " + JSON.parse(agency.businessAddress).state
                        + " " + JSON.parse(agency.businessAddress).zipcode + ", " + JSON.parse(agency.businessAddress).country
                    } />
                    <CustomTableRow title={"Agency Website"} value={<a href={agency.website}>{agency.website}</a>} />
                    <CustomTableRow title={"Placement Type"} value={agency.type} />
                    <CustomTableRow title={"Placed Date"} value={moment(placement.createdAt).format('MM/DD/YYYY hh:mm A')} />
                </TableBody>
            </Table>

        </Container>
    )
}

export default StudentPlacement

StudentPlacement.getInitialProps = async ({ req }) => {
    const { token, user } = getUserAndTokenFromCookies(req)

    const placement = await retrievePlacementByStudentId(token, user.id)

    const agency = await retrieveAgencyApplicationFormByAgencyId(token, placement.agencyId)
    return { placement, agency, user, token }
}