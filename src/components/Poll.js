import React, { Component } from 'react'
// import './Component.css'

class Poll extends Component {
    constructor () {
        super()
        this.state = {
            poll: null
        }
    }

    componentDidMount () {
        this.fetchPoll().then(poll => this.setState({poll: poll}))
    }

    fetchPoll () {
        return fetch(`http://localhost:8000/api/polls/${this.props.match.params.poll_id}`)
            .then(data => data.json())
    }

    render () {
        return (
            <div className='Poll'>
            { this.state.poll &&
                <div>
                    <p>Poll: {this.state.poll.title}</p>
                    {this.state.poll.options.map(option => {
                        return (
                            <p key={option.id}>Option {option.name} got {option.votes} votes.</p>
                        )
                    })}
                </div>
            }
            </div>
        )
    }
}

export default Poll
