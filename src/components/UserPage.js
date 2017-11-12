import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import votrApi from '../votrApi'

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
        return votrApi.getAllPollsByUser(this.username)
    }

    componentDidMount () {
        this.fetchPolls().then(polls => this.setState({polls: polls}))
    }

    handleDelete () {
        if (window.confirm('Are you sure you want to delete this poll?'))
            this.deletePoll()
    }

    showDeleteButton () {
        return (
            this.props.userInfo.username === this.state.poll.author &&
            <div>
                <button onClick={this.handleDelete}>Delete this poll</button>
            </div>
        )
    }

    deletePoll () {
        votrApi.deletePoll(this.pollId)
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
