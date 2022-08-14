import React from 'react'

/**
 * Table row component
 * @param {string, string} param0 
 * @returns {JSX.Element}
 */
function TableRow({ title, value }) {
    return (
        <tr itemScope="row">
            <th className="col-3" style={{ fontSize: "20px", backgroundColor: "#F6F6F6" }}>{title}</th>
            <td style={{ fontSize: "20px" }}>{value}</td>
        </tr>
    )
}

export default TableRow