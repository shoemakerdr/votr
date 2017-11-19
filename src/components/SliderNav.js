import React from 'react'
import styles from './styles/SliderNav.css'
import Menu from './Menu'

const SliderNav = props =>
    // shown prop is passed down when slider menu should be slide out
    <div onClick={props.toggleSlideMenu} className={props.shown ? styles.wrapper : styles.wrapperHidden}>
        <div className={props.shown ? styles.slider : `${styles.slider} ${styles.putAway}`}>
            <Menu userInfo={props.userInfo} direction='column'/>
        </div>
    </div>

export default SliderNav

