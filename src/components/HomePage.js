import React from 'react'
import votrLogo from '../images/votr-logo.png'
import './styles/HomePage.css'

const styles = {
    logo: {
        height: '400px',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}

const HomePage = props => {
    return (
        <div className='HomePage'>
            <img src={votrLogo} alt='votr logo' style={styles.logo} />
            <h1 className='HomePage--tagline'>Exercise your right to Votr</h1>
        </div>
    )
}

export default HomePage
