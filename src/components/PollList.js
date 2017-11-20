import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles/PollList.css'
import votrApi from '../votrApi'

const initialState = {
            polls: []
        }

class PollList extends Component {
    constructor () {
        super()
        this.state = { ...initialState }
    }

    componentDidMount () {
        this.fetchPolls().then(polls => this.setState({polls: polls}))
    }

    fetchPolls () {
        return votrApi.getAllPolls()
    }

    render () {
        const { polls } = this.state
        return (
            <div className={styles.list}>
                <h1 className={styles.title}>All Polls</h1>
                {this.state.polls.length ?
                    <div>
                        {polls.map(poll => {
                            const {title, poll_id} = poll
                            return (
                                <div className={styles.listItem} key={poll_id}>
                                    <Link className={styles.link} to={`/polls/${poll_id}`}>{title}</Link>
                                </div>
                            )
                        })}
                    </div>
                    : 'No polls to show'}
            </div>
        )
    }
}

export default PollList
