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
            <StyledNavLink exact to='/'>Home</StyledNavLink>
            <StyledNavLink to='/polls'>Polls</StyledNavLink>
            {isLoggedIn && <StyledNavLink to='/newpoll'>New Poll</StyledNavLink>}
            {isLoggedIn && <StyledNavLink to={`/users/${userId}`}>{username}'s Polls</StyledNavLink>}
            {isLoggedIn && <StyledNavLink to='/signout'>Sign Out</StyledNavLink>}
            {isLoggedIn || <StyledNavLink to='/login'>Login</StyledNavLink>}
            {isLoggedIn || <StyledNavLink to='/register' >Sign Up</StyledNavLink>}
        </div>
    )
}

export default Nav
