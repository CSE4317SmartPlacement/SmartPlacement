import React, { useState } from 'react'
import { Button, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'

import { getUserAndTokenFromCookies } from '../../../../utils/secret'
import CustomTableRow from '../../../../components/custom_table_row/custom_table_row'
import { dangerColor, primaryColor, successColor } from '../../../../utils/colors'
import { useRouter } from 'next/router'
import { retrieveStudentApplicationFormByFormId, updateStudentApplicationStatus } from '../../../../api/student_application_api'
import { createPlacement, retrieveMatchings, retrievePlacementByStudentId } from '../../../../api/placement_api'

function Agency({ id, formData, matchedData, user, token }) {
    const router = useRouter()

    var [showMatching, setShowMatching] = useState(false)
    var [matchings, setMatchings] = useState([])


    var buttonAction = async (e, status) => {
        e.preventDefault()
        await updateStudentApplicationStatus(token, formData.formId, status)
        router.reload()
    }

    return (
        <Grid container justifyContent={"center"} style={{ margin: "3% 0%" }}>

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
                            color: formData.applicationStatus == "pending" ? primaryColor :
                                formData.applicationStatus == "rejected" ? dangerColor :
                                    successColor,
                        }}>{formData.applicationStatus.toUpperCase()}</p>} />
                    </TableBody>
                </Table>
            </Grid>

            {
                formData.applicationStatus == "approved" ?
                    <Grid container xs={0} justifyContent={"center"} style={{ padding: "10px 10px" }}>
                        <Button onClick={async (e) => {
                            e.preventDefault()
                            if (showMatching == true) {
                                setShowMatching(false)
                                setMatchings([])
                            } else {
                                setShowMatching(true)
                                const fetchedMatchings = await retrieveMatchings(token, { agencyTypeOne: formData.agencyTypeOne, agencyTypeTwo: formData.agencyTypeTwo, agencyTypeThree: formData.agencyTypeThree, degreeLevel: formData.degreeLevel })
                                setMatchings(fetchedMatchings)
                                console.log(fetchedMatchings)
                            }
                        }} variant='contained'>{!showMatching ? "Show Matching" : "Hide Matchings"}</Button>
                        <div style={{ width: "20px" }} />
                        <Button onClick={async (e) => { buttonAction(e, "pending") }} variant='contained' sx={{ backgroundColor: dangerColor }}>
                            Cancel Approval
                        </Button>
                    </Grid> :
                    formData.applicationStatus == "rejected" ?
                        <Grid container xs={0} justifyContent={"center"} style={{ padding: "10px 10px" }}>

                            <Button onClick={async (e) => { buttonAction(e, "pending") }} variant='contained' sx={{ backgroundColor: dangerColor }}>
                                Cancel Rejected
                            </Button>
                        </Grid>
                        :
                        formData.applicationStatus == "matched" ?
                            <Grid container xs={0} justifyContent={"center"} style={{ padding: "10px 10px", color: successColor }}>
                                <h3>This student has already been placed with agency <a href={"/admin/review/agency/" + matchedData.agencyFormId}>{matchedData.name}</a></h3>
                            </Grid>
                            :
                            <Grid container xs={0} justifyContent={"center"} style={{ padding: "10px 10px" }}>
                                <Button onClick={async (e) => { buttonAction(e, "approved") }} variant='contained'>Approve</Button>
                                <div style={{ width: "20px" }} />
                                <Button onClick={async (e) => { buttonAction(e, "rejected") }} variant='contained' sx={{ backgroundColor: dangerColor }}>Reject</Button>
                            </Grid>

            }

            {showMatching ?
                <Grid container justifyContent={"center"} style={{ width: "60%" }}>
                    <Typography >
                        <h2>Matchings</h2>
                    </Typography>
                    <Table border={true} size='medium' sx={{ tableLayout: "auto" }}>
                        <TableHead>
                            <TableRow sx={{ border: "1px solid black" }}>
                                <TableCell sx={{ border: "1px solid black", fontSize: "18px" }} align="center">Agency Id</TableCell>
                                <TableCell sx={{ border: "1px solid black", fontSize: "18px" }} align="center">Agency Name</TableCell>
                                <TableCell sx={{ border: "1px solid black", fontSize: "18px" }} align="center">Number Of Vacancy</TableCell>
                                <TableCell sx={{ border: "1px solid black", fontSize: "18px" }} align="center">Agency Type</TableCell>
                                <TableCell sx={{ border: "1px solid black", fontSize: "18px" }} align="center">Review Agency</TableCell>
                                <TableCell sx={{ border: "1px solid black", fontSize: "18px" }} align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {matchings.map((item, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ border: "1px solid black" }}>
                                    <TableCell sx={{ border: "1px solid black", fontSize: "16px" }} align="center">{item.agencyId}</TableCell>
                                    <TableCell sx={{ border: "1px solid black", fontSize: "16px" }} align="center">{item.name}</TableCell>
                                    <TableCell sx={{ border: "1px solid black", fontSize: "16px" }} align="center">{item.numberOfVacancy}</TableCell>
                                    <TableCell sx={{ border: "1px solid black", fontSize: "16px" }} align="center">{item.type}</TableCell>

                                    <TableCell sx={{ border: "1px solid black", fontSize: "16px" }} align="center">
                                        <Button onClick={(e) => {
                                            e.preventDefault()
                                            router.push("/admin/review/agency/" + item.agencyFormId)
                                        }}>Review</Button>
                                    </TableCell>

                                    <TableCell sx={{ border: "1px solid black", fontSize: "16px" }} align="center">
                                        <Button onClick={async (e) => {
                                            e.preventDefault()
                                            const response = await createPlacement(token, { formId: item.formId, agencyId: item.agencyId, studentId: formData.studentId })
                                            router.reload()
                                        }}>Match</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid> :
                <></>}
        </Grid >)
}

export default Agency


Agency.getInitialProps = async ({ req, query }) => {
    const id = query.id
    const { token, user } = getUserAndTokenFromCookies(req)

    const formData = await retrieveStudentApplicationFormByFormId(token, id)
    const matchedData = await retrievePlacementByStudentId(token, formData.studentId)

    return { id, formData, matchedData, user, token }
}