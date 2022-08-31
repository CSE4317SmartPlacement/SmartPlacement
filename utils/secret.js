import { Cookies } from "react-cookie";

export const apiKey = 'eyJhbGciOiJIUzI1NiJ9.U1BTRUNSRVRLRVk.SUTajgGWGExfnsdmh1vyoSaezLfk7a0b_xNvyX1Sxjs'

export const getUserAndTokenFromCookies = (req) => {
    var token;
    var user;
    try {
        if (req) {
            token = decodeURIComponent(req.cookies.token)
            user = JSON.parse(decodeURIComponent(req.cookies.user))
        } else {
            const cookies = new Cookies()
            token = cookies.get("token")
            user = cookies.get("user")
        }
    } catch (error) {
        throw error
    }
    return { token, user }
}