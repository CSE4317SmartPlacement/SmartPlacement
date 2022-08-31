import React, { useState } from 'react'
import { getUserAndTokenFromCookies } from '../../../utils/secret'
import { retrieveAllAgencyRequestApplications } from '../../../api/agency_application_api'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useRouter } from 'next/router'
import { dangerColor, primaryColor, successColor } from '../../../utils/colors'

function Index({ formList, token, user }) {
    const router = useRouter()
    var statusList = ["all", "pending", "approved", "rejected"]
    var [filter, setFilter] = useState("pending")
    var [aForms, setForms] = useState(formList.filter((item) => item.applicationStatus == "pending"))

    const onStatusFilterChange = (e) => {
        setFilter(e.target.value)
        if (e.target.value == "all") {
            setForms(formList)
        } else {
            aForms = formList.filter((item) => item.applicationStatus == e.target.value)
            setForms(aForms)
        }
    }

    return (
        <Grid container justifyContent={"center"} style={{ marginTop: "3%" }}>

            <Grid container justifyContent={"center"} style={{ width: "60%" }}>
                <Grid container justifyContent={"space-between"}>
                    <h3>Agency Application Requests</h3>

                    <FormControl>
                        <InputLabel>Status</InputLabel>
                        <Select
                            name="filter"
                            label="Status"
                            value={filter}
                            onChange={onStatusFilterChange}>
                            {statusList.map((item, index) => {
                                return <MenuItem key={index} value={item}> {item.toUpperCase()} </MenuItem>

                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Table border={true} size='medium' sx={{ tableLayout: "auto" }}>
                    <TableHead>
                        <TableRow sx={{ border: "1px solid black" }}>
                            <TableCell sx={{ border: "1px solid black", fontSize: "18px" }} align="center">Agency Id</TableCell>
                            <TableCell sx={{ border: "1px solid black", fontSize: "18px" }} align="center">Agency Name</TableCell>
                            <TableCell sx={{ border: "1px solid black", fontSize: "18px" }} align="center">Agency Email</TableCell>
                            <TableCell sx={{ border: "1px solid black", fontSize: "18px" }} align="center">Agency Type</TableCell>
                            <TableCell sx={{ border: "1px solid black", fontSize: "18px" }} align="center">Application Status</TableCell>
                            <TableCell sx={{ border: "1px solid black", fontSize: "18px" }} align="center">Review</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {aForms.map((item, index) => (
                            <TableRow
                                key={index}
                                sx={{ border: "1px solid black" }}>
                                <TableCell sx={{ border: "1px solid black", fontSize: "16px" }} align="center">{item.agencyId}</TableCell>
                                <TableCell sx={{ border: "1px solid black", fontSize: "16px" }} align="center">{item.name}</TableCell>
                                <TableCell sx={{ border: "1px solid black", fontSize: "16px" }} align="center">{item.email}</TableCell>
                                <TableCell sx={{ border: "1px solid black", fontSize: "16px" }} align="center">{item.type}</TableCell>
                                <TableCell sx={{
                                    border: "1px solid black", fontSize: "16px", color: item.applicationStatus == "pending" ? primaryColor :
                                        item.applicationStatus == "rejected" ? dangerColor :
                                            successColor,
                                }} align="center">{item.applicationStatus.toUpperCase()}</TableCell>
                                <TableCell sx={{ border: "1px solid black", fontSize: "16px" }} align="center">
                                    <Button onClick={(e) => {
                                        e.preventDefault()
                                        router.push("/admin/review/agency/" + item.formId)
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

export default Index

Index.getInitialProps = async ({ req }) => {
    const { token, user } = getUserAndTokenFromCookies(req)

    const formList = await retrieveAllAgencyRequestApplications(token)
    return { formList, token, user }
}