import React, { Component } from 'react'
import Chart from './Chart'
import VotingForm from './VotingForm'
import NotFoundPage from './NotFoundPage'
import BackToLink from './BackToLink'
import votrApi from '../votrApi'
import styles from './styles/Poll.css'
import Loading from './Loading'

class Poll extends Component {
    constructor (props) {
        super()
        this.submitVote = this.submitVote.bind(this)
        this.hasVotes = this.hasVotes.bind(this)
        this.pollId = props.match.params.poll_id
        this.state = {
            poll: null,
            isLoading: true,
        }
    }

    componentDidMount () {
        this.fetchPoll()
    }

    fetchPoll () {
        votrApi.getPoll(this.pollId)
            .then(poll => this.setState({poll: poll, isLoading: false}))
    }

    submitVote (vote) {
        this.setState({isLoading:true})
        votrApi.submitVote(this.pollId, vote)
            .then(() => this.fetchPoll())
    }

    hasVotes (options) {  
        return options.some(opt => opt.votes > 0)
    }

    render () {
        const { poll, isLoading } = this.state
        return (
            <div>
                { (poll && poll.options) &&
                    <div>
                        <h1 className={styles.title}>{poll.title}</h1>
                        <VotingForm userInfo={this.props.userInfo} options={poll.options} submitVote={this.submitVote} />
                    </div>}
                    {(!isLoading && this.hasVotes(poll.options))
                            ? <Chart options={poll.options} />
                            : !isLoading
                                ? <div>No votes yet.</div>
                                : ''}
                    {(poll && poll.error) && <NotFoundPage />}
                {isLoading && <Loading />}
                <BackToLink to='/polls' message='Back to Polls' />
            </div>
        )
    }
}

export default Poll
