import React from 'react'
import { NavLink } from 'react-router-dom'

const styles = {
    navbar: {
        padding: '24px',
        marginBottom: '16px',
        backgroundColor: 'navy'
    },
    link: {
        marginRight: '12px',
        marginLeft: '12px',
        color: 'white',
        textDecoration: 'none',
        fontSize: '20px'
    },
    active: {
        borderBottom: '2px solid red'
    }
}

const StyledNavLink = props =>
    <NavLink
        {...props}
        style={styles.link}
        activeStyle={styles.active}
    >
        {props.children}
    </NavLink>

const Nav = props => {
    const { isLoggedIn, userId, username } = props.userInfo
    return (
        <div className='Nav' style={styles.navbar}>
            <div>
                <StyledNavLink exact to='/'>Home</StyledNavLink>
                <StyledNavLink to='/polls'>Polls</StyledNavLink>
            </div>
            {isLoggedIn && <div>
                <StyledNavLink to='/newpoll'>Create Poll</StyledNavLink>
                <StyledNavLink to={`/users/${userId}`}>Welcome {username}!</StyledNavLink>
                <StyledNavLink to='/signout'>Sign Out</StyledNavLink>
            </div>}
            {!isLoggedIn && <div>
                <StyledNavLink to='/login'>Login</StyledNavLink>
                <StyledNavLink to='/register' >Sign Up</StyledNavLink>
            </div>}
        </div>
    )
}

export default Nav
