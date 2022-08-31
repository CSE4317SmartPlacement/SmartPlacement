import React, { useState } from 'react'
import Link from 'next/link';
import { useAuth } from '../../contexts/auth_context'
import { AppBar, Avatar, Box, Button, Divider, Grid, IconButton, Menu, MenuItem, TableRow, Toolbar, Tooltip, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { activeButtonStyle, inActiveButtonStyle, logoStyle } from './navbar_style';
import { Notifications } from '@mui/icons-material';
import { secondaryColor, primaryColor, lightColor } from '../../utils/colors'
function Navbar() {
    const router = useRouter()
    const { user, logout } = useAuth()



    const applicationMenuItems = [
        { title: 'Agency Applications', key: "agency-applications", link: "/admin/agencies" },
        { title: 'Student Applications', key: "student-applications", link: "/admin/students" },
        { title: 'Placement Applications', key: "placement-applications", link: "/admin/placements" },]

    const navitems = () => {
        if (!user) {
            return [{ title: 'Home', key: "home", link: "/" }]
        }
        else {
            if (user.accessLevel == 1) {
                if (user.status == "new") {
                    return [
                        { title: 'Home', key: "home", link: "/" },
                        { title: 'Application Request', key: "student-application-request", link: "/student/application/request/" },
                    ]
                } else if (user.status == "matched") {
                    return [
                        { title: 'Home', key: "home", link: "/" },
                        { title: 'Application Status', key: "student-application-status", link: "/student/application/status" },
                        { title: 'Placement Status', key: "student-placement", link: "/student/placement" },
                    ]
                } else {
                    return [
                        { title: 'Home', key: "home", link: "/" },
                        { title: 'Application Status', key: "student-application-status", link: "/student/application/status" },
                    ]
                }
            } else if (user.accessLevel == 2) {
                if (user.status == "new") {
                    return [
                        { title: 'Home', key: "home", link: "/" },
                        { title: 'Application Request', key: "agency-application-request", link: "/agency/application/request" },
                    ]
                } else if (user.status == "approved")
                    return [
                        { title: 'Home', key: "home", link: "/" },
                        { title: 'Application Status', key: "agency-application-status", link: "/agency/application/status" },
                        { title: 'Placement Application', key: "agency-placement-request", link: "/agency/placement/request" },
                    ]
                else {
                    return [
                        { title: 'Home', key: "home", link: "/" },
                        { title: 'Application Status', key: "agency-application-status", link: "/agency/application/status" },
                    ]
                }
            } else if (user.accessLevel == 3) {
                return [
                    { title: 'Home', key: "home", link: "/" },
                ]
            }
        }
    }

    const authNavItems = [{ title: 'Sign In', key: "login", link: "/login" }, { title: 'Sign Up', key: "register", link: "/register" }]


    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [profile, setProfile] = useState(null);

    const handleProfileMenu = (event) => {
        setProfile(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setProfile(null);
    };

    const profileMenuItems = () => {
        if (user.accessLevel == 1) {
            if (user.status == "new") {
                return [
                    { title: 'Notifications', key: "notifications", link: "/notifications" },
                    { title: "Request Application", key: "student-application-request", link: "/student/application/request" },
                    { title: "Logout", key: "logout", link: "/login" },
                ]
            }
            else if (user.status == "matched") {
                return [
                    { title: 'Notifications', key: "notifications", link: "/notifications" },
                    { title: "Placement Status", key: "student-placement-status", link: "/student/placement" },
                    { title: "Application Status", key: "student-application-status", link: "/student/application/status" },
                    { title: "Logout", key: "logout", link: "/login" },
                ]
            } else {
                return [
                    { title: 'Notifications', key: "notifications", link: "/notifications" },
                    { title: "Application Status", key: "student-application-status", link: "/student/application/status" },
                    { title: "Logout", key: "logout", link: "/login" },
                ]
            }

        } else if (user.accessLevel == 2) {
            if (user.status == "new") {
                return [
                    { title: 'Notifications', key: "notifications", link: "/notifications" },
                    { title: "Application Request", key: "agency-application-request", link: "/agency/application/request" },
                    { title: "Logout", key: "logout", link: "/login" },
                ]
            } else if (user.status == "approved") {
                return [
                    { title: 'Notifications', key: "notifications", link: "/notifications" },
                    { title: "Application Status", key: "agency-application-status", link: "/agency/application/status" },
                    { title: 'Placement Application', key: "agency-placement-request", link: "/agency/placement/request" },
                    { title: "My Placements", key: "agency-placements", link: "/agency/placement" },
                    { title: "Logout", key: "logout", link: "/login" },
                ]
            } else {
                return [
                    { title: 'Notifications', key: "notifications", link: "/notifications" },
                    { title: "Application Status", key: "agency-application-status", link: "/agency/application/status" },
                    { title: "Logout", key: "logout", link: "/login" },
                ]
            }

        } else {
            return [
                { title: 'Notifications', key: "notifications", link: "/notifications" },
                { title: "Placements", key: "placements", link: "/admin/placements" },
                { title: "Logout", key: "logout", link: "/login" },
            ]
        }
    }

    return (
        <AppBar position="sticky" component="nav" color="inherit" elevation={0}>
            <Toolbar>
                <Typography
                    key={"typo-logo"}
                    variant="h6"
                    sx={{ display: { xs: user ? 'block' : "none", sm: 'block' } }} >
                    <Button
                        key={"button-logo"}
                        onClick={(e) => {
                            e.preventDefault()
                            router.push("/")
                        }}
                        sx={logoStyle}>SMART PLACEMENT
                    </Button>
                </Typography>

                <Box sx={{ flexGrow: 0.1 }} />

                <Box key="items" sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {navitems().map((item) => (
                        <Link key={item.key} href={item.link} >
                            <Button
                                key={item.key} sx={router.pathname == item.link ? activeButtonStyle : inActiveButtonStyle}>
                                {item.title}
                            </Button>
                        </Link>
                    ))}
                </Box>


                {user && user.accessLevel == 3 ? <div>
                    <Button onClick={handleMenu}
                        sx={
                            router.pathname.includes(applicationMenuItems[0].link) ||
                                router.pathname.includes(applicationMenuItems[1].link) ||
                                router.pathname.includes(applicationMenuItems[2].link)

                                ? activeButtonStyle : inActiveButtonStyle}>Applications</Button>
                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {applicationMenuItems.map((item, index) => {
                            return <MenuItem key={item.key} onClick={(e) => {
                                e.preventDefault()
                                handleClose()
                                router.push(item.link)
                            }}>{item.title}</MenuItem>
                        })}
                    </Menu>
                </div> : <></>}

                <Box sx={{ flexGrow: 1 }} />

                <Box key="auth-items">
                    {
                        !user ?
                            authNavItems.map((item) => (
                                <Link key={item.key} href={item.link}>
                                    <Button
                                        key={item.key} sx={router.pathname == item.link ? activeButtonStyle : inActiveButtonStyle}>
                                        {item.title}
                                    </Button>
                                </Link>
                            ))
                            :

                            <div>
                                <IconButton onClick={(e) => {
                                    e.preventDefault()
                                    router.push("/notifications")
                                }} sx={{ mr: "5px" }}>

                                    <Notifications sx={{ fontSize: "30px", color: primaryColor }} />
                                </IconButton>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleProfileMenu} sx={{ p: 0 }}>
                                        <Avatar alt={user.email.toUpperCase()} src={user.image ?? "no image"}
                                            sx={{ backgroundColor: secondaryColor, color: lightColor, fontSize: "25px", fontWeight: "bold" }}
                                        />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '0px' }}

                                    anchorEl={profile}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(profile)}
                                    onClose={handleProfileMenuClose}>

                                    <Grid container xs={0} justifyContent={"center"} style={{ padding: "10px 10px" }}>
                                        <Avatar alt={user.email.toUpperCase()} src={user.image ?? "no image"}
                                            sx={{ backgroundColor: secondaryColor, color: lightColor, fontSize: "25px", fontWeight: "bold" }}
                                        />
                                        <a style={{ padding: "0 10px" }}>
                                            {user.email}
                                            <br />
                                            <a style={{ color: primaryColor }}>  {user.accessLevel == 1 ? "Student" : user.accessLevel == 2 ? "Agency" : "Admin"}
                                            </a>
                                        </a>


                                    </Grid>


                                    <Divider />
                                    {profileMenuItems().map((item, index) => {
                                        return <MenuItem key={item.key} onClick={(e) => {
                                            e.preventDefault()
                                            handleProfileMenuClose()
                                            if (item.key == "logout") {
                                                logout()
                                                router.push(item.link)
                                            } else {
                                                router.push(item.link)
                                            }
                                        }}>{item.title}</MenuItem>
                                    })}
                                </Menu>
                            </div>
                    }



                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar