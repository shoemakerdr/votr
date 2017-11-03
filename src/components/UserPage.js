import React from 'react'
// import './UserPage.css'

const UserPage = props => {
    return (
        <div className='UserPage'>
            {`Polls for user #${props.match.params.user_id}`}
        </div>
    )
}

export default UserPage
