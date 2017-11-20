import React, { Component } from 'react'
import Chart from './Chart'
import VotingForm from './VotingForm'
import NotFoundPage from './NotFoundPage'
import BackToLink from './BackToLink'
import votrApi from '../votrApi'
import styles from './styles/Poll.css'

class Poll extends Component {
    constructor (props) {
        super()
        this.submitVote = this.submitVote.bind(this)
        this.pollId = props.match.params.poll_id
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

    render () {
        return (
            <div>
                { (this.state.poll && this.state.poll.options) &&
                    <div>
                        <h1 className={styles.title}>{this.state.poll.title}</h1>
                        <VotingForm userInfo={this.props.userInfo} options={this.state.poll.options} submitVote={this.submitVote} />
                        <Chart options={this.state.poll.options} />
                    </div>}
                    {(this.state.poll && this.state.poll.error) && <NotFoundPage />}
                <BackToLink to='/polls' message='Back to Polls' />
            </div>
        )
    }
}

export default Poll
