import { Button, Card, CircularProgress, Grid, TextField } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import ErrorDialog from '../components/error_dialog/error_dialog'
import NotificationToast from '../components/notification_toast/notification_toast'
import { useAuth } from '../contexts/auth_context'
import { primaryColor } from '../utils/colors'

function Login() {
    const router = useRouter()
    const { login } = useAuth()

    const [formValue, setFormValue] = useState({ email: "", password: "" })

    var onChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value })
    }
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    var onSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(formValue.email, formValue.password)
            setSuccessMessage("Successfully Logged In")
            setTimeout(() => {
                router.push("/")
            }, 1000)
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    return (
        <Grid container justifyContent={"center"}>
            <NotificationToast message={successMessage} onClose={() => { setSuccessMessage(null) }} />
            <ErrorDialog errorMessage={errorMessage} onClose={() => setErrorMessage(null)} errorTitle={"Login Failed"} />

            <Card
                variant='elevation'
                elevation={16.0}
                style={{
                    padding: "20px 50px",
                    marginTop: "5%",
                    borderRadius: "10px",
                }}>
                <form onSubmit={onSubmit}>
                    <Grid container justifyContent="center">
                        <p style={{ fontSize: "30px", fontWeight: "bold" }}> Sign In </p>
                    </Grid>
                    <Grid item>
                        <TextField
                            type="email"
                            label="Email"
                            name='email'
                            fullWidth
                            variant="outlined"
                            value={formValue.email}
                            onChange={onChange}
                            required
                            autoFocus
                        />
                    </Grid>
                    <div style={{ height: "20px" }} />
                    <Grid item>
                        <TextField
                            type="password"
                            label="Password"
                            fullWidth
                            name="password"
                            variant="outlined"
                            value={formValue.password}
                            onChange={onChange}
                            required
                        />
                    </Grid>
                    <div style={{ height: "20px" }} />

                    <Grid container justifyContent="center">

                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: primaryColor,
                                fontSize: "14px",
                            }}
                            type="submit"
                            fullWidth
                            className="button-block">Login
                        </Button>
                    </Grid>
                    <div style={{ height: "10px" }} />

                    <Grid container justifyContent="center">
                        <Link href={"/forgot-password"}>
                            <Button
                                key={"forgot-password"}
                                sx={{
                                    color: primaryColor,
                                    fontSize: "14px",
                                }}>
                                Forget password?
                            </Button>
                        </Link>
                    </Grid>
                    <Grid container justifyContent="center">
                        <p style={{ padding: "0px 50px" }}>
                            <span style={{
                                color: "black",
                                fontSize: "16px",
                            }}>Need an account? </span>
                            <Link href={"/register"}>
                                <Button
                                    key={"register"}
                                    sx={{
                                        color: primaryColor,
                                        fontSize: "16px",
                                        textDecorationLine: "underline",
                                        textUnderlineOffset: "10px",
                                        textDecorationThickness: "3px",
                                    }}>
                                    Sign Up!
                                </Button>
                            </Link>
                        </p>
                    </Grid>
                </form>

            </Card>
        </Grid>
    )
}

export default Login