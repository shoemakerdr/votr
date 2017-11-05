import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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

    componentDidMount () {
        this.fetchPolls().then(polls => this.setState({polls: polls}))
    }

    fetchPolls () {
        return fetch('http://localhost:8000/api/polls')
            .then(data => data.json())
    }

    render () {
        const { polls } = this.state
        return (
            <div className='AllPolls'>
                <ul>
                    {polls.map(poll => {
                        const {title, poll_id} = poll
                        return (
                            <li key={poll_id}>
                                <Link to={`/polls/${poll_id}`}>{title}</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default AllPolls
