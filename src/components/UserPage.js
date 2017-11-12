import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import votrApi from '../votrApi'
import './styles/UserPage.css'

class UserPage extends Component {
    constructor (props) {
        super()
        this.username = props.userInfo.username
        this.fetchPolls = this.fetchPolls.bind(this)
        this.state = {
            polls: []
        }
    }
    fetchPolls () {
        votrApi.getAllPollsByUser(this.username)
            .then(polls => this.setState({polls: polls}))
    }

    componentDidMount () {
        this.fetchPolls()
    }

    handleDelete (pollId) {
        return (event) => {
            if (window.confirm('Are you sure you want to delete this poll?'))
                this.deletePoll(pollId)
        }
    }

    deletePoll (pollId) {
        votrApi.deletePoll(pollId)
            .then(this.fetchPolls)
    }

    render () {
        const { polls } = this.state
        return (
            <div className='AllPolls'>
            <h1>{this.props.userInfo.username}'s Polls</h1>
            {this.state.polls.length ?
                <div>
                    {polls.map(poll => {
                        const {title, poll_id} = poll
                        return (
                            <div key={poll_id}>
                                <Link to={`/polls/${poll_id}`}>{title}</Link>
                                <button className='delete-button' onClick={this.handleDelete(poll_id)}>Delete</button>
                            </div>
                        )
                    })}
                </div>
                : 'No polls to show'}
            </div>
        )
    }
}

export default UserPage
