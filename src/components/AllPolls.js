import React, { Component } from 'react'
// import './Component.css'

const initialState = {
            polls: [
                {poll_id: 1, title: 'What is your favorite color?'},
                {poll_id: 2, title: 'What is your favorite animal?'},
                {poll_id: 3, title: 'What is your favorite food?'},
            ]
        }

class AllPolls extends Component {
    constructor () {
        super()
        this.state = { ...initialState }
    }

    render () {
        const { polls } = this.state
        return (
            <div className='AllPolls'>
                <ul>
                {polls.map(poll => <li key={poll.poll_id}>{poll.poll_id}. {poll.title}</li>)}
                </ul>
            </div>
        )
    }
}

export default AllPolls
