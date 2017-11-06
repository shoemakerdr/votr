import React from 'react'
import { Redirect } from 'react-router-dom'
// import './Signout.css'

const Signout = props => {
    props.signOutUser()
    return (
        <Redirect to='/' />
    )
}

export default Signout
