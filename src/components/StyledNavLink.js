import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './styles/StyledNavLink.css'

const activeStyle = {
    color: '#fc3c40',
    fontWeight: 'bold',
}

const StyledNavLink = props =>
    <NavLink
        {...props}
        className={styles.link}
        activeStyle={activeStyle}
    >
        {props.children}
    </NavLink>

export default StyledNavLink
