import React from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import HamburgerIcon from './HamburgerIcon'
import styles from './styles/Nav.css'
import votrLogoNav from '../images/votr-logo-nav.png'

const Nav = props =>
    <div className={styles.navbar}>
        <Link to='/'><img src={votrLogoNav} alt='votr' className={styles.logo} /></Link>
        <div className={styles.menu}>
            <Menu userInfo={props.userInfo}/>
        </div>
        <HamburgerIcon toggleSlideMenu={props.toggleSlideMenu}/>
    </div>
export default Nav

