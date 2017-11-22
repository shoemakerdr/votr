import React, { Component } from 'react'
import Chart from './Chart'
import VotingForm from './VotingForm'
import NotFoundPage from './NotFoundPage'
import BackToLink from './BackToLink'
import votrApi from '../votrApi'
import styles from './styles/Poll.css'
import Loading from './Loading'
import ErrorFlashMessage from './ErrorFlashMessage'

class Poll extends Component {
    constructor (props) {
        super()
        this.submitVote = this.submitVote.bind(this)
        this.hasVotes = this.hasVotes.bind(this)
        this.pollId = props.match.params.poll_id
        this.state = {
            poll: null,
            isLoading: true,
            errorMessage: '',
        }
    }

    componentDidMount () {
        this.fetchPoll()
    }

    fetchPoll () {
        votrApi.getPoll(this.pollId)
            .then(poll => {
                if (this.state.poll && poll.error)
                    return this.setState({errorMessage: poll.error, isLoading: false})
                this.setState({poll: poll, isLoading: false})
        })
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
        const { poll, isLoading, errorMessage } = this.state
        return (
            <div>
                { (poll && poll.options) &&
                    <div>
                        <h1 className={styles.title}>{poll.title}</h1>
                        <VotingForm userInfo={this.props.userInfo} options={poll.options} submitVote={this.submitVote} />
                    </div>}
                    {(!isLoading && poll && poll.options && this.hasVotes(poll.options))
                            ? <Chart options={poll.options} />
                            : !isLoading && !poll.error
                                ? <div>No votes yet.</div>
                                : ''}
                    {(poll && poll.error) && <NotFoundPage />}
                    {errorMessage && <ErrorFlashMessage error={errorMessage}/>}
                {isLoading && <Loading />}
                <BackToLink to='/polls' message='Back to Polls' />
            </div>
        )
    }
}

export default Poll
