import React from 'react'
import BackToLink from './BackToLink'
import styles from './styles/NotFoundPage.css'

const NotFoundPage = props => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.fourOhFour}>404 Error</div>
            <h2 className={styles.message}>Whoops! Looks like this page doesn't exist or can't be found.</h2>
            <BackToLink message='Back to Home Page' to='/' />
        </div>
    )
}

export default NotFoundPage
