import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles/BackToLink.css'

const NotFoundPage = props => {
    return (
        <div className={styles.wrapper}>
            <Link className={styles.link} to={props.to}>
                <svg className={props.arrow === 'left' || !props.arrow ? styles.leftArrow : styles.hidden} width="20" height="20">
                    <path d="M0,0 L20,0 L20,20" />
                </svg>
                <div className={styles.message}>{props.message}</div>
                <svg className={props.arrow === 'right' ? styles.rightArrow : styles.hidden} width="20" height="20">
                    <path d="M0,0 L20,0 L20,20" />
                </svg>
            </Link>
        </div>
    )
}

export default NotFoundPage