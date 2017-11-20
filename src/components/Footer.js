import React from 'react'
import styles from './styles/Footer.css'

const Footer = props => {
    return (
        <div className={styles.footer}>
            <div>by <a href='https://github.com/shoemakerdr' target='_blank' rel='noopener noreferrer' className={styles.link}>Derek Shoemaker</a></div>
        </div>
    )
}

export default Footer
