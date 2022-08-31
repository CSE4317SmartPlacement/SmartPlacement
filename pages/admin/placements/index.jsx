import React from 'react'
import { retrieveAllAgencyRequestApplications } from '../../../api/agency_application_api'
import { getUserAndTokenFromCookies } from '../../../utils/secret'

function Index({ formList, token, user }) {
    return (
        <div>{formList.length}</div>
    )
}

export default Index

Index.getInitialProps = async ({ req }) => {
    const { token, user } = getUserAndTokenFromCookies(req)

    const formList = await retrieveAllAgencyRequestApplications(token)
    return { formList, token, user }
}