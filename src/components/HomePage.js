import React from 'react'
import votrLogo from '../images/votr-logo.png'
import BackToLink from './BackToLink'
import styles from './styles/HomePage.css'

const HomePage = props => {
    return (
        <div className={styles.page}>
            <img src={votrLogo} alt='votr logo' className={styles.logo} />
            <h1 className={styles.tagline}>Exercise your right to Votr</h1>
            <BackToLink to='/polls' arrow='right' message='Vote in the latest polls' />
        </div>
    )
}

export default HomePage
