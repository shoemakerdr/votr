import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NotLoggedIn from './NotLoggedIn'
import votrApi from '../votrApi'
import { isLoggedIn } from '../authHelpers'
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
        if (isLoggedIn())
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
                { isLoggedIn() ?
                    <h1>Polls by {this.username}</h1>
                    : <NotLoggedIn username={this.username}/>
                }
                {this.state.polls.length ?
                    <div>
                        {polls.map(poll => {
                            const {title, poll_id} = poll
                            return (
                                <div key={poll_id}>
                                    <Link to={`/polls/${poll_id}`}>{title}</Link>
                                    <button
                                        className='delete-button'
                                        onClick={this.handleDelete(poll_id)}
                                    >
                                        &#10006;
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                : isLoggedIn() ? 'No polls to show'
                : ''}
            </div>
        )
    }
}

export default UserPage
