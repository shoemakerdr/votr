import React from 'react'
import { Link } from 'react-router-dom'
// import './NotFoundPage.css'

const NotFoundPage = props => {
    return (
        <div className='HomePage'>
            <h1>PAGE NOT FOUND</h1>
            <Link to='/'>Back to Home Page</Link>
        </div>
    )
}

export default NotFoundPage
