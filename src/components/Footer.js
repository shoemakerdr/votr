import React from 'react'
import styles from './styles/Footer.css'

const Footer = props => {
    return (
        <div className={styles.footer}>
            <h4>by <a href='https://github.com/shoemakerdr' className={styles.link}>Derek Shoemaker</a></h4>
        </div>
    )
}

export default Footer
