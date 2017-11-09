import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import votrApi from '../votrApi'

const initialState = {
            polls: []
        }

class PollList extends Component {
    constructor () {
        super()
        this.state = { ...initialState }
    }

    componentDidMount () {
        this.fetchPolls().then(polls => this.setState({polls: polls}))
    }

    fetchPolls () {
        return votrApi.getAllPolls()
    }

    render () {
        const { polls } = this.state
        return (
            <div className='AllPolls'>
            {this.state.polls.length ? 
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
                : 'No polls to show'}
            </div>
        )
    }
}

export default PollList
