import React from 'react'
import { Link } from 'react-router-dom'
// import './Nav.css'

const Nav = props => {
    return (
        <div className='Nav'>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/polls'>All Polls</Link></li>
                <li><Link to='/newpoll'>New Poll</Link></li>
                <li><Link to='/users/1'>My Polls</Link></li>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/register'>Sign Up</Link></li>
                <li><Link to='/signout'>Sign Out</Link></li>
            </ul>
        </div>
    )
}

export default Nav
