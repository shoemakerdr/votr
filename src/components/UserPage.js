import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NotLoggedIn from './NotLoggedIn'
import BackToLink from './BackToLink'
import votrApi from '../votrApi'
import { isLoggedIn } from '../authHelpers'
import styles from './styles/UserPage.css'
import Loading from './Loading'

class UserPage extends Component {
    constructor (props) {
        super()
        this.username = props.userInfo.username
        this.fetchPolls = this.fetchPolls.bind(this)
        this.defaultState = {
            polls: [],
            isLoading: true,
        }
        this.state = this.defaultState
    }
    fetchPolls () {
        votrApi.getAllPollsByUser(this.username)
            .then(polls => this.setState({polls: polls, isLoading: false}))
    }

    componentDidMount () {
        if (isLoggedIn())
            this.fetchPolls()
        else this.setState({isLoading: false})
    }

    handleDelete (pollId) {
        return (event) => {
            if (window.confirm('Are you sure you want to delete this poll?'))
                this.deletePoll(pollId)
        }
    }

    deletePoll (pollId) {
        this.setState({isLoading: true})
        votrApi.deletePoll(pollId)
            .then(this.fetchPolls)
    }

    render () {
        const { polls, isLoading } = this.state
        return (
            <div className='AllPolls'>
                { isLoggedIn() ?
                    <h1>Polls by {this.username}</h1>
                    : <NotLoggedIn username={this.username}/>
                }
                {!isLoading && polls.length ?
                    <div className={styles.list}>
                        {polls.map(poll => {
                            const {title, poll_id} = poll
                            return (
                                <div className={styles.listItem} key={poll_id}>
                                    <Link className={styles.link} to={`/polls/${poll_id}`}>{title}</Link>
                                    <button
                                        className={styles.delete}
                                        onClick={this.handleDelete(poll_id)}
                                    >
                                        &#10006;
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                : !isLoading && isLoggedIn() ? 'No polls to show'
                : ''}
                <BackToLink to='/polls' message='Back to Polls' />
                {isLoading && <Loading />}
            </div>
        )
    }
}

export default UserPage
