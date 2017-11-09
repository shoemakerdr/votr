import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
// import './Poll.css'
import Chart from './Chart'
import VotingForm from './VotingForm'
import NotFoundPage from './NotFoundPage'
import votrApi from '../votrApi'

class Poll extends Component {
    constructor (props) {
        super()
        this.submitVote = this.submitVote.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.deletePoll = this.deletePoll.bind(this)
        this.showDeleteButton = this.showDeleteButton.bind(this)
        this.pollId = this.props.match.params.poll_id
        this.state = {
            poll: null
        }
    }

    componentDidMount () {
        this.fetchPoll()
    }

    fetchPoll () {
        votrApi.getPoll(this.pollId)
            .then(poll => this.setState({poll: poll}))
    }

    submitVote (vote) {
        votrApi.submitVote(this.pollId, vote)
            .then(() => this.fetchPoll())
    }

    deletePoll () {
        votrApi.deletePoll(this.pollId)
            .then(() => this.setState({redirect: true}))
    }

    handleDelete () {
        if (window.confirm('Are you sure you want to delete this poll?'))
            this.deletePoll()
    }

    showDeleteButton () {
        return (
            this.props.userinfo.userId == this.state.poll.authorId &&
            <div>
                <button onClick={this.handleDelete}>Delete this poll</button>
                {this.state.redirect && <Redirect to='/polls'/>}
            </div>
        )
    }

    render () {
        return (
            <div className='Poll'>
                { (this.state.poll && this.state.poll.options) &&
                    <div>
                        <p>Poll: {this.state.poll.title}</p>
                        <VotingForm  options={this.state.poll.options} submitVote={this.submitVote} />
                        <Chart options={this.state.poll.options} />
                        {this.showDeleteButton()}
                    </div>}
                    {(this.state.poll && this.state.poll.error) && <NotFoundPage />}
            </div>
        )
    }
}

export default Poll
