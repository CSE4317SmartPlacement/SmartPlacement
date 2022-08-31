import React from 'react'
import { getUserAndTokenFromCookies } from '../utils/secret'
import { retrieveNotifications } from "../api/notifications_api"
import { Button, Grid } from '@mui/material'
import { Box, Container } from '@mui/system'
import moment from 'moment'
import ErrorDialog from '../components/error_dialog/error_dialog'
import { useRouter } from 'next/router'

function Notifications({ notifications, user, token, error }) {
    const router = useRouter()
    return (
        <Container>
            <ErrorDialog errorTitle={"Error"} errorMessage={error} onClose={() => { }} />
            <h3>Notifications</h3>
            <div>{notifications.map((item, index) => {
                return <Box


                    key={index}
                    boxShadow={2} style={{ marginBottom: "10px", borderRadius: "20px", padding: "10px 10px", backgroundColor: "whitesmoke" }}>
                    <Grid container >
                        <Grid item xs={11} md={11}>
                            <p style={{
                                fontSize: "15px",
                            }}>{item.message} <span>{console.log(item)}</span></p>
                            <p style={{
                                fontSize: "12px",
                                color: "GrayText",
                            }}
                            >{moment(item.createdAt).format('MM/DD/YYYY hh:mm A')}</p>
                        </Grid>
                        <Grid item xs={1} md={1} >
                            <Button onClick={(e) => {
                                e.preventDefault()
                                if (item.type == "agency_application" && user.accessLevel == 2) {
                                    router.push("/agency/application/status")
                                } else if (item.type == "agency_student_request_application" && user.accessLevel == 2) {
                                    router.push("/placement/" + item.formId)
                                } else if (item.type == "student_application" && user.accessLevel == 1) {
                                    router.push("/student/application/status")
                                } else if (item.type == "agency_student_request_application" && user.accessLevel == 1) {
                                    router.push("/student/placement")
                                } else if (item.type == "student_application" && user.accessLevel == 3) {
                                    router.push("/admin/review/student/" + item.formId)
                                } else if (item.type == "agency_application" && user.accessLevel == 3) {
                                    router.push("/admin/review/agency/" + item.formId)
                                }
                            }}>Detail</Button>
                        </Grid>
                    </Grid>

                </Box>
            })}</div>
        </Container>
    )
}

export default Notifications

Notifications.getInitialProps = async ({ req }) => {
    try {
        const { token, user } = getUserAndTokenFromCookies(req)
        if (user.accessLevel == 3) {
            const response = await retrieveNotifications(token, 1111111111)
            return { notifications: response, user: user, token: token }
        } else {
            const response = await retrieveNotifications(token, user.id)
            return { notifications: response, user: user, token: token }
        }
    } catch (error) {
        return { notifications: [], user: null, token: null, error: error.message }
    }

}