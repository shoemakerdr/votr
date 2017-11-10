import React from 'react'
import { NavLink } from 'react-router-dom'
import votrLogoNav from '../images/votr-logo-nav.png'

const styles = {
    navbar: {
        padding: '24px',
        marginBottom: '16px',
        backgroundColor: '#050D58',
        display: 'flex',
        justifyContent: 'space-between',
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
    },
    logo: {
        height: '80px'
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
            <div className='Nav--home-polls'>
                <img src={votrLogoNav} alt='votr' style={styles.logo} />
                <StyledNavLink exact to='/'>Home</StyledNavLink>
                <StyledNavLink to='/polls'>Polls</StyledNavLink>
            </div>
            {isLoggedIn && <div className='Nav--authenticated'>
                <StyledNavLink to='/newpoll'>Create Poll</StyledNavLink>
                <StyledNavLink to={`/users/${userId}`}>Welcome {username}!</StyledNavLink>
                <StyledNavLink to='/signout'>Sign Out</StyledNavLink>
            </div>}
            {!isLoggedIn && <div className='Nav--unauthenticated'>
                <StyledNavLink to='/login'>Login</StyledNavLink>
                <StyledNavLink to='/register' >Sign Up</StyledNavLink>
            </div>}
        </div>
    )
}

export default Nav

