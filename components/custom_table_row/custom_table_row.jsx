import { TableCell, TableRow } from '@mui/material'
import React from 'react'

function CustomTableRow({ title, value }) {
    return (
        <TableRow key={""} sx={{
            padding: "10px 18px",
            border: "1px solid black",
        }} >
            <TableCell component="th" scope="row" sx={{
                borderLeft: "1px solid black",
                borderBottom: "1px solid black",
                fontSize: "16px",
                width: "25%"
            }}>{title}
            </TableCell>
            <TableCell align="left" sx={{
                paddingLeft: "10px",
                borderLeft: "1px solid black",
                borderBottom: "1px solid black",
                fontSize: "18px",
                fontWeight: "bold",
            }}>{value}</TableCell>
        </TableRow>
    )
}

export default CustomTableRow