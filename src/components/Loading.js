import React from 'react'
import styles from './styles/Loading.css'

const Loading = props =>
    <div className={styles.wrapper}>
        <div className={styles.text}>loading</div>
        <div className={styles.loader}></div>
    </div>

export default Loading

