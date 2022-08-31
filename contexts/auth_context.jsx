import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { Cookies } from "react-cookie";
import { execLogin, execRegister } from "../api/auth_api";
import { apiKey } from "../utils/secret"
const { createContext, useContext, useState, useEffect } = require("react");

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
    const cookies = new Cookies()
    const [authToken, setAuthToken] = useState(null)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const login = async (email, password) => {
        setLoading(true)
        try {
            const response = await execLogin(email, password)
            cookies.set("token", response.token, { maxAge: 60 * 60 })
            cookies.set("user", response.user, { maxAge: 60 * 60 * 1 })
            checkUser()
        } catch (error) {
            throw error;
        }
        setLoading(false)


    }

    const register = async (id, email, password, accessLevel) => {
        try {
            await execRegister(id, email, password, accessLevel)
        } catch (error) {
            throw error;
        }
    }

    const logout = () => {
        cookies.remove("token")
        cookies.remove("user")
        setAuthToken(null)
        setUser(null)
        setLoading(false)
    }

    var checkUser = () => {
        const token = cookies.get("token")
        const userFromCookie = cookies.get("user")
        setAuthToken(token)
        setUser(userFromCookie)
        setLoading(false)
    }

    useEffect(() => {
        checkUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, authToken, loading, login, register, logout }}>
            {loading ? <h1>Loading....</h1> : children}
        </AuthContext.Provider >
    )

}