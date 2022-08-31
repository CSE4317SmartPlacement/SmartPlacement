import { dimPrimaryColor, primaryColor } from "../../utils/colors"


export const logoStyle = {
    fontSize: "25px",
    fontFamily: "serif",
    fontWeight: "bold",
    color: dimPrimaryColor,
    '&:hover': {
       color: primaryColor
    },
}

export const activeButtonStyle =  {
    color: primaryColor,
    fontSize: "16px",
    textDecorationLine: "underline",
    textUnderlineOffset: "10px",
    textDecorationThickness: "3px",
}

export const inActiveButtonStyle = {
    color: dimPrimaryColor,
    fontSize: "16px",
    '&:hover': {
        color: primaryColor,
        textDecorationLine: "underline",
        textUnderlineOffset: "10px",
        textDecorationThickness: "3px",
    }
}