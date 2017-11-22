import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles/PollList.css'
import votrApi from '../votrApi'
import Loading from './Loading'
import ErrorFlashMessage from './ErrorFlashMessage'

class PollList extends Component {
    constructor () {
        super()
        this.defaultState = {
            polls: [],
            isLoading: true,
            errorMessage: '',
        }
        this.state = this.defaultState
    }

    componentDidMount () {
        this.fetchPolls().then(polls => {
            if (polls.error)
                return this.setState({errorMessage: polls.error, isLoading: false})
            this.setState({polls: polls, isLoading: false})
        })
    }

    fetchPolls () {
        return votrApi.getAllPolls()
    }

    render () {
        const { polls, isLoading, errorMessage } = this.state
        return (
            <div className={styles.list}>
                <h1 className={styles.title}>All Polls</h1>
                {errorMessage && <ErrorFlashMessage error={errorMessage}/>}
                {(!isLoading && polls.length) &&
                    <div>
                        {polls.map(poll => {
                            const {title, poll_id} = poll
                            return (
                                <div className={styles.listItem} key={poll_id}>
                                    <Link className={styles.link} to={`/polls/${poll_id}`}>{title}</Link>
                                </div>
                            )
                        })}
                    </div>}
                    {(!isLoading && !polls.length && !errorMessage) && 'No polls to show'}
                {isLoading && <Loading />}
            </div>
        )
    }
}

export default PollList
