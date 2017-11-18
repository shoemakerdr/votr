import React from 'react'
import { NavLink } from 'react-router-dom'

const styles = {
    slider: {
        position: 'fixed',
        top: 0,
        right: 0,
        width: '200px',
        height: '100%',
        backgroundColor: '#050D58',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '16px',
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
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
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

const SliderNav = props => {
    const { isLoggedIn, username } = props.userInfo
    return (
        <div className='Nav' style={styles.slider}>
            <div className='Nav--main' style={styles.main}>
                <StyledNavLink exact to='/'>Home</StyledNavLink>
                <StyledNavLink to='/polls'>Polls</StyledNavLink>
                {isLoggedIn && <div style={styles.main} className='Nav--authenticated'>
                    <StyledNavLink to='/newpoll'>Create Poll</StyledNavLink>
                    <StyledNavLink to={`/users/${username}`}>Dashboard</StyledNavLink>
                    <StyledNavLink to='/signout'>Sign Out</StyledNavLink>
                </div>}
                {!isLoggedIn && <div style={styles.main} className='Nav--unauthenticated'>
                    <StyledNavLink to='/login'>Login</StyledNavLink>
                    <StyledNavLink to='/register' >Sign Up</StyledNavLink>
                </div>}
            </div>
        </div>
    )
}

export default SliderNav

