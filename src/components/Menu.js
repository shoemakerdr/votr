import React from 'react'
import StyledNavLink from './StyledNavLink'

const styles = {
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }
}

const Menu = props => {
    const { isLoggedIn } = props.userInfo
    const style = props.direction ? styles[props.direction] : styles.row
    return (
        <div style={style}>
            <StyledNavLink exact to='/'>Home</StyledNavLink>
            <StyledNavLink to='/polls'>Polls</StyledNavLink>
            {isLoggedIn && <div style={style}>
                <StyledNavLink to='/newpoll'>Create Poll</StyledNavLink>
                <StyledNavLink to={`/dashboard`}>Dashboard</StyledNavLink>
                <StyledNavLink to='/signout'>Sign Out</StyledNavLink>
            </div>}
            {!isLoggedIn && <div style={style}>
                <StyledNavLink to='/login'>Login</StyledNavLink>
                <StyledNavLink to='/register' >Sign Up</StyledNavLink>
            </div>}
        </div>
    )
}

export default Menu

