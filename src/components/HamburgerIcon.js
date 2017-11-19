import React from 'react'
import styles from './styles/HamburgerIcon.css'

const HamburgerIcon = props =>
    <div onClick={props.toggleSlideMenu} className={styles.burger}>
        &#9776;
    </div>
export default HamburgerIcon

