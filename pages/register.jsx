import { Button, Card, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import ErrorDialog from '../components/error_dialog/error_dialog'
import NotificationToast from '../components/notification_toast/notification_toast'
import { useAuth } from '../contexts/auth_context'
import { primaryColor } from '../utils/colors'

function Register() {
    const router = useRouter()
    const { register } = useAuth()

    const [formValue, setFormValue] = useState({ id: "", email: "", password: "", confirmPassword: "", accessLevel: 1 })

    var onChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value })
    }
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    var onSubmit = async (e) => {
        e.preventDefault()
        try {
            await register(formValue.id, formValue.email, formValue.password, formValue.accessLevel)
            setSuccessMessage("Successfully Registered!")
            setTimeout(() => {
                router.push("/login")
            }, 1000)
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    return (
        <Grid container justifyContent={"center"}>
            <NotificationToast message={successMessage} onClose={() => { setSuccessMessage(null) }} />
            <ErrorDialog errorMessage={errorMessage} onClose={() => setErrorMessage(null)} errorTitle={"Registration Failed"} />

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
                        <p style={{ fontSize: "30px", fontWeight: "bold" }}> Sign Up </p>
                    </Grid>
                    <Grid item>
                        <TextField
                            type="text"
                            label="UTA ID"
                            name='id'
                            fullWidth
                            variant="outlined"
                            value={formValue.id}
                            onChange={onChange}
                            required
                        />
                    </Grid>
                    <div style={{ height: "20px" }} />
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

                    <Grid item>
                        <TextField
                            type="password"
                            label="Confirm password"
                            fullWidth
                            name="confirmPassword"
                            variant="outlined"
                            value={formValue.confirmPassword}
                            onChange={onChange}
                            required
                            helperText={formValue.password != formValue.confirmPassword && formValue.confirmPassword != null ?
                                "Password did not matched" : null}
                        />
                    </Grid>
                    <div style={{ height: "20px" }} />

                    <FormControl fullWidth>
                     <InputLabel>User Type</InputLabel>
                        <Select
                            name="accessLevel"
                            label="Access Level"
                            value={formValue.accessLevel}
                            onChange={onChange}>
                            <MenuItem value={1}> Student </MenuItem>
                            <MenuItem value={2}> Agency </MenuItem>
                        </Select> 
                    </FormControl>
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
                            className="button-block">
                            Register
                        </Button>
                    </Grid>
                    <div style={{ height: "10px" }} />


                    <Grid container justifyContent="center">
                        <p style={{ padding: "0px 50px" }}>
                            <span style={{
                                color: "black",
                                fontSize: "16px",
                            }}>Have an account? </span>
                            <Link href={"/login"}>
                                <Button
                                    key={"login"}
                                    sx={{
                                        color: primaryColor,
                                        fontSize: "16px",
                                        textDecorationLine: "underline",
                                        textUnderlineOffset: "10px",
                                        textDecorationThickness: "3px",
                                    }}>
                                    Sign In!
                                </Button>
                            </Link>
                        </p>
                    </Grid>
                </form>

            </Card>
        </Grid>
    )
}

export default Register