import React from 'react'
import BackToLink from './BackToLink'
import styles from './styles/NotLoggedIn.css'

const NotLoggedIn = props => {
    if (!props.username) {
        return (
            <div className={styles.wrapper}>
                <h1 className={styles.message}>You must be logged in to use this feature.</h1>
                <BackToLink message='Go to Login Page' to='/login' />
                </div>
        )
    }
    return <div></div>
}

export default NotLoggedIn
