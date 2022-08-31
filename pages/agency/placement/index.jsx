import { useRouter } from 'next/router'
import React from 'react'
import { retrieveAllPlacementRequests } from '../../../api/agency_student_request_application_api'
import { getUserAndTokenFromCookies } from '../../../utils/secret'
import { Button, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import moment from 'moment'

function AgencyPlacements({ formList, user, token }) {
    const router = useRouter()
    return (
        <Grid container justifyContent={"center"} style={{ marginTop: "3%" }}>

            <Grid container justifyContent={"center"} style={{ width: "60%" }}>
                <h3>Placements</h3>

                <Table border={true} size='medium' sx={{ tableLayout: "auto" }}>
                    <TableHead>
                        <TableRow sx={{ border: "1px solid black" }}>
                            <TableCell sx={{ border: "1px solid black", fontSize: "18px" }} align="center">Degree Level</TableCell>
                            <TableCell sx={{ border: "1px solid black", fontSize: "18px" }} align="center">Number of Vacancy</TableCell>
                            <TableCell sx={{ border: "1px solid black", fontSize: "18px" }} align="center">Created At</TableCell>
                            <TableCell sx={{ border: "1px solid black", fontSize: "18px" }} align="center">Review</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {formList.map((item, index) => (
                            <TableRow
                                key={index}
                                sx={{ border: "1px solid black" }}>
                                <TableCell sx={{ border: "1px solid black", fontSize: "16px" }} align="center">{item.degreeLevel}</TableCell>
                                <TableCell sx={{ border: "1px solid black", fontSize: "16px" }} align="center">{item.numberOfVacancy}</TableCell>
                                <TableCell sx={{ border: "1px solid black", fontSize: "16px" }} align="center">{moment(item.createdAt).format('MM/DD/YYYY hh:mm A')}</TableCell>
                                <TableCell sx={{ border: "1px solid black", fontSize: "16px" }} align="center">
                                    <Button onClick={(e) => {
                                        e.preventDefault()

                                        router.push("/placement/" + item.formId)
                                    }}>Review</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>
        </Grid >
    )
}

export default AgencyPlacements

AgencyPlacements.getInitialProps = async ({ req }) => {
    const { token, user } = getUserAndTokenFromCookies(req)

    const formList = await retrieveAllPlacementRequests(token)
    return { formList, user, token }
}