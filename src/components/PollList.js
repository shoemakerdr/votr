import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles/PollList.css'
import votrApi from '../votrApi'
import Loading from './Loading'

class PollList extends Component {
    constructor () {
        super()
        this.defaultState = {
            polls: [],
            isLoading: true,
        }
        this.state = this.defaultState
    }

    componentDidMount () {
        this.fetchPolls().then(polls => this.setState({polls: polls, isLoading: false}))
    }

    fetchPolls () {
        return votrApi.getAllPolls()
    }

    render () {
        const { polls, isLoading } = this.state
        return (
            <div className={styles.list}>
                <h1 className={styles.title}>All Polls</h1>
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
                    {(!isLoading && !polls.length) && 'No polls to show'}
                {isLoading && <Loading />}
            </div>
        )
    }
}

export default PollList
