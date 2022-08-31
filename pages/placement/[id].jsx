import { Button, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { Container } from '@mui/system'
import moment from 'moment'
import { useRouter } from 'next/router'
import React from 'react'
import { retrievePlacementRequestByFormId } from '../../api/agency_student_request_application_api'
import { retrieveStudentsFromPlacementByFormId } from '../../api/placement_api'
import CustomTableRow from '../../components/custom_table_row/custom_table_row'
import { getUserAndTokenFromCookies } from '../../utils/secret'

function PlacementDetail({ placement, students, user, token, formId }) {
    const router = useRouter()
    return (
        <Container>
            <div>{console.log(placement)}</div>
            <div>{console.log(students)}</div>
            <Table border={true} size='medium' sx={{ tableLayout: "auto", mt: "20px" }}>
                <h3>Placement Information </h3>
                <TableBody>
                    <CustomTableRow title={"Created At"} value={placement.createdAt} />
                    <CustomTableRow title={"Degree Level"} value={placement.degreeLevel.toUpperCase()} />
                    <CustomTableRow title={"Basic Requirements"} value={placement.requirements} />
                    <CustomTableRow title={"Immunization Requirements"} value={JSON.parse(placement.immunizationRequirements)
                        .filter((item) => item.checked).map((item, index) => {
                            return <p> - {item.title}
                            </p>
                        })} />
                    <CustomTableRow title={"Other Reports"} value={JSON.parse(placement.otherReports)
                        .filter((item) => item.checked).map((item, index) => {
                            return <p> - {item.title}
                            </p>
                        })} />
                </TableBody>
            </Table>
            <h3>Students</h3>

            <Table border={true} size='medium' sx={{ tableLayout: "auto" }}>
                <TableHead>
                    <TableRow sx={{ border: "1px solid black" }}>
                        <TableCell sx={{ border: "1px solid black", fontSize: "18px" }} align="center">Name</TableCell>
                        <TableCell sx={{ border: "1px solid black", fontSize: "18px" }} align="center">Student ID</TableCell>
                        <TableCell sx={{ border: "1px solid black", fontSize: "18px" }} align="center">Email</TableCell>
                        <TableCell sx={{ border: "1px solid black", fontSize: "18px" }} align="center">Matched Date</TableCell>
                        <TableCell sx={{ border: "1px solid black", fontSize: "18px" }} align="center">More</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map((item, index) => (
                        <TableRow
                            key={index}
                            sx={{ border: "1px solid black" }}>
                            <TableCell sx={{ border: "1px solid black", fontSize: "16px" }} align="center">{item.firstName + " " + item.lastName}</TableCell>
                            <TableCell sx={{ border: "1px solid black", fontSize: "16px" }} align="center">{item.studentId}</TableCell>
                            <TableCell sx={{ border: "1px solid black", fontSize: "16px" }} align="center">{item.email}</TableCell>
                            <TableCell sx={{ border: "1px solid black", fontSize: "16px" }} align="center">{moment(item.createdAt).format('MM/DD/YYYY hh:mm A')}</TableCell>
                            <TableCell sx={{ border: "1px solid black", fontSize: "16px" }} align="center">
                                <Button onClick={(e) => {
                                    e.preventDefault()
                                    router.push("/student/detail/" + item.studentId)
                                }}>More</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </Container>
    )
}

export default PlacementDetail

PlacementDetail.getInitialProps = async ({ req, query }) => {
    const { token, user } = getUserAndTokenFromCookies(req)
    const formId = query.id
    const placement = await retrievePlacementRequestByFormId(token, formId)
    const students = await retrieveStudentsFromPlacementByFormId(token, formId)
    return { placement, students, user, token, formId }
}