import React from 'react'
import { Link } from 'react-router-dom'

const NotLoggedIn = props => {
    if (!props.username) {
        return (
            <div style={{marginBottom: '16px'}}>
                <h1>You must be logged in to use this feature.</h1>
                <Link to='/login'><button className='button'>Click to login</button></Link>
            </div>
        )
    }
    return <div></div>
}

export default NotLoggedIn
