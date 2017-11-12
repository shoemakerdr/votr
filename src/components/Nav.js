import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import votrLogoNav from '../images/votr-logo-nav.png'

const styles = {
    navbar: {
        padding: '8px',
        marginBottom: '8px',
        backgroundColor: '#050D58',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    link: {
        marginRight: '8px',
        marginLeft: '8px',
        color: 'white',
        textDecoration: 'none',
        fontSize: '20px'
    },
    active: {
        borderBottom: '2px solid red',
        alignSelf: 'center',
    },
    logo: {
        height: '100px',
        marginLeft: '16px',
    },
    main: {
        display: 'flex',
        alignItems: 'center',
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
    const { isLoggedIn, username } = props.userInfo
    return (
        <div className='Nav' style={styles.navbar}>
            <Link to='/'><img src={votrLogoNav} alt='votr' style={styles.logo} /></Link>
            <div className='Nav--main' style={styles.main}>
                <StyledNavLink exact to='/'>Home</StyledNavLink>
                <StyledNavLink to='/polls'>Polls</StyledNavLink>
                {isLoggedIn && <div className='Nav--authenticated'>
                    <StyledNavLink to='/newpoll'>Create Poll</StyledNavLink>
                    <StyledNavLink to={`/users/${username}`}>Dashboard</StyledNavLink>
                    <StyledNavLink to='/signout'>Sign Out</StyledNavLink>
                </div>}
                {!isLoggedIn && <div className='Nav--unauthenticated'>
                    <StyledNavLink to='/login'>Login</StyledNavLink>
                    <StyledNavLink to='/register' >Sign Up</StyledNavLink>
                </div>}
            </div>
        </div>
    )
}

export default Nav

