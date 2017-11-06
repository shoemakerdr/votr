import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
// import './Poll.css'
import Chart from './Chart'
import VotingForm from './VotingForm'
import NotFoundPage from './NotFoundPage'

class Poll extends Component {
    constructor (props) {
        super()
        this.submitVote = this.submitVote.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.deletePoll = this.deletePoll.bind(this)
        this.showDeleteButton = this.showDeleteButton.bind(this)
        this.state = {
            poll: null
        }
    }

    componentDidMount () {
        this.fetchPoll()
    }

    fetchPoll () {
        fetch(`${this.props.api}/polls/${this.props.match.params.poll_id}`)
            .then(data => data.json())
            .then(poll => this.setState({poll: poll}))
    }

    submitVote (vote) {
        const params = Object.keys(vote).map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(vote[key])
          }).join('')
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: params
        }
        fetch(`${this.props.api}/polls/${this.props.match.params.poll_id}/vote`, options)
            .then(() => this.fetchPoll())
    }

    deletePoll () {
        fetch(`${this.props.api}/polls/${this.props.match.params.poll_id}`, {method:'DELETE'})
            .then(() => this.setState({redirect: true}))
    }

    handleDelete () {
        if (window.confirm('Are you sure you want to delete this poll?'))
            this.deletePoll()
    }

    showDeleteButton () {
        return (
            this.props.userInfo.isLoggedIn && 
            <div>
                <button onClick={this.handleDelete}>Delete this poll</button>
                {this.state.redirect && <Redirect to='/polls'/>}
            </div>
        )
    }

    render () {
        return (
            <div className='Poll'>
                { (this.state.poll && this.state.poll.options) ?
                    <div>
                        <p>Poll: {this.state.poll.title}</p>
                        <VotingForm  options={this.state.poll.options} submitVote={this.submitVote} />
                        <Chart options={this.state.poll.options} />
                        {this.showDeleteButton()}
                    </div>
                    : <NotFoundPage />}
            </div>
        )
    }
}

export default Poll
