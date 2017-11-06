import React from 'react'
import { Link } from 'react-router-dom'
// import './Nav.css'

const Nav = props => {
    const { isLoggedIn, userId, username } = props.userInfo
    return (
        <div className='Nav'>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/polls'>All Polls</Link></li>
                {isLoggedIn && <li><Link to='/newpoll'>New Poll</Link></li>}
                {isLoggedIn && <li><Link to={`/users/${userId}`}>{username}'s Polls</Link></li>}
                {isLoggedIn && <li><Link to='/signout'>Sign Out</Link></li>}
                {isLoggedIn || <li><Link to='/login'>Login</Link></li>}
                {isLoggedIn || <li><Link to='/register'>Sign Up</Link></li>}
            </ul>
        </div>
    )
}

export default Nav
